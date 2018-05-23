exports.modules = function embedMaker(client, message, title, fields) {

    message.channel.send({
        embed: {
            color: 3447004,
            title: title,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            fields: fields,
            timestamp: new Date()
        }
    });
}