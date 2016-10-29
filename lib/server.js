const http = require('http');
const url = require('url');
const sander = require('sander');

const readBody = require('./readBody.js');
const dataStore = require('./dataStore.js');
const indexHtml = sander.createReadStream('index.html');

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  const parsedUrl = url.parse(req.url, true);
  //const queryObj = parsedUrl.query;
  const httpVerb = req.method;

  const fullPath = parsedUrl.pathname;
  const splitPath = fullPath.split('/');

  const dirName = '/' + splitPath[1];
  const filename = splitPath[2];

console.log(dirName);
  //server decides what CRUD method then dataStore handles the fs operation
  if (dirName === '/') {
    indexHtml.pipe(res);
  }else if(dirName === '/notes' && (filename) && httpVerb === 'POST') {
    readBody(req) 
      .then((body) => {
        dataStore.stash(fullPath, body);
      })
      .then(() => {
        res.write('Your file has been written');
        res.end();
      })
    .catch((err) => {
      res.write(JSON.stringify(err));
      console.log(err);
      res.end();
    });
  }else if(dirName === '/notes' && (filename) && httpVerb === 'PUT') {
    readBody(req) 
      .then((body) => {
        dataStore.update(fullPath, body);
      })
      .then(() => {
        res.write('Your file has been updated');
        res.end();
      })
      .catch((err) => {
        res.write(JSON.stringify(err));
        console.log(err);
        res.end();
      });
  }else if(dirName === '/notes' && httpVerb === 'DELETE') {
    dataStore.remove(fullPath)
      .then(() => {
        res.write('Your file has been deleted');
        res.end();
      })
      .catch((err) => {
        res.write(JSON.stringify(err));
        console.log(err);
        res.end();
      });
  }else if(dirName === '/notes' && (filename) && httpVerb === 'GET') {
    dataStore.retrieveFile(fullPath)
      .then((data) => {
        //if no data in the note part
        if (!JSON.parse(data)['text']) {
          res.write('That note is empty. Perhaps you meant to update the note?');
        }else{
          res.write(data);
        }
        res.end();
      })
      .catch((err, data) => {
        if (!data) {
          res.write('That is not a valid note. Perhaps you meant to create a new note?');
        }else{
          res.write(JSON.stringify(err));
          console.log(err);
        }
        res.end();
      });
  }else if(dirName === '/notes' && httpVerb === 'GET') {
    dataStore.retrieveDir(fullPath)
      .then((data) => {
        //resHandler.writeDir(data)
        if (data.length === 0) {
          res.write('There are no notes, add some!');
        }else{
          data.forEach((file) => {
            res.write(file);
            res.write('\n');
          });
        }
        res.end();})
      .catch((err) => {
        res.write(JSON.stringify(err));
        console.log(err);
        res.end();
      });
  }else{
    res.statusCode = 404;
    console.log(res.statusCode);
    res.write(`there is no path at ${fullPath} please check your map`);
    res.end();
  }
});

module.exports = server;


//use promises in place of callbacks in the server - affects dataStore.js
//take functionality inside each case in server and encapsulate into separate functions
//make readBody a separate file and require it in
//revisit separated case functions and maybe make them methods on a object that is in a separate file
//create a separate index.js file for the server listener
//differntiate functionality for put & post