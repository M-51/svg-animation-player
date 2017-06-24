const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const babili = require('gulp-babili');
const gzip = require('gulp-gzip');
const brotli = require('gulp-brotli');


function bundle() {
    return gulp.src('./src/js/index.js')
        .pipe(sourcemaps.init())
        .pipe(rollup({
            format: 'iife',
        }))
        .pipe(rename('svganimation.js'))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('./dist/js/'));
}

function minify() {
    return gulp.src('./dist/js/svganimation.js')
        .pipe(babili({
            mangle: {
                keepClassName: false,
                keepFnName: false,
            },
        }))
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
