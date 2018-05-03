// const EventEmitter = require("events");
// let toExport = {};
// toExport.__proto__ = EventEmitter.prototype
// module.exports = toExport;
// exports = toExport;

// console.log(module.exports.__proto__);
// console.log(exports.__proto__);

console.log(exports === module.exports);

module.exports = { name : "sahil" };

console.log(exports);
console.log(module.exports);

