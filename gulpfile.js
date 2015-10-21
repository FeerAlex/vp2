/* ----------------plugins---------------- */

var
	gulp        = require('gulp'),
	compass     = require('gulp-compass'),
	jade        = require('gulp-jade'),
	browserSync = require('browser-sync').create(),
	plumber     = require('gulp-plumber');

/* ----------------paths---------------- */

var
	paths = {
		jade : {
			location    : 'app/jade_pages/**/*.jade',
			compiled    : 'app/jade_pages/_pages/*.jade',
			destination : 'app/html_pages/'
		},

		scss : {
			location    : 'app/css/scss/*.scss',
			entryPoint  : 'app/css/css/main.css'
		},

		compass : {
			configFile  : 'config.rb',
			cssFolder   : 'app/css/css/',
			scssFolder  : 'app/css/scss/',
			imgFolder   : 'app/img/'
		},

		browserSync : {
			baseDir : 'app/html_pages/',
			watchPaths : ['app/html_pages/*.html', 'app/css/css/*.css', 'app/js/*.js']
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
	browserSync.init({
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- watch --------- */

gulp.task('watch', function(){
	gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['compass']);
	
	gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['jade', 'compass', 'sync', 'watch']);