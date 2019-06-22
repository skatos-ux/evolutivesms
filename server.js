var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  SendAPI = require('./api/models/EvolutiveSMSModel'), //created model loading here
  SendWEB = require('./web/models/EvolutiveSMSModel'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Senddb', {useNewUrlParser: true});


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
//app.set('views', __dirname + '/web/views');

app.get('/', function (req, res) {
  res.send('index.ejs');
});

var APIroutes = require('./api/routes/EvolutiveSMSRoutes'); //importing route
var WEBroutes = require('./web/routes/EvolutiveSMSRoutes');
APIroutes(app); //register the route
WEBroutes(app);


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
