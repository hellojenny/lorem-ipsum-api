var dotenv = require('dotenv');
dotenv.config(); // read in .env file and parse it

var express = require('express');
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors'); // Cross Origin Resource Sharing
var bodyParser = require('body-parser');
var mysql = require ('mysql');
var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
   _socket: '/var/lib/mysql/mysql.sock',
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

var likedFonts = sequelize.define('liked', {
  family: {
    type: Sequelize.STRING
  }
});

app.use(cors());
app.use(bodyParser());

var yaBoi = require('./api/fonts');

app.get('/fonts', function(request, response) {
  yaBoi.allFonts().then(function(data) {
    response.json(data);
  });
});

app.get('/fonts/liked', function (request, response) {
  var promise = likedFonts.findAll();
  promise.then(function(fonts) {
    response.json({
        data: fonts
    });
  });
});

app.post('/fonts/liked', function (request, response) {
  var newFont = likedFonts.build({
    family: request.body.family
  });

  newFont.save().then(function(likedFonts) {
    response.json(likedFonts);
  });
});

// app.get('/liked', function(request, response) {
//   yaBoi.allFonts().then(function(data) {
//     response.json(data);
//   });
// });

app.listen(process.env.PORT || 3000);
