import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Date
import kotlin.math.floor
import kotlin.math.pow
import kotlin.random.Random

val figureLine = makeDescription(Cell(-2, 0), Cell(-1, 0), Cell(0, 0), Cell(1, 0))
val figureSquare = makeDescription(Cell(-1, -1), Cell(-1, 0), Cell(0, -1), Cell(0, 0))
val figureL1 = makeDescription(Cell(-1, 0), Cell(0, 0), Cell(1, 0), Cell(1, 1))
val figureL2 = mirror(figureL1)
val figureZ1 = makeDescription(Cell(0, -1), Cell(0, 0), Cell(-1, 0), Cell(-1, 1))
val figureZ2 = mirror(figureZ1)
val figureT = makeDescription(Cell(0, -1), Cell(0, 0), Cell(0, 1), Cell(1, 0))

val figures = listOf(figureLine, figureSquare, figureL1, figureL2, figureZ1, figureZ2, figureT)

class CanvasHelper(id: String) {
    val canvas = document.getElementById(id) as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D

    fun onResize() {
        canvas.height = canvas.clientHeight
        canvas.width = canvas.clientWidth
    }

    fun clearRect() {
        context.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
    }
}

class StatHelper(id: String, private val iterate: () -> Unit): GameEventListener {
    private val scoreText = document.getElementById(id) as HTMLElement
    private var intervalId = 0
    private var score = 0
    private var linesCleared = 0

    override fun linesCleared(lineN: Int) {
        updateInterval(lineN)
        linesCleared += lineN
        if (lineN < 0) {
            throw IllegalArgumentException("can't clear negative number of lines")
        }
        score += when (lineN) {
            0 -> 0
            1 -> 100
            2 -> 300
            3 -> 500
            4 -> 800
            else -> lineN * 250
        }
        scoreText.innerHTML = score.toString()
    }

    fun initInterval() {
        val level = linesCleared / 10 + 1
        val interval = 1000 * (3 / (2.0 + level)).pow(2.0/3)
        intervalId = window.setInterval(iterate, interval.toInt())
        println("initInterval $interval")
    }

    private fun updateInterval(lineN: Int) {
        linesCleared += lineN
        if ((linesCleared - lineN) / 10 < linesCleared / 10) {
            window.clearInterval(intervalId)
            initInterval()
        }
    }
}

fun drawField(cells: CellSet, dimensions: FieldDimensions, canvasHelper: CanvasHelper) {
    val cellWidth = canvasHelper.canvas.width.toDouble() / dimensions.columns
    val cellHeight = canvasHelper.canvas.height.toDouble() / dimensions.rows
    val padding = 2.0

    cells.cells.forEach {
        with (canvasHelper.context) {
            beginPath()
            fillRect(
                    floor(it.column * cellWidth + padding),
                    floor(it.row * cellHeight + padding),
                    floor(cellWidth - padding * 2),
                    floor(cellHeight - padding * 2)
            )
            fillStyle = "#0095DD"
            fill()
            closePath()
        }
    }
}

class CachingFigureGenerator(private val cacheSize: Int,
                             private val figures: List<FigureDescription>,
                             private val random: Random) : FigureGenerator {
    private val figureCache = (1..cacheSize).toList().mapTo(ArrayList()) { random.nextInt(figures.size) }
    private var nextFigure = 0

    override fun nextFigure(): FigureDescription {
        val next = figureCache[nextFigure]
        figureCache[nextFigure] = random.nextInt(figures.size)
        nextFigure = (nextFigure + 1) % cacheSize
        return figures[next]
    }

    fun followingFigure(i: Int): FigureDescription {
        return figures[figureCache[(nextFigure + i) % cacheSize]]
    }
}

fun main() {
    val cacheSize = 4
    val fieldDimensions = FieldDimensions(20, 10)
    val nextFigureDimensions = FieldDimensions(5, 5)

    val fieldHelper = CanvasHelper("fieldCanvas")
    val nextHelpers = (1..cacheSize).toList().map { CanvasHelper("nextCanvas$it") }

    fun onResize() {
        fieldHelper.onResize()
        nextHelpers.forEach { it.onResize() }
    }
    onResize()
    window.onresize = {
        onResize()
    }

    val cachingFigureGenerator = CachingFigureGenerator(cacheSize, figures, Random(Date.now().toLong()))
    var statHelper: StatHelper? = null
    val gameRunner = GameRunner(fieldDimensions, cachingFigureGenerator, object: GameEventListener {
        override fun linesCleared(lineN: Int) {
            statHelper?.linesCleared(lineN)
        }
    })
    statHelper = StatHelper("score", gameRunner::moveDown)

    fun draw(canvasHelper: CanvasHelper) {
        window.requestAnimationFrame { draw(canvasHelper) }

        canvasHelper.clearRect()
        drawField(gameRunner, gameRunner.fieldDimensions, canvasHelper)

        nextHelpers.mapIndexed { index, nextHelper ->
            nextHelper.clearRect()
            val figure = Figure(Cell(2, 2), 0, cachingFigureGenerator.followingFigure(index))
            drawField(figure, nextFigureDimensions, nextHelper)
        }
    }

    fun handleKeyboardEvent(event: KeyboardEvent) {
        when (event.keyCode) {
            37 -> gameRunner.moveLeft()
            38 -> gameRunner.nextVariant()
            39 -> gameRunner.moveRight()
            40 -> gameRunner.moveDown()
        }
    }

    window.requestAnimationFrame { draw(fieldHelper) }
    statHelper.initInterval()
    document.onkeydown = {
        handleKeyboardEvent(it)
    }
}