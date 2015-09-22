class: center, middle

# JavaScript TDD with <br/> Jasmine, Karma, and Gulp

### All Things Open 2015

### Jason Krol (a.k.a ShortTompkins)

---

# About Me

.right-image[![alt text](img/jackburton.jpeg)]

* Jason Krol
* Tweets @ **ShortTompkins** (all the things!)
* Blogs @ Kroltech.com
* Currently working at DramaFever.com
* Dad, Author, Gamer, Geek!

* http://ShortTompkins.JS.org


---

# Why Test? (a.k.a Why its awesome!)

.centered-image[![alt text](img/noproblem.gif)]

* Google is 2 Billion lines of code!<sup>1</sup>
* Acts as a kind of guarantee
* Built-in code documentation!
* Testing can be fun?!

???
Imagine for a second that you're first day on the job and you're tasked with making even the most minor change
to the codebase.  Now imagine that sinking feeling in your stomach when it comes time to push it live! It doesn't have to be that way!

---

# Why it sucks?

Roughly 50% of FE devs aren't testing<sup>2</sup>

.centered-image[![alt text](img/johncena_confused.gif)]

* Its time consuming
* It can be difficult
* Where to start?!
* Tedious

???
Writing tests is hard!  How do you get started? How do you even write a test?!

---

# Tools of the Trade

* **Jasmine** (test/assertion library/framework)
 * Others: Mocha, Chai, QUnit, et al
* **Karma** (test runner)
* **Gulp** (task runner)
 * Others: Grunt, Brocolli, npm, make, et al

_Requires node.js and npm installed locally_

.full-image[![alt text](img/logos.png)]

???
* Jasmine is the library we're using for our assertions.  It provides us with all of the tools and syntax to be able to write and execute our tests.
* Karma runs our tests
* Gulp ties our tasks together to make things easy and automated!

---

# Test Driven Development Crash Course

.full-image[![alt text](img/failedturn_carcrash.gif)]

---

# Test Driven Development Crash Course

Suites, specs, assertions, spies, mocks, stubs, wtf?!

--

* Describe a piece of code / functionality being tested
--

* Do some setup work before every test
--

* It should do exactly what you expect (all possible scenarios!)
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

---

## beforeEach/afterEach

```javascript
describe('Description/Label', function(){

* beforeEach(function(){
    // do some work before every test
  });

* afterEach(function(){
    // do some cleanup/resets after
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

* it('should do something...', function(){

  });

* it('should also...', function(){

  });

});
```

---

## expect & matchers

```javascript
describe('Sum', function(){

  it('should sum 2 numbers', function(){
*   expect(sum(1, 1)).toEqual(2);
*   expect(sum(3, 2)).toEqual(5);
*   expect(sum(5, 5)).not.toEqual(99);
  });

});
```

---

## Some common matchers:

* `toBe`, `toEqual`, `toMatch`, `toBeDefined`, `toBeUndefined`
* `toBeTruthy`, `toBeFalsy`
* `toContain`, `toBeGreaterThan`, `toBeLessThan`
* Can be chained with `.not`
  * `not.toBeDefined()`, `not.toEqual(0)`
* Specials:
  * `jasmine.any([Function, Number, String])`
  * `jasmine.anything()`

---

# Spies

.full-image[![alt text](img/spies.jpg)]

---

# Spies

* `spyOn(object, 'functionToSpyOn')`
* `jasmine.createSpy('nameOfSpy')`<br/><br/>
* Control spy's behavior:
	 * `.and.callThrough()`
	 * `.and.returnValue(newValue)`
	 * `.and.callFake(function(){ ... })`<br/><br/>
* Matchers:
   * `.toHaveBeenCalled()`, `.toHaveBeenCalledWith(params)`

---

## spyOn

```javascript
describe('Sum', function(){
  beforeEach(function() {
*   spyOn(window, 'alert');
  });

  it('should alert the sum', function (){
    sum(1, 1);
*   expect(window.alert)
      .toHaveBeenCalledWith(2);
  });
});
```

---

## jasmine.createSpy

```javascript
describe('window.setTimeout', function(){
  var cbSpy;
  beforeEach(function() {
*   cbSpy = jasmine.createSpy('cbSpy');
    setTimeout(cbSpy, 0);
  });

  it('should execute callback', function (){
*   expect(cbSpy).toHaveBeenCalled();
    expect(cbSpy).calls.count()).toBe(1);
  });
});
```

---

# Create a quick project

```sh
$ mkdir -p jstdd/src/js && cd jstdd
$ touch src/js/sample.js
$ touch src/js/sample_test.js
```

---

## File contents:

```javascript
// sample.js:
function sum(a, b) {
  window.alert(a + b);
  return a + b;
}
```

---

```javascript
// sample_test.js:
describe('Sample', function(){
  beforeEach(function () {
    spyOn(window, 'alert');
  });
  it('should sum 2 numbers', function(){
    expect(sum(1,1)).toEqual(2);
  });
  it('should alert the value', function(){
    sum(2, 2);
    expect(window.alert)
      .toHaveBeenCalledWith(4);
  });
});
```

---

# Setup our Dev Environment

First, install Karma's CLI as a global package:

```sh
$ sudo npm install -g karma-cli phantomjs
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
* Explain `--save-dev` and take a peek at the package.json

---

## Initialize Karma for the project:

```sh
$ karma init
```

* jasmine
* no (Require.js)
* PhantomJS
* `src/js/**/*.js`
* no exclusions
* yes (watch for changes)

???
* Show live demo of `karma init`
* Take a peek at the karma.conf.js files

---

# Run our first tests!

```sh
*$ karma start
17 09 2015 22:10:09.116:WARN [karma]: No captured browser, open http://localhost:9876/
17 09 2015 22:10:09.128:INFO [karma]: Karma v0.13.9 server started at http://localhost:9876/
17 09 2015 22:10:09.132:INFO [launcher]: Starting browser PhantomJS
17 09 2015 22:10:10.064:INFO [PhantomJS 1.9.8 (Mac OS X 0.0.0)]: Connected on socket ...
PhantomJS 1.9.8: Executed 2 of 2 SUCCESS (0.003 secs / 0.002 secs)
|
```

---

# Introducing Gulp

Why do we need an automated build tool?

.centered-image[![alt text](img/fast_typing.gif)]

???
Running our tests from the command line is great and all, but the reality is our application is very likely going to have a whole process wrapped around building it for release.  If only to bundle all of our files into a single minified source.  During that build process, we will want our tests to run.  In addition, that watcher stuff that karma did was pretty neat, so we're going to want our app to have watchers that trigger the build as well as tests every time we change a file.

--

* Bundle/Minify our source code
* Transpile CSS preprocessors like SASS
* ES6 Transpiling (Babel)
* Run tests!!

---

## Install Gulp

First, like Karma, globally install the Gulp CLI:

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

```javascript
// gulpfile.js
var gulp = require('gulp'),
    karma = require('gulp-karma');

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

Lets try again, this time using Gulp:

```sh
*$ gulp
[21:37:43] Using gulpfile ~/repos/jstdd/gulpfile.js
[21:37:43] Starting 'default'...
[21:37:43] Finished 'default' after 8.52 ms
[21:37:43] Starting Karma server...
17 09 2015 21:37:44.077:WARN [karma]: No captured browser, open http://localhost:9876/
17 09 2015 21:37:44.087:INFO [karma]: Karma v0.13.9 server started at http://localhost:9876/
17 09 2015 21:37:44.093:INFO [launcher]: Starting browser PhantomJS
17 09 2015 21:37:45.044:INFO [PhantomJS 1.9.8 (Mac OS X 0.0.0)]: Connected on socket JAj_6NRuzf3kq4w8AAAA with id 32684497
PhantomJS 1.9.8: Executed 2 of 2 SUCCESS (0.003 secs / 0.001 secs)
|
```

???
Explain gulps default task versus naming specific tasks and why.

---

# Lets look at some real tests!

`VideoPlayer.js` & `VideoPlayer_tests.js`

* Basic video player module
* Uses jQuery
* 12 functions (100 lines)
* 46 tests (over 300 lines)

???
* Note that gulpfile and/or karma.conf file need to be updated to include global deps (i.e. jQuery!)
*

---

# Resources

* Jasmine Docs: http://jasmine.github.io/
* Karma: http://karma-runner.github.io/
* Gulp: http://gulpjs.com/

## Sources

1. http://www.wired.com/2015/09/google-2-billion-lines-codeand-one-place/
2. http://ashleynolan.co.uk/blog/frontend-tooling-survey-2015-results

---
class: center, middle

# Start Testing!!

.full-image[![alt text](img/leap_of_faith.gif)]
