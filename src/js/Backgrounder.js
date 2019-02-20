import _ from 'lodash';
import c from 'chroma-js';
import {Chess} from 'chess.js';

function getGame() {
  var chess = new Chess();
  let boards = [];
  while (!chess.game_over()) {
    boards.push(chess.fen());
    var moves = chess.moves();
    var move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
  }
  boards.push(chess.fen());
  return _.uniq(boards);
}

const pieceMap = new Map([
  ['p', 'black_pawn'],
  ['P', 'white_pawn'],
  ['k', 'black_king'],
  ['K', 'white_king'],
  ['black', 'black_bishop'],
  ['BLACK', 'white_bishop'],
  ['n', 'black_horse'],
  ['N', 'white_horse'],
  ['q', 'black_queen'],
  ['Q', 'white_queen'],
  ['1', [false]],
  ['2', [false, false]],
  ['3', [false, false, false]],
  ['4', [false, false, false, false]],
  ['5', [false, false, false, false, false]],
  ['6', [false, false, false, false, false, false]],
  ['7', [false, false, false, false, false, false, false]],
  ['8', [false, false, false, false, false, false, false, false]],
]);

function rowToPieces(row) {
  const pieces = row.split('').map(key => {
    return pieceMap.get(key);
  });
  return _.flattenDeep(pieces);
}

function moveToPieces(move) {
  return move.split('/').map(rowToPieces);
}

const WHITE = c(255, 255, 255).num();
const BLACK = c(0, 0, 0).num();
const SQUARE1 = c(102, 102, 102).num();
const SQUARE2 = c(204, 204, 204).num();
const TIME_MAX = 8000;

class Backgrounder {
  constructor(monitor, fsm) {
    this.monitor = monitor;
    this.fsm = fsm;
    console.log('new background');
    this.cycle = 0;
    monitor.timer.add((time) => this.update(time));
  }

  start() {
    console.log('Backgrounder.start', this.fsm.state);
    this.game = getGame();
    this.gameTimer = setInterval(() => this.move(), 500);
    let container = document.getElementById('site-background');
    container.innerHTML = ''; // wipe out any old canvas -- should be done in stop but just in case.
    this.app = new PIXI.Application({
      autoResize: true,
      resolution: devicePixelRatio
    });
    container.appendChild(this.app.view);
    this.o = new PIXI.Container();
    this.o.position.set(this.relX(0.5), this.relY(0.5));
    this.board = new PIXI.Container();
    this.o.addChild(this.board);
    this.pieces = new PIXI.Container();
    this.o.addChild(this.pieces);
    const blur = new PIXI.filters.BlurFilter();
    this.o.filters = [blur];
    this.app.stage.addChild(this.o);
    this.resize();
    this.draw();
  }

  setSize(x, y) {
    this._size = {width: x, height: y};
    this.sizes = [x, y];
    this.xy = {x, y};
    console.log('--- resizing to ', x, y);
    this.app.renderer.resize(x, y);
    this.o.position.set(this.relX(0.5), this.relY(0.5));
  }

  update(time) {
    this.cycle += time;
    this.cycle %= TIME_MAX;
    this.o.scale.set(this.scale, this.scale);
    let blurrer = new PIXI.filters.BlurFilter();
    const blur = 10 - 6 * this.scale;
    blurrer.blur = blur;
    this.o.filters = [blurrer];
    this.o.angle = this.rotAngle;
    if (this.pieces) this.pieces.children.forEach(p => p.angle = -this.rotAngle)
  }

  get rotAngle() {
    let a = (this.cycle * 4) % TIME_MAX;
    a *= 360 / TIME_MAX;
    return a;
  }

  get scale() {
    let scaleAngle = this.cycle % TIME_MAX;
    scaleAngle *= Math.PI * 2 / TIME_MAX;

    let sin = Math.sin(scaleAngle);

    return 1 + sin / 2;
  }

  get size() {
    return this._size || {width: 0, height: 0};
  }

  resize() {
    let container = document.getElementById('site-background');
    this.setSize(container.clientWidth, container.clientHeight);
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  stop() {
    console.log('Backgrounder.stop', this.fsm.state);
  }

  kill() {
    console.log('Backgrounder.kill', this.fsm.state);
    this.stop();
  }

  get width() {
    return this.size.width;
  }

  get height() {
    return this.size.height;
  }

  oX(x, clamp = true) {
    let dX = this.width * x;
    return clamp ? _.clamp(dX, this.width / -2, this.width / 2) : dX;
  }

  oY(x, clamp = true) {
    let dX = this.height * x;
    return clamp ? _.clamp(dX, this.height / -2, this.height / 2) : dX;
  }

  relX(x, clamp = true) {
    let dX = this.width * x;
    return clamp ? _.clamp(dX, 0, this.width) : dX;
  }

  relY(y, clamp = true) {
    let dY = this.height * y;
    return clamp ? _.clamp(dY, 0, this.height) : dY;
  }

  get squareSize() {
    return Math.max(this.width, this.height) / 8;
  }

  drawBoard() {
    const ss = this.squareSize;
    this.board.removeChildren();

    let g = new PIXI.Graphics();
    let isWhite = true;
    for (let i = -4; i < 4; ++i) {
      for (let j = -4; j < 4; ++j) {
        let color = ((j + 200) % 2 === (i + 200) % 2) ? SQUARE1 : SQUARE2;
        isWhite = !isWhite;
        g.beginFill(color);
        g.drawRect(i * ss, j * ss, ss, ss);
        g.endFill();
        // console.log('drawing ', i, j, 'color: ', color);
        g.lineStyle(1, c(255, 0, 0));
        g.drawRect(i * ss, j * ss, ss, ss);
        g.lineStyle(0);
      }
    }

    this.board.addChild(g);
  }

  move() {
    if (!this.game) {
      return;
    }
    let nextMove = this.game.shift();
    this.game.push(nextMove);
    let pieces = moveToPieces(nextMove);
    const ss = this.squareSize;

    this.pieces.removeChildren();

    pieces.forEach((row, r) => {
      row.forEach((name, c) => {
        if (name) {
          const sprite = PIXI.Sprite.from('images/pieces/' + name + '.png');
          let i = r - 3.5;
          let j = c - 3.5;
          sprite.anchor.set(0.5);
          sprite.scale.set(ss/200 * this.scale);
          sprite.position.set(i * ss, j * ss);
          this.pieces.addChild(sprite);
        }
      });
    });
  }

  draw() {
    this.drawBoard();
  }
}

export default Backgrounder;