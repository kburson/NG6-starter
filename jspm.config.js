System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.5",
    "angular-material": "github:angular/bower-material@0.11.0",
    "angular-mocks": "npm:angular-mocks@1.4.5",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "babel": "npm:babel-core@5.8.23",
    "babel-runtime": "npm:babel-runtime@5.8.20",
    "chai": "npm:chai@3.2.0",
    "core-js": "npm:core-js@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.16",
    "font-awesome": "npm:font-awesome@4.4.0",
    "mocha": "npm:mocha@2.3.2",
    "normalize.css": "github:necolas/normalize.css@3.0.3",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:angular/bower-angular-animate@1.4.5": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:angular/bower-angular-aria@1.4.5": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:angular/bower-material@0.11.0": {
      "angular": "github:angular/bower-angular@1.4.5",
      "angular-animate": "github:angular/bower-angular-animate@1.4.5",
      "angular-aria": "github:angular/bower-angular-aria@1.4.5",
      "css": "github:systemjs/plugin-css@0.1.16"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.4.3"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:necolas/normalize.css@3.0.3": {
      "css": "github:systemjs/plugin-css@0.1.16"
    },
    "npm:babel-runtime@5.8.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.4.3": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:chai@3.2.0": {
      "assertion-error": "npm:assertion-error@1.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "deep-eql": "npm:deep-eql@0.1.3",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "type-detect": "npm:type-detect@1.0.0"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:deep-eql@0.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "type-detect": "npm:type-detect@0.1.1"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.16"
    },
    "npm:mocha@2.3.2": {
      "css": "github:systemjs/plugin-css@0.1.16"
    }
  }
});
