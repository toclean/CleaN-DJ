let embedMaker = require('../tools/embedMaker.js').embedMaker;

let ytsearch = require('youtube-search');

let search, choices;

exports.add = function add(client, queue, message, opts) {
    if (message.content.includes('http'))
        search = message.content.replace(".add ", "")
    else
        search = message.content.split('.')[1].replace("add ", "");
    if (parseInt(search) && parseInt(search) <= 5 && parseInt(search) > 0){
        if (!choices || choices.length < 1) return;
        
        let choice = choices[parseInt(search)-1];

        queue.songs.push({url: choice.link, title: choice.title, requester: message.author});
        songAdded(message, queue);

    }else if (!search.includes('http'))
    {
        ytsearch(search, opts, function(error, results) {
            let options = [];

            new Promise((resolve, reject) => {
                resolve(results);

                for (let i = 0; i < 5; i++){
                    options.push({name: `${i + 1}. ${results[i].title}`, value: `[LINK](${results[i].link})`});
                }
            });
            
            embedMaker(client, message, 'Pick one from below', options);

            choices = results;
        });
    }else if (search.includes('http'))
    {
        let id = search.split('=')[1];
        ytsearch(id, opts, function(error, results) {
            if (results.length > 0)
            {
                queue.songs.push({url: results[0].link, title: results[0].title, requester: message.author});
                songAdded(message, queue);
            }
        });
    }
}

function songAdded(message, queue){
    message.channel.send(`Added ${queue.songs[queue.songs.length - 1].title} to the queue!`);
}