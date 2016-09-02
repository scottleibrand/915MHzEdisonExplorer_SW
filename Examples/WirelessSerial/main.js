
var bleno = require('bleno');

var DeviceInformationService = require('./device-information-service');
var WSService = require('./wirelessserial-service');


var deviceInformationService = new DeviceInformationService();
var wsService = new WSService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('ws', [wsService.uuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  
  if (!error) {
    bleno.setServices([
      deviceInformationService,
      wsService
    ]);
  }
});