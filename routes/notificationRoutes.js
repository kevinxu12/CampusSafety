const mongoose = require('mongoose');
const Alert = mongoose.model('alert');

module.exports = (app) => {
    app.get('/api/getAllNotifications', (req, res) => {
        var email = req.body.email;

        Alert.find({email: email}, function(err, response) {
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
        })

    })

    app.post('/api/removeNotification', (req, res) => {

    });
}