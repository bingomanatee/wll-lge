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
    'image': 'neograss-sm.png'
  },
  frames: {}
};


let count = 0;

const SPRITE_WIDTH = 160;
const SPRITE_HEIGHT = 80;

const tuftX = (n) => Math.ceil(n * SPRITE_WIDTH);
const tuftY = (n) => Math.ceil(n * SPRITE_HEIGHT);

for (let r = 0; r < 8; ++r) {
  for (let c = 0; c < 8; ++c) {
    let id = `tuft-${count}`;
    let h = SPRITE_HEIGHT;
    if (r % 0) {
      h += 1;
    }
    let data = {
      'frame': {
        x: tuftX(c),
        y: tuftY(r),
        w: tuftX(1),
        h: tuftY(1),
      },
      rotated: false,
      trimmed: false,
      sourceSize: {w: SPRITE_WIDTH, h: SPRITE_HEIGHT}
    };
    out.frames[id] = data;
    ++count;
  }
}

fs.writeFileSync(__dirname + '/neograss-sm.spritesheet.json', JSON.stringify(out));
