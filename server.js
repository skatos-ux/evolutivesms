var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  SendAPI = require('./api/models/EvolutiveSMSModel'), //created model loading here
  SendWEB = require('./web/models/EvolutiveSMSModel'),
  Config = mongoose.model('Config'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/evolutivesms', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/web/views');
app.use(express.static(__dirname + '/web/views'));

var APIroutes = require('./api/routes/EvolutiveSMSRoutes'); //importing route
var WEBroutes = require('./web/routes/EvolutiveSMSRoutes');
APIroutes(app); //register the route
WEBroutes(app);

require('getmac').getMac(function(err, macAddress){
    if (err)  throw err
    Config.find({iistrlezkdekf: macAddress}, function(err, match) {
      if(match == ""){
        console.log("SYSTEM VIOLATION");
        process.exit(1);
      }
    });
});

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);


console.log('EvolutiveSMS RESTful API server started on: ' + port);
