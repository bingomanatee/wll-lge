const fs = require('fs');
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
    'image': 'tufts-2-1@half.png'
  },
  frames: {}
};


let count = 0;
const UNIT = 64;
// const S_WIDTH = 519;
// const S_HEIGHT = 389;
const S_WIDTH = 260;
const S_HEIGHT = 195;

for (let r = 0; r < 3; ++r) {
  for (let c = 0; c < 2; ++c) {
    let id = `tuft-${count}`;
    let data = {
      'frame': {
        x: c * UNIT,
        y: r * UNIT,
        w: UNIT * 2,
        h: UNIT,
        r,
        c
      },
      rotated: false,
      trimmed: false,
      sourceSize: {w: S_WIDTH, h: S_HEIGHT}
    };
    out.frames[id] = data;
    ++count;
  }
}

fs.writeFileSync(__dirname + '/tufts-2-1.spritesheet.json', JSON.stringify(out));
