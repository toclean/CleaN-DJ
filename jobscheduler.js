var clearchat = require('./jobs/clearchat.js').clearchat;

exports.jobscheduler = function ()
{
    setInterval(clearchat, 3*1000);
}