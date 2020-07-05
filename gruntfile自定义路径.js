
const sass = require('sass')
const loadgrunttask = require('load-grunt-tasks')


module.exports = grunt => {
    grunt.initConfig({
        // 清空临时文件
        clean: {
            temp: 'dist'
        },
        // 直接输出图标
        copy: {
            options: {},
            main: {
                files: {
                    'dist/fonts/pages.eot': 'src/**/pages.eot',
                    'dist/fonts/pages.svg': 'src/**/pages.svg',
                    'dist/fonts/pages.ttf': 'src/**/pages.ttf',
                    'dist/fonts/pages.woff': 'src/**/pages.woff',
                }
            }
        },
        // 图片压缩
        imagemin: {
            options: {
                optimizationLevel: 7
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/images',
                    src:'*.{png,jpg,jpeg,gif,webp,svg}',//压缩那个文件
                    dest:'dist/images',  //放压缩后文件的文件夹
                    // ext: '.css'
                }]
            }
        },
        // css预编译
        sass: {
            options: {
                implementation: sass
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/styles',
                    src:'*.scss',//压缩那个文件
                    dest:'dist/css',  //放压缩后文件的文件夹
                    ext: '.css'
                }]
            }
        },
        // css压缩
        cssmin:{
            options:{
                mangle:true,
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src:'*.css',//压缩那个文件
                    dest:'dist/min.css',  //放压缩后文件的文件夹
                    ext:'.min.css' //压缩后文件的的名字
                }]
            }
        },
        // babel转换es语法
        babel: {
            options: {
                presets: ['@babel/preset-env']
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/scripts',
                    src: '*.js', //所有js文件,
                    dest: 'dist/js'
                }]
            }
        },
        // js压缩
        uglify: {
            options: {
                
            },
            main: {
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: '*.js', //所有js文件,
                    dest: 'dist/min.js',
                    ext: '.min.js',
                }]
            }
        },
        // 合并js,css
        concat: {
            options: {
                
            },
            main: {
                files: {
                    'dist/main.css': 'dist/**/*.min.css',
                    'dist/main.js': 'dist/**/*.min.js',
                }
            }
        },
        htmlmin: {
            options: {
                
            },
            main: {
                files: {
                    // 'dist/css/main.css': 'dist/**/*.min.css',
                    // 'dist/js/main.js': 'dist/**/*.min.js',
                }
            }
        },

        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['babel']
            },
            css: {
                files: 'src/**/*.scss',
                tasks: ['sass']
            }
        }

    })


    loadgrunttask(grunt)  // 会自动加载所有的grunt 插件中的任务

    grunt.registerTask('default', [
        'clean', 
        'copy', 
        'imagemin', 
        'sass', 
        'cssmin', 
        'babel', 
        'uglify',
        'concat',
    ])
}
