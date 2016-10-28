// const http = require('http');
// const url = require('url');
const server = require('./lib/server.js');

const port = 8080;
server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('http server listening on port', port);
});