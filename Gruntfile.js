module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['js/*.js'],
				tasks: ['uglify', 'jshint'],
				options: {
					spawn: false
				}
			},
			less: {
				files: ['less/*.less'],
				tasks: ['less', 'csslint:strict', 'cssmin'],
				options: {
					spawn: false
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'js/main.js',
				dest: 'build/js/main.min.js'
			}
		},
		jshint: {
			all: ['Gruntfile.js', 'js/*.js']
		},
		less: {
			development: {
				files: {
					'less/css/main.css': 'less/main.less'
				}
			}
		},
		csslint: {
			strict: {
				src: ['less/css/*.css']
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'less/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css',
					ext: '.min.css'
				}]
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['uglify', 'jshint','less', 'csslint:strict', 'cssmin']);
};