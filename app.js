var express = require('express')
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors'); // Cross Origin Resource Sharing
var bodyParser = require('body-parser');

var DB_NAME = 'music';
var DB_USER = 'student';
var DB_PASSWORD = 'ttrojan';
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: 'itp460.usc.edu'
});

var Song = sequelize.define('song', {
  title: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
  playCount: {
    type: Sequelize.INTEGER,
    field: 'play_count'
  }
}, {
  timestamps: false
});

app.use(cors());
app.use(bodyParser());
// app.use(function(request, response, next) {
//   response.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.put('/api/songs/:id', function(request, response) {
  Song.findById(request.params.id).then(function(song) {
    if (song) {
      song.update({
        title: request.body.title
      }).then(function(song) {
        response.json(song);
      });
    } else {
      response.status(404).json({
        message: 'Song not found'
      });
    }
  });
});

app.post('/api/songs', function(request, response) {
  // response.json(request.body);
  var song = Song.build({
    title: request.body.title,
    price: request.body.price
  });
  song.save().then(function(song) {
    response.json(song);
  });
});

app.delete('/api/songs/:id', function(request, response) {
  Song.findById(request.params.id).then(function(song) {
    if (song) {
      song.destroy().then(function(song) {
        response.json(song);
      });
    } else {
      response.status(404).json({
        message: 'Song not found'
      });
    }
  });
});

app.get('/api/songs', function (request, response) {
  var promise = Song.findAll();
  promise.then(function(songs) {
    response.json({
      data: songs
    });
  });
});

app.listen(3000);
