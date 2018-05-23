<<<<<<< HEAD:commands/help.js
let embedMaker = require('../tools/embedMaker.js').embedMaker;

exports.help = function help(client, message, commands) {
=======
var embedMaker = require('../tools/embedMaker.ts').embedMaker;

exports.modules = function help (client, message, commands) {
>>>>>>> Converted code from javascript to typescript:commands/help.ts
	let info = [];
	for (let i = 0; i < commands.length; i++) {
		info[i] = {
			name: `${commands[i].command} ${commands[i].arguments}`,
			value: commands[i].description
		};
	}

	embedMaker(client, message, 'Help', info);
}