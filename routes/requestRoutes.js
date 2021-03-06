const mongoose = require('mongoose');
const Request = mongoose.model('request');
const Alert = mongoose.model('alert');
const Notification = mongoose.model('notification');
const Analytics = mongoose.model('analytics');
const Marker = mongoose.model('marker');

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
        console.log(newRequest);
        Request.findOne({ title: title }, (err, resp) => {
            if (err) {
                console.log("error finding post request");
            } else {
                if (resp) {
                    console.log("post request of title" + title + "already exists");
                    res.end();
                } else {
                    Marker.find( { $and: [ { latitude : latitude}, { longitude : longitude } ] }, (err, response) =>{
                        if (err){
                            console.log("error finding latitude, longitude")
                        } else {
                            if(response){
                                rand = Math.floor(Math.random() * 10) + 1;
                                lat = latitude + (0.00001 * rand);
                                const changedRequest = new Request({
                                    title: title,
                                    description: description,
                                    location: location,
                                    email: email,
                                    firstname: firstname,
                                    lastname: lastname,
                                    latitude: lat,
                                    longitude: longitude
                                })

                                changedRequest.save((err) => {
                                    if (err) {
                                        console.log("error saving new post request");
                                        res.end();
                                    } else {
                                        console.log("success changed");
                                        res.json({ result: "success in changed request" });
                                    }
                                })
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
                        const notification_description = "'" + title + "' has been accepted";
                        const newNotification = new Notification({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            description: notification_description

                        })
                        newNotification.save((err) => {
                            if (err) {
                                console.log("error saving new notification");
                                res.end();
                            } else {
                                console.log("successful acceptance of a request");
                                Analytics.findOneAndUpdate({name: "analytics"}, {$inc: {"requestMade": 1, "requestAccepted": 1}}, (err) => {
                                    if(err) {
                                        console.log("error with analytics");
                                        res.end();
                                    } else {
                                        console.log("successful analytics update")
                                        res.json({ result: "successful acceptance of a request" });
                                    }
                                })
                               
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
                const title = response.title || 'default title';
                const email = response.email || 'default email';
                console.log("successfully deleted request");
                const notification_description = "'" + title + "' has been rejected";
                const newNotification = new Notification({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    description: notification_description
                })
                newNotification.save((err) => {
                    if (err) {
                        console.log("error saving new notification");
                        res.end();
                    } else {
                        console.log("successful rejection of a request");
                        Analytics.findOneAndUpdate({name: "analytics"}, {$inc: {"requestMade": 1, "requestRejected": 1}}, (err) => {
                            if(err) {
                                console.log("error with analytics");
                                res.end();
                            } else {
                                console.log("successful analytics update");
                                res.json({ result: "successful rejection of a request" });
                            }
                        })
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

    app.post('/api/getAllRequestsForUser', (req, res) => {
        console.log("getting all requests for" + req.body.email);
        Request.find({email: req.body.email}, (err, response) => {
            res.send(response);
        })
    })
}





