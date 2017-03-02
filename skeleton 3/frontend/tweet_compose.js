class TweetCompose{
  constructor($el){
    this.$el = $el;
    this.$el.on('submit', e => this.handleClick(e));
  }

  clearInput() {
    $(':input').empty();
  }
}

module.exports = TweetCompose;
