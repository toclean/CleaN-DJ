exports.ping = function ping (message) {
	message.channel.send("Ping?").then(msg => {
		msg.edit(`Pong!, ${msg.createdTimestamp - message.createdTimestamp} ms`);
	});
}