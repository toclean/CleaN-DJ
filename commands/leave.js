exports.leave = function leave(voiceConnection, voiceChannel, queue, message) {
    if (voiceConnection) {
        queue.playing = false;
        voiceConnection.disconnect();
        voiceChannel.leave();
        message.channel.send(`Disconnected from ${voiceChannel.name}`);
        voiceConnection = null;
        voiceChannel = null;
    }
}