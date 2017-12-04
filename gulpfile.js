const gulp = require('gulp');
const rollup = require('rollup');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const gzip = require('gulp-gzip');
const brotli = require('gulp-brotli');

async function bundle() {
    const a = await rollup.rollup({
        input: './src/js/index.js',
    });
    await a.write({
        file: './dist/js/svganimation.js',
        format: 'iife',
        name: 'SVGAnimation',
        sourcemap: true,
    });
}

function minify() {
    return gulp.src('./dist/js/svganimation.js')
        .pipe(uglify())
        .pipe(rename('svganimation.min.js'))
        .pipe(gulp.dest('./dist/js/'));
}
function compressGzip() {
    return gulp.src('./dist/js/svganimation.min.js')
        .pipe(gzip({
            gzipOptions: { level: 9 },
        }))
        .pipe(gulp.dest('./dist/js/'));
}

function compressBrotli() {
    return gulp.src('./dist/js/svganimation.min.js')
        .pipe(brotli.compress({
            quality: 11,
        }))
        .pipe(gulp.dest('./dist/js/'));
}


gulp.task('build', () => {
    gulp.watch('src/js/**/*.js', bundle);
});

const dist = gulp.series(bundle, minify, gulp.parallel(compressGzip, compressBrotli));
gulp.task('dist', dist);
