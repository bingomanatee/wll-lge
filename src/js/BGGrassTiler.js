/* @global PIXI */
import _ from 'lodash';
import c from 'chroma-js';

const SPRITE_WIDTH = 320;
const SPRITE_HEIGHT = 160;

const ROWS = 4;
const COLS = 2;
const FIELD_SHEET = 'images/field.spritesheet.json';

const SHROOM = 'images/shroom.png';
const MAX_SHROOM_HEIGHT = 200;
const SPRITE_SHROOM_HEIGHT = 921;
const SPRITE_SRHOOM_WIDTH = 788;
const BASE_SCALE = MAX_SHROOM_HEIGHT / SPRITE_SHROOM_HEIGHT;

const MOVE_RATE = 0.5;

const randTint = (scale = null) => {
  let max = 256;
  if (scale !== null) {
    max *= scale;
  }
  let min = Math.max(25, max * 3 / 4);
  max = Math.floor(max);
  min = _.clamp(Math.floor(min), 128, 256);
  return c(_.random(min, max), _.random(min, max), _.random(min, max)).num();
};

let id = 0;

export default class BGGrassTiler {

  constructor(size, parent) {
    this.id = ++id;
    this.time = 0;
    this.size = size;
    this.ticker = new PIXI.ticker.Ticker();
    this.boundUpdate = this.update.bind(this);
/*    this.ticker.add(this.boundUpdate);
    this.ticker.maxFPS = 12;
    this.ticker.start();*/
    // eslint-disable-next-line no-console
    console.log('BGdrawer started for size:', size);

    this.app = new PIXI.Application({
      ...size,
      transparent: true
    });
    parent.appendChild(this.app.view);

    this.tufts = [];
    this.grasses = new PIXI.Container();
    this.grasses.x = -500;
    this.app.stage.addChild(this.grasses);

    this.shrooms = new PIXI.Container();
    this.app.stage.addChild(this.shrooms);

    this.parent = parent;

    if (PIXI.loader.resources[FIELD_SHEET]) {
      this.drawGrass();
    } else {
      PIXI.loader.add(FIELD_SHEET)
        .load(() => {
          this.drawGrass();
        });
    }
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  mouseMove(x, y) {
    return;
    this.app.render();
  }

  drawGrass() {
    this.sheet = PIXI.loader.resources[FIELD_SHEET].spritesheet;
    this.grasses.removeChildren();
    console.log('drawing grasses in ', this.size);
    for (let column = -1; column <= ((500 + this.size.width) / SPRITE_WIDTH); column += 1) {
      for (let row = -1; row <= 2 * this.size.height / SPRITE_HEIGHT; ++row) {
        let x = column * SPRITE_WIDTH;
        if (row % 2 === 0) {
          x -= SPRITE_WIDTH / 2;
        }
        this.addTuft(x, row * SPRITE_HEIGHT / 1.5, column, row);
      }
    }

    this.app.render();

    if (PIXI.loader.resources[SHROOM]) {
      this.drawShrooms();
    } else {
      PIXI.loader.add(SHROOM)
        .load(() => {
          this.drawShrooms();
        });
    }
  }

  addTuft(x, y, i, j) {
    const n = _.random(ROWS * COLS - 1);
   // console.log('adding tuft ', n, '(', i, ',', j, ') at (', x, y, ')');
    let sprite = new PIXI.Sprite(this.sheet.textures['field-' + n]);
    // sprite.tint = randTint(Math.sqrt(y / this.size.height));
    Object.assign(sprite, {x, y});
    this.grasses.addChild(sprite);
  }

  drawShroom(x, y) {
    const sprite = PIXI.Sprite.from(SHROOM);
    sprite.anchor.set(0.5, 1);
    const s = (Math.random() * 2 / 3 + 0.3333) * BASE_SCALE;
    sprite.scale = {x: s, y: s};
    Object.assign(sprite, {x, y});
    this.shrooms.addChild(sprite);
  }

  drawShrooms() {
    for (let y = 0;
         y < MAX_SHROOM_HEIGHT + this.size.height;
         y += _.random(MAX_SHROOM_HEIGHT / 10, MAX_SHROOM_HEIGHT / 2)) {
      let x = _.random(MAX_SHROOM_HEIGHT / 2, this.size.height + MAX_SHROOM_HEIGHT / 2);
      this.drawShroom(x, y);
    }
    this.app.render();
    this.started = true;
  }

  stop() {
    this.stopped = true;
    this.parent.innerHTML = '';
    console.log('stopped grass tiler');
    this.ticker.stop();
  }

  update(delta) {
    this.app.render();
    return;
    if (!this.lastRedrawDelta) {
      this.lastRedrawDelta = delta;
    }
    if (!this.started) {
      return;
    }
    if (this.stopped) {
      return;
    }
    if (this.updating) {
      return;
    }
    this.updating = true;
   // console.log('id: ', this.id, 'delta: ', delta, 'grasses: ', this.grasses.children.length);
    this.grasses.children.concat(this.shrooms.children).forEach(tuft => {
      tuft.x += delta * MOVE_RATE;
      if ((tuft.x) > this.size.width + 500) {
        tuft.x -= (this.size.width + 1000);
      }
    });
    this.updating = false;
  }

}
