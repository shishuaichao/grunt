
const sass = require('sass')
const loadgrunttask = require('load-grunt-tasks')


module.exports = grunt => {
    grunt.initConfig({
        // 清空临时文件
        clean: {
            temp: 'dist'
        },
        // 直接输出图标,其他不需要改动的文件
        copy: {
            options: {},
            main: {
                files: [
                    {
                        expand: true,
                        src: 'src/assets/fonts/*.{eot,svg,ttf,woff}',
                        dest: 'dist',
                    }
                ]
            }
        },
        // 图片压缩
        imagemin: {
            options: {
                optimizationLevel: 1
            },
            main: {
                files: [{
                    expand: true,
                    src:'src/assets/images/*.{png,jpg,jpeg,gif,webp,svg}',//压缩那个文件
                    dest:'dist',  //放压缩后文件的文件夹
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
                    src:'src/**/*.scss',//压缩那个文件
                    dest:'dist',  //放压缩后文件的文件夹
                    ext: '.css',
                    extDot: 'first'
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
                    cwd: 'dist/src/assets/styles',
                    src:'*.css',//压缩那个文件
                    dest:'dist/src/assets/styles',  //放压缩后文件的文件夹
                    ext:'.css' //压缩后文件的的名字
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
                    // cwd: 'src/assets/scripts',
                    src: 'src/**/*.js', //所有js文件,
                    dest: 'dist'
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
                    cwd: 'dist/src/assets/scripts',
                    src: '*.js', //所有js文件,
                    dest: 'dist/src/assets/scripts',
                    ext: '.js',
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
                removeComments: true, //移除注释
                collapseWhitespace: true,//无用空格
            },
            main: {
                files: [{
                    expand: true,
                    src: 'src/**/*.html',
                    dest: 'dist',
                }]
            }
        },

        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['babel', 'uglify']
            },
            css: {
                files: 'src/**/*.scss',
                tasks: ['sass', 'cssmin']
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
        // 'concat',
        'htmlmin',
        // 'watch',
    ])
}
