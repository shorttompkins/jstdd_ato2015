class: center, middle

# JavaScript TDD with <br/> Jasmine, Karma, and Gulp

### All Things Open 2015

### Jason Krol (a.k.a ShortTompkins)

---

# About Me

* Jason Krol
* Tweets @ **ShortTompkins** (all the things!)
* Blogs @ Kroltech.com
* Currently working at DramaFever.com
* Dad, Author, Gamer, Geek!

* http://ShortTompkins.JS.org

---

# Why Test? (a.k.a Why its awesome!)

* Google is 2 Billion lines of code!*
* Testing can be fun?!
* Acts as a kind of guarantee
* Built-in code documentation?!

http://www.wired.com/2015/09/google-2-billion-lines-codeand-one-place/

???
Imagine for a second that you're first day on the job and you're tasked with making even the most minor change
to the codebase.  Now imagine that sinking feeling in your stomach when it comes time to push it live! It doesnt have to be that way!

--

# Why it sucks?

A recent survey shows that roughly 50% of FE devs don't test*

* Its time consuming
* Its not always easy (which is a good thing)
* Where to start?!
* Tedious (i.e. How to automate?!)

http://ashleynolan.co.uk/blog/frontend-tooling-survey-2015-results

???
Writing tests is hard!  How do you get started? How do you even write a test?!

---

# Tools of the Trade

* Jasmine (test/assertion library/framework)
 * Others: Mocha, Chai, QUnit, et al
* Karma (test runner)
* Gulp (task runner)
 * Others: Grunt, Brocolli, npm, make, et al

_All require node.js and npm installed locally_

???
* Jasmine is the library we're using for our assertions.  It provides us with all of the tools and syntax to be able to write and execute our tests.
* Karma runs our tests
* Gulp ties our tasks together to make things easy and automated!

---

# Test Driven Development Crash Course

Suites, specs, assertions, spies, mocks, stubs, wtf?!

Think of it like telling a story:

* Label the piece of code / functionality being tested
--

* Define any necessary prep work before every test
--

* Ensure that every piece of logic in the code does whats expected
--

* Thats it!
---

## Describe

```javascript
  describe('Description/Label', function(){

  });
```
 * Typically a single word description/label
 * Can be nested (and very well should be)

--

## beforeEach/afterEach

```javascript
describe('Description/Label', function(){

* beforeEach(function(){
    // do some work before every test is run
  });

* afterEach(function(){
    // do some cleanup/resets after every test is run
  });

});
```

???
 * Do all of your setup and cleanup using `beforeEach` and `afterEach`
 * They do exactly what they sound like - run before and after every single test
 * `var`s should be defined outside of `beforeEach` (inside `describe`) but should be reset/valued within `beforeEach`
 * Use `beforeEach` when running a series of tests against the same function and call the function in the actual `beforeEach`

---

## it

```javascript
describe('Description/Label', function(){
  beforeEach(function(){ ... });

* it('should do something specific', function() {

  });

* it('should do something else', function() {

  });

});
```

---

## expect & matchers

```javascript
describe('Sum', function(){

  it('should sum 2 numbers', function() {
*   expect(sum(1, 1)).toEqual(2);
*   expect(sum(3, 2)).toEqual(5);
*   expect(sum(5, 5)).not.toEqual(99);
  });

});
```

--

 * Some common matchers:
	 * `toBe`, `toEqual`, `toMatch`, `toBeDefined`, `toBeUndefined`
	 * `toBeTruthy`, `toBeFalsy`
	 * `toContain`, `toBeGreaterThan`, `toBeLessThan`
 * Can be chained with `.not`
	 * `not.toBeDefined()`, `not.toEqual(0)`
 * Specials:
	 * `jasmine.any([Function, Number, String, etc])`

---

## Spies
 * `spyOn(object, 'functionToSpyOn')` (for existing functions)
 * `jasmine.createSpy('nameOfSpy')` (for mocks/stubs)
 * If you want your spy to actually do something specific:
	 * `.and.callThrough()`
	 * `.and.returnValue(newValue)`
	 * `.and.callFake(function(){ ... })`
 * Matchers:
  * `.toHaveBeenCalled()`, `.toHaveBeenCalledWith(params)`

--

```javascript
describe('Sum', function(){
  beforeEach(function() {
*   spyOn(window, 'alert');
  });

  it('should alert the sum', function () {
    sum(1, 1);
*   expect(window.alert).toHaveBeenCalledWith(2);
  });
});
```

---

# Create a quick project

```sh
$ mkdir -p jstdd/src/js && cd jstdd
$ touch src/js/sample.js src/js/sample_test.js
```

--

File contents:

```javascript
// sample.js:
function sum(a, b) {
  window.alert(a + b);
  return a + b;
}

// sample_test.js:
describe('Sample', function() {
  beforeEach(function () {
    spyOn(window, 'alert');
  });
  it('should sum 2 numbers', function() {
    expect(sum(1,1)).toEqual(2);
  });
  it('should alert the return value', function() {
    sum(2, 2);
    expect(window.alert).toHaveBeenCalledWith(4);
  });
});
```

---

# Setup our Dev Environment

First, install Karma's CLI as a global package:

```sh
$ sudo npm install -g karma-cli
```
--

Initialize our project:

```sh
$ npm init -y
```

--

Locally install karma for the project:

```sh
$ npm install --save-dev karma
```

???
* Explain the different questions/answer options in the karma config options
* Take a peek at the package.json and karma.conf.js files
 * Explain `--save-dev`

--

Initialize karma for the project:
```sh
$ karma --init
```

---

# Run our first test!

Lets execute our first test run and see if everything is working:
```sh
*$ karma start
17 09 2015 22:10:09.116:WARN [karma]: No captured browser, open http://localhost:9876/
17 09 2015 22:10:09.128:INFO [karma]: Karma v0.13.9 server started at http://localhost:9876/
17 09 2015 22:10:09.132:INFO [launcher]: Starting browser PhantomJS
17 09 2015 22:10:10.064:INFO [PhantomJS 1.9.8 (Mac OS X 0.0.0)]: Connected on socket ...
PhantomJS 1.9.8 (Mac OS X 0.0.0): Executed 2 of 2 SUCCESS (0.003 secs / 0.002 secs)
|
```
_Notice:_ karma runs in watch mode, so if we change our function or tests, it will automatically rerun!

---

# Introducing Gulp

Why do we need an automated build tool?

???
Running our tests from the command line is great and all, but the reality is our application is very likely going to have a whole process wrapped around building it for release.  If only to bundle all of our files into a single minified source.  During that build process, we will want our tests to run.  In addition, that watcher stuff that karma did was pretty neat, so we're going to want our app to have watchers that trigger the build as well as tests every time we change a file.

--

* Bundle/Minify our source code
* Transpile CSS preprocessors like SASS
* Merge environment/config variables
* ES6 Transpiling (Babel)
* Run tests!!

--

First, like Karma, globally install the Gulp cli:

```sh
$ sudo npm install -g gulp
```

--

Locally install `gulp` and the `gulp-karma` plugin for the project:

```sh
$ npm install --save-dev gulp gulp-karma
```

--

Create a `gulpfile.js`:

```sh
$ touch gulpfile.js
```

---

# Gulpfile.js

Add the following to `gulpfile.js`:

```javascript
var gulp = require('gulp'),
    karma = require('gulp-karma');

gulp.task('test', function() {
  return gulp.src(['src/js/**/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('default', function() {
  gulp.src(['src/js/**/*.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
```

---

# Run our first Gulp test task!

And lets give it another shot using Gulp this time:

```sh
*$ gulp
[21:37:43] Using gulpfile ~/repos/jstdd-ato2015/gulpfile.js
[21:37:43] Starting 'default'...
[21:37:43] Finished 'default' after 8.52 ms
[21:37:43] Starting Karma server...
17 09 2015 21:37:44.077:WARN [karma]: No captured browser, open http://localhost:9876/
17 09 2015 21:37:44.087:INFO [karma]: Karma v0.13.9 server started at http://localhost:9876/
17 09 2015 21:37:44.093:INFO [launcher]: Starting browser PhantomJS
17 09 2015 21:37:45.044:INFO [PhantomJS 1.9.8 (Mac OS X 0.0.0)]: Connected on socket JAj_6NRuzf3kq4w8AAAA with id 32684497
PhantomJS 1.9.8 (Mac OS X 0.0.0): Executed 2 of 2 SUCCESS (0.003 secs / 0.001 secs)
|
```

???
Explain gulps default task versus naming specific tasks and why.

---

# Lets look at some real tests!

VideoPlayer.js
VideoPlayer_tests.js

* Note that gulpfile and/or karma.conf file need to be updated to include global deps (i.e. jQuery!)
* 
