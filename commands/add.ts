var embedMaker = require('../tools/embedMaker.ts').embedMaker;

let ytsearch = require('youtube-search');

let search, choices;

exports.modules = function add(client, queue, message, opts) {
    if (message.content.includes('http'))
        search = message.content.replace(".add ", "")
    else
        search = message.content.split('.')[1].replace("add ", "");
    }

    if (parseInt(search) && parseInt(search) <= 5 && parseInt(search) > 0) {
        if (!choices || choices.length < 1) return;

        let choice = choices[parseInt(search) - 1];

        queue.songs.push({
            url: choice.link,
            title: choice.title,
            requester: message.author
        });
        songAddedMessage(message, queue);

    } else if (!search.includes('http')) {
        ytsearch(search, opts, function (error, results) {
            let options = [];

            new Promise((resolve, reject) => {
                if (error) reject(results);
                resolve(results);

                for (var i = 0; i < opts.maxResults; i++) {
                    options.push({
                        name: `${i + 1}. ${results[i].title}`,
                        value: `[LINK](${results[i].link})`
                    });
                }
            });

            embedMaker(client, message, 'Pick one from below', options);

            choices = results;
        });
    } else if (search.includes('http')) {
        let id = search.split('=')[1];
        ytsearch(id, opts, function (error, results) {
            if (results.length > 0) {
                queue.songs.push({
                    url: results[0].link,
                    title: results[0].title,
                    requester: message.author
                });
                songAddedMessage(message, queue);
            }
        });
    }
}

function songAddedMessage(message, queue) {
    message.channel.send(`Added ${queue.songs[queue.songs.length - 1].title} to the queue!`);
}