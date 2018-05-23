<<<<<<< HEAD:commands/skip.js
exports.skip = function skip(dispatcher, queue, message) {
=======
exports.modules = function skip (dispatcher, queue, message) {
>>>>>>> Converted code from javascript to typescript:commands/skip.ts
    if (queue.songs.length < 1) return message.channel.send('There are no more songs in the queue!');
    if (dispatcher) {
        message.channel.send(`Skipping ${queue.songs[0].title}!`);
        setTimeout(() => {
            dispatcher.end();
        }, 1000);
    }
}