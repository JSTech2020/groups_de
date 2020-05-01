const EventEmitter = require('events');

class ZSEventEmitter extends EventEmitter {}

module.exports = new ZSEventEmitter();