const express = require('express');
const app = express();
const body_parser = require('body-parser');
const customerRoute = require('./models/customer/customerRoute');
// var cors= require('cors');
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
    next();
});


app.use(body_parser.json());
app.use(express.json());
customerRoute.configRoutes(app);

app.listen(5000);
console.log('port is working');
module.exports = app;