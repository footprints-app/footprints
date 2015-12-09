module.exports = function(grunt) {
	//module to load all grunt tasks at once instead of individually calling loadNpmTasks on each.
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jest: {
			options: {
				coverage: true,
				testPathPattern: /.*-test.js/
			}
		},

		awsebtdeploy: {
			options: {
				applicationName: 'walkingtours',
				environmentCNAME: 'http://thesisserver-env.elasticbeanstalk.com/',
				region: 'us-east-1',
				sourceBundle: 'bundle.zip'
			}
		},

		compress: {
			main: {
				options: {
					archive: 'bundle.zip',
					mode: 'zip'
				},
				files: [
					{src: ['server/**'], dest: 'thesisProject/'},
				]
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			basic:{
				files: {
					'public/dist/main.js':['public/client/**/*.js'],
					'public/dist/lib.js':['public/lib/underscore.js','public/lib/jquery.js','public/lib/handlebars.js','public/lib/backbone.js']
				}
			}
		},

		clean: ["bundle.zip"],

		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		uglify: {
			options:{
				mangle:false
			},
			my_target: {
				files: {
					'public/dist/output.min.js': ['public/dist/main.js'],
					'public/dist/lib.min.js':['public/dist/lib.js']
				}
			}
		},

		jshint: {
			files: [ 'Gruntfile.js', 'public/client/**/*.js'],
			options: {
				force: 'true',
				jshintrc: '.jshintrc',
				ignores: [
					'public/lib/**/*.js',
					'public/dist/**/*.js'
				]
			}
		},

		watch: {
			scripts: {
				files: [
					'public/client/**/*.js',
					'public/lib/**/*.js',
				],
				tasks: [
					'concat',
					'uglify'
				]
			},
			css: {
				files: 'public/*.css',
				tasks: ['cssmin']
			}
		}
	});

	grunt.registerTask('server-dev', function (target) {
		// Running nodejs in a different process and displaying output on the main console
		var nodemon = grunt.util.spawn({
			cmd: 'grunt',
			grunt: true,
			args: 'nodemon'
		});
		nodemon.stdout.pipe(process.stdout);
		nodemon.stderr.pipe(process.stderr);

		grunt.task.run([ 'watch' ]);
	});

	////////////////////////////////////////////////////
	// Main grunt tasks
	////////////////////////////////////////////////////

	grunt.registerTask('test', [
		'jest'
	]);

	grunt.registerTask('zip', [
		'compress'
	]);

	grunt.registerTask('build', ['jshint', 'test', 'clean', 'concat', 'uglify']);

	grunt.registerTask('deploy', ['build', 'compress', 'awsebtdeploy']);

};
