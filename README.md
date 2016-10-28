# http hello/goodbye lab1 for CodeFellows 401

### Creator
 - Tim Combs

### Project Functionality
  - This is a Code Fellows Lab Assignment to create an http server that uses the file system for persistent storage and retrieval - faux databasde functionality
  - The http server runs on localhost:8080
  - Server will serve to browser different responses depending on the path &/or method selected
  - The user will be able to read the directory of the notes
  - different responses will be displayed to the browser and/or logged to the console depending the path, querystring &/or method selected

### How To Use Codebase
  - This module uses Node, npm and the following modules:
    - net module from node, sander, http, url
    - eslint, mocha, chai for testing
  - Make sure to run npm install from the directory root to install dependencies
  - Please refer to the package.json for more info
  
  - To use this module, from the command line at the root of the directory type:
    ```
    $ npm start
    ``` 
  - Then open a browser window and navigate to the address localhost:8080/ 

  - Because pushing empty directory folders to be a repository is not allowed by Github, please create a notes directory in the root of the project directory
    ```
    $ mkdir notes
    ``` 

### Use Cases

  - navigating to localhost:8080/ displays 'pages served using node http'

  - navigating to localhost:8080/hello displays 'hello world, you asked for the path: /hello' and console.logs 'Hello World!' using the figlet module
  - navigating to localhost:8080/hello?needs=time displays 'Hello, the time is: <current_time>'
  - navigating to localhost:8080/hello?needs=date displays 'Hello, the date is: <current_date>'

  - navigating to localhost:8080/goodbye displays 'goodbye world, you asked for the path: /goodbye' and console.logs 'Goodbye World!' using the figlet module

  - navigating to localhost:8080/french-dip displays 'au jus!!!, you asked for the path: /french-dip' and console.logs 'au jus!!!' using the figlet module
  - making a POST request to localhost:8080/french-dip with text sent in the body as 'raw' data echoes the body as a response back to the browser using the figlet module

  - navigating to other localhost:8080/<something_else> displays '404 not found', responds with a 404 status code and console.logs 'there is no path at /<something_else> please check your map'
  

### Code Shape
  - This code has been vetted using Eslint and was reviewed by Code Fellows using Travis-CI

### Collborations/Questions/issues
  - Not currently looking for collaborators at this time
  - Any questions and concerns can be handled by opening an issue on the codebase

### License
  - Licensed under the MIT license - see LICENSE.md for more info
