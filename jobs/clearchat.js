exports.clearchat = function (client)
{
	
	// Gets every text channel in the server
	var textChannels = client.channels.filter(channel => channel.type == 'text');

	var guild = client.guilds.filter(x => x.name == 'cleanspeak').first();

	var dt = new Date();
	var utcDate = dt.toUTCString();

	console.log(`[${utcDate}] - [JOB:CLEAR-ALL-CHATS]: RUNNING`);

	textChannels.forEach(
		async function(channel)
		{
			await channel.delete();
			await guild.createChannel(channel.name, 'text');
		}
	);
}