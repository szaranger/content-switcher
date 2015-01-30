module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    sass: {
      dist: {
        options: {                       
          style: 'expanded'
        },
        files: {
          'src/css/jquery.contentswitcher.css': 'src/sass/main.scss',
          'jquery.contentswitcher.css': 'src/sass/main.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
    	options: {
  	    banner: '/*! Sean Amarasinghe <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  	  },
  	  dist: {
  	    files: {
  	      'dist/jquery.contentswitcher.min.js': ['<%= concat.dist.dest %>'],
          'jquery.contentswitcher.min.js': ['<%= concat.dist.dest %>']
  	    }
  	  }
    },
    clean: {
      js: ["dist/*.js", "!dist/*.min.js"]
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'sass', 'concat', 'uglify', 'clean']);
};
