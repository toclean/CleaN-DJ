let embedMaker = require('../tools/embedMaker.js').embedMaker;

exports.help = function help(client, message, commands) {
	let info = [];
	for (let i = 0; i < commands.length; i++) {
		info[i] = {
			name: `${commands[i].command} ${commands[i].arguments}`,
			value: commands[i].description
		};
	}

	embedMaker(client, message, 'Help', info);
}