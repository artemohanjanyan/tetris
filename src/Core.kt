data class FieldDimensions(val rows: Int, val columns: Int)

data class Cell(val row: Int, val column: Int) {
    operator fun plus(that: Cell) = Cell(
            this.row + that.row,
            this.column + that.column
    )

    fun inside(fieldDimensions: FieldDimensions): Boolean =
            (0 until fieldDimensions.rows).contains(row) &&
                    (0 until fieldDimensions.columns).contains(column)
}

interface CellSet {
    val cells: Set<Cell>

    fun intersects(that: CellSet): Boolean = that.cells.any { this.cells.contains(it) }

    fun inside(fieldDimensions: FieldDimensions): Boolean = cells.all {it.inside(fieldDimensions) }
}

interface HasFieldDimensions {
    val fieldDimensions: FieldDimensions
}

class Field(override val fieldDimensions: FieldDimensions): CellSet, HasFieldDimensions {
    private var cellsImpl = HashSet<Cell>()

    override val cells: Set<Cell>
        get() = cellsImpl

    fun addCellSet(cellSet: CellSet) {
        cellSet.cells.forEach { cellsImpl.add(it) }
        cellsImpl.plusAssign(cellSet.cells)
    }

    fun clearFullLines(): Int {
        var clearedLines = 0
        (0 until fieldDimensions.rows).forEach { row ->
            val rowCells = (0 until fieldDimensions.columns).map { Cell(row, it) }
            if (rowCells.all { cellsImpl.contains(it) }) {
                rowCells.forEach { cellsImpl.remove(it) }
                cellsImpl = cellsImpl.mapTo(HashSet()) {
                    if (it.row < row) {
                        it + Cell(1, 0)
                    } else {
                        it
                    }
                }
                clearedLines += 1
            }
        }
        return clearedLines
    }
}

class FigureDescription(val variants: List<Set<Cell>>)

class Figure(private val center: Cell, private val variant: Int,
             private val description: FigureDescription): CellSet {
    override val cells: Set<Cell>
        get() = description.variants[variant].mapTo(HashSet()) { it + center }

    fun nextVariant() = Figure(center, (variant + 1) % description.variants.size, description)

    fun move(vector: Cell) = Figure(center + vector, variant, description)
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

interface FigureGenerator {
    fun nextFigure(): FigureDescription
}

interface GameEventListener {
    fun linesCleared(lineN: Int)
    fun gameOver()
}

class GameRunner(override val fieldDimensions: FieldDimensions,
                 private val figureGenerator: FigureGenerator,
                 private val gameEventListener: GameEventListener): CellSet, HasFieldDimensions {
    private val field = Field(fieldDimensions)
    private var currentFigure = nextFigure()

    private fun nextFigure(): Figure = Figure(
            Cell(2, fieldDimensions.columns / 2),
            0,
            figureGenerator.nextFigure()
    ).apply {
        if (field.intersects(this)) {
            gameEventListener.gameOver()
        }
    }

    override val cells: Set<Cell>
        get() = this.field.cells + currentFigure.cells

    private fun tryMoveCurrent(action: (Figure) -> Figure): Figure? {
        return action(currentFigure).takeIf {
            it.inside(field.fieldDimensions) && !it.intersects(field)
        }
    }

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
            field.addCellSet(currentFigure)
            gameEventListener.linesCleared(field.clearFullLines())
            currentFigure = nextFigure()
        }()
    }
}