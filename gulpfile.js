const gulp = require('gulp');
const rollup = require('rollup');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');


function minify() {
    return gulp.src('./dist/svganimation.js')
        .pipe(uglify())
        .pipe(rename('svganimation.min.js'))
        .pipe(gulp.dest('./dist/'));
}

async function bundle() {
    const bund = await rollup.rollup({
        input: './src/js/index.js',
    });
    await bund.write({
        file: './dist/svganimation.js',
        format: 'umd',
        name: 'SVGAnimationPlayer',
        sourcemap: true,
    });
}


gulp.task('build', () => {
    gulp.watch('src/js/**/*.js', bundle);
});

const dist = gulp.series(bundle, minify);
gulp.task('dist', dist);
