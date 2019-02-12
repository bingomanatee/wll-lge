const gulp = require('gulp');
const path = require('path');
const minimist = require('minimist');
const _ = require('lodash');

const { Validator } = require('class-propper');
const rename = require('gulp-rename');
const modify = require('gulp-modify-file');

const template = folder => path.resolve(__dirname, 'templates', `${folder}/**/*`);

const containerNameValidator = new Validator([
  new Validator('string', 'name must be a string'),
  new Validator(s => s.length < 1, 'name must be nonempty'),
]);

gulp.task('component', () => {
  const { name } = minimist(process.argv.slice(2));
  const cName = _.upperFirst(name);
  const lcName = _.lowerFirst(name);
  const err = containerNameValidator.try(name);
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
