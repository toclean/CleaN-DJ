exports.join = async function join(message, voiceConnection, voiceChannel) {
    voiceChannel = message.member.voiceChannel;
    voiceConnection = await voiceChannel.join();
    if (voiceChannel) message.channel.send(`Connected to ${voiceChannel.name}`);
    return await [voiceChannel, voiceConnection];
}