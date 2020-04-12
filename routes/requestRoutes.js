const mongoose = require('mongoose');
const Request = mongoose.model('request');
const Alert = mongoose.model('alert');
const Notification = mongoose.model('alert');
module.exports = (app) => {
    // filled out with test information
    app.post('/api/postRequest', (req, res) => {
        console.log("posting new request");
        const putData = req.body;
        // these are all mandatory
        const title = putData.title;
        const description = putData.description;
        const location = putData.location;
        const firstname = putData.firstname;
        const lastname = putData.lastname;
        const latitude = putData.latitude;
        const longitude = putData.longitude;
        const newRequest = new Request({
            title: title,
            description: description,
            location: location,
            firstname: firstname,
            lastname: lastname,
            latitude: latitude,
            longitude: longitude
        })
        Request.findOne({ title: title }, (err, resp) => {
            if (err) {
                console.log("error finding post request");
            } else {
                if (resp) {
                    console.log("post request of title" + title + "already exists");
                    res.end();
                } else {
                    newRequest.save((err) => {
                        if (err) {
                            console.log("error saving new post request");
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

    app.post('/api/acceptRequest', (req, res) => {
        console.log('accepting Request' + req.body._id);
        // remove the request
        Request.findByIdAndDelete(req.body._id, (err, response) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                console.log("successfully deleted request");
                const title = response.title;
                const description = response.description;
                const location = response.location;
                const firstname = response.firstname;
                const lastname = response.lastname;
                const latitude = response.latitude;
                const longitude = response.longitude;
                const newAlert = new Alert({
                    title: title,
                    description: description,
                    location: location,
                    firstname: firstname,
                    lastname: lastname,
                    latitude: latitude,
                    longitude: longitude
                })
                newAlert.save((err) => {
                    if (err) {
                        console.log("error saving the new alert " + err);
                        res.end();
                    } else {
                        const notification_description = "your request has been accepted";
                        const newNotification = new Notification({
                            firstname: firstname,
                            lastname: lastname,
                            description: notification_description

                        })
                        newNotification.save((err) => {
                            if (err) {
                                console.log("error saving new notification");
                                res.end();
                            } else {
                                console.log("successful added new alert");
                                res.json({ result: "success" });
                            }
                        })

                    }

                })
            }
        })
    })

    app.post('/api/rejectRequest', (req, res) => {
        console.log('rejecting request' + req.body._id);
    })

    app.get('/api/getAllRequests', (req, res) => {
        console.log("getting all requests");
        Request.find({}, (err, response) => {
            res.send(response);
        })
    })
}