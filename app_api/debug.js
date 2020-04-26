const debugConstructor = require('debug');

const debug = {};
debug.log = debugConstructor('log');
debug.error = debugConstructor('error');
debugConstructor.enable('*');

module.exports = debug;
