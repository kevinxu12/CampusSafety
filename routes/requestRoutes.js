const mongoose = require('mongoose');

module.exports = (app) => {
    // filled out with test information
    app.post('/api/postRequest', (req, res) => {
        console.log("posting new request");
        res.json({
            hi: 'test'
        })
    })

    app.get('/api/getAllRequests', (req, res) => {
        console.log("getting all requests");
        res.json([{
            hi: 'test'
        }, { hi: 'test2'}])
    })
}