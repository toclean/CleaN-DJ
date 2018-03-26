exports.clear =  async function clear(message) {
    let perm = message.channel.permissionsFor(message.member);
    let canManageChannels = perm.has('MANAGE_MESSAGES');

    // Logging
    if (!canManageChannels) {
        message.author.send('You do not have permissions to clear chat!');
        return console.log(`[${message.author.tag}] -> did not have permission (MANAGE_MESSAGES)`);
    }

    console.log(`[${message.author.tag}] -> Cleared all chats!`);

    // Gets every text channel in the server
    let textChannels = message.guild.channels.filter(channel => channel.type == 'text');
    let guild = message.guild;
    
    textChannels.forEach(async function (channel) {
        await channel.delete();
        await guild.createChannel(channel.name, 'text');
    });
}