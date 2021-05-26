var express =require('express');
var customerRoute =require("../customer/customerRoute");

const app = express();

app.use('/customers',customerRoute);

module.exports = app;