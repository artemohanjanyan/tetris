import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLElement
import org.w3c.dom.HTMLInputElement
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

interface StatChangeListener {
    fun scoreChanged(score: Int)
    fun levelChanged(level: Int)
}

class StatManager(private val statChangeListener: StatChangeListener) {
    private var score = 0
    private var linesCleared = 0

    private fun level(linesCleared: Int = this.linesCleared) = linesCleared / 10 + 1

    fun initStat() {
        statChangeListener.scoreChanged(score)
        statChangeListener.levelChanged(level())
    }

    fun getScore() = score

    fun getLevel() = level()

    fun linesCleared(lineN: Int) {
        if (lineN < 0) {
            throw IllegalArgumentException("can't clear negative number of lines")
        }

        linesCleared += lineN
        if (level(linesCleared - lineN) < level()) {
            statChangeListener.levelChanged(level())
        }

        score += when (lineN) {
            0 -> 0
            1 -> 100
            2 -> 300
            3 -> 500
            4 -> 800
            else -> lineN * 250
        }
        statChangeListener.scoreChanged(score)
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

interface State {
    fun attach()
    fun detach()
}

class Context {
    private var state: State? = null

    fun setState(newState: State?) {
        state?.detach()
        state = newState
        state?.attach()
    }
}

abstract class StateImpl(protected val context: Context): State

class MenuState(context: Context): StateImpl(context) {
    private val menu = document.getElementById("menu") as HTMLElement
    private val startButton = document.getElementById("startButton") as HTMLInputElement
    private val menuStats = document.getElementById("menuStats") as HTMLElement
    private val menuScore = document.getElementById("menuScore") as HTMLElement
    private val menuLevel = document.getElementById("menuLevel") as HTMLElement

    init {
        println("here")
        startButton.onclick = {
            println("here2")
            context.setState(GameState(context, this))
        }
    }

    fun setStats(score: Int, level: Int) {
        menuStats.style.display = "flex"
        menuScore.innerHTML = "Score: $score"
        menuLevel.innerHTML = "Level: $level"
    }

    override fun attach() {
        menu.style.display = "flex"
    }

    override fun detach() {
        menu.style.display = "none"
    }
}

class GameState(context: Context, private val menuState: MenuState): StateImpl(context) {
    private val cacheSize = 4
    private val fieldDimensions = FieldDimensions(20, 10)
    private val nextFigureDimensions = FieldDimensions(5, 5)

    private val gameContainer = document.getElementById("gameContainer") as HTMLElement
    private val fieldHelper = CanvasHelper("fieldCanvas")
    private val nextHelpers = (1..cacheSize).toList().map { CanvasHelper("nextCanvas$it") }
    private val scoreText = document.getElementById("score") as HTMLElement
    private val levelText = document.getElementById("level") as HTMLElement

    private var intervalId = 0

    private val statManager = StatManager(object: StatChangeListener {
        override fun scoreChanged(score: Int) {
            scoreText.innerHTML = score.toString()
        }

        override fun levelChanged(level: Int) {
            levelText.innerHTML = level.toString()

            window.clearInterval(intervalId)
            val interval = 1000 * (3 / (2.0 + level)).pow(2.0/3)
            intervalId = window.setInterval(gameRunner::moveDown, interval.toInt())
            println("initInterval $interval")
        }
    })
    private val cachingFigureGenerator = CachingFigureGenerator(cacheSize, figures, Random(Date.now().toLong()))
    private val gameRunner: GameRunner = GameRunner(fieldDimensions, cachingFigureGenerator, object : GameEventListener {
        override fun linesCleared(lineN: Int) {
            statManager.linesCleared(lineN)
        }

        override fun gameOver() {
            this@GameState.gameOver()
        }
    })

    private var running = true

    private fun onResize() {
        fieldHelper.onResize()
        nextHelpers.forEach { it.onResize() }
    }

    private fun draw(canvasHelper: CanvasHelper) {
        if (!running) {
            return
        }

        window.requestAnimationFrame { draw(canvasHelper) }

        canvasHelper.clearRect()
        drawField(gameRunner, gameRunner.fieldDimensions, canvasHelper)

        nextHelpers.mapIndexed { index, nextHelper ->
            nextHelper.clearRect()
            val figure = Figure(Cell(2, 2), 0, cachingFigureGenerator.followingFigure(index))
            drawField(figure, nextFigureDimensions, nextHelper)
        }
    }

    private fun handleKeyboardEvent(event: KeyboardEvent) {
        when (event.keyCode) {
            37 -> gameRunner.moveLeft()
            38 -> gameRunner.nextVariant()
            39 -> gameRunner.moveRight()
            40 -> gameRunner.moveDown()
        }
    }

    private fun gameOver() {
        running = false
        menuState.setStats(statManager.getScore(), statManager.getLevel())
        context.setState(menuState)
    }

    override fun attach() {
        running = true

        gameContainer.style.display = "flex"

        onResize()
        window.onresize = {
            onResize()
        }

        statManager.initStat()
        window.requestAnimationFrame { draw(fieldHelper) }
        document.onkeydown = {
            handleKeyboardEvent(it)
        }
    }

    override fun detach() {
        window.clearInterval(intervalId)
        document.onkeydown = null
        window.onresize = null
        running = false
        gameContainer.style.display = "none"
    }
}

fun main() {
    val context = Context()
    context.setState(MenuState(context))
}