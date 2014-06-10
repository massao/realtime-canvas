module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				files: {
					'public/javascript/global.js': [
						'src/scripts/jquery-2.1.1.js',
						'src/scripts/main.js'
					]
				}
			}
		},
		sass: {
			compile: {
				options: {
					style: 'compressed'
				},
				files: {
					'public/css/global.css': [
						'src/sass/global.scss'
					]
				}
			}
		},
		watch: {
			css: {
				files: 'src/**/*.scss',
				tasks: ['sass']
			},
			scripts: {
				files: 'src/**/*.js',
				tasks: ['uglify']
			}
		}
	});

	//grunt.loadNpmTasks('plugin-name');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('compile', ['uglify', 'sass']);
	grunt.registerTask('default', ['watch']);
};
