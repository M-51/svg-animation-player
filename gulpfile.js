const gulp = require('gulp');
const rollup = require('rollup');
const rename = require('gulp-rename');
const terser = require('gulp-terser');


function minify() {
    return gulp.src('./dist/svganimationplayer.js')
        .pipe(terser())
        .pipe(rename('svganimationplayer.min.js'))
        .pipe(gulp.dest('./dist/'));
}

async function bundle() {
    const bund = await rollup.rollup({
        input: './src/js/index.js',
    });
    await bund.write({
        file: './dist/svganimationplayer.js',
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
