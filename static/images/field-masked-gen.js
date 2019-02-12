const fs = require('fs');
const _ = require('lodash');
/**
 {
    "frames": {
       "frame-abc.png":
       {
         "frame": {"x":41,"y":2,"w":256,"h":256},
         "rotated": false,
         "trimmed": false,
         "spriteSourceSize": {"x":0,"y":0,"w":256,"h":256},
         "sourceSize": {"w":256,"h":256}
       },
       "someframe":
       {
         "frame": {"x":2,"y":2,"w":37,"h":382},
         "rotated": false,
         "trimmed": false,
         "spriteSourceSize": {"x":0,"y":0,"w":37,"h":382},
         "sourceSize": {"w":37,"h":382}
       }
    }
}
 */

let out = {
  'meta': {
    'image': 'field-masked-blurry.png'
  },
  frames: {}
};


const S_WIDTH = 1280;
const S_HEIGHT = 640;

const ROWS = 4;
const COLS = 2;
const TUFT_WIDTH = S_WIDTH / COLS;
const TUFT_HEIGHT = S_HEIGHT / ROWS;
const tuftX = (n) => Math.floor(n * TUFT_WIDTH);
const tuftY = (n) => Math.floor(n * TUFT_HEIGHT);
const NAME = 'field';

let count = 0;
for (let r = 0; r < ROWS; ++r) {
  for (let c = 0; c < COLS; ++c) {
    let id = `${NAME}-${count}`;

    const y = tuftY(r);
    const x = tuftX(c);
    const w = _.clamp(TUFT_WIDTH, 0, S_WIDTH - x);
    const h = _.clamp(TUFT_HEIGHT, 0, S_HEIGHT - y);

    console.log('---- frame ', id);
    console.log('x:', x, 'x(end):', x + w, '(inside', S_WIDTH, ')');
    console.log('y:', y, 'y(end):', y + h, '(inside', S_HEIGHT, ')');
    let data = {
      'frame': {
        x,
        y,
        w,
        h,
      },
      rotated: false,
      trimmed: false,
      sourceSize: {w: S_WIDTH, h: S_HEIGHT}
    };
    out.frames[id] = data;
    ++count;
  }
}

fs.writeFileSync(__dirname + '/' + NAME + '.spritesheet.json', JSON.stringify(out));
