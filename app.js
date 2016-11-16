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

app.use(cors());
app.use(bodyParser());
// app.use(function(request, response, next) {
//   response.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/tweets/:q', function(request, response) {
  twitter.search(request.params.q).then(function(tweets) {
    response.json(tweets);
  });
});

var thesaurus = require('./api/thesaurus');

app.get('/thesaurus/:word', function(request, response) {
  thesaurus.getSynonyms(request.params.word).then(function(synonyms) {
    response.json(synonyms);
  });
  // var syn = new Synonymator(API_KEY);
  // syn.synonyms(request.params.word).then(function(data) {
  //   response.json(data);
  // });
});

app.listen(3000);
