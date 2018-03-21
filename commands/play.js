exports.play = function play(client, voiceConnection, dispatcher, queue, message) {
    function playSong()
    {
        if (upNext.playing) return 
        if (upNext.songs.length < 1) return message.channel.send('There are no more songs in the queue!');
        message.channel.send(`Now playing: ${upNext.songs[0].title} requested by ${upNext.songs[0].requester}`);
        var stream = yt(upNext.songs[0].url, { filter: 'audioonly' });
        dispatcher = voiceConnection.playStream(stream, { seek: 0, volume: 1 });

        dispatcher.on('end', () => {
            if (upNext.songs.length > 0)
            {
                upNext.songs.shift();
                playSong();
            }
        });
    }
}