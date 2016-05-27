/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _virus = __webpack_require__(2);

	var _virus2 = _interopRequireDefault(_virus);

	var _stage = __webpack_require__(3);

	var _stage2 = _interopRequireDefault(_stage);

	var _player = __webpack_require__(4);

	var _player2 = _interopRequireDefault(_player);

	var _bullet = __webpack_require__(5);

	var _bullet2 = _interopRequireDefault(_bullet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var stage = new _stage2.default();
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var player = new _player2.default(25, 50);
	var virus = [];
	var bullets = [];
	for (var i = 0; i < stage.number; i++) {
	  virus[i] = new _virus2.default(stage.startX * (i + 1), stage.startY, 40);
	}

	stage.render(virus, player, bullets, ctx);
	var intervalID = setInterval(function () {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  stage.render(virus, player, bullets, ctx);
	  var playing = stage.check(player, virus, intervalID, canvas, ctx); //check end game
	  if (playing) {
	    //not win not lose
	    virus.forEach(function (item) {
	      //check each virus overlap
	      bullets.forEach(function (bullet) {
	        if (bullet.x >= Math.abs(item.x) - item.size && bullet.x <= Math.abs(item.x) + item.size && bullet.y >= Math.abs(item.y) - item.size && bullet.y + bullet.sizeY <= Math.abs(item.y) + item.size * 2) {
	          //check if each bullet overlap virus
	          bullets.splice(bullets.indexOf(bullet), 1); //delete bullet
	          if (item.size <= 20) {
	            //check the virus can small?
	            virus.splice(virus.indexOf(item), 1); //delete virus
	          } else {
	              //virus can smaller, add more virus
	              item.size /= 2;
	              var v = new _virus2.default(item.x, item.y, item.size);
	              virus.push(v);
	            }
	        }
	      });
	      item.update(); //update virus
	    });
	    bullets.forEach(function (bullet) {
	      //update bullet
	      if (bullet.y <= 0) {
	        bullets.splice(bullets.indexOf(bullet), 1);
	      } else {
	        bullet.update();
	      }
	    });
	  }
	}, 8);

	document.onkeydown = function (_ref) {
	  var keyCode = _ref.keyCode;

	  if (keyCode == 37) {
	    //move left
	    player.x >= 0 ? player.x -= player.sizeX : player.x;
	  } else if (keyCode == 39) {
	    //move right
	    player.x <= stage.size - player.sizeX ? player.x += player.sizeX : player.x;
	  }
	};
	document.onkeyup = function (_ref2) {
	  var keyCode = _ref2.keyCode;

	  if (keyCode == 32) {
	    //click spacebar shoot
	    bullets.push(new _bullet2.default(player.x + player.sizeX / 2, player.y));
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _stage = __webpack_require__(3);

	var _stage2 = _interopRequireDefault(_stage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var stage = new _stage2.default();

	var virus = function () {
	  function virus(x, y, size) {
	    _classCallCheck(this, virus);

	    this.x = x;
	    this.runX = Math.floor(Math.random() * 6 + 3);
	    this.runY = Math.floor(Math.random() * 6 + 3);
	    this.y = y;
	    this.size = size;
	  }

	  _createClass(virus, [{
	    key: 'create',
	    value: function create(ctx) {
	      ctx.beginPath();
	      ctx.arc(Math.abs(this.x), Math.abs(this.y), this.size, 0, 2 * Math.PI);
	      ctx.stroke();
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.x = this.setPosition(this.x, this.runX);
	      this.y = this.setPosition(this.y, this.runY);
	    }
	  }, {
	    key: 'setPosition',
	    value: function setPosition(len, run) {
	      if (len >= stage.size - this.size || len < 0 && -len < this.size) {
	        len *= -1;
	      }
	      return len + run;
	    }
	  }]);

	  return virus;
	}();

	exports.default = virus;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var stage = function () {
	  function stage() {
	    _classCallCheck(this, stage);

	    this.number = 3;
	    this.startY = 100;
	    this.startX = 100;
	    this.size = 800;
	  }

	  _createClass(stage, [{
	    key: 'render',
	    value: function render(virus, player, bullets, ctx) {
	      virus.forEach(function (item) {
	        item.create(ctx);
	      });
	      bullets.forEach(function (bullet) {
	        bullet.create(ctx);
	      });
	      player.create(ctx);
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      this.number++;
	    }
	  }, {
	    key: 'check',
	    value: function check(player, virus, intervalID, canvas, ctx) {
	      if (virus.length == 0) {
	        console.log('win');
	        clearInterval(intervalID);
	        ctx.clearRect(0, 0, canvas.width, canvas.height);
	        return false;
	      }
	      virus.forEach(function (item) {
	        if (player.x >= Math.abs(item.x) - item.size && player.x + player.sizeX <= Math.abs(item.x) + item.size && player.y >= Math.abs(item.y) - item.size && player.y + player.sizeY <= Math.abs(item.y) + item.size * 2) {
	          console.log('lose');
	          clearInterval(intervalID);
	          ctx.clearRect(0, 0, canvas.width, canvas.height);
	          return false;
	        }
	      });
	      return true;
	    }
	  }]);

	  return stage;
	}();

	exports.default = stage;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var player = function () {
	  function player(sizeX, sizeY) {
	    _classCallCheck(this, player);

	    this.x = 400;
	    this.y = 800 - sizeY - 10;
	    this.sizeX = sizeX;
	    this.sizeY = sizeY;
	  }

	  _createClass(player, [{
	    key: 'create',
	    value: function create(ctx) {
	      ctx.fillStyle = '#FF0000';
	      ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
	    }
	  }]);

	  return player;
	}();

	exports.default = player;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var bullet = function () {
	  function bullet(x, y) {
	    _classCallCheck(this, bullet);

	    this.x = x;
	    this.y = y;
	    this.sizeX = 5;
	    this.sizeY = 40;
	  }

	  _createClass(bullet, [{
	    key: 'create',
	    value: function create(ctx) {
	      ctx.fillStyle = '#FFFF00';
	      ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.y -= 5;
	    }
	  }]);

	  return bullet;
	}();

	exports.default = bullet;

/***/ }
/******/ ]);