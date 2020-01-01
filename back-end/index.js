const express = require('express');
const app = express();
const body_parser = require('body-parser');
const customerRoute = require('./models/customer/customerRoute');
// var cors= require('cors');
app.use(function(req,res,next){
    // req.header("Access-Control-Allow-Origin", "*");
    // req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");

    // req.header("Access-Control-Allow-Origin", "*");
    // req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, profilerefid(whatever header you need)");

    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.use(body_parser.json());
app.use(express.json());
customerRoute.configRoutes(app);

app.listen(5000);
console.log('port is working');
module.exports = app;