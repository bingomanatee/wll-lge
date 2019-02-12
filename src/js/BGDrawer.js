/* @global PIXI */
import _ from 'lodash';
import c from 'chroma-js';

const LIGHT_GREEN = c.mix('green', 'yellow', 0.333).desaturate(1).brighten(1);
const DARK_GREEN = c.mix('green', 'yellow', 0.5).desaturate(3).darken(1);
console.log('LIGHT GREEN', LIGHT_GREEN);

function lerp(n) {
  return c.mix(DARK_GREEN, LIGHT_GREEN, n).num();
}

const heights = {
  ball: 60,
  carnoplant: 300,
  mushroom: 300,
  rat: 200,
  snake: 232,
  flower: 300
};

const SINS = 300;
const UNIT = 64;
const MARGIN_Y = 2 * UNIT;
let MARGIN_X = 100;
const SCALE = 1.5;
const X_SPACING = SCALE * UNIT/3;
const Y_SPACING= SCALE/2 * UNIT/3;
const LIMIT = 50;
const DARK_GREY = c(150,150,150).num();
const GREY = c(200,200,200).num();
const LIGHT_GREY = c(225,225,225).num();
const startTint = () => c(_.shuffle([DARK_GREY, GREY, LIGHT_GREY]).pop());
const RADIUS = 10;

export default class BGDrawer {

  constructor(size, parent) {
    this.time = 0;
    this.size = size;
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add((delta) => this.redraw(delta));
    this.ticker.start();
    this.sins = _.range(0, SINS + 1).map(n => Math.sin(Math.PI * n / 10));
    console.log('BGdrawer started');
    this.app = new PIXI.Application({
      ...size,
      transparent: true
    });
    parent.appendChild(this.app.view);
    this.parent = parent;

    if (PIXI.loader.resources['images/merged-spritesheet.json']) {
      this.init();
    }
    else {
      PIXI.loader.add('images/merged-spritesheet.json')
        .load(() => {
          this.init();
        });
    }
  }


  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
    MARGIN_X = value.width;
    console.log('MARGIN_X:', MARGIN_X);
  }

  mouseMove(x, y) {
    return;
    if(!(this.tufts && this.tufts.length)) return;
    x = (x - this.midX) * 1.5 + this.midX;

    let xRadius = RADIUS * X_SPACING;
    let yRadius = RADIUS * Y_SPACING;

    let minX = x - xRadius;
    let maxX = x + xRadius;
    let minY = y - yRadius;
    let maxY = y + yRadius;

    let tufts = this.tufts.filter(tuft => tuft._drawPos.x >= minX && tuft._drawPos.x <= maxX && tuft._drawPos.y >= minY && tuft._drawPos.y <= maxY);
    tufts = _.shuffle(tufts);

    tufts.forEach(t => {
      let oldColor = t.tint ? t.tint : LIGHT_GREY;
      t.oldColor = oldColor;
      let newColor = c(oldColor);
      let distanceX = Math.abs(t._drawPos.x - x) / X_SPACING;
      let distanceY = Math.abs(t._drawPos.y - y) / Y_SPACING;
      let distance = 1/(distanceX + distanceY);
      newColor = newColor.brighten(distance);
      t.tint = newColor.num();
    });
    this.app.render();
  }

  init() {
    this.sheet = PIXI.loader.resources['images/merged-spritesheet.json'].spritesheet;
    this.started = true;
    this.app.stage.removeChildren();
    this.tufts = [];

    _.range(0 - MARGIN_Y, this._size.height + MARGIN_Y, Y_SPACING).forEach(
      (y) => {
        _.range(0 - MARGIN_X, this._size.width + MARGIN_X, X_SPACING * this.scaleAtY(y))
          .forEach((x) => this.addTuft(x, y));
        this.root.sortChildren();
        this.app.render();
      }
    );
    this.root.sortChildren();
    this.app.render();
    this.si = setInterval(() => {
      if (!this.stopped) this.app.render();
      else clearInterval(this.si);
    }, 2000);
  }

  draw(delta) {
    return;
    this.time = (this.time + delta) % SINS;
    _.shuffle(this.tufts).slice(0, LIMIT).forEach((tuft) => tuft.tint = DARK_GREY);
    _.shuffle(this.tufts).slice(0, LIMIT/10).forEach((tuft) => tuft.tint = LIGHT_GREY);
    this.app.render();
  }

  tintFor(y, type){
    const d1 = ( y)/this.size.height;
    const d2 = Math.abs(Math.sin((y * 150)/this.size.height));
    let darkness = _.clamp((d1 +d2)/2, 1);
    const ch = _.clamp( Math.floor(256 * darkness), 0, 255);
    const ch2 = _.clamp(Math.floor(51 * darkness), 0, 255);
    let color = c.mix(c(ch, ch, ch2), startTint(), 0.25);
    if (type !== 'tuft') color = c.mix(color, 'white');
    return color.num();
  }

  scaleAtY(y){
    if (!this._size.scaleAtY) {
      this._size.scaleAtY = _.memoize( (y) =>(1 + 2 * y/this._size.height)/3);
    }
    return this._size.scaleAtY(y);
  }

  xAtY(x, y, scale){
    if (!scale) scale = this.scaleAtY(y);
    let relX = x - this.midX;
    return this.midX + relX * scale;
  }

  get midX() {
    if (!this._size.midX) {
      this._size.midX = this._size.width/2;
    }
    return this._size.midX;
  }

  addTuft(x, y) {
    let type = 'tuft';
    let sprite = new PIXI.Sprite(this.sheet.textures['tuft-' + _.random(6)]);
    if (Math.random() > 0.9975) {
      type = _(['mushroom', 'rat', 'ball', 'snake', 'flower', 'carnoplant', 'flower']).shuffle().first();
      sprite = new PIXI.Sprite(this.sheet.textures[type]);
    }
    const relScale =  this.scaleAtY(y);
    sprite.scale = {x: relScale, y: relScale};
    if (type !== 'tuft' && type !== 'ball' && Math.random() > 0.5) sprite.scale.x *= -1;
    let typeScale = 1;
    switch (type) {
    case 'mushroom':
      typeScale = 2;
      break;

    case 'carnoplant':
      typeScale = 1.5;
      break;
    }

    sprite.scale.x *= typeScale;
    sprite.scale.y *= typeScale;

    if (type === 'ball') sprite.rotation = Math.PI * Math.random() * 2;
    sprite.x = this.xAtY(x + _.random(X_SPACING), y, relScale);
    sprite.tint = this.tintFor(y, type);
    sprite.zIndex =x + 1000 * y;
    if (type !== 'tuft') y -= (heights[type]/2) * relScale;
    sprite.y = y + _.random(Y_SPACING * 2);
    if (!this.root){
      this.root = new PIXI.Container({transparent: true, sortableChildren: true});
      this.app.stage.addChild(this.root);
    }
    sprite._drawPos = {x, y};
    this.tufts.push(sprite);
    this.root.addChild(sprite);
  }

  stop() {
    this.stopped = true;
    this.parent.innerHTML = '';
    this.ticker.stop();
  }

  redraw(delta) {
    if (!this.lastRedrawDelta) {
      this.lastRedrawDelta = delta;
    }
    if (!this.started) {
      return;
    }
    if (this.stopped) {
      console.log('stopped');
      return;
    }
    this.draw(delta);
  }

  wave(x, n) {
    let index = Math.floor(this.time + x);
    let w = this.sins[index % SINS];
    let w2 = 0;
    this.sins[n / 10 % SINS];
    return Math.floor((w + w2) * 20);
  }

  addHump(n) {
    const points = _(_.range(0, this._size.width, 5))
      .map((x) => [x, this.wave(x, n) + (this._size.height * 3 / 4 + -0.25 * this._size.height * Math.sin(Math.PI * x / this._size.width))])
      .flatten()
      .value();

    const lastY = _.last(points);
    points.push(this._size.width, lastY, this._size.width, this._size.height, 0, this._size.height);

    let poly = new PIXI.Graphics()
      .beginFill(lerp(n))
      .drawPolygon(...points);

    poly.scale = {x: 1, y: Math.sqrt(1 + 2 * n)};

    this.app.stage.addChild(poly);
  }

}
