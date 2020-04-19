const timestamp = require('time-stamp');

var routes = function(Broadcast) {
    // made changes to integrate with android
    var makeBroadcast = function(req, res) {
        var title = "BROADCAST: " + req.body.title;
        var description = "BROADCAST: " + req.body.description;
        const author = req.body.author
        const auth_array = author.split(" ");
        // default names
        var firstname = auth_array[0] || 'Default';
        var lastname = auth_array[1] || 'Default';
        // default lat and long
        var longitude = 11.23;
        var latitude = 10.12;
        var time = timestamp('YYYY/MM/DD,HH:mm:ss');

        var newBroadcast = new Broadcast({
            title: title,
            description: description, 
            firstname: firstname, 
            longitude: longitude,
            latitude: latitude,
            lastname: lastname,
            time: time
        })

        newBroadcast.save(function(err, response) {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log(response);
                res.send("success");
            }
        })
    }

    var getAllBroadcasts = function(req, res) { 
        console.log("getting all broadcasts");
        Broadcast.find({}, (err, response) => {
            res.send(response);
        })
    }

    return {
        make_broadcast: makeBroadcast,
        getAllBroadcasts: getAllBroadcasts
    }
}

module.exports = routes;