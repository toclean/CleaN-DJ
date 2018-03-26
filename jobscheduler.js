let clearchat = require('./jobs/clearchat.js');

exports.jobscheduler = function (client)
{
    setInterval(function() { clearchat.clearchat(client); } , 2*60*60*1000);
}