var Synonymator = require('synonymator');
var API_KEY = process.env.API_KEY;

var thesaurus = new Synonymator(API_KEY);

module.exports = {
  getSynonyms: function(word) {
    var syn = new Synonymator(API_KEY);
    return syn.synonyms(word);
  }
}

// var client = new Twitter({
//   consumer_key: process.env.consumer_key,
//   consumer_secret: process.env.consumer_secret,
//   access_token_key: process.env.access_token_key,
//   access_token_secret: process.env.access_token_secret
// });

// module.exports = {
//   search: function(searchTerm) {
//     return new Promise(function(resolve, reject) {
//       var params = { q: searchTerm };
//       client.get('search/tweets', params, function(error, tweets) {
//         if (!error) {
//           var statuses = tweets.statuses;
//           var formattedTweets = statuses.map(function(status) {
//             return {
//               text: status.text,
//               id: status.id,
//               user: status.user.screen_name,
//               createdAt: status.created_at
//             };
//           });
//           resolve(formattedTweets);
//         }
//       });
//     });
//   }
// };
