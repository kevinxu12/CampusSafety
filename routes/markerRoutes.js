var routes = function(Request, Marker) {

    var getAllMarkers = function(req, res) {
        console.log("getting all markers");
        Marker.find({}, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                res.send(response);
            }
        })
    }
    
    var postUserMarker = function(req, res) {
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

    }

    var postAdminMarker = function(req, res) {
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
        const newMarker = new Marker({
            latitude: lat,
            longitude: long, 
            title: title,
            description: description,
            location: location,
            firstname: firstname,
            lastname: lastname
        })

        newMarker.save(function (err, response) {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log(response);
                res.send("success");
            }
        })
    }

    return {
        get_all_markers: getAllMarkers,
        post_user_marker: postUserMarker,
        post_admin_marker: postAdminMarker
    }
}