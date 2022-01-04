// const express=require('express');
// const bodyParser=require('body-parser');
// const api = require('./src/router/route');
  
// const port=3000;
// const app=express();
   
// app.listen(port, function() {
//     console.log("Server is listening at port:" + port);
// }); 
  
// // Parses the text as url encoded data
// app.use(bodyParser.urlencoded({extended: true})); 
  
// // Parses the text as json
// app.use(bodyParser.json()); 
  
// app.use('/api', api);


var express = require("express");
var app = express();
var bodyParser = require("body-parser");
/**
 * parse requests of content-type - application/json
 */
app.use(bodyParser.json());
/**
 * parse requests of content-type - application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.json({"message": "Congratulations! you are working great!"});
});

var apiRouter = require("./src/router/route");
app.use("/api/v1", apiRouter);

app.listen(8000);
console.log("Listening to PORT 8000");