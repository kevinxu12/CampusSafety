const mongoose = require('mongoose');
const Request = mongoose.model('request');
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
        Request.findOne({title: title}, (err, resp) => {
            if(err) {
                console.log("error finding post request");
            } else { 
                if(resp) {
                    console.log("post request of title" + title + "already exists");
                } else {
                    newRequest.save((err) => {
                        if(err) {
                            console.log("error saving new post request");
                        } else {
                            console.log("success");
                            res.json({result: "success"});
                        }
                    })
                }
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