import _ from 'lodash';
import {Fsm} from 'machina';
import c from 'chroma-js';

/*

const BG_NONE = Symbol('BG_NONE');
const BG_STARTED = Symbol('BG_STARTED');
const BG_STARTING = Symbol('BG_STARTING');
const BG_ACTIVE = Symbol('BG_ACTIVVE');
const BG_STOPPING = Symbo('BG_STOPPING');
const BG_STOPPED = Symbol('BG_STOPPED');
*/

const WHITE = c(255, 255, 255).num();
const BLACK = c(0, 0, 0).num();
const SQUARE1 = c(102,102,102).num();
const SQUARE2 = c(204,204,204).num();
const TIME_MAX = 8000;

class Backgrounder {
  constructor(monitor, fsm) {
    this.monitor = monitor;
    this.fsm = fsm;
    console.log('new background');
    this.cycle = 0;
    monitor.timer.add((time) => this.update(time));
  }

  setSize(x, y) {
    this._size = {width: x, height: y};
    this.sizes = [x, y];
    this.xy = {x, y};
  }

  update(time) {
    this.cycle += time;
    this.cycle %= TIME_MAX;
    this.o.scale.set(this.scale, this.scale);
    let blurrer = new PIXI.filters.BlurFilter();
    blurrer.blur = 6 + 5 * this.scale;
    this.o.filters = [blurrer];
    this.o.angle = this.rotAngle;
  }

  get rotAngle() {
    let a = (this.cycle * 4) % TIME_MAX;
     a *= 360/ TIME_MAX;
     return a;
  }

  get scale() {
    let scaleAngle = this.cycle % TIME_MAX;
    scaleAngle *= Math.PI * 2/ TIME_MAX;

    let sin = Math.sin(scaleAngle);

    return 1 + sin/2;
  }

  get size() {
    return this._size || {width: 0, height: 0};
  }

  start() {
    console.log('Backgrounder.start', this.fsm.state);
    let container = document.getElementById('site-background');
    this.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = ''; // wipe out any old canvas -- should be done in stop but just in case.
    this.app = new PIXI.Application(this.size);
    container.appendChild(this.app.view);
    this.o = new PIXI.Container();
    this.o.position.set(this.relX(0.5), this.relY(0.5));
    const blur = new PIXI.filters.BlurFilter();
    this.o.filters = [blur];
    console.log('o position: ', this.o.position);
    this.app.stage.addChild(this.o);
    this.draw();
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

  drawBoard() {
    let g = new PIXI.Graphics();
    let squareSize;
    if (this.width > this.height) {
      squareSize = this.width / 8;
    } else {
      squareSize = this.height / 8;
    }

    let isWhite = true;
    for (let i = -4; i < 4; ++i) {
      for (let j = -4; j < 4; ++j) {
        let color = ((j + 200) % 2 === (i + 200) % 2) ? SQUARE1 : SQUARE2;
        isWhite = !isWhite;
        g.beginFill(color);
        g.drawRect(i * squareSize, j * squareSize, squareSize, squareSize);
        g.endFill();
        console.log('drawing ', i, j, 'color: ', color);
        g.lineStyle(1, c(255, 0, 0));
        g.drawRect(i * squareSize, j * squareSize, squareSize, squareSize);
        g.lineStyle(0);
      }
    }
    this.o.addChild(g);
  }

  draw() {
    this.drawBoard();
  }
}

var addEvent = function (object, type, callback) {
  if (object == null || typeof (object) == 'undefined') {
    return;
  }
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent('on' + type, callback);
  } else {
    object['on' + type] = callback;
  }
};

class Monitor {

  constructor() {
    const self = this;
    this.timer = new PIXI.Ticker();
    this.timer.start();
    this.status = new Fsm({
      namespace: 'monitor',
      initialState: 'BG_NONE',
      states: {
        initialize: {
          namespace: 'monitor',
          '*': function () {
            this.deferUntilTransition();
            this.transition('BG_NONE');
          }
        }, // ------ END INITIALIZE
        BG_NONE: {
          _onEnter: function () {
            if (self.background) {
              self.background.kill();
              self.background = null;
            }
          },
          _stop: function () {
            if (self.background) { // should not ever happen
              self.background.kill();
              self.background = null;
            }
            // in any event, no transition necessary
          },
          _start: function () {
            if (self.background) { // should never happen
              self.background.kill();
              self.background = null;
            }
            this.transition('BG_STARTING');
          }
        }, // ----- END BG_NONE
        BG_STARTING: {
          _onEnter: function () {
            if (!self.background) {
              self.background = new Backgrounder(self, this);
            }
            self.background.start();
            this.transition('BG_STARTED');
          },
          _stop: 'BG_STOPPING'
        }, // ----- END BG_STARTING
        BG_STARTED: {
          _stop: 'BG_STOPPING'
        }, // ----- END BG_STARTED
        BG_STOPPING: {
          _onEnter: function () {
            if (self.background) { // should ALWAYS happen
              self.background.kill();
              self.background = null;
            }
            this.transition('BG_STOPPED');
          }
        }, // ----- END BG_STOPPING
        BG_STOPPED: {
          _onEnter: function () {
            if (self.background) { // should ALWAYS happen
              self.background.kill();
              self.background = null;
            }
            this.transition('BG_NONE');
          }
        }, // ----- END BG_STOPPED
      }// ------ end states
      ,
      start: function () {
        this.handle('_start');
      },
      stop: function () {
        this.handle('_stop');
      }
    });

    const resizeEnd = _.debounce(() => {
      this.status.start();
    }, 500);
    addEvent(window, 'resize', () => {
      this.status.stop();
      resizeEnd();
    });

    this.status.on('transition', ({fromState, toState}) => {
      console.log('monitor transition: ', fromState, '...', toState);
    });
    this.status.start();
  }
}

export default Monitor;
