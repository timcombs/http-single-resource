const sander = require('sander');

//methods on dataStore correspond to CRUD operations
const dataStore = {};

//any errors thrown in a callback jump to the catch
//returning sander is the same thing as returning promise
dataStore.retrieveDir = function(fullPath) {
  let relPath = '.' + fullPath;
  return sander.readdir(relPath);
};

dataStore.retrieveFile = function(fullPath) {
  let relPath = '.' + fullPath;
  return sander.readFile(relPath);
};

dataStore.stash = function(fullPath, body) {
  let relPath = '.' + fullPath;
  return sander.writeFile(relPath, body);
};

dataStore.update = function(fullPath, body) {
  let relPath = '.' + fullPath;
  return sander.writeFile(relPath, body);
};

dataStore.remove = function(fullPath) {
  let relPath = '.' + fullPath;
  return sander.unlink(relPath);
};

module.exports = dataStore;