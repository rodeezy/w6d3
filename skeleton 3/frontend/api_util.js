const APIUtil = {
  followUser: id => {
    return $.ajax( {
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },

  unfollowUser: id => {
    return $.ajax( {
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },

  searchUsers: (queryVal, success) => {
    return $.ajax( {
      method: 'GET',
      url: `/users/search`,
      data: {
        "query": queryVal
      },
      dataType: 'json',
      success: res => success(res)
    });
  },


  createTweet: (data) => {
    return $.ajax( {
      method: 'POST',
      url: '/tweets',
      dataType: 'json',
      data: data.$form.serialize()
    });
  }
};

module.exports = APIUtil;
