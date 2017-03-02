/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);
const FollowToggle = __webpack_require__(1);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map