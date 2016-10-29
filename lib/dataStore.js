const sander = require('sander');

//methods on dataStore correspond to CRUD operations
const dataStore = {};

//any errors thrown in a callback jump to the catch
//returning sander is the same thing as returning promise
dataStore.retrieveDir = function(relPath) {
  return sander.readdir(relPath);
};

dataStore.retrieveFile = function(relPath) {
  return sander.readFile(relPath);
};

dataStore.stash = function(relPath, body) {
  sander.writeFile(relPath, body);
};

dataStore.update = function(relPath, body) {
  return sander.writeFile(relPath, body);
};

dataStore.remove = function(relPath) {
  return sander.unlink(relPath);
};

module.exports = dataStore;