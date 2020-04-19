const mongoose = require('mongoose');
const Notification = mongoose.model('notification');

module.exports = (app) => {
    app.post('/api/getAllNotifications', (req, res) => {
        var email = req.body.email;
        console.log("here");
        Notification.find({email: email}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response[0] == null) {
                    console.log("no alerts");
                    res.json({result: "no alerts"});
                } else {
                    console.log("Found alerts");
                    res.send(response);
                }
            }
        }).sort( [['_id', -1]] ).limit(2);

    })

    app.post('/api/removeNotification', (req, res) => {

    });
}