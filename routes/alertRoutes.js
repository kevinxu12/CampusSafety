const mongoose = require('mongoose');
const Alert = mongoose.model('alert');
module.exports = (app) => {
    app.get('/api/getAllAlerts', (req, res) => {
        console.log("getting all alerts");
        Alert.find({}, (err, response) => {
            res.send(response);
        })
    })
};