import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window

typealias Field = Array<Array<Boolean>>

fun main(args: Array<String>) {
    val canvas = document.getElementById("canvas") as HTMLCanvasElement
    val ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    val fieldRows = 20
    val fieldColumns = 10
    fun initField(rows: Int, columns: Int): Field {
        return Array(rows) { Array(columns) { false } }
    }

    fun moveField(field: Field, drow: Int, dcolumn: Int): Field {
        val rows = field.size
        val columns = field[0].size
        val newField = initField(rows, columns)
        for (row in 0 until rows) {
            for (column in 0 until columns) {
                val newRow = row + drow
                val newColumn = column + dcolumn
                if ((0 until rows).contains(newRow) && (0 until columns).contains(newColumn)) {
                    newField[newRow][newColumn] = field[row][column]
                }
            }
        }
        return newField
    }

    val field = initField(fieldRows, fieldColumns)
    var block = initField(fieldRows, fieldColumns)

    field[fieldRows - 1][0] = true
    field[fieldRows - 1][fieldColumns - 1] = true

    block[0][5] = true

    fun drawField(field: Field) {
        val cellWidth = canvas.width / fieldColumns
        val cellHeight = canvas.height / fieldRows
        val padding = 5

        for (row in 0 until fieldRows) {
            for (column in 0 until fieldColumns) {
                if (field[row][column]) {
                    ctx.beginPath()
                    ctx.fillRect(
                            column * cellWidth + padding.toDouble(),
                            row * cellHeight + padding.toDouble(),
                            cellWidth - padding * 2.0,
                            cellHeight - padding * 2.0
                    )
                    ctx.fillStyle = "#0095DD"
                    ctx.fill()
                    ctx.closePath()
                }
            }
        }
    }

    fun draw() {
        window.requestAnimationFrame { draw() }
        ctx.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
        drawField(field)
        drawField(block)
    }

    fun iterate() {
        block = moveField(block, 1, 0)
    }

    fun handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode == 37) {
            block = moveField(block, 0, -1)
        } else if (event.keyCode == 39) {
            block = moveField(block, 0, 1)
        }
    }

    window.requestAnimationFrame { draw() }
    window.setInterval({ iterate() }, 1000)
    document.onkeydown = {
        if (it is KeyboardEvent) {
            handleKeyboardEvent(it)
        }
    }
}