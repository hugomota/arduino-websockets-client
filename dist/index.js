'use strict';

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var five = require("johnny-five");
var board = new five.Board();

var endpoint = 'http://127.0.0.1:8080';
var socket = (0, _socket2.default)(endpoint);

var allData = {
  ldrReading: 0,
  ldrCenas: 120
};

var emitAll = function emitAll() {
  return socket.emit('newArduinoRead', allData);
};

board.on("ready", function () {
  var light = new five.Light("A0");
  light.on("change", function () {
    allData.ldrReading = this.level;

    emitAll();
  });
});

board.on("ready", function () {
  var light = new five.Light("A0");
  light.on("change", function () {
    allData.ldrCenas = 12;

    emitAll();
  });
});