// Karma configuration

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'mocha', 'chai'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: [],

    jspm: {
      main: 'client/src/app/app',
      baseURL: './',
      // Edit this to your needs
      config: 'jspm.config.js',
      loadFiles: ['client/src/app/**/*.spec.js'],
      serveFiles: [
        'client/src/app/**/*.js',
        'client/src/app/**/*.html',
        'client/src/app/**/*.css'
      ],
      paths: {
        'client/src/app/*' : 'base/client/src/app/*',
        'github:*': 'base/jspm_packages/github/*',
        'npm:*': 'base/jspm_packages/npm/*'
      }
    },

    proxies: {
      // '/jspm_packages': '/base/jspm_packages',
      // '/jspm.config.js': '/base/jspm.config.js'
    },

    // list of files to exclude
    exclude: [],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

  });
};
