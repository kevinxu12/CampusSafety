var axios = require('axios');

var routes = function(Request, Marker, Alert, Admin) {
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
        var latitude;
        var longitude;
        const location = markerData.location;
        const title = markerData.title;
        const description = markerData.description;
        const firstname = markerData.firstname;
        const lastname = markerData.lastname;
        const email = markerData.email;
        var lat;
        var long;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params:{
                address: location,
                key: 'AIzaSyBVFtzDmYguhjT8MJU2sxOfKNbLR1X-hVA'
            }
        })
        .then(function(response) {
            latitude = response.data.results[0].geometry.location.lat;
            longitude = response.data.results[0].geometry.location.lng;
            lat = latitude;
            long = longitude;

            Marker.find({latitude: lat, longitude: long}, function(err, response) {
                if (err) {
                    console.log(err);
                } else if (response.length != 0) {
                    // marker exists
                    lat = lat + 0.01;
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
                            const newAlert = new Alert({
                                latitude: lat,
                                longitude: long, 
                                title: title,
                                description: description,
                                location: location,
                                firstname: firstname,
                                lastname: lastname,
                                email: email
                            }) 
            
                            newAlert.save(function (err, response2) {
                                if (err) {
                                    console.log(error);
                                    res.send("error");
                                } else {
                                    console.log(response2);
                                    res.send("success");
                                }
                            })
                        }
                    })
                } else {
                    // marker does not exist
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
                            const newAlert = new Alert({
                                latitude: lat,
                                longitude: long, 
                                title: title,
                                description: description,
                                location: location,
                                firstname: firstname,
                                lastname: lastname,
                                email: email
                            }) 
            
                            newAlert.save(function (err, response2) {
                                if (err) {
                                    console.log(error);
                                    res.send("error");
                                } else {
                                    console.log(response2);
                                    res.send("success");
                                }
                            })
                        }
                    })
                }
            })
        })
        .catch(function(error){
            console.log(error);
        });

    }
 
    return {
        get_all_markers: getAllMarkers,
        post_user_marker: postUserMarker,
        post_admin_marker: postAdminMarker
    }
}

module.exports = routes;