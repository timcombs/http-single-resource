const http = require('http');
const url = require('url');
const sander = require('sander');
const Stream = require('stream');

const dataStore = require('./data-store.js');
const indexHtml = sander.createReadStream('index.html');

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  const parsedUrl = url.parse(req.url, true);
  const queryObj = parsedUrl.query;
  const httpVerb = req.method;

  const fullPath = parsedUrl.pathname;
  const splitPath = fullPath.split('/');

  const dirName = '/' + splitPath[1];
  const filename = splitPath[2];


  //server decides what method - CRUD
  //data-store then handles the method the server determines
  if (dirName === '/') {
    indexHtml.pipe(res);
  }else if(dirName === '/notes' && httpVerb === 'POST') {
    readBody(req, (err, body) => {
      if (err) console.log(err);
      res.write(body);
      res.end();
    });
  // }else if(dirName === '/notes' && httpVerb === 'PUT') {
  //   readBody(req, () => {
  //     //use the data
  //   });
  // }else if(dirName === '/notes' && httpVerb === 'DELETE') {
  //   readBody(req, () => {
  //     //use the data
  //   });
  }else if(dirName === '/notes' && (filename) && httpVerb === 'GET') {
    dataStore.retrieveFile(fullPath, filename, (err, data) => {
      if (err) {
        res.write(JSON.stringify(err));
        console.log(err);
        //if no data in the note part
      }else if (!JSON.parse(data)['note']) {
        res.write('That note is empty. Perhaps you meant to update the note');
      }else{
        res.write(data);
      }
      res.end();
    });
  }else if(dirName === '/notes' && httpVerb === 'GET') {
    dataStore.retrieveDir(fullPath, (err, data) => {
      if (err) {
        res.write(JSON.stringify(err));
        console.log(err);
      }else if (data.length === 0) {
        res.write('There are no notes, add some!');
      }else{
        data.forEach((file) => {
          res.write(file);
        });
      }
      res.end();
    });
  }else{
    res.statusCode = 404;
    console.log(res.statusCode);
    res.write(`there is no path at ${fullPath} please check your map`);
    res.end();
  }
});

const port = 8080;
server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('http server listening on port', port);
});

//from sander:
//sander.exists(<path>);
//sander.writeFile(basedir, filename, data).then( doTheNextThing );
//sander.unlink(<path>);

function readBody(req, cb) {
  let body = '';

  req.on('data', (data) => {
    body += data;
  });

  req.on('end', () => {
    try {
      cb(null, JSON.parse(body));
    }
    catch (err) {
      cb(err);
    }
  });
}

