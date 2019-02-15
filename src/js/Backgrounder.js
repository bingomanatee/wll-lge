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

const WHITE = c(255, 255, 255).num();
const BLACK = c(0, 0, 0).num();
const SQUARE1 = c(102, 102, 102).num();
const SQUARE2 = c(204, 204, 204).num();
const WHITE_PAWN = WHITE;
const DARK_PAWN = c(100,100,100).num();
const TIME_MAX = 8000;
const PAWN = 'images/pawn.png';

const coinFlip = () => Math.random() > 0.5;

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
    console.log('o position: ', this.o.position);
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
    const blur =  10 - 6 * this.scale;
    console.log('blur:', Number.parseFloat(blur).toFixed(1));
    blurrer.blur = blur;
    this.o.filters = [blurrer];
    this.o.angle = this.rotAngle;
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
    return Math.max(this.width,this.height) / 8;
  }

  drawBoard(ss) {
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
  drawPieces(ss) {
    this.pieces.removeChildren();
    let isWhite = false;
    const rescale = ss/300;
    for (let i = -3.5; i < 4.5; ++i) {
      for (let j = -3.5; j < 4.5; ++j) {
        if(coinFlip() && coinFlip()) continue;
        isWhite = !isWhite;
        let pawnContainer = new PIXI.Container();
        pawnContainer.position.set(i * ss, j * ss);
        let sprite = PIXI.Sprite.from(PAWN);
        sprite.anchor.set(0.5);
        sprite.tint = coinFlip() ? WHITE_PAWN : DARK_PAWN;
        sprite.scale.set(rescale, rescale);
        pawnContainer.addChild(sprite);
        this.pieces.addChild(pawnContainer);
      }
    }
  }

  draw() {
    this.o.removeChildren();
    const ss = this.squareSize;
    this.drawBoard(ss);
    this.drawPieces(ss);
  }
}

export default Backgrounder;
