const mongoose = require('mongoose');
const Request = mongoose.model('marker');
module.exports = (app) => {
    // filled out with test information
    app.post('/api/postMarker', (req, res) => {
        console.log("posting new marker on map");
        const markerData = req.body;
        // these are all mandatory
        const lat = markerData.latitude;
        const long = markerData.longitude;
        const title = markerData.title;
        const description = markerData.description;
        const location = markerData.location;
        const firstname = markerData.firstname;
        const lastname = markerData.lastname;
        const newRequest = new Request({
            latitude: lat,
            longitude: long, 
            title: title,
            description: description,
            location: location,
            firstname: firstname,
            lastname: lastname
        })
        /*
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
                            res.send("success");
                        }
                    })
                }
            }
        })

        */
    })

    app.get('/api/getAllMarkers', (req, res) => {
        console.log("getting all markers");
        Request.find({}, (err, response) => {
            res.send(response);
        })
    })
}