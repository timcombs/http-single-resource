const http = require('http');
const fs = require('fs');
const url = require('url');
const sander = require('sander');
const Stream = require('stream');

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  const parsedUrl = url.parse(req.url, true);
  const queryObj = parsedUrl.query;
  const pathname = parsedUrl.pathname;
  const httpVerb = req.method;

  if (req.url === '/') {
    indexHtml.pipe(res);
  }else if(req.url === '/notes' && httpVerb === 'POST') {
    readBody(req, () => {
      //use the data
    });
    console.log('stuff');
  }else if(req.url === '/notes' && httpVerb === 'PUT') {
    readBody(req, () => {
      //use the data
    });
    console.log('stuff');
  }else if(req.url === '/notes' && httpVerb === 'DELETE') {
    readBody(req, () => {
      //use the data
    });
    console.log('stuff');
  }else if(req.url === '/notes/<specific_note>') {
    readBody(req, () => {
      //use the data
    });
    console.log('stuff');
  }else if(req.url === '/notes') {
    readBody(req, () => {
      //use the data
    });
    console.log('stuff');
  }else{
    console.log(`there is no path at ${pathname} please check your map`);
    res.statusCode = 404;
    res.write('404 not found');
    res.end();
  }
});

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

