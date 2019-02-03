if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'untitled'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'untitled'.");
}
var untitled = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Unit = Kotlin.kotlin.Unit;
  var HashSet_init = Kotlin.kotlin.collections.HashSet_init_287e2$;
  var setOf = Kotlin.kotlin.collections.setOf_i5x0yv$;
  var arrayListOf = Kotlin.kotlin.collections.arrayListOf_i5x0yv$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var equals = Kotlin.equals;
  var plus = Kotlin.kotlin.collections.plus_khz7k3$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var throwCCE = Kotlin.throwCCE;
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var getCallableRef = Kotlin.getCallableRef;
  var numberToInt = Kotlin.numberToInt;
  var Random = Kotlin.kotlin.random.Random_s8cxhz$;
  MenuState.prototype = Object.create(StateImpl.prototype);
  MenuState.prototype.constructor = MenuState;
  GameState.prototype = Object.create(StateImpl.prototype);
  GameState.prototype.constructor = GameState;
  function FieldDimensions(rows, columns) {
    this.rows = rows;
    this.columns = columns;
  }
  FieldDimensions.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FieldDimensions',
    interfaces: []
  };
  FieldDimensions.prototype.component1 = function () {
    return this.rows;
  };
  FieldDimensions.prototype.component2 = function () {
    return this.columns;
  };
  FieldDimensions.prototype.copy_vux9f0$ = function (rows, columns) {
    return new FieldDimensions(rows === void 0 ? this.rows : rows, columns === void 0 ? this.columns : columns);
  };
  FieldDimensions.prototype.toString = function () {
    return 'FieldDimensions(rows=' + Kotlin.toString(this.rows) + (', columns=' + Kotlin.toString(this.columns)) + ')';
  };
  FieldDimensions.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.rows) | 0;
    result = result * 31 + Kotlin.hashCode(this.columns) | 0;
    return result;
  };
  FieldDimensions.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.rows, other.rows) && Kotlin.equals(this.columns, other.columns)))));
  };
  function Cell(row, column) {
    this.row = row;
    this.column = column;
  }
  Cell.prototype.plus_18xoi$ = function (that) {
    return new Cell(this.row + that.row | 0, this.column + that.column | 0);
  };
  Cell.prototype.inside_jtq4w7$ = function (fieldDimensions) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    tmp$ = fieldDimensions.rows;
    tmp$_0 = this.row;
    if (0 <= tmp$_0 && tmp$_0 < tmp$) {
      tmp$_1 = fieldDimensions.columns;
      tmp$_2 = this.column;
      tmp$_3 = (0 <= tmp$_2 && tmp$_2 < tmp$_1);
    }
     else
      tmp$_3 = false;
    return tmp$_3;
  };
  Cell.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Cell',
    interfaces: []
  };
  Cell.prototype.component1 = function () {
    return this.row;
  };
  Cell.prototype.component2 = function () {
    return this.column;
  };
  Cell.prototype.copy_vux9f0$ = function (row, column) {
    return new Cell(row === void 0 ? this.row : row, column === void 0 ? this.column : column);
  };
  Cell.prototype.toString = function () {
    return 'Cell(row=' + Kotlin.toString(this.row) + (', column=' + Kotlin.toString(this.column)) + ')';
  };
  Cell.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.row) | 0;
    result = result * 31 + Kotlin.hashCode(this.column) | 0;
    return result;
  };
  Cell.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.row, other.row) && Kotlin.equals(this.column, other.column)))));
  };
  function CellSet() {
  }
  var Collection = Kotlin.kotlin.collections.Collection;
  CellSet.prototype.intersects_wj7g5c$ = function (that) {
    var $receiver = that.cells;
    var any$result;
    any$break: do {
      var tmp$;
      if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
        any$result = false;
        break any$break;
      }
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (this.cells.contains_11rb$(element)) {
          any$result = true;
          break any$break;
        }
      }
      any$result = false;
    }
     while (false);
    return any$result;
  };
  CellSet.prototype.inside_jtq4w7$ = function (fieldDimensions) {
    var $receiver = this.cells;
    var all$result;
    all$break: do {
      var tmp$;
      if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
        all$result = true;
        break all$break;
      }
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (!element.inside_jtq4w7$(fieldDimensions)) {
          all$result = false;
          break all$break;
        }
      }
      all$result = true;
    }
     while (false);
    return all$result;
  };
  CellSet.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'CellSet',
    interfaces: []
  };
  function HasFieldDimensions() {
  }
  HasFieldDimensions.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'HasFieldDimensions',
    interfaces: []
  };
  function Field(fieldDimensions) {
    this.fieldDimensions_gbkuo7$_0 = fieldDimensions;
    this.cellsImpl_0 = HashSet_init();
  }
  Object.defineProperty(Field.prototype, 'fieldDimensions', {
    get: function () {
      return this.fieldDimensions_gbkuo7$_0;
    }
  });
  Object.defineProperty(Field.prototype, 'cells', {
    get: function () {
      return this.cellsImpl_0;
    }
  });
  var addAll = Kotlin.kotlin.collections.addAll_ipc267$;
  Field.prototype.addCellSet_wj7g5c$ = function (cellSet) {
    var tmp$;
    tmp$ = cellSet.cells.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      this.cellsImpl_0.add_11rb$(element);
    }
    addAll(this.cellsImpl_0, cellSet.cells);
  };
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  Field.prototype.clearFullLines = function () {
    var clearedLines = {v: 0};
    var tmp$;
    tmp$ = until(0, this.fieldDimensions.rows).iterator();
    loop_label: while (tmp$.hasNext()) {
      var element = tmp$.next();
      var $receiver = until(0, this.fieldDimensions.columns);
      var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination.add_11rb$(new Cell(element, item));
      }
      var rowCells = destination;
      var all$result;
      all$break: do {
        var tmp$_1;
        if (Kotlin.isType(rowCells, Collection) && rowCells.isEmpty()) {
          all$result = true;
          break all$break;
        }
        tmp$_1 = rowCells.iterator();
        while (tmp$_1.hasNext()) {
          var element_0 = tmp$_1.next();
          if (!this.cellsImpl_0.contains_11rb$(element_0)) {
            all$result = false;
            break all$break;
          }
        }
        all$result = true;
      }
       while (false);
      if (all$result) {
        var tmp$_2;
        tmp$_2 = rowCells.iterator();
        while (tmp$_2.hasNext()) {
          var element_1 = tmp$_2.next();
          this.cellsImpl_0.remove_11rb$(element_1);
        }
        var $receiver_0 = this.cellsImpl_0;
        var destination_0 = HashSet_init();
        var tmp$_3;
        tmp$_3 = $receiver_0.iterator();
        while (tmp$_3.hasNext()) {
          var item_0 = tmp$_3.next();
          var tmp$_4 = destination_0.add_11rb$;
          var transform$result;
          if (item_0.row < element) {
            transform$result = item_0.plus_18xoi$(new Cell(1, 0));
          }
           else {
            transform$result = item_0;
          }
          tmp$_4.call(destination_0, transform$result);
        }
        this.cellsImpl_0 = destination_0;
        clearedLines.v = clearedLines.v + 1 | 0;
      }
    }
    return clearedLines.v;
  };
  Field.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Field',
    interfaces: [HasFieldDimensions, CellSet]
  };
  function FigureDescription(variants) {
    this.variants = variants;
  }
  FigureDescription.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'FigureDescription',
    interfaces: []
  };
  function Figure(center, variant, description) {
    this.center_0 = center;
    this.variant_0 = variant;
    this.description_0 = description;
  }
  Object.defineProperty(Figure.prototype, 'cells', {
    get: function () {
      var $receiver = this.description_0.variants.get_za3lpa$(this.variant_0);
      var destination = HashSet_init();
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var item = tmp$.next();
        destination.add_11rb$(item.plus_18xoi$(this.center_0));
      }
      return destination;
    }
  });
  Figure.prototype.nextVariant = function () {
    return new Figure(this.center_0, (this.variant_0 + 1 | 0) % this.description_0.variants.size, this.description_0);
  };
  Figure.prototype.move_18xoi$ = function (vector) {
    return new Figure(this.center_0.plus_18xoi$(vector), this.variant_0, this.description_0);
  };
  Figure.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Figure',
    interfaces: [CellSet]
  };
  function makeDescription$rotate(cell) {
    return new Cell(-cell.column | 0, cell.row);
  }
  function makeDescription$rotate_0(closure$rotate) {
    return function (cells) {
      var destination = HashSet_init();
      var tmp$;
      tmp$ = cells.iterator();
      while (tmp$.hasNext()) {
        var item = tmp$.next();
        destination.add_11rb$(closure$rotate(item));
      }
      return destination;
    };
  }
  function makeDescription(cells) {
    var rotate = makeDescription$rotate;
    var rotate_0 = makeDescription$rotate_0(rotate);
    var currentCells = setOf(cells.slice());
    var figures = arrayListOf([currentCells]);
    currentCells = rotate_0(currentCells);
    while (!equals(currentCells, first(figures))) {
      figures.add_11rb$(currentCells);
      currentCells = rotate_0(currentCells);
    }
    return new FigureDescription(figures);
  }
  function mirror$mirror(cell) {
    return new Cell(cell.row, -cell.column | 0);
  }
  function mirror(description) {
    var mirror = mirror$mirror;
    var $receiver = description.variants;
    var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      var tmp$_0 = destination.add_11rb$;
      var destination_0 = HashSet_init();
      var tmp$_1;
      tmp$_1 = item.iterator();
      while (tmp$_1.hasNext()) {
        var item_0 = tmp$_1.next();
        destination_0.add_11rb$(mirror(item_0));
      }
      tmp$_0.call(destination, destination_0);
    }
    return new FigureDescription(destination);
  }
  function FigureGenerator() {
  }
  FigureGenerator.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'FigureGenerator',
    interfaces: []
  };
  function GameEventListener() {
  }
  GameEventListener.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'GameEventListener',
    interfaces: []
  };
  function GameRunner(fieldDimensions, figureGenerator, gameEventListener) {
    this.fieldDimensions_ylwrlt$_0 = fieldDimensions;
    this.figureGenerator_0 = figureGenerator;
    this.gameEventListener_0 = gameEventListener;
    this.field_0 = new Field(this.fieldDimensions);
    this.currentFigure_0 = this.nextFigure_0();
  }
  Object.defineProperty(GameRunner.prototype, 'fieldDimensions', {
    get: function () {
      return this.fieldDimensions_ylwrlt$_0;
    }
  });
  GameRunner.prototype.nextFigure_0 = function () {
    var $receiver = new Figure(new Cell(2, this.fieldDimensions.columns / 2 | 0), 0, this.figureGenerator_0.nextFigure());
    if (this.field_0.intersects_wj7g5c$($receiver)) {
      this.gameEventListener_0.gameOver();
    }
    return $receiver;
  };
  Object.defineProperty(GameRunner.prototype, 'cells', {
    get: function () {
      return plus(this.field_0.cells, this.currentFigure_0.cells);
    }
  });
  GameRunner.prototype.tryMoveCurrent_0 = function (action) {
    var $receiver = action(this.currentFigure_0);
    return $receiver.inside_jtq4w7$(this.field_0.fieldDimensions) && !$receiver.intersects_wj7g5c$(this.field_0) ? $receiver : null;
  };
  GameRunner.prototype.replaceIfCanMove_0 = function (action) {
    var tmp$;
    var tmp$_0;
    if ((tmp$ = this.tryMoveCurrent_0(action)) != null) {
      this.currentFigure_0 = tmp$;
      tmp$_0 = tmp$;
    }
     else
      tmp$_0 = null;
    return tmp$_0;
  };
  function GameRunner$moveLeft$lambda(it) {
    return it.move_18xoi$(new Cell(0, -1));
  }
  GameRunner.prototype.moveLeft = function () {
    this.replaceIfCanMove_0(GameRunner$moveLeft$lambda);
  };
  function GameRunner$moveRight$lambda(it) {
    return it.move_18xoi$(new Cell(0, 1));
  }
  GameRunner.prototype.moveRight = function () {
    this.replaceIfCanMove_0(GameRunner$moveRight$lambda);
  };
  function GameRunner$nextVariant$lambda(it) {
    return it.nextVariant();
  }
  GameRunner.prototype.nextVariant = function () {
    this.replaceIfCanMove_0(GameRunner$nextVariant$lambda);
  };
  function GameRunner$moveDown$lambda(it) {
    return it.move_18xoi$(new Cell(1, 0));
  }
  function GameRunner$moveDown$lambda_0(this$GameRunner) {
    return function () {
      this$GameRunner.field_0.addCellSet_wj7g5c$(this$GameRunner.currentFigure_0);
      this$GameRunner.gameEventListener_0.linesCleared_za3lpa$(this$GameRunner.field_0.clearFullLines());
      this$GameRunner.currentFigure_0 = this$GameRunner.nextFigure_0();
      return Unit;
    };
  }
  GameRunner.prototype.moveDown = function () {
    var tmp$;
    (tmp$ = this.replaceIfCanMove_0(GameRunner$moveDown$lambda)) != null ? tmp$ : (GameRunner$moveDown$lambda_0(this)(), Unit);
  };
  GameRunner.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameRunner',
    interfaces: [HasFieldDimensions, CellSet]
  };
  var figureLine;
  var figureSquare;
  var figureL1;
  var figureL2;
  var figureZ1;
  var figureZ2;
  var figureT;
  var figures;
  function CanvasHelper(id) {
    var tmp$, tmp$_0;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById(id), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.context = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  }
  CanvasHelper.prototype.onResize = function () {
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;
  };
  CanvasHelper.prototype.clearRect = function () {
    this.context.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
  };
  CanvasHelper.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CanvasHelper',
    interfaces: []
  };
  function StatChangeListener() {
  }
  StatChangeListener.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'StatChangeListener',
    interfaces: []
  };
  function StatManager(statChangeListener) {
    this.statChangeListener_0 = statChangeListener;
    this.score_0 = 0;
    this.linesCleared_0 = 0;
  }
  StatManager.prototype.level_0 = function (linesCleared) {
    if (linesCleared === void 0)
      linesCleared = this.linesCleared_0;
    return (linesCleared / 10 | 0) + 1 | 0;
  };
  StatManager.prototype.initStat = function () {
    this.statChangeListener_0.scoreChanged_za3lpa$(this.score_0);
    this.statChangeListener_0.levelChanged_za3lpa$(this.level_0());
  };
  StatManager.prototype.getScore = function () {
    return this.score_0;
  };
  StatManager.prototype.getLevel = function () {
    return this.level_0();
  };
  StatManager.prototype.linesCleared_za3lpa$ = function (lineN) {
    if (lineN < 0) {
      throw IllegalArgumentException_init("can't clear negative number of lines");
    }
    this.linesCleared_0 = this.linesCleared_0 + lineN | 0;
    if (this.level_0(this.linesCleared_0 - lineN | 0) < this.level_0()) {
      this.statChangeListener_0.levelChanged_za3lpa$(this.level_0());
    }
    var tmp$;
    tmp$ = this.score_0;
    var tmp$_0;
    switch (lineN) {
      case 0:
        tmp$_0 = 0;
        break;
      case 1:
        tmp$_0 = 100;
        break;
      case 2:
        tmp$_0 = 300;
        break;
      case 3:
        tmp$_0 = 500;
        break;
      case 4:
        tmp$_0 = 800;
        break;
      default:tmp$_0 = lineN * 250 | 0;
        break;
    }
    this.score_0 = tmp$ + tmp$_0 | 0;
    this.statChangeListener_0.scoreChanged_za3lpa$(this.score_0);
  };
  StatManager.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StatManager',
    interfaces: []
  };
  var Math_0 = Math;
  function drawField(cells, dimensions, canvasHelper) {
    var cellWidth = canvasHelper.canvas.width / dimensions.columns;
    var cellHeight = canvasHelper.canvas.height / dimensions.rows;
    var padding = 2.0;
    var tmp$;
    tmp$ = cells.cells.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var receiver = canvasHelper.context;
      receiver.beginPath();
      var x = element.column * cellWidth + padding;
      var tmp$_0 = Math_0.floor(x);
      var x_0 = element.row * cellHeight + padding;
      var tmp$_1 = Math_0.floor(x_0);
      var x_1 = cellWidth - padding * 2;
      var tmp$_2 = Math_0.floor(x_1);
      var x_2 = cellHeight - padding * 2;
      receiver.fillRect(tmp$_0, tmp$_1, tmp$_2, Math_0.floor(x_2));
      receiver.fillStyle = '#0095DD';
      receiver.fill();
      receiver.closePath();
    }
  }
  function CachingFigureGenerator(cacheSize, figures, random) {
    this.cacheSize_0 = cacheSize;
    this.figures_0 = figures;
    this.random_0 = random;
    var $receiver = toList(new IntRange(1, this.cacheSize_0));
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(this.random_0.nextInt_za3lpa$(this.figures_0.size));
    }
    this.figureCache_0 = destination;
    this.nextFigure_0 = 0;
  }
  CachingFigureGenerator.prototype.nextFigure = function () {
    var next = this.figureCache_0.get_za3lpa$(this.nextFigure_0);
    this.figureCache_0.set_wxm5ur$(this.nextFigure_0, this.random_0.nextInt_za3lpa$(this.figures_0.size));
    this.nextFigure_0 = (this.nextFigure_0 + 1 | 0) % this.cacheSize_0;
    return this.figures_0.get_za3lpa$(next);
  };
  CachingFigureGenerator.prototype.followingFigure_za3lpa$ = function (i) {
    return this.figures_0.get_za3lpa$(this.figureCache_0.get_za3lpa$((this.nextFigure_0 + i | 0) % this.cacheSize_0));
  };
  CachingFigureGenerator.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CachingFigureGenerator',
    interfaces: [FigureGenerator]
  };
  function State() {
  }
  State.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'State',
    interfaces: []
  };
  function Context() {
    this.state_0 = null;
  }
  Context.prototype.setState_twsw7m$ = function (newState) {
    var tmp$, tmp$_0;
    (tmp$ = this.state_0) != null ? (tmp$.detach(), Unit) : null;
    this.state_0 = newState;
    (tmp$_0 = this.state_0) != null ? (tmp$_0.attach(), Unit) : null;
  };
  Context.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Context',
    interfaces: []
  };
  function StateImpl(context) {
    this.context = context;
  }
  StateImpl.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StateImpl',
    interfaces: [State]
  };
  function MenuState(context) {
    StateImpl.call(this, context);
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    this.menu_0 = Kotlin.isType(tmp$ = document.getElementById('menu'), HTMLElement) ? tmp$ : throwCCE();
    this.startButton_0 = Kotlin.isType(tmp$_0 = document.getElementById('startButton'), HTMLInputElement) ? tmp$_0 : throwCCE();
    this.menuStats_0 = Kotlin.isType(tmp$_1 = document.getElementById('menuStats'), HTMLElement) ? tmp$_1 : throwCCE();
    this.menuScore_0 = Kotlin.isType(tmp$_2 = document.getElementById('menuScore'), HTMLElement) ? tmp$_2 : throwCCE();
    this.menuLevel_0 = Kotlin.isType(tmp$_3 = document.getElementById('menuLevel'), HTMLElement) ? tmp$_3 : throwCCE();
    println('here');
    this.startButton_0.onclick = MenuState_init$lambda(context, this);
  }
  MenuState.prototype.setStats_vux9f0$ = function (score, level) {
    this.menuStats_0.style.display = 'flex';
    this.menuScore_0.innerHTML = 'Score: ' + score;
    this.menuLevel_0.innerHTML = 'Level: ' + level;
  };
  MenuState.prototype.attach = function () {
    this.menu_0.style.display = 'flex';
  };
  MenuState.prototype.detach = function () {
    this.menu_0.style.display = 'none';
  };
  function MenuState_init$lambda(closure$context, this$MenuState) {
    return function (it) {
      println('here2');
      closure$context.setState_twsw7m$(new GameState(closure$context, this$MenuState));
      return Unit;
    };
  }
  MenuState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MenuState',
    interfaces: [StateImpl]
  };
  function GameState(context, menuState) {
    StateImpl.call(this, context);
    this.menuState_0 = menuState;
    this.cacheSize_0 = 4;
    this.fieldDimensions_0 = new FieldDimensions(20, 10);
    this.nextFigureDimensions_0 = new FieldDimensions(5, 5);
    var tmp$, tmp$_0, tmp$_1;
    this.gameContainer_0 = Kotlin.isType(tmp$ = document.getElementById('gameContainer'), HTMLElement) ? tmp$ : throwCCE();
    this.fieldHelper_0 = new CanvasHelper('fieldCanvas');
    var $receiver = toList(new IntRange(1, this.cacheSize_0));
    var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
    var tmp$_2;
    tmp$_2 = $receiver.iterator();
    while (tmp$_2.hasNext()) {
      var item = tmp$_2.next();
      destination.add_11rb$(new CanvasHelper('nextCanvas' + item));
    }
    this.nextHelpers_0 = destination;
    this.scoreText_0 = Kotlin.isType(tmp$_0 = document.getElementById('score'), HTMLElement) ? tmp$_0 : throwCCE();
    this.levelText_0 = Kotlin.isType(tmp$_1 = document.getElementById('level'), HTMLElement) ? tmp$_1 : throwCCE();
    this.intervalId_0 = 0;
    this.statManager_0 = new StatManager(new GameState$statManager$ObjectLiteral(this));
    this.cachingFigureGenerator_0 = new CachingFigureGenerator(this.cacheSize_0, figures, Random(Kotlin.Long.fromNumber(Date.now())));
    this.gameRunner_0 = new GameRunner(this.fieldDimensions_0, this.cachingFigureGenerator_0, new GameState$gameRunner$ObjectLiteral(this));
    this.running_0 = true;
  }
  GameState.prototype.onResize_0 = function () {
    this.fieldHelper_0.onResize();
    var tmp$;
    tmp$ = this.nextHelpers_0.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.onResize();
    }
  };
  function GameState$draw$lambda(closure$canvasHelper, this$GameState) {
    return function (it) {
      this$GameState.draw_0(closure$canvasHelper);
      return Unit;
    };
  }
  var checkIndexOverflow = Kotlin.kotlin.collections.checkIndexOverflow_za3lpa$;
  GameState.prototype.draw_0 = function (canvasHelper) {
    if (!this.running_0) {
      return;
    }
    window.requestAnimationFrame(GameState$draw$lambda(canvasHelper, this));
    canvasHelper.clearRect();
    drawField(this.gameRunner_0, this.gameRunner_0.fieldDimensions, canvasHelper);
    var $receiver = this.nextHelpers_0;
    var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
    var tmp$, tmp$_0;
    var index = 0;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      var tmp$_1 = destination.add_11rb$;
      var index_0 = checkIndexOverflow((tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0));
      item.clearRect();
      var figure = new Figure(new Cell(2, 2), 0, this.cachingFigureGenerator_0.followingFigure_za3lpa$(index_0));
      drawField(figure, this.nextFigureDimensions_0, item);
      tmp$_1.call(destination, Unit);
    }
  };
  GameState.prototype.handleKeyboardEvent_0 = function (event) {
    switch (event.keyCode) {
      case 37:
        this.gameRunner_0.moveLeft();
        break;
      case 38:
        this.gameRunner_0.nextVariant();
        break;
      case 39:
        this.gameRunner_0.moveRight();
        break;
      case 40:
        this.gameRunner_0.moveDown();
        break;
    }
  };
  GameState.prototype.gameOver_0 = function () {
    this.running_0 = false;
    this.menuState_0.setStats_vux9f0$(this.statManager_0.getScore(), this.statManager_0.getLevel());
    this.context.setState_twsw7m$(this.menuState_0);
  };
  function GameState$attach$lambda(this$GameState) {
    return function (it) {
      this$GameState.onResize_0();
      return Unit;
    };
  }
  function GameState$attach$lambda_0(this$GameState) {
    return function (it) {
      this$GameState.draw_0(this$GameState.fieldHelper_0);
      return Unit;
    };
  }
  function GameState$attach$lambda_1(this$GameState) {
    return function (it) {
      this$GameState.handleKeyboardEvent_0(it);
      return Unit;
    };
  }
  GameState.prototype.attach = function () {
    this.running_0 = true;
    this.gameContainer_0.style.display = 'flex';
    this.onResize_0();
    window.onresize = GameState$attach$lambda(this);
    this.statManager_0.initStat();
    window.requestAnimationFrame(GameState$attach$lambda_0(this));
    document.onkeydown = GameState$attach$lambda_1(this);
  };
  GameState.prototype.detach = function () {
    window.clearInterval(this.intervalId_0);
    document.onkeydown = null;
    window.onresize = null;
    this.running_0 = false;
    this.gameContainer_0.style.display = 'none';
  };
  function GameState$statManager$ObjectLiteral(this$GameState) {
    this.this$GameState = this$GameState;
  }
  GameState$statManager$ObjectLiteral.prototype.scoreChanged_za3lpa$ = function (score) {
    this.this$GameState.scoreText_0.innerHTML = score.toString();
  };
  GameState$statManager$ObjectLiteral.prototype.levelChanged_za3lpa$ = function (level) {
    this.this$GameState.levelText_0.innerHTML = level.toString();
    window.clearInterval(this.this$GameState.intervalId_0);
    var $receiver = 3 / (2.0 + level);
    var x = 2.0 / 3;
    var interval = 1000 * Math_0.pow($receiver, x);
    this.this$GameState.intervalId_0 = window.setInterval(getCallableRef('moveDown', function ($receiver) {
      return $receiver.moveDown(), Unit;
    }.bind(null, this.this$GameState.gameRunner_0)), numberToInt(interval));
    println('initInterval ' + interval);
  };
  GameState$statManager$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [StatChangeListener]
  };
  function GameState$gameRunner$ObjectLiteral(this$GameState) {
    this.this$GameState = this$GameState;
  }
  GameState$gameRunner$ObjectLiteral.prototype.linesCleared_za3lpa$ = function (lineN) {
    this.this$GameState.statManager_0.linesCleared_za3lpa$(lineN);
  };
  GameState$gameRunner$ObjectLiteral.prototype.gameOver = function () {
    this.this$GameState.gameOver_0();
  };
  GameState$gameRunner$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [GameEventListener]
  };
  GameState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameState',
    interfaces: [StateImpl]
  };
  function main() {
    var context = new Context();
    context.setState_twsw7m$(new MenuState(context));
  }
  _.FieldDimensions = FieldDimensions;
  _.Cell = Cell;
  _.CellSet = CellSet;
  _.HasFieldDimensions = HasFieldDimensions;
  _.Field = Field;
  _.FigureDescription = FigureDescription;
  _.Figure = Figure;
  _.makeDescription_lr80ll$ = makeDescription;
  _.mirror_dl7k2g$ = mirror;
  _.FigureGenerator = FigureGenerator;
  _.GameEventListener = GameEventListener;
  _.GameRunner = GameRunner;
  Object.defineProperty(_, 'figureLine', {
    get: function () {
      return figureLine;
    }
  });
  Object.defineProperty(_, 'figureSquare', {
    get: function () {
      return figureSquare;
    }
  });
  Object.defineProperty(_, 'figureL1', {
    get: function () {
      return figureL1;
    }
  });
  Object.defineProperty(_, 'figureL2', {
    get: function () {
      return figureL2;
    }
  });
  Object.defineProperty(_, 'figureZ1', {
    get: function () {
      return figureZ1;
    }
  });
  Object.defineProperty(_, 'figureZ2', {
    get: function () {
      return figureZ2;
    }
  });
  Object.defineProperty(_, 'figureT', {
    get: function () {
      return figureT;
    }
  });
  Object.defineProperty(_, 'figures', {
    get: function () {
      return figures;
    }
  });
  _.CanvasHelper = CanvasHelper;
  _.StatChangeListener = StatChangeListener;
  _.StatManager = StatManager;
  _.drawField_rj53nt$ = drawField;
  _.CachingFigureGenerator = CachingFigureGenerator;
  _.State = State;
  _.Context = Context;
  _.StateImpl = StateImpl;
  _.MenuState = MenuState;
  _.GameState = GameState;
  _.main = main;
  Field.prototype.intersects_wj7g5c$ = CellSet.prototype.intersects_wj7g5c$;
  Field.prototype.inside_jtq4w7$ = CellSet.prototype.inside_jtq4w7$;
  Figure.prototype.intersects_wj7g5c$ = CellSet.prototype.intersects_wj7g5c$;
  Figure.prototype.inside_jtq4w7$ = CellSet.prototype.inside_jtq4w7$;
  GameRunner.prototype.intersects_wj7g5c$ = CellSet.prototype.intersects_wj7g5c$;
  GameRunner.prototype.inside_jtq4w7$ = CellSet.prototype.inside_jtq4w7$;
  figureLine = makeDescription([new Cell(-2, 0), new Cell(-1, 0), new Cell(0, 0), new Cell(1, 0)]);
  figureSquare = makeDescription([new Cell(-1, -1), new Cell(-1, 0), new Cell(0, -1), new Cell(0, 0)]);
  figureL1 = makeDescription([new Cell(-1, 0), new Cell(0, 0), new Cell(1, 0), new Cell(1, 1)]);
  figureL2 = mirror(figureL1);
  figureZ1 = makeDescription([new Cell(0, -1), new Cell(0, 0), new Cell(-1, 0), new Cell(-1, 1)]);
  figureZ2 = mirror(figureZ1);
  figureT = makeDescription([new Cell(0, -1), new Cell(0, 0), new Cell(0, 1), new Cell(1, 0)]);
  figures = listOf([figureLine, figureSquare, figureL1, figureL2, figureZ1, figureZ2, figureT]);
  main();
  Kotlin.defineModule('untitled', _);
  return _;
}(typeof untitled === 'undefined' ? {} : untitled, kotlin);
