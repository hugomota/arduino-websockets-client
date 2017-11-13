var five = require("johnny-five");
var board = new five.Board();

import socketIOClient from 'socket.io-client';

const endpoint = 'http://127.0.0.1:8080';
const socket = socketIOClient(endpoint);

const allData = {
  ldrReading: 0,
};

const emitAll = () => socket.emit('newArduinoRead', allData);

board.on("ready", function() {
  var light = new five.Light("A0");
  light.on("change", function() {
    allData.ldrReading = this.level;

    emitAll();
  });
});