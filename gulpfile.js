var gulp = require("gulp"),
    browserSync = require('browser-sync');

// Watch
gulp.task('watch', function() { // следить за изменениями в файлах
	gulp.watch([
		'app/*.html',
		'app/*.php',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});

gulp.task('default', ['watch']); // работает по умолчанию