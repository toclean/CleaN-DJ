<<<<<<< HEAD:commands/ping.js
exports.ping = function ping(message) {
=======
exports.modules = function ping (message) {
>>>>>>> Converted code from javascript to typescript:commands/ping.ts
	message.channel.send("Ping?").then(msg => {
		msg.edit(`Pong!, ${msg.createdTimestamp - message.createdTimestamp} ms`);
	});
}