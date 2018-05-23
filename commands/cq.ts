exports.modules = function cq(queue, message) {
    if (queue.songs.length < 1) return message.channel.send('There are no items in the queue!');
    message.channel.send(`Queue of size ${queue.songs.length} has been emptied!`);
    queue = {
        playing: false,
        replay: false,
        songs: []
    };
    return queue;
}