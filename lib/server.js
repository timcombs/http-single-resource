const http = require('http');
const url = require('url');
const sander = require('sander');

const readBody = require('./readBody.js');
const dataStore = require('./dataStore.js');
const resHandler = require('./resHandler.js');

const indexHtml = sander.createReadStream('index.html');

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  const parsedUrl = url.parse(req.url, true);
  //const queryObj = parsedUrl.query;
  const httpVerb = req.method;

  const fullPath = parsedUrl.pathname;
  const relPath = '.' + fullPath;
  const splitPath = fullPath.split('/');

  const dirName = '/' + splitPath[1];
  const relDirName = '.' + dirName;
  const filename = splitPath[2];

  //server decides what CRUD method then dataStore handles the fs operation
  //why does not serve the index.html page?
  //is it serving it and reloading?
  if (dirName === '/') {
    indexHtml.pipe(res);

  //posts specific note
  }else if(dirName === '/notes' && (filename) && httpVerb === 'POST') {
    readBody(req)
      .then((body) => {
        dataStore.stash(relPath, body, filename, relDirName);
      })
      .then((data) => {
        resHandler.writeStashMsg(res, data);
      })
    .catch((err) => {
      res.statusCode = 500;
      resHandler.errHandler(res);
      console.log(err);
    });

  //updates specific note
  }else if(dirName === '/notes' && (filename) && httpVerb === 'PUT') {
    readBody(req) 
      .then((body) => {
        dataStore.update(relPath, body);
      })
      .then(() => {
        resHandler.writeUpdateMsg(res);
      })
      .catch((err) => {
        res.statusCode = 500;
        resHandler.errHandler(res);
        console.log(err);
      });

  //deletes specific note    
  }else if(dirName === '/notes' && (filename) && httpVerb === 'DELETE') {
    dataStore.remove(relPath)
      .then(() => {
        resHandler.writeDeleteMsg(res);
      })
      .catch((err) => {
        res.statusCode = 404;
        resHandler.errHandler(res);
        console.log(err);
      });
  
  //gets specific note
  }else if(dirName === '/notes' && (filename) && httpVerb === 'GET') {
    dataStore.retrieveFile(relPath)
      .then((data) => {
        resHandler.writeFile(data, res);
      })
      .catch((err, data) => {
        if (!data) {
          res.statusCode = 410;
          resHandler.errHandler(res);
          console.log(err);
        }else{
          res.statusCode = 500;
          resHandler.errHandler(res);
          console.log(err);
        }
        res.end();
      });

  //gets directory list of all notes
  }else if(dirName === '/notes' && httpVerb === 'GET') {
    dataStore.retrieveDir(relPath)
      .then((data) => {
        resHandler.writeDir(data, res);
      })
      .catch((err) => {
        res.statusCode = 500;
        resHandler.errHandler(res);
        console.log(err);
      });
  }else{
    res.statusCode = 400;
    resHandler.errHandler(res);
    console.log(res.statusCode, 'not valid path');
  }
});

module.exports = server;


//use promises in place of callbacks in the server - affects dataStore.js
//take functionality inside each case in server and encapsulate into separate functions
//revisit separated case functions and maybe make them methods on a object that is in a separate file
//differntiate functionality for put & post