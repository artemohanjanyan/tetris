var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fieldRows = 20;
var fieldColumns = 10;

function initField(rows, columns) {
  var field = Array(rows);
  field.fill(0);
  field = field.map(
    function(x) {
      var row = Array(columns);
      row.fill(0);
      return row;
    }
  );
  return field;
}

function inRange(x, a, b) {
  return x >= a && x < b;
}

function moveField(field, drow, dcolumn) {
  var rows = field.length;
  var columns = field[0].length;
  var newField = initField(rows, columns);
  for (var row = 0; row < rows; ++row) {
    for (var column = 0; column < columns; ++column) {
      var newRow = row + drow;
      var newColumn = column + dcolumn;
      if (inRange(newRow, 0, rows) && inRange(newColumn, 0, columns)) {
        newField[newRow][newColumn] = field[row][column];
      }
    }
  }
  return newField;
}

var field = initField(fieldRows, fieldColumns);
var block = initField(fieldRows, fieldColumns);

field[fieldRows - 1][0] = 1;
field[fieldRows - 1][fieldColumns - 1] = 1;

block[0][5] = 1;

function drawField(field) {
  var cellWidth = canvas.width / fieldColumns;
  var cellHeight = canvas.height / fieldRows;
  var padding = 5;

  for (var row = 0; row < fieldRows; ++row) {
    for (var column = 0; column < fieldColumns; ++column) {
      if (field[row][column] == 1) {
        ctx.beginPath();
        ctx.fillRect(
          column * cellWidth + padding, row * cellHeight + padding,
          cellWidth - padding * 2, cellHeight - padding * 2
        );
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawField(field);
  drawField(block);
}

function iterate() {
  block = moveField(block, 1, 0);
  //field[5][5] = 1 - field[5][5];
}

function onKeyDown(e) {
  if (e.keyCode == '37') {
    block = moveField(block, 0, -1);
  } else if (e.keyCode == '39') {
    block = moveField(block, 0, 1);
  }
}

//window.setInterval(draw, 10);
requestAnimationFrame(draw);
window.setInterval(iterate, 1000);
document.onkeydown = onKeyDown;
