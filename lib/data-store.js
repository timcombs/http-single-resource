const sander = require('sander');

const dataStore = {};

// dataStore.retrieveDir = function(fullPath, cb) {
//   let relPath = '.' + fullPath;
//   sander.readdir(relPath)
//     .then((data) => {
//       cb(null, data);
//     })
//     .catch(() => {
//       cb({err: '404 - Directory not found'});
//     });
// };

//any errors thrown in a callback jump to the catch
//retrieveFile could return a promise
dataStore.retrieveFile = function(fullPath, filename, cb) {
  let relPath = '.' + fullPath;
  sander.readFile(relPath)
    .then((data) => {
      console.log('read file success');
      cb(null, data);
    })
    .catch(() => {
      console.log('read file faill');
      cb({err: '404 - File not found', relPath});
    });
};
// dataStore.stash =
// dataStore.update = 
// dataStore.remove =








module.exports = dataStore;