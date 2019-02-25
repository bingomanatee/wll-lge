import _ from 'lodash';
import {Fsm} from 'machina';
import Backgrounder from './Backgrounder';

var addEvent = function (object, type, callback) {
  if (object == null || typeof (object) === 'undefined') {
    return;
  }
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  }
  else if (object.attachEvent) {
    object.attachEvent('on' + type, callback);
  }
  else {
    object['on' + type] = callback;
  }
};

class Monitor {

  constructor() {
    console.log('new monitor');
    const self = this;
    this.timer = new PIXI.Ticker({minFPS: 20});
    this.timer.start();
    this.timer.add((delta) => {
      if (this.background && this.background.started) {
        this.background.update(delta);
      }
    });
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
            /*  if (self.background) { // should not ever happen
                self.background.kill();
                self.background = null;
              }*/
            // in any event, no transition necessary
          },
          _start: function () {
            this.transition('BG_STARTING');
          }
        }, // ----- END BG_NONE
        BG_STARTING: {
          _onEnter: function () {
            if (!self.background) {
              console.log('new background');
              self.background = new Backgrounder(self, this);
            }
            else {
              self.background.start();
            }
            this.transition('BG_STARTED');
          },
          _stop: 'BG_STOPPING'
        }, // ----- END BG_STARTING
        BG_STARTED: {
          _stop: 'BG_STOPPING',
          _onEnter: function () {
            if (self.background && (!self.background.started)) {
              self.background.start();
            }
          },
          _resize: function () {
            if (self.background) {
              self.background.resize();
            }
          },
          _end: function () {
            this.transition('BG_STOPPING');
            this.transition('BG_STOPPED');
            this.transition('BG_NONE');
          }
        }, // ----- END BG_STARTED
        BG_STOPPING: {
          _onEnter: function () {
            if (self.background && self.background.started) {
              self.background.stop();
            }
            this.transition('BG_STOPPED');
          },
          _start: 'BG_STARTING',
        }, // ----- END BG_STOPPING
        BG_STOPPED: {
          _resize: function () {
            if (self.background) {
              self.background.resize();
            }
          },
          _start: 'BG_STARTING',
          _end: 'BG_NONE'
        }, // ----- END BG_STOPPED
      }// ------ end states
      ,
      start: function () {
        this.handle('_start');
      },
      stop: function () {
        console.log('stopping if status ', this.status);
        switch (this.status) {
        case 'BG_STARTED':
          this.handle('_stop');
          break;

        default:
          console.log('no change');
        }
      },
      end: function () {
        this.handle('_end');
      },
      resize: function () {
        this.handle('_resize');
      }
    });

    addEvent(window, 'resize', _.debounce(() => this.status.resize(), 500));

    this.status.on('transition', ({fromState, toState}) => {
      console.log('monitor transition: ', fromState, '...', toState);
    });
    this.status.start();
  }
}

export default Monitor;
