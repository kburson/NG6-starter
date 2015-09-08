# JSPM Angular Workflow

* Use JSPM as a package manager to download all browser and dev dependencies into local `./jspm_components` folder.
* Use Karma as a unit test runner to load a static http server with source and unit test files.  
This configuration should load all browser dependencies from the `./jspm_components` folder while transpiling all browser scripts from ES6/Typescript to ES5.
* Use Gulp to build tools
* Use gulp-less to transpile and concatenate all less files `./.build/app.css`.
* use jspm to transpile and bundle all ES6/Typescript files into a single `/dist/bundle.js`
* use gulp to minify/obfuscate the `./app.css` outputing results to `./dist/app.css`.
* * alternatively have jspm include this app.css


## Project Structure:

    ./client
      +- assets
        +- images
        +- fonts
        +- l10n
        +- data
      +- src
        +- app
          +- components
            +- common
              +- services
              +- filters
              +- directives
              +- dialogs
            +- home
              .- home.component.js
              .- home.config.js
              .- home.controller.js
              .- home.controller.spec.js
              .- home.html
              .- home.js
              .- home.less
              .- home.router.js
            .- app.component.js
            .- app.config.js
            .- app.controller.js
            .- app.controller.spec.js
            .- app.html
            .- app.js
            .- app.less
            .- app.router.js
          +- tests
            +- config
            +- data
            +- pageObjects
            +- utils
            +- scenarios
              .- loginToHomePage.spec.js


## Development Setup

### initial
    
* clone repository to local workspace
* ./setup.sh
  * this will install all global and local dependencies
    
### cyclical

#### prep
    
  * `npm run prepare`

    * transpile `./client/src/app/**/*.less`  and concatentate with `./jspm_compnents/**/*.css` sending output to `./.build/app.css`
    * transpile `./client/src/app/**/*.(js|ts)` to `./.build/js/app/**/*.js`
    
    ** check if config.js can map static assets folder separately from compiled assets, and switch to local assets whn packaged for production.
    
    * copy all `./client/assets/*` to `./.build/*`
      * includes:
        * images
        * fonts
        * l10n     // internationalization translation files
        * data     // mock data json files
#### build for dev    
* `npm run dev-watch`
    * watch triggers:
      * `./client/src/app/**/*.less` : transpile all less files and concat with all vendor css sending output to `./.build/app/css`
      * `./client/src/app/**/*.(js|ts)` transpile modified file to ES5 and send output to `./.build/js/app/` 
config.js is defined by jspm to load all vendor dependencies from `jspm_components/*` and all client dependencies from `./.build/js/app`


    .build
      +- data
      +- fonts
      +- images
      +- l10n
      
      +- js

#### Package for Production