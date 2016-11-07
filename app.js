var express = require('express')
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors'); // Cross Origin Resource Sharing

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
  playCount: {
    type: Sequelize.INTEGER,
    field: 'play_count'
  }
}, {
  timestamps: false
});

app.use(cors());
// app.use(function(request, response, next) {
//   response.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/api/songs', function (request, response) {
  var promise = Song.findAll();
  promise.then(function(songs) {
    response.json({
      data: songs
    });
  });
})

app.listen(3000)
