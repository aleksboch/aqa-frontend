// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        path: '.',
        watch: {
            sass: {
                files: ['<%= path %>/webframework/src/scss/*.scss'],
                tasks: ['sass']
            },
            stylesheets: {
                files: '<%= path %>/webframework/src/css/styles.css',
                tasks: ['cssmin']
            }
        },
        clean: {
            options: {
                force: true
            },
            dist: {
                src: "dist"
            },
        },
        'dart-sass': {
            options: {
                trace: false
            },
            dist: {
                files: {
                    '<%= path %>/webframework/src/css/styles.css': '<%= path %>/webframework/src/scss/main.scss'
                }
            }
        },
        cssmin: {
            default: {
                files: [{
                    expand: true,
                    cwd: '<%= path %>/webframework/src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= path %>/webframework/dist/css',
                    ext: '.min.css'
                }]
            }
        },
        eol: {
            replace_crlf: {
                options: {
                    eol: 'lf',
                    replace: true
                },
                files: {
                    src: ["<%= path %>/webframework/dist/css/**"]
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: '<%= path %>/webframework/src/css/fonts/',
                src: ['**'],
                dest: '<%= path %>/webframework/dist/css/fonts/'
            },
            data: {
                expand: true,
                cwd: '<%= path %>/webframework/src/data/',
                src: ['**'],
                dest: '<%= path %>/webframework/dist/data/'
            },
            images: {
                expand: true,
                cwd: '<%= path %>/webframework/src/img/',
                src: ['**'],
                dest: '<%= path %>/webframework/dist/img/'
            },
            examples: {
                expand: true,
                cwd: '<%= path %>/webframework/examples/',
                src: ['**', '!data/**', '!css/**', '!content-for-criticalcss-ignore.html'],
                dest: '<%= path %>/webframework/dist/'
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7,
                    svgoPlugins: [{
                        removeViewBox: false
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '<%= path %>/webframework/src/img/',
                    src: ['**/*.{png}'],
                    dest: '<%= path %>/webframework/dist/img/'
                }]
            }
        }
    });

    grunt.registerTask('buildweb', ['build']);
    // Build for webframework when it is included as a submodule of a depending project like AQAWebsite
    grunt.registerTask('build', ['clean:dist', 'dart-sass', 'cssmin:default', 'copy:fonts', 'copy:images', 'copy:examples']);

    // Task to allow root path variable to be changed - normally used when called externally
    grunt.registerTask('setpath', 'Set the path config property.', function(val) {
        grunt.config.set('path', val);
    });

    //stand alone tasks for development purposes   
    grunt.registerTask('default', ['watch']);

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-dart-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-eol');
};