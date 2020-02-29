var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var fancy_log = require('fancy-log');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var paths = {
    pages: ['src/*.html']
};

gulp.task('sass', function(){
    return gulp.src('src/style.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist'))
});

gulp.task('css',function(){
    return gulp.src('./dist/*.css')
    .pipe(uglifycss({
        "uglyComments":true
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

function bundle() {
    return watchedBrowserify
        .bundle()
        .on('error', fancy_log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}

gulp.task('default',gulp.series(gulp.parallel(['copy-html','sass']),gulp.parallel(['css']),bundle,(done) => {
    
    gulp.watch('./src/index.html',gulp.series('copy-html'))
    gulp.watch('./src/style.scss',gulp.series('sass','css'));
    gulp.watch('./src/*.ts',gulp.series(bundle));

    done();
}));

/*var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .on('error', fancy_log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}

gulp.task('default', gulp.series(gulp.parallel(['copy-html','sass']), bundle)); // gulp.watch('./src/*.scss',gulp.series("sass"))
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);*/