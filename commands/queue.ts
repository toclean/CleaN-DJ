var embedMaker = require('../tools/embedMaker.ts').embedMaker;

exports.modules = function queue(client, queue, message) {
    if (queue.songs.length < 1) return message.channel.send('There are no items in the queue!');

    let info = [];
    for (let i = 0; i < queue.songs.length; i++) {
        info[i] = {
            name: `${i+1}. ${queue.songs[i].title}`,
            value: `[LINK](${queue.songs[i].url})`
        };
    }

    embedMaker(client, message, 'Queue', info);
}