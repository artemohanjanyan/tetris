import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date
import kotlin.random.Random

val figureLine = makeDescription(Cell(-2, 0), Cell(-1, 0), Cell(0, 0), Cell(1, 0))
val figureSquare = makeDescription(Cell(-1, -1), Cell(-1, 0), Cell(0, -1), Cell(0, 0))
val figureL1 = makeDescription(Cell(-1, 0), Cell(0, 0), Cell(1, 0), Cell(1, 1))
val figureL2 = mirror(figureL1)
val figureZ1 = makeDescription(Cell(0, -1), Cell(0, 0), Cell(-1, 0), Cell(-1, 1))
val figureZ2 = mirror(figureZ1)
val figureT = makeDescription(Cell(0, -1), Cell(0, 0), Cell(0, 1), Cell(1, 0))

val figures = listOf(figureLine, figureSquare, figureL1, figureL2, figureZ1, figureZ2, figureT)

fun main(args: Array<String>) {
    val fieldCanvas = document.getElementById("fieldCanvas") as HTMLCanvasElement
    val nextCanvas = document.getElementById("nextCanvas") as HTMLCanvasElement
    val ctx = fieldCanvas.getContext("2d") as CanvasRenderingContext2D

    fun setCanvasSize(canvas: HTMLCanvasElement) {
        canvas.height = canvas.clientHeight
        canvas.width = canvas.clientWidth
    }

    fun onResize() {
        setCanvasSize(fieldCanvas)
        setCanvasSize(nextCanvas)
    }
    onResize()
    window.onresize = {
        onResize()
    }

    fun drawField(gameRunner: GameRunner) {
        val cellWidth = fieldCanvas.width / gameRunner.fieldDimensions.columns
        val cellHeight = fieldCanvas.height / gameRunner.fieldDimensions.rows
        val padding = 2

        gameRunner.cells.forEach {
            ctx.beginPath()
            ctx.fillRect(
                    it.column * cellWidth + padding.toDouble(),
                    it.row * cellHeight + padding.toDouble(),
                    cellWidth - padding * 2.0,
                    cellHeight - padding * 2.0
            )
            ctx.fillStyle = "#0095DD"
            ctx.fill()
            ctx.closePath()
        }
    }

    val gameRunner = GameRunner(FieldDimensions(20, 10), object: FigureGenerator {
        val random = Random(Date.now().toLong())
        override fun nextFigure(): FigureDescription = figures[random.nextInt(figures.size)]
    })

    fun draw() {
        window.requestAnimationFrame { draw() }
        ctx.clearRect(0.0, 0.0, fieldCanvas.width.toDouble(), fieldCanvas.height.toDouble())
        drawField(gameRunner)
    }

    fun iterate() {
        gameRunner.moveDown()
    }

    fun handleKeyboardEvent(event: KeyboardEvent) {
        when (event.keyCode) {
            37 -> gameRunner.moveLeft()
            38 -> gameRunner.nextVariant()
            39 -> gameRunner.moveRight()
            40 -> gameRunner.moveDown()
        }
    }

    window.requestAnimationFrame { draw() }
    window.setInterval({ iterate() }, 300)
    document.onkeydown = {
        if (it is KeyboardEvent) {
            handleKeyboardEvent(it)
        }
    }
}