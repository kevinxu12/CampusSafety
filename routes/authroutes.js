var routes = function(Admin) {
    var checkLogin = function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        Admin.find({email: email}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response.length != 0) {
                    console.log("Successful login");
                    req.session.user = response[0].username;
                    res.send("success");
                } else {
                    console.log("error");
                    res.send("error");
                }
            }
        })
    }

    var signup = function(req, res) {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var username = req.body.username;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        var university = req.body.university;
        var admin = true;

        var newAdmin = new Admin({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            username: username,
            phone: phone,
            university: university,
            admin: admin
        });

        Admin.find({email: email}, function(err, response) {
            if (err) {
                console.log(err);
            } else {
                if (response.length != 0) {
                    res.send("user exists");
                } else {
                    newAdmin.save(function (err, response) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            console.log(response);
                            res.send("success");
                        }
                    });
                }
            }
        })
    }

    var deleteProfile = function(req, res) {
        var email = req.body.email;
        
        Admin.deleteOne({email: email}, function(err, response) {
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                console.log('deleting ' + email);
                req.session.user = "";
                res.send("success");
            }
        })
    }

    return {
        check_login: checkLogin,
        signup: signup,
        delete_profile: deleteProfile
    }
}

module.exports = routes;