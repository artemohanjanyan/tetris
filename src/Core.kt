data class Field1(val rows: Int, val columns: Int)

data class Cell(val row: Int, val column: Int) {
    operator fun plus(that: Cell) = Cell(this.row + that.row, this.column + that.column)

    fun inside(field: Field1): Boolean = (0 until field.rows).contains(row) && (0 until field.columns).contains(column)
}

interface CellSet {
    val cells: Set<Cell>

    fun intersects(that: CellSet): Boolean = that.cells.any { this.cells.contains(it) }

    fun inside(field: Field1): Boolean = cells.all { it.inside(field) }
}

class FieldCellSet(val field: Field1): CellSet {
    private var cellsImpl = HashSet<Cell>()

    override val cells: Set<Cell>
        get() = cellsImpl

    fun addCellSet(cellSet: CellSet) {
        cellSet.cells.forEach { cellsImpl.add(it) }
        cellsImpl.plusAssign(cellSet.cells)
    }

    fun clearLastLine(): Boolean {
        val lastLine = (0 until field.columns).map { Cell(field.rows - 1, it) }
        return if (lastLine.all { cellsImpl.contains(it) }) {
            lastLine.forEach { cellsImpl.remove(it) }
            cellsImpl = cellsImpl.mapTo(HashSet()) { it + Cell(1, 0) }
            true
        } else {
            false
        }
    }
}

class FigureDescription(val variants: List<Set<Cell>>)

class Figure(private val center: Cell, private val variant: Int, private val description: FigureDescription): CellSet {
    override val cells: Set<Cell>
        get() = description.variants[variant].mapTo(HashSet()) { it + center }

    fun nextVariant() = Figure(center, (variant + 1) % description.variants.size, description)

    fun move(vector: Cell) = Figure(center + vector, variant, description)
}

fun tryMoveFigure(action: (Figure) -> Figure, figure: Figure, fieldCellSet: FieldCellSet): Figure? {
    return action(figure).takeIf { it.inside(fieldCellSet.field) && !it.intersects(fieldCellSet) }
}

fun makeDescription(vararg cells: Cell): FigureDescription {
    fun rotate(cell: Cell) = Cell(-cell.column, cell.row)

    fun rotate(cells: Set<Cell>): Set<Cell> = cells.mapTo(HashSet()) { rotate(it) }

    var currentCells = setOf(*cells)
    val figures = arrayListOf(currentCells)
    currentCells = rotate(currentCells)
    while (currentCells != figures.first()) {
        figures.add(currentCells)
        currentCells = rotate(currentCells)
    }

    return FigureDescription(figures)
}

fun mirror(description: FigureDescription): FigureDescription {
    fun mirror(cell: Cell): Cell = Cell(cell.row, -cell.column)
    return FigureDescription(description.variants.map { cells ->
        cells.mapTo(HashSet()) { mirror(it) }
    })
}

interface FigureNGenerator {
    fun nextFigure(): Int
}

class GameRunner(val field: Field1, private val figures: List<FigureDescription>, private val figureNGenerator: FigureNGenerator): CellSet {
    private val fieldCellSet = FieldCellSet(field)
    private var currentFigure = nextFigure()

    private fun nextFigure(): Figure = Figure(
            Cell(2, field.columns / 2),
            0,
            figures[figureNGenerator.nextFigure() % figures.size]
    )

    override val cells: Set<Cell>
        get() = fieldCellSet.cells + currentFigure.cells

    private fun tryMoveCurrent(action: (Figure) -> Figure): Figure? = tryMoveFigure(action, currentFigure, fieldCellSet)

    private fun replaceIfCanMove(action: (Figure) -> Figure): Figure? {
        return tryMoveCurrent(action)?.also {
            currentFigure = it
        }
    }

    fun moveLeft() {
        replaceIfCanMove { it.move(Cell(0, -1)) }
    }

    fun moveRight() {
        replaceIfCanMove { it.move(Cell(0, 1)) }
    }

    fun nextVariant() {
        replaceIfCanMove { it.nextVariant() }
    }

    fun moveDown() {
        replaceIfCanMove {
            it.move(Cell(1, 0))
        } ?: {
            fieldCellSet.addCellSet(currentFigure)
            while (fieldCellSet.clearLastLine()) {}
            currentFigure = nextFigure()
        }()
    }
}

val figureLine = makeDescription(Cell(-2, 0), Cell(-1, 0), Cell(0, 0), Cell(1, 0))
val figureSquare = makeDescription(Cell(-1, -1), Cell(-1, 0), Cell(0, -1), Cell(0, 0))
val figureL1 = makeDescription(Cell(-1, 0), Cell(0, 0), Cell(1, 0), Cell(1, 1))
val figureL2 = mirror(figureL1)
val figureZ1 = makeDescription(Cell(0, -1), Cell(0, 0), Cell(-1, 0), Cell(-1, 1))
val figureZ2 = mirror(figureZ1)