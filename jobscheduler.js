var clearchat = require('./jobs/clearchat.js');

exports.jobscheduler = function (client)
{
    setInterval(function() { clearchat.clearchat(client); } , 3*1000);
}