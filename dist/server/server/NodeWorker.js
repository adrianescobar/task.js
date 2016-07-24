'use strict';

process.on('message', function (message) {
	var args = Object.keys(message).filter(function (key) {
		return key.match(/^argument/);
	}).sort(function (a, b) {
		return parseInt(a.slice(8), 10) - parseInt(b.slice(8), 10);
	}).map(function (key) {
		return message[key];
	});

	process.send({ id: message.id, result: eval('(' + message.func + ')').apply(null, args) });
});