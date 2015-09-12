  *I apologize for the length of this document, I am trying to be thorough in my pursuit of understanding these tools .*

  *I have summarized my questions at the bottom, and hopefully these questions and any discovered answers can be used in your documentation to help others.*

----

I have a sample repository where I am trying to establish an example workflow using JSPM with ES6 Angular 1.x and LESS.

[NG6-starter](https://github.com/kburson/NG6-starter)   :  **_jspm branch_**

This is a fork of the *Angular-Class/NG6-starter* where I am expanding on the **jspm branch** to add **LESS** transpilation and static asset management (images/fonts).

What I am trying to figure out, and I hope someone here can help me, is how JSPM integrates with SystemJS/ES6-module-loader.

----

**JSPM** is a nice package manager that can download the various versions of packages that I need  in my browser application and organizes them cleanly in `./jspm_packages`.
The **JSPM-CLI** also manages the `jspm.config.js`, so as I add/remove packages it updates both the `jspm.config.js` and the `package.json` files.

The `package.json` file has a `jspm` node

```
...
"jspm": {
    "directories": {},
    "configFile": "jspm.config.js",
    "dependencies": {
      "angular": "github:angular/bower-angular@^1.4.5",
      "angular-material": "github:angular/bower-material@^0.11.0",
      "css": "github:systemjs/plugin-css@^0.1.16",
      "font-awesome": "npm:font-awesome@^4.4.0",
      "normalize.css": "github:necolas/normalize.css@^3.0.3",
      "text": "github:systemjs/plugin-text@^0.0.2"
    },
    "devDependencies": {
      "babel": "npm:babel-core@^5.8.22",
      "babel-runtime": "npm:babel-runtime@^5.8.20",
      "core-js": "npm:core-js@^1.1.0",
    }
  },
...
```

that defines the jspm config file: `"configFile": "jspm.config.js"`


The jspm config file contains definitions of paths, maps and proxies to help locate resources:

```
System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: { ...  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.5",
    "angular-material": "github:angular/bower-material@0.11.0",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "babel": "npm:babel-core@5.8.23",
    "babel-runtime": "npm:babel-runtime@5.8.20",
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
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.16"
    },
    ...
});
```
----

in the config file the `paths` state that any request for a module reference that starts with `github:` can be found in the project folder `./jspm_packages/gihub/`, similarly for `npm:` found in`jspm_packages/npm/`

That is fairly easy to understand.  

the map section defines 'aliases' for specific versions of dependency packages, ie:
`"angular": "github:angular/bower-angular@1.4.5",` 
says that when your code asks to `import angular from 'angular'` to 'map' the module reference `angular`
to the depdency location of `github:angular/bower-angular@1.4.5`.

**File** `./jspm_packages/github/angular/bower-angular@1.4.5.js`
```
module.exports = require("github:angular/bower-angular@1.4.5/angular");
```
simply loads the angular package  `./jspm_packages/github/angular/bower-angular@1.4.5/angular.js`

which has a pre-amble at the top of the file:
```
/* */ 
"format global";
"exports angular";
```

so my `import angular from 'angular';` will load the `angular` definition into my `angular` variable:
`var angular = function angular() { ... };`

Seems the angular team at google want to play nice with SystemJS and have formatted their package accordingly.

----

Let's take `normalize.css`, I have included this in my package dependencies and want to have the css file loaded at runtime, but I do not want to manually insert a `<style>` tag in my index.html.
In my **client/src/app/common.js** file I can import `normalize` as so:

```
import angular from 'angular';
import 'normalize.css';              // <--- load reference from mapped location
import Navbar from './navbar/navbar';
let commonModule = angular.module('app.common', [
	Navbar.name,
]);
export default commonModule;
```

this is 'mapped' in the jspm.config.js file as :

`"normalize.css": "github:necolas/normalize.css@3.0.3",`

**File**: `./jspm_packages/github/necolas/normalize.css@3.0.3.js`
```
module.exports = require("github:necolas/normalize.css@3.0.3/normalize.css!");
```

which in turn loads the css:

`./jspm_packages/github/necolas/normalize.css@3.0/normalize.css` using the css loader plugin (`!css`)

Somehow this gets injected into the window document, but I am not sure how or where. **(@guybedford ?)**

----

Then I want to include angular-material (material design for angular), so I import the following:

`import 'angular-material'`

which maps to:
`"angular-material": "github:angular/bower-material@0.11.0",`

**File**:  `./jspm_packages/github/angular/bower-material@0.11.0.js`
```
module.exports = require("github:angular/bower-material@0.11.0/index");
```
which in turn loads :
**File**: `./jspm_packages/github/angular/bower-material@0.11.0/index.js`
```
// Should already be required, here for clarity
require('angular');

// Load Angular and dependent libs
require('angular-animate');
require('angular-aria');

// Now load Angular Material
require('./angular-material');

// Export namespace
module.exports = 'ngMaterial';
```

which loads all the required dependencies for angular-material, except the css, or so I thought:
as the module definition has a pre-amble:
**angular-material.js**
```
/* */ 
"format global";
"deps ./angular-material.css!";
...
```

I am assuming this `"deps ./angular-material.css!";` which is written like a SystemJS reference will cause the specified dependency to load as well, 
thus injecting the `angular-material.css` contents into the window dom.  is this correct (@guybedford) ?

That's nice, if that is what is happening.  Apparently the angular team is cooperating well with the SystemJS spec.

----

Now, in my project I want to use LESS to transpile to CSS. When using common/global variables and mixins it is required not only to transpile the individual less files, but also to concatenate the results into a single CSS file.
I have a gulp task building the `./.build/app.css` file at the start of my session and whenever a less file is modified.  So, the `./build/app.css` file should always be up to date.

Now, how do I reference this file withough inserting/injecting a `<style>` tag in my `./client/src/index.html` ?

----

My first thought is to add a `path` to the config, ie:

**FILE**: `jspm.config.js`
```
System.config({
...
  paths: {
    "build:*": ".build/*"
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
...
```

then import the file in my module:

**FILE**: `./client/src/app/common/common.js`
```
import angular from 'angular';

import 'normalize.css';

import 'build/app.css';   // <-- loading compiled css from ./build/app.css

let commonModule = angular.module('app.common', [
...
]);

export default commonModule;
```
----


My alternate plan was to create a map entry for the pre-compiled css file:

**FILE**: .`/jspm.config.js`
```
System.config({
  ...
  paths: {
    ...
  },
  map: {
    "app.css": ".build/app.css",
  }
});

```

then import similar to above:

**FILE**: `./client/src/app/common/common.js`
```
import angular from 'angular';

import 'normalize.css';

import 'app.css';   // <-- loading compiled css from ./build/app.css

let commonModule = angular.module('app.common', [
...
]);

export default commonModule;
```

**concern**
my problem with the previous 2 examples is that the jspm.config.js is managed by the jspm package manager, and whenver I add / remove a package from my dependency list it re-writes the jspm.config.js, so I lose my changes!

----

or I could follow the angular-material pattern and add a pre-amble to my module:

**client/src/app/app.js**
```
/* */ 
"format global";
"deps ./.build/app.css!";    // <--- set the dependency here ??

import angular from 'angular';
import Common from './common/common';

let appModule = angular.module('app', [
...
])
...
```

----

Then my final question, for now, is how to identify that during development I want to import the non-minified resources, and when I bundle for production I want the minified depencencies (both js and css) ?

----

**Summary**:

* How do JSPM, jspm-cli, SystemJS and es6-module-loader inter-relate?

* How much of my discussion content/questions should be targeted to jspm-cli, or to SystemJS?

* How do I identify additional locally compiled dependencies into my dev process so they load properly from their build directory?

* How do I identify that I want non-minified packages (js/css) during development run-time (self-hosting) 
and use minified packages (js/css) to be bundled in the distribution package (this includes transpiling and minifying all my sources too)

---

thanks for your help.  I believe if you can answer these questions this can be used in your documentation to help others understand these processes as well.
