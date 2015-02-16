module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			clear: {
			files: ['*.html', 'js/*.js', 'less/*.less', 'templates/*.hbs'], 
			tasks: ['clear']
			},
			options: {
				livereload: true
			},
			markup: {
				files: ['*.html']
			},
			templates: {
				files: ['templates/*.hbs'],
				tasks: ['handlebars'],
				options: {
					spawn: false
				}
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
				tasks: ['less', 'csslint:lax', 'cssmin'],
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
			},
			lax: {
				options: {
				  csslintrc: '.csslintrc'
				},
				src: ['less/css/*.css']
			},
		},
		handlebars: {
		  compile: {
		    options: {
					namespace: "JST"
				},
				files: {
					'build/templates/result.tmpl.js' : [ 'templates/*.hbs']
				}
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
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-clear');


	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['uglify', 'jshint','less', 'csslint:lax', 'cssmin']);
};