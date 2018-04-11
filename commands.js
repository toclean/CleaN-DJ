let ping = require('./commands/ping.js').ping;
let help = require('./commands/help.js').help;
let add = require('./commands/add.js').add;
let play = require('./commands/play.js').play;
let join = require('./commands/join.js').join;
let skip = require('./commands/skip.js').skip;
let clear = require('./commands/clear.js').clear;
let stop = require('./commands/stop.js').stop;
let leave = require('./commands/leave.js').leave;
let cq = require('./commands/cq.js').cq;
let queue = require('./commands/queue.js').queue;
let anm = require('./commands/amn.js');

let yt = require('ytdl-core');

let embedMaker = require('./tools/embedMaker.js').embedMaker;

const config = require('./config.json');

let voiceConnection, voiceChannel, dispatcher;

let upNext = {
	playing: false,
	replay: false,
	songs: []
};

let opts = {
	maxResults: 5,
	key: config.youtube,
	type: "video"
};

let commands = [{
		command: "help",
		description: "Shows this help message",
		arguments: [],
		execute: function (client, message) {
			help(client, message, commands);
		}
	},
	{
		command: "ping",
		description: "Replys to a users message with ping",
		arguments: [],
		execute: function (message) {
			ping(message);
		}
	},
	{
		command: "join",
		description: "Connects to the voice channel",
		arguments: [],
		execute: async function (message) {
			let connectionInfo = await join(message, voiceConnection, voiceChannel);
			voiceChannel = await connectionInfo[0];
			voiceConnection = await connectionInfo[1];
		}
	},
	{
		command: "leave",
		description: "Leaves the voice channel",
		arguments: [],
		execute: function (message) {
			leave(voiceConnection, voiceChannel, upNext, message);
		}
	},
	{
		command: "play",
		description: "Starts playing the songs in queue",
		arguments: [],
		execute: async function (client, message) {
			let connectionInfo;
			if (!voiceConnection) {
				connectionInfo = await join(message, voiceConnection, voiceChannel);
				voiceChannel = await connectionInfo[0];
				voiceConnection = await connectionInfo[1];
			}

			if (upNext.playing) return message.channel.sned('The music bot is alreayd playing!');
			if (upNext.songs.length < 1) return message.channel.send('There are no more songs in the queue!');
			if (dispatcher) dispatcher = null;

			playSong();

			function playSong() {
				streamReady(yt(upNext.songs[0].url, {
					filter: 'audioonly'
				}));
			}

			function streamReady(stream) {
				streaming(voiceConnection.playStream(stream, {
					seek: 0,
					volume: 1
				}));
			}

			function streaming(dis) {
				dispatcher = dis;
				dispatcher.on('error', error);
				dispatcher.on('end', ended);
				dispatcher.on('start', () => {
					message.channel.send(`Now playing: ${upNext.songs[0].title} requested by ${upNext.songs[0].requester}`);
				});
			}

			function ended() {
				console.log('ending');
				if (upNext.replay) {
					playSong();
					return;
				}

				if (upNext.songs.length > 0) {
					upNext.songs.shift();
					playSong();
				}
			}

			function error(err) {
				console.error;
			}
		}
	},
	{
		command: "add",
		description: "Adds a song to the queue",
		arguments: ["<search>", "<url>"],
		execute: function (client, message) {
			add(client, upNext, message, opts);
		}
	},
	{
		command: "skip",
		description: "Skips the current song",
		arguments: [],
		execute: function (message) {
			skip(dispatcher, upNext, message);
		}
	},
	{
		command: "cq",
		description: "Clears the queue",
		arguments: [],
		execute: function (message) {
			upNext = cq(upNext, message);
		}
	},
	{
		command: "queue",
		description: "Shows the contents of the queue",
		arguments: [],
		execute: function (client, message) {
			queue(client, upNext, message);
		}
	},
	{
		command: "replay",
		description: "Replays the current song",
		arguments: [],
		execute: function (message) {
			if (upNext.replay) {
				message.channel.send('Replay is off!');
				upNext.replay = false;
			} else {
				message.channel.send('Replay is on!');
				upNext.replay = true;
			}
		}
	},
	{
		command: "clear",
		description: "Clears the chat",
		arguments: [],
		execute: async function (message) {
			clear(message);
		}
	},
	{
		command: "stop",
		description: "Stops playback and empties queue",
		arguments: [],
		execute: function (message) {
			if (dispatcher) {
				voiceConnection.disconnect();
				voiceConnection = null;
				dispatcher = null;
			}
		}
	},
	{
		command: "pause",
		description: "Pause playback",
		arguments: [],
		execute: function (message) {
			if (!dispatcher.paused)
				dispatcher.pause();
		}
	},
	{
		command: "resume",
		description: "Resume playback",
		arguments: [],
		execute: function (message) {
			if (dispatcher.paused)
				dispatcher.resume();
		}
	},
	{
		command: "anm",
		description: "Sends a message to all users in the server (online/offline)",
		arguments: [],
		execute: function (message) {
			anm.anm(message);
		}
	}
]

exports.commands = commands;