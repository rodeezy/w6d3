const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow-toggle.js');

class UsersSearch {
  constructor($el){
    this.$el = $el;
    this.input = $('.users-search-input');
    this.$ul = $('.users');
    this.handleInput();
  }

  handleInput() {
    this.$el.on("input", e => {
      e.preventDefault();
      APIUtil.searchUsers(this.input.val(), this.renderResults.bind(this));
    });
  }

  renderResults(res) {
    this.$ul.empty();
    let $ul = this.$ul;
    res.forEach(user => {

      let followState = (user.followed ? "followed" : "unfollowed");

      $ul.append($(`<li><a href=${user.id}>${user.username}</a></li>`)
        .append($(`<button class="follow-toggle" data-user-id=${user.id}
          data-initial-follow-state=${followState}></button>`)));

      let followToggle = new FollowToggle($(`[data-user-id=${user.id}]`));
      console.log(followToggle.followState);
    });
  }
}

module.exports = UsersSearch;
