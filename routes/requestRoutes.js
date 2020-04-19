const mongoose = require('mongoose');
const Request = mongoose.model('request');
const Alert = mongoose.model('alert');
const Notification = mongoose.model('notification');
module.exports = (app) => {
    // filled out with test information
    app.post('/api/postRequest', (req, res) => {
        console.log("posting new request");
        const putData = req.body;
        // these are all mandatory
        const title = putData.title || 'default';
        const description = putData.description || 'default';
        const location = putData.location || 'default';
        const email = putData.email || 'default';
        const firstname = putData.firstname || 'default first name';
        const lastname = putData.lastname || 'default last name';
        const latitude = putData.latitude || 39.9527236;
        const longitude = putData.longitude || -75.1940023;
        const newRequest = new Request({
            title: title,
            description: description,
            location: location,
            email: email,
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
                const putData = response;
                const title = putData.title || 'default';
                const description = putData.description || 'default';
                const location = putData.location || 'default';
                const email = putData.email || 'default';
                const firstname = putData.firstname || 'default first name';
                const lastname = putData.lastname || 'default last name';
                const latitude = putData.latitude || 39.9527236;
                const longitude = putData.longitude || -75.1940023;
                const newAlert = new Alert({
                    title: title,
                    description: description,
                    location: location,
                    email: email,
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
                                console.log("successful acceptance of a request");
                                res.json({ result: "successful acceptance of a request" });
                            }
                        })

                    }

                })
            }
        })
    })

    app.post('/api/rejectRequest', (req, res) => {
        console.log('rejecting request' + req.body._id);
        // remove the request
        Request.findByIdAndDelete(req.body._id, (err, response) => {
            if (err) {
                console.log(err);
                res.end();
            } else {
                const firstname = response.firstname || 'default first name';
                const lastname = response.lastname || 'default last name';
                console.log("successfully deleted request");
                const notification_description = "your request has been rejected";
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
                        console.log("successful rejection of a request");
                        res.json({ result: "successful rejection of a request" });
                    }
                })
            }
        })
    })

    app.get('/api/getAllRequests', (req, res) => {
        console.log("getting all requests");
        Request.find({}, (err, response) => {
            res.send(response);
        })
    })
}





