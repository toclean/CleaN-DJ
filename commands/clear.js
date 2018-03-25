exports.clear = async function clear(message)
{
    let perm = message.channel.permissionsFor(message.member);

    let canManageChannels = perm.has('MANAGE_MESSAGES');

    // Logging
    if (canManageChannels)
    {
        console.log(`[${message.author.tag}] -> Cleared all chats!`);
    }
    else
    {
        console.log(`[${message.author.tag}] -> did not have permission (MANAGE_MESSAGES)`);
    }

    // Gets every text channel in the server
	var textChannels = message.guild.channels.filter(channel => channel.type == 'text');

	var guild = message.guild;

	textChannels.forEach(
		async function(channel)
		{
			await channel.delete();
			await guild.createChannel(channel.name, 'text');
		}
	);
}