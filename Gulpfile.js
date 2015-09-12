var gulp = require('gulp'),
    path = require('path'),
    jspm = require('jspm'),
    serve = require('browser-sync'),
    yargs = require('yargs').argv;
    del = require('del');

var $ = {
  rename: require('gulp-rename'),
  template: require('gulp-template'),
  uglify: require('gulp-uglify'),
  htmlReplace: require('gulp-html-replace'),
  ngAnnotate: require('gulp-ng-annotate'),
  plumber: require('gulp-plumber'),
  print: require('gulp-print'),
  inject: require('gulp-inject'),
  concat: require('gulp-concat'),
  less: require('gulp-less'),
  addSrc: require('gulp-add-src'),
  minifyCss: require('gulp-minify-css'),
  sourcemaps: require('gulp-sourcemaps')

};

var root = 'client';

// helper method to resolveToApp paths
var resolveTo = function (resolvePath) {
  return function (glob) {
    glob = glob || '';
    return path.join(root, resolvePath, glob);
  }
};

var resolveToApp = resolveTo('app'); // app/{glob}
var resolveToComponents = resolveTo('app/components'); // app/components/{glob}

// map of all our paths
var paths = {
  js: resolveToApp('**/*.js'),
  css: resolveToApp('**/*.css'),
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dist: path.join(__dirname, 'dist/')
};

gulp.task('serve', function () {
  serve({
    port: process.env.PORT || 3000,
    open: false,
    files: [].concat(
        [paths.js],
        [paths.css],
        paths.html
    ),
    server: {
      baseDir: root,
      // serve our jspm dependencies with the client folder
      routes: {
        '/jspm.config.js': './jspm.config.js',
        '/jspm_packages': './jspm_packages'
      }
    }
  });
});

gulp.task('build', function () {
  var dist = path.join(paths.dist + 'app.js');
  // Use JSPM to bundle our app
  return jspm.bundleSFX(resolveToApp('app'), dist, {})
      .then(function () {
        // Also create a fully annotated minified copy
        return gulp.src(dist)
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe($.rename('app.min.js'))
            .pipe(gulp.dest(paths.dist))
      })
      .then(function () {
        // Inject minified script into index
        return gulp.src('client/index.html')
            .pipe($.htmlReplace({
              'js': 'app.min.js'
            }))
            .pipe(gulp.dest(paths.dist));
      });
});

gulp.task('component', function () {
  var cap = function (val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
      .pipe($.template({
        name: name,
        upCaseName: cap(name)
      }))
      .pipe($.rename(function (path) {
        path.basename = path.basename.replace('temp', name);
      }))
      .pipe(gulp.dest(destPath));
});

gulp.task('default', ['serve']);


//var browserSync = require('browser-sync');
//var reload      = browserSync.reload;

//var LessPluginCleanCSS = require('less-plugin-clean-css'),
//    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({browsers: ['last 2 versions']});

//var LessPluginFlexboxgrid = require('less-plugin-flexboxgrid'),
//    flexboxgrid = new LessPluginFlexboxgrid();
//
//var LessPluginLists = require('less-plugin-lists'),
//    lists = new LessPluginLists();

function processStylesheets(liveReload) {
  //files.add('node_modules/angular-material/angular-material.css');

  return gulp.src('app.less', {cwd: 'client/src/app'})
      .pipe($.plumber()) // make sure a fail does not kill the watch

      .pipe($.inject(gulp.src(['**/*.less', '!app.less'], {cwd: 'client/src/app/', read: false}), {
        starttag: '/* inject:less */',
        endtag: '/* endinject */',
        transform: function (filepath) {
          return "@import '." + filepath + "';\n";
        }
      }))

      .pipe($.less({
        plugins: [autoprefix /* flexboxgrid, lists */]
      }))

      .pipe($.addSrc([
          // TODO: simplify upgrade path:
          // Updating dependencies will be tedious here
          // we have to change the dependency versions in the build scripts
          // it would be nicer if we could reference a version agnostic link
          // path or proxy such as found in jspm.config.js.
          // i.e:   'normalize.css': 'jspm_packages/github/necolas/normalize.css@3.0.3/normalize.css'

        //'jspm_packages/github/necolas/normalize.css@3.0.3/normalize.css',
        'jspm_packages/github/angular/bower-material@0.11.0/angular-material.css'
        //  'node_modules/material-design-icons/sprites/svg-sprite/*.css'
      ]))
      .pipe($.concat('app.css'))

      .pipe($.minifyCss({}))
      .pipe($.sourcemaps.write())

      .pipe(gulp.dest('.build/'))
      //.pipe($.if(liveReload === true, reload({stream: true})))
      ;

}

gulp.task('less:reload', ['clean:build'], function () {
  return processStylesheets(true);
});

gulp.task('less:build', function () {
  return processStylesheets(false);
});

gulp.task('less-files', function () {
  return gulp.src(FILES.less)
      .pipe($.print());
});

gulp.task('sweep', function(done) {
  del('.build/js/app', {force:true}, done);
});

gulp.task('clean', ['clean:build', 'clean:dist']);

gulp.task('clean:build', function(callback) {
  del('.build', {force: true}, callback);
});

gulp.task('clean:dist', function(callback) {
  del(DIR.dist, {force: true}, callback);
});
