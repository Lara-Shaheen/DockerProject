var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors  = require('cors');
var SourceMapSupport = require('source-map-support');
var routes =require('./src/routes/api');
// define our app using express
const app = express();

app.use(cors());

app.use("/api/uploads", express.static(__dirname + '/uploads'));


// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));


// set the port
const port = process.env.PORT || 5000;
const connection = function(){
  console.log("Attempting to connect to MongoDB")
  mongoose.connect('mongodb://mongo:27017/mern-crud', { useNewUrlParser: true ,  reconnectTries: 60, reconnectInterval: 1000}).catch((e) => {
  console.error('Error while connecting to MongoDB =>> ', e.message);
  setTimeout(connection, 3000);
  });
}
connection();
// connect to database
mongoose.Promise = global.Promise;
SourceMapSupport.install();
app.get('/', (req,res) => {
  return res.end('Api working');
})

app.use('/api', routes);

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});

