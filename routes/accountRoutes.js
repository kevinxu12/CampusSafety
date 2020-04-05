const mongoose = require('mongoose');
const Account = mongoose.model('accounts');
var user = null;

var logOut = function(req, res) {
    var user = null;
    req.session.user = "";
    res.json({result: "success"});
}

var deleteUser = function(req, res) {
    var email = user;
    
    Account.deleteOne({email: email}, function(err, response) {
        if (err) {
            console.log(err);
            res.json({result: "error"});
        } else {
            console.log('deleting ' + email);
            req.session.user = "";
            user = null;
            res.json({result: "success"});
        }
    })
}

var getUser = function(req, res) {
    Account.find({email: user}, function(err, response) {
        if (err) {
            console.log(err);
            res.json({result: "error"});
        } else {
            res.json(response);
        }
    })
}

var logIn = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    Account.find({email: email}, function(err, response) {
        if (err) {
            console.log(err);
        } else {
            if (response[0] == null) {
                console.log("no account");
                res.json({result: "no account"});
            } else if (response[0].password.localeCompare(password) == 0) {
                console.log("Successful login");
                req.session.user = response[0].email;
                user = req.session.user;
                res.json({result: "success"});
            } else {
                console.log("error");
                res.json({result: "error"});
            }
        }
    })
}

var signUp = function(req, res) {
        console.log("posting new request");

        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        var university = req.body.university;

        var newAccount = new Account({
            email: email,
            password: password,
            firstName: firstname,
            lastName: lastname,
            phone: phone,
            university: university
        });

        Account.findOne({email: email}, (err, resp) => {
            if(err) {
                console.log("error finding post request");
            } else { 
                newAccount.save((err) => {
                    if(err) {
                        console.log("error saving new post request");
                    } else {
                        console.log("success");
                        req.session.user = email;
                        user = req.session.user;
                        res.json({result: "success"});
                    }
                })
            }
        })
}

var routes = { 
  sign_up: signUp,
  log_in: logIn,
  get_user: getUser,
  delete_user: deleteUser,
  log_out: logOut
};

module.exports = routes;