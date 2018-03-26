const config = require('./config.json');
const commander = require('./commands.js');
const Job = require('./models/job.js').Job;
const jobsc = require('./jobscheduler.js');

const commands = commander.commands;

const Discord = require('discord.js');
const client = new Discord.Client();

let POSTED_ABOUT_LIVESTREAM;

client.login(config.token);
client.on('ready', () => {
	console.log(`Connected as ${client.user.username}!`);
	
	jobsc.jobscheduler(client);
});

client.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith('.')) return;
	handle_command(message);
});	

client.on('presenceUpdate', (oldMember, newMember) => 
{
	let channel = client.channels.filter(channel => channel.type == 'text').first();
	console.log(oldMember.presence.game);
	console.log(newMember.presence.game);

	if (POSTED_ABOUT_LIVESTREAM)
	{
		POSTED_ABOUT_LIVESTREAM = false;
		return;
	}

	if ((oldMember.presence.game == null || !oldMember.presence.game.streaming) && (newMember.presence.game != null && newMember.presence.game.streaming))
	{
		POSTED_ABOUT_LIVESTREAM = true;
		return channel.send(`${newMember.displayName} has started streaming ${newMember.presence.game.url}`);
	}
});

function handle_command(message) {
	for (var i = 0; i < commands.length; i++){
		if (message.content.substr(1).toLowerCase().startsWith(commands[i].command.toLowerCase())){
			if (commands[i].command == 'help' || commands[i].command == 'queue' || commands[i].command == 'add' || commands[i].comamnd == 'queue' || commands[i].command == 'play')
			{
				commands[i].execute(client, message);
			}else{
				commands[i].execute(message);
			}
		}
	}
}