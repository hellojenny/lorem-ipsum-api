var dotenv = require('dotenv');
dotenv.config(); // read in .env file and parse it

var express = require('express');
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors'); // Cross Origin Resource Sharing
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var twitter = require('./api/twitter');

var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
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

app.get('/tweets/:screen_name', function(request, response) {
  var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
  });

  var params = { screen_name: request.params.screen_name };
  client.get('statuses/user_timeline', params, function(error, tweets) {
    if (!error) {
      response.json(tweets);
    }
  });
});

app.get('/tweets/:q', function(request, response) {
  twitter.search(request.params.q).then(function(tweets) {
    response.json(tweets);
  });
});


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
