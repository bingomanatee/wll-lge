const gulp = require('gulp');
const path = require('path');
const minimist = require('minimist');
const _ = require('lodash');

const {validator} = require('@wonderlandlabs/inspector');
const rename = require('gulp-rename');
const modify = require('gulp-modify-file');

const template = folder => path.resolve(__dirname, 'templates', `${folder}/**/*`);

const containerNameValidator = validator('string', {required: true});

gulp.task('component', () => {
  const { name } = minimist(process.argv.slice(2));
  const cName = _.upperFirst(name);
  const lcName = _.lowerFirst(name);
  const err = containerNameValidator(name);
  if (err) throw new Error(err);

  const source = template('component');
  const dest = `./src/components/${cName}`;
  console.log(`============== writing component ${name} from ${source} to ${dest}`);
  try {
    return gulp.src(source)
      .pipe(rename((file) => {
        // eslint-disable-next-line no-param-reassign
        file.basename = file.basename.replace(/^ComponentName/, `${cName}`);
        return file;
      }))
      .pipe(modify(text => text.replace(/ComponentName/g, cName)
        .replace(/componentName/g, lcName)))
      .pipe(gulp.dest(dest));
  } catch (err) {
    console.log('error: ', err);
  }
});
