React and Flux proof of concept
======================
This project is just a proof of concept about building web application using React with flux architecture. You can run the project in develop mode and compile to go to production.

The code is based on [Creating A Simple Shopping Cart with React.js and Flux](https://scotch.io/tutorials/creating-a-simple-shopping-cart-with-react-js-and-flux) tutorial.

This project is based on [es6-reatt](https://github.com/abiee/es6-react), you can use it for you base project.

What's inside
----------------
Batteries included:
 - Gulp
 - jspm
 - Babel
 - React
 - Livereload
 - Karma
 - Mocha-Chai-Sinon

Setup
-----
Clone the repository and install the dependencies.

    $ git clone https://github.com/abiee/es6-react-concept.git
    $ cd es6-react-concept
    $ npm install
    $ jspm install
    $ gulp serve

Do not forget to install globally gulp if not installed yet.

Build
------
If you want to build the project run.

    $ gulp build

It will compile the project and put the result under `dist` directory. You can run the compiled project also.

    $ gulp serve:dist

Testing
---------
Two options exists to run tests, the first one is for development process and aims to practice Test Driven Development.

    $ gulp tdd

It will open a Google Chrome instance and run all tests on it, when a file is updated tests will be run again. You can see the rests as a notification or in the console.
The other option to run tests is for Continuous Integration purposes, it will run all the tests against PanthomJS and output a jUnit format file for analysis.
    
    $ gulp test

You can get the results at `.tmp/test-results.xml`.

Contribution
---------------
If you have ideas or find an error feel free to submit a PR.

Licence
-------
Licensed under the MIT license.
