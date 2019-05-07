const gulp = require('gulp');
const livereload = require('gulp-livereload');
const nodemon = require("gulp-nodemon");
const ts = require('gulp-typescript');

//Pega o argumento passado no comando listado no package.json
const env = process.argv.splice(process.execArgv.length + 2)[0] === '--prod' ? 'production' : 'development';
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
	const tsResult = tsProject.src()
		.pipe(tsProject());

	return tsResult.js
		.pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('scripts'));

if (env === 'production') {
	gulp.task('default', gulp.series('build'));
} else {
	gulp.watch(['src/**/*.ts', 'src/**/*.json'], gulp.series('build'));

	gulp.task('nodemon', () => {
		livereload.listen();

		// configure nodemon
		nodemon({
			// the script to run the app
			script: 'dist/server.js',
			ext: 'js',
			env: { 'NODE_ENV': 'development' }
		}).on('restart', function () {
			// when the app has restarted, run livereload.
			gulp.src('dist/server.js')
				.pipe(livereload());
		});
	})

	gulp.task('default', gulp.series('build',gulp.series('nodemon')));
}