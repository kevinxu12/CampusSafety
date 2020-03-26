var routes = function(User) {
    var checkLogin = function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        User.find({email: email}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response[0].password.localeCompare(password) == 0) {
                    console.log("Successful login");
                    req.session.user = response[0].username;
                    res.send("success");
                } else {
                    console.log("Unsuccessful login");
                    res.send("Wrong password. Please try again.");
                }
            }
        })
    }

    return {
        check_login: checkLogin
    }
}

module.exports = routes;