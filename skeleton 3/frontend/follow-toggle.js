const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.userId = this.$el.data("user-id") ;
    this.followState = (this.$el.data("initial-follow-state"));
    this.render();
    this.$el.on('click', e => this.handleClick(e));
  }

  render() {
    if (this.followState === "following" || this.followState === "unfollowing") {
      this.$el.prop("disabled", true);
    } else if (this.followState === "unfollowed") {
      this.$el.prop("disabled", false).text("Follow!");
    } else if (this.followState === "followed") {
      this.$el.prop("disabled", false).text("Unfollow!");
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.followState === "unfollowed") {
      this.followState = "following";
      this.render();
      APIUtil.followUser(this.userId).then(this.handleSucess.bind(this));
    } else if (this.followState === "followed") {
      this.followState = "unfollowing";
      this.render();
      APIUtil.unfollowUser(this.userId).then(this.handleSucess.bind(this));
    }
  }

  handleSucess() {
    this.followState = ((this.followState === "unfollowing") ? "unfollowed" : "followed");
    this.render();
  }
}


module.exports = FollowToggle;
