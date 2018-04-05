let yt = require('ytdl-core');

exports.play = function play(client, voiceConnection, dispatcher, upNext, message) {

    if (upNext.playing) return message.channel.sned('The music bot is alreayd playing!');
    if (upNext.songs.length < 1) return message.channel.send('There are no more songs in the queue!');
    if (dispatcher) dispatcher = null;

    streamReady(yt(upNext.songs[0].url, { filter: 'audioonly' }));

    function streamReady(stream)
    {
        streaming(voiceConnection.playStream(stream, { seek: 0, volume: 1 }));
    }

    function streaming(dis)
    {
        dispatcher = dis;
        dispatcher.on('error', error);
        dispatcher.on('end', ended);
        dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${upNext.songs[0].title} requested by ${upNext.songs[0].requester}`);
        });
    }

    function ended()
    {
        console.log('ending');
        if (upNext.replay)
        {
            playSong();
            return;
        }

        if (upNext.songs.length > 0)
        {
            upNext.songs.shift();
            play(client, voiceConnection, dispatcher, upNext, message);
        }
    }

    function error(err)
    {
        console.error;
    }
}