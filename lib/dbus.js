"use strict";

var _dbus = require('../build/Release/dbus.node');

var Utils = require('./utils');
var Bus = require('./bus');
var Service = require('./service');
var Error = require('./error');

var DBus = module.exports = function(opts) {
};

DBus.Define = Utils.Define;
DBus.Signature = Utils.Signature;
DBus.Error = Error;

DBus.getBus = function(busName) {
	return new Bus(_dbus, busName);
}

/* Deprecated */
DBus.prototype.getBus = function(busName) {
	return DBus.getBus(busName);
};

DBus.registerService = function(busName, serviceName) {
	var self = this;

	var _serviceName = serviceName || null;

    var serviceHash;
	if (serviceName) {
		// Return bus existed
		serviceHash = busName + ':' + _serviceName;
	}

	// Get a connection
	var bus = DBus.getBus(busName);

	if (!serviceName)
		_serviceName = bus.connection.uniqueName;

	// Create service
	var service = new Service(bus, _serviceName);
    bus.serviceMap[serviceHash] = service;

	if (serviceName) {
		process.nextTick(function() {
			DBus._requestName(bus, _serviceName);
		});
	}

	return service;
};

/* Deprecated */
DBus.prototype.registerService = function(busName, serviceName) {
	return DBus.registerService(busName, serviceName);
}

DBus._requestName = function(bus, serviceName) {
	_dbus.requestName(bus.connection, serviceName);
};
