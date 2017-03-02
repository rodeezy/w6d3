const FollowToggle = require('./follow-toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$(document).ready(function() {
  $('.follow-toggle').each( function(index, el) {
    new FollowToggle($(el));
  });
  $('.users-search').each( function(index, el) {
    new UsersSearch($(el));
  });
  $('.tweet-compose').each( function(index, el) {
    new TweetCompose($(el));
  });
});
//
// $(document).ready(function() {
//
// });
