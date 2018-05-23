exports.clear = async function clear(message) {
    var name = message.channel.name;
    await message.channel.delete();
    var channel = await message.guild.createChannel(name, 'general');
    //var category = await message.guild.channels.find(channel => channel.name.toLowerCase() == 'text channels').calculatedPosition;
    //await message.guild.setChannelPosition(channel, category);
}