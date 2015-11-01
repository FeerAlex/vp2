/* ----------------plugins---------------- */

var
	gulp        = require('gulp'),
	compass     = require('gulp-compass'),
	jade        = require('gulp-jade'),
	browserSync = require('browser-sync'),
	plumber     = require('gulp-plumber');

/* ----------------paths---------------- */

var
	paths = {
		jade : {
			location    : 'app/jade_pages/**/*.jade',
			compiled    : 'app/jade_pages/_pages/*.jade',
			destination : 'app/'
		},

		scss : {
			location    : 'app/style/scss/**/*.scss',
			entryPoint  : 'app/style/css/**/*.css'
		},

		compass : {
			configFile  : 'config.rb',
			cssFolder   : 'app/style/css',
			scssFolder  : 'app/style/scss',
			imgFolder   : 'app/img'
		},

		// js : {
		// 	location    : 'app/js/main.js',
		// 	plugins     : 'app/js/_plugins/*.js',
		// 	destination : 'js'
		// },

		browserSync : {
			baseDir : 'app/',
			watchPaths : ['app/*.html', 'app/style/css/*.css', 'app/js/*.js']
		}
	}

/* --------- jade --------- */

gulp.task('jade', function() {
	gulp.src(paths.jade.compiled)
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest(paths.jade.destination));
});

/* --------- scss-compass --------- */

gulp.task('compass', function() {
	gulp.src(paths.scss.location)
		.pipe(plumber())
		.pipe(compass({
			config_file: paths.compass.configFile,
			css: paths.compass.cssFolder,
			sass: paths.compass.scssFolder,
			image: paths.compass.imgFolder
		}));
});

/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync({
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- watch --------- */

gulp.task('watch', function() {
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['compass']);
	
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['jade', 'compass', 'sync', 'watch']);