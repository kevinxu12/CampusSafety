const mongoose = require('mongoose');

module.exports = (app) => {
    // filled out with test information
    app.post('/api/postRequest', (req, res) => {
        console.log("HI");
        res.json({
            hi: 'test'
        })
    })
}