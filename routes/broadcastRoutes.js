const timestamp = require('time-stamp');

var routes = function(Broadcast) {
    var makeBroadcast = function(req, res) {
        var title = req.body.title;
        var description = req.body.description;
        var author = req.body.author;
        var time = timestamp('YYYY/MM/DD,HH:mm:ss');

        var newBroadcast = new Broadcast({
            title: title,
            description: description, 
            author: author, 
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

    return {
        make_broadcast: makeBroadcast
    }
}

module.exports = routes;