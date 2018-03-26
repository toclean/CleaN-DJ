exports.anm = async function (message)
{
    let msg = message.content.split('.anm ')[1];

    var guild = message.guild;
    guild.members.forEach(function (member)
    {
        member.send(msg);
    });
}