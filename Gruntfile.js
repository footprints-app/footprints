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
				environmentCNAME: 'thesisserver-env.elasticbeanstalk.com',
				region: 'us-east-1',
				sourceBundle: 'sourcebundle/bundle.zip'
			}
		},

		awsebtlogs: {
			logs: {
				options: {
					region: 'us-east-1',
					environmentName: 'walkingtours',
					outputPath: 'logs',
					timeoutSec: 20,
					intervalSec: 5
				}
			}
		},

		compress: {
			main: {
				options: {
					archive: './sourcebundle/bundle.zip',
					mode: 'zip'
				},
				files: [
					{	expand: true,
						cwd: 'server/',
						src: ['**/*', '!tests', '!schema.sql', '!node_modules', '!test_images', '!seeds']},
				]
			}
		},

		clean: ["sourcebundle/*"],

		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		jshint: {
			files: [ 'Gruntfile.js', 'server/**/*.js', 'server/*.js', 'mobile/*.js', 'mobile/components/*.js'],
			options: {
				force: 'true',
				jshintrc: '.jshintrc',
				ignores: [
					'server/node_modules/**'
				]
			}
		},

		jsdoc: {
			dist : {
				src: ['server/*.js', 'server/**/*.js', '!server/node_modules/**', 'mobile/*.js', 'mobile/components/*.js', 'README.md'],
				options: {
					destination: 'out/'
				}
			}
		},

		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['server/tests/*.js']
			}
		}
	});

	////////////////////////////////////////////////////
	// Main grunt tasks
	////////////////////////////////////////////////////

	grunt.registerTask('testFront', ['jshint', 'jest']);

	grunt.registerTask('testBack', ['jshint', 'mochaTest']);

	grunt.registerTask('zip', ['clean', 'compress']);

	grunt.registerTask('travis', ['testFront', 'testBack']);

	grunt.registerTask('build', ['jshint', 'travis', 'zip', 'jsdoc']);

	grunt.registerTask('deploy', ['build', 'awsebtdeploy']);

};
