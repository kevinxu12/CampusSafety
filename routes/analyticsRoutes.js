const mongoose = require('mongoose');
const Analytics = mongoose.model('analytics');
module.exports = (app) => {
    // filled out with test information
    // information like number accepted
    // number rejected
    app.get('/api/getAnalytics', (req, res) => {
        Analytics.find({}, (err, response) => {
            res.send(response);
        });
    });

    app.get('/api/initializeAnalytics', (req, res) => {
        const newAnalytics = new Analytics({
            name: "analytics",
            requestMade: 0,
            requestRejected: 0,
            requestAccepted: 0,
        })
        Analytics.findOne({ name: "analytics" }, (err, resp) => {
            if (err) {
                console.log("error finding analytics");
            } else {
                if (resp) {
                    console.log("object with name analytics already exists");
                    res.end();
                } else {
                    newAnalytics.save((err) => {
                        if (err) {
                            console.log("error saving new analytics");
                            res.end();
                        } else {
                            console.log("success");
                            res.json({ result: "success" });
                        }
                    })
                }
            }
        })
    })
}





