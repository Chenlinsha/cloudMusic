/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/radio.js":
/*!*************************!*\
  !*** ./src/js/radio.js ***!
  \*************************/
/***/ (() => {

//import('../src/css/radio.css')
var musics = document.querySelectorAll('audio');
var buttoning = document.querySelector('.buttomimg');
var song1 = document.querySelector('.song');
var songer2 = document.querySelector('.songer1');
var names = [];
var musiclist = [];
var songerlist = [];
var ids = [];
var imgs = [];
var index = 0; // let textarea = document.querySelector('textarea')

var songname = document.querySelector('.song-name');
var album = document.querySelector('.album');
var songer3 = document.querySelector('.songer');
var circle = document.querySelector('#circle-pic');
localStorage.getItem("token"); // let res = JSON.parse( localStorage.getItem("res"))
// names.push(res[i].name)
// ids.push(res[i].id)
// buttonpic.push(res[i].album.artist.img1v1Url)
// songerlist.push(res[i].artists[0].name)

var dia = document.querySelector('.dia');
var volumecontorl = document.querySelector('.volume-control');
var lyrics1 = document.querySelector('.lyrics');
var Audio = document.querySelector('.audio');
var contorl = document.querySelector('.on');
var contorlDot = document.querySelector('#control-dot');
var contorlProgress = document.querySelector('#control-progress');
var contorlProgressBox = document.querySelector('#progress');
var current = document.querySelector('#current');
var duration = document.querySelector('#duration');
var volume = document.querySelector('.volume');
var volumeNow = document.querySelector(".volume-now");
var volumeMax = document.querySelector(".volume-max");
var dot = document.querySelector(".volume-control-dot");
var btnif = true;
var textarea = document.querySelector('textarea');
var up = document.querySelector(".down");
console.log(up);
var down1 = document.querySelector(".up"); // up.onclick = function () {
//     fetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`).then((res) => {
//         return res.json()
//     }).then((res) => {
//         index++;
//         if (index == names.length)
//             index = 0
//         Audio.src = res.data[0].url
//     })
//     switchAudio()
// }
// down1.onclick = function () {
//     fetch(`http://redrock.udday.cn:2022/song/url?id=${ids[index]}`).then((res) => {
//         return res.json()
//     }).then((res) => {
//         index = index - 1
//         if (index == -1) {
//             index = names.length - 1
//         }
//         Audio.src = res.data[0].url
//     })
//     switchAudio()
// }

function transTime(value) {
  var time = '';
  var h = parseInt("".concat(value / 3600));
  value %= 3600;
  var m = parseInt("".concat(value / 60));
  var s = parseInt("".concat(value % 60));

  if (h > 0) {
    time = formatTime(h + ':' + m + ':' + s);
  } else {
    time = formatTime(m + ':' + s);
  }

  return time;
} // 补零


function formatTime(value) {
  var time = '';
  var s = value.split(':');
  var i = 0;

  for (; i < s.length - 1; i++) {
    time += s[i].length === 1 ? '0' + s[i] : s[i];
    time += ':';
  }

  time += s[i].length === 1 ? '0' + s[i] : s[i];
  return time;
}

contorl.addEventListener('click', function (e) {
  if (e.target.innerText === '▶') {
    e.target.innerText = '┃┃';
    Audio.play();
  } else {
    e.target.innerText = '▶';
    Audio.pause();
  }
});
Audio.addEventListener('loadedmetadata', function (e) {
  duration.innerText = transTime(e.target.duration);
});
Audio.addEventListener('timeupdate', function (e) {
  var value = e.target.currentTime / Audio.duration;
  current.innerText = transTime(e.target.currentTime);
  contorlProgress.style.width = "".concat(value * 100, "%");
  contorlDot.style.left = "".concat(value * 100, "%"); // console.log(lyricBox.style.buttom);
});
Audio.addEventListener('ended', function (e) {
  contorl.innerText = '▶';
});
var position = {
  oriOffestLeft: 0,
  // 移动开始时进度条的点距离进度条的偏移值
  oriX: 0,
  // 移动开始时的x坐标
  maxLeft: 0,
  // 向左最大可拖动距离
  maxRight: 0 // 向右最大可拖动距离

};
var flag = false; // 标记是否拖动开始

var down = function down(event) {
  if (!Audio.pause || Audio.currentTime !== 0) {
    flag = true;
    position.oriOffestLeft = contorlDot.offsetLeft;
    position.oriX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousedown和touchstart事件

    position.maxLeft = position.oriOffestLeft; // 向左最大可拖动距离

    position.maxRight = contorlProgressBox.offsetWidth - position.oriOffestLeft; // 向右边最大可拖动距离

    if (event && event.preventDefault) event.preventDefault();else event.returnValue = false;
    if (event && event.stopPropagation) event.stopPropagation();else window.event.cancelBubble = true;
  }
};

var move = function move(event) {
  if (flag) {
    var clientX = event.touches ? event.touches[0].clientX : event.clientX;
    var length = clientX - position.oriX;

    if (length > position.maxRight) {
      length = position.maxRight;
    } else if (length < -position.maxLeft) {
      length = -position.maxLeft;
    }

    var pgsWidth = parseFloat(window.getComputedStyle(contorlProgressBox, null).width.replace('px'));
    var rate = (position.oriOffestLeft + length) / pgsWidth;
    Audio.currentTime = Audio.duration * rate;
  }
};

var end = function end() {
  flag = false;
}; // 鼠标按下


contorlDot.addEventListener('mousedown', down, false);
contorlDot.addEventListener('touchstart', down, false); // 开始拖动

document.addEventListener('mousemove', move, false);
document.addEventListener('touchmove', move, false); // 拖动结束

document.addEventListener('mouseup', end, false);
document.addEventListener('touchend', end, false);

dot.onmousedown = function (e) {
  var y = e.pageY - dot.offsetTop + dot.offsetHeight / 2;
  document.addEventListener("mousemove", gundong1);

  function gundong1(e) {
    if (e.pageY - y < 0) {
      dot.style.top = 0 + "px";
    } else if (e.pageY - y > 80) {
      dot.style.top = 80 + "px";
    } else {
      dot.style.top = e.pageY - y + "px";
      console.log(dot.style.top);
    }

    volumeNow.style.height = 80 - parseInt(dot.style.top) + "px";
    console.log(volumeNow.style.height);
    Audio.volume = 1 - parseInt(dot.style.top) / 80;

    document.onmouseup = function () {
      document.removeEventListener("mousemove", gundong1);
    };
  }
};

var back = document.querySelector('.hal');
var go = document.querySelector('.har');

back.onclick = function () {
  window.history.back(1);
  console.log(1);
};

go.onclick = function () {
  window.history.go(1);
  console.log(2);
};

document.addEventListener('keydown', function (e) {
  var theEvent = e || window.event;
  var code = theEvent.keyCode || theEvent.which || theEvent.charCode;

  if (code == 13) {
    //回车执行查询
    fetch("http://redrock.udday.cn:2022/search?keywords=".concat(searchbox.value), {
      method: 'Get'
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      console.log(res);
      return res.result.songs;
    }).then(function (res) {
      localStorage.setItem("res", JSON.stringify(res));
      localStorage.setItem("searchvalue", searchbox.value);
      window.location.replace("..\\html\\search.html");
      console.log(res);
    });
  }
}); // volume.onclick = x => {
//     volumecontorl.style.display = "block";
// }

var himg = document.querySelector('.himg');

himg.onclick = function (x) {
  return window.location.replace("..\\html\\cloudmusic.html");
}; // let userid =  localStorage.getItem("userid")
// fetch(`http://redrock.udday.cn:2022/user/playlist?uid=${userid}`)
//     .then((res) => {
//         console.log(userid);
//         return res.json()
//     }).then((res) => console.log(res))
// let listdata =  localStorage.getItem("listdata")
// let radiosongs = document.querySelector('.radiosongs')


function GetUrlPara() {
  var url = document.location.toString(); //获取当前URL

  if (url.indexOf("?") != -1) {
    //判断URL？后面不为空
    var arrUrl = url.split("?"); //分割？

    var para = arrUrl[1]; //获取参数部分

    if (para) {
      //判断传入的参数部分不为空
      var arr = para.split("!");

      var _res = arr.slice(1, 4); // console.log(res); //分割=
      // var res = arr[1]; //获取参数的值


      return _res;
    }
  }
}

var res = GetUrlPara();
console.log(res);
var i = res[0].split("&")[0];
var a = 200; //歌词容器到高，随便改,但最好和你自己写到那个div一样高；

var b = 35;
var lid = res[1];
console.log(i);
console.log(lid);
fetch("http://redrock.udday.cn:2022/playlist/detail?id=".concat(lid)).then(function (res) {
  return res.json();
}).then(function (res) {
  console.log(res);
  song1.innerHTML = res.playlist.tracks[i].name;
  songname.innerHTML = res.playlist.tracks[i].name;
  album.innerHTML = res.playlist.tracks[i].al.name;
  songer2.innerHTML = res.playlist.tracks[i].ar[0].name;
  songer3.innerHTML = res.playlist.tracks[i].ar[0].name;
  buttoning.src = res.playlist.tracks[i].al.picUrl;
  circle.src = res.playlist.tracks[i].al.picUrl;
  ids[i] = res.playlist.tracks[i].id;
  fetch("http://redrock.udday.cn:2022/lyric?id=".concat(res.playlist.tracks[i].id)).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(res);
    textarea.innerHTML = res.lrc.lyric;
    console.log(res.lrc.lyric);
    return textarea.innerHTML;
  }).then(function (res) {
    lrc = res;

    function split() {
      //把lrc歌词分割成数组，
      var split_1 = lrc.split('\n');
      var length = split_1.length;

      for (var _i = 0; _i < length; _i++) {
        var change = function change(str) {
          var lrc = str.split(']');
          var timer = lrc[0].replace('[', '');
          var str_music = lrc[1];
          var time_split = timer.split(':');
          var s = +time_split[1];
          var min = +time_split[0];
          return {
            time: min * 60 + s,
            lrc: str_music //分割好到歌词和时间

          };
        };

        var _lrcArr = split_1[_i];
        split_1[_i] = change(_lrcArr);
      }

      return split_1;
    }

    var lrcArr = split();

    function createLi() {
      //根据歌词数组创建li
      var len = lrcArr.length;

      for (var _i2 = 0; _i2 < len; _i2++) {
        var lrc_li = lrcArr[_i2];
        var li = document.createElement('li');
        li.innerText = lrc_li.lrc;
        li.style.height = b + 'px';
        li.style.textAlign = 'center';
        li.style.width = '100%';
        li.style.padding = '0';
        li.style.color = '#999';
        li.style.transition = '0.3';
        dia.appendChild(li);
      }
    }

    createLi();

    function setCurrentLi() {
      var time = Audio.currentTime;

      for (i = 0; i < lrcArr.length; i++) {
        var play1 = lrcArr[i];

        if (time - play1.time <= 0) {
          return i;
        }
      }

      return -1;
    }

    function current() {
      //设置top，让其滚动
      var li = setCurrentLi();
      var divHeight = a;
      var liHeight = b;
      var top = liHeight * li - divHeight / 2 + liHeight / 2;

      if (top < 0) {
        top = 0;
      }

      dia.style.marginTop = -top + 'px'; // console.log('top'+top);

      var playLi = dia.querySelector('.play1');

      if (playLi) {
        playLi.className = '';
      }

      if (li >= 0) {
        console.log(li); // li.style.cssText = "color: #000;font-size: 20px;"

        console.log(dia.children);
        dia.children[li - 1].className = 'play1';
        console.log(dia.children);
      }
    }

    Audio.ontimeupdate = current; //  
  });
  fetch("http://redrock.udday.cn:2022/song/url?id=".concat(res.playlist.tracks[i].id)).then(function (res) {
    return res.json();
  }).then(function (res) {
    Audio.src = res.data[0].url;
  });
  fetch("http://redrock.udday.cn:2022/comment/music?id=".concat(res.playlist.tracks[i].id)).then(function (res) {
    return res.json();
  }).then(function (res) {
    console.log(res);

    for (var _i3 = 0; _i3 < 15; _i3++) {
      var _commend = document.querySelector('.commend');

      var con = document.createElement("div");
      con.setAttribute('class', 'con');

      var _comcon = document.createElement("div");

      _comcon.setAttribute('class', 'comcon');

      var userpic = document.createElement('div');
      userpic.setAttribute('class', 'userpic');

      var _time = document.createElement('div');

      _time.setAttribute('class', 'time');

      var _like = document.createElement("div");

      var img2 = document.createElement("img");

      _like.setAttribute('class', 'like');

      var _img = document.createElement("img"); // like.appendChild(icon10)


      userpic.appendChild(_img);
      con.appendChild(userpic);
      con.appendChild(_time);
      con.appendChild(_like);
      con.appendChild(_comcon);

      _commend.appendChild(con);

      console.log(userpic);
      _comcon.innerHTML = res.hotComments[_i3].user.nickname + ":" + res.hotComments[_i3].content;
      _like.innerHTML = "👍" + res.hotComments[_i3].likedCount;
      _img.src = res.hotComments[_i3].user.avatarUrl;
      _time.innerHTML = res.hotComments[_i3].timeStr;
    }
  });
  var up = document.querySelector(".down");
  console.log(up);
  var down1 = document.querySelector(".up");

  function switchAudio() {
    document.querySelector(".song").innerHTML = res.playlist.tracks[i].name;
    buttoning.src = res.playlist.tracks[i].al.picUrl;
    document.querySelector(".songer1").innerHTML = res.playlist.tracks[i].ar[0].name; // textarea.innerHTML = res.lrc.lyric;

    comcon.innerHTML = res.hotComments[i].user.nickname + ":" + res.hotComments[i].content;
    like.innerHTML = res.hotComments[i].likedCount;
    img.src = res.hotComments[i].user.avatarUrl;
    time.innerHTML = res.hotComments[i].timeStr;
    circle.src = res.playlist.tracks[i].al.picUrl;
    Audio.play();
  }

  up.onclick = function () {
    console.log(res.playlist.tracks[i].id);
    fetch("http://redrock.udday.cn:2022/song/url?id=".concat(res.playlist.tracks[i].id)).then(function (res) {
      return res.json();
    }).then(function (res) {
      i++;
      if (i == names.length) i = 0;
      Audio.src = res.data[0].url;
    });
    switchAudio();
  };

  down1.onclick = function () {
    fetch("http://redrock.udday.cn:2022/song/url?id=".concat(res.playlist.tracks[i].id)).then(function (res) {
      return res.json();
    }).then(function (res) {
      i = i - 1;

      if (i == -1) {
        i = names.length - 1;
      }

      Audio.src = res.data[0].url;
    });
    switchAudio();
  };
});
songerlist.push(localStorage.getItem("songer"));
songname.innerHTML = localStorage.getItem("song");
names.push(localStorage.getItem("song"));
imgs.push(localStorage.getItem("pic"));
console.log(songerlist); //buttoning.src =  localStorage.getItem("pic")

console.log(names); // let tlyric = []
// let temp111 = 0
// let getLy = function () { //更新播放进度
//     nowTime = document.querySelector('.audio').currentTime.toFixed(3)
// }
// let compare = function () {
//     for (let i = 0; i < timeArr.length; i++) {
//         if (nowTime > timeArr[i]) { //播放时间超出时间轴时间，代表这句歌词已经过去
//             temp111 = i
//         }
//     }
// }
// let scroll = function () { //歌词滚动效果
//     if (temp111 == 0) {
//         lyricBox.querySelectorAll('p').forEach((currentValue) => { //排他思想改变样式
//             currentValue.className = 'lyout'
//         })
//         lyricBox.querySelectorAll('p')[temp111].className = 'lyin'
//     } else {
//         lyricBox.querySelectorAll('p').forEach((currentValue) => {
//             currentValue.className = 'lyout'
//         })
//         lyricBox.querySelectorAll('p')[temp111].className = 'lyin'
//     }
//     if (tlyric != '') { //如果有翻译，要滚得多一些
//         lyricBox.scroll({
//             top: (temp111) * 150,
//             behavior: 'smooth'
//         })
//     } else {
//         lyricBox.scroll({
//             top: (temp111) * 90,
//             behavior: 'smooth'
//         })
//     }
// }
// function roll() {
//     //lyrics()
//     let p = lyrics1.getElementsByTagName("p")
//     //console.log(p);
//     let curTime
//     musics[0].addEventListener("timeupdate", function () {
//         curTime = parseInt(this.currentTime)
//         if (document.getElementById(curTime)) {
//             for (let i = 0; i < p.length; i++) {
//                 p[i].style.cssText = "font-size: 15px;"
//             }
//             console.log(document.getElementById(curTime));
//             // let value = e.target.currentTime / Audio.duration;
//             document.getElementById(curTime).style.cssText = "color: #000;font-size: 20px;"
//             console.log(document.getElementById(curTime).style.top);
//             //contorlDot.style.left = `${value * 100}%`;
//         }
//     })
// }
// roll()

var commend = document.querySelector('.commend');
var icon10 = document.querySelector('.icon10');

buttoning['onclick'] = function (x) {
  window.location.replace("..\\html\\cloudmusic.html");
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("radio." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("8c77bcbc9e72b6ebf24f")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "cloudmusic:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		var createStylesheet = (chunkId, fullhref, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"radio": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatecloudmusic"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/radio.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxzQ0FBc0M7V0FDdEM7V0FDQTtXQUNBLEVBQUU7V0FDRjs7V0FFQTs7V0FFQTs7Ozs7VUU1ZkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbG91ZG11c2ljLy4vc3JjL2pzL3JhZGlvLmpzIiwid2VicGFjazovL2Nsb3VkbXVzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2xvdWRtdXNpYy93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgdXBkYXRlIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2Nsb3VkbXVzaWMvd2VicGFjay9ydW50aW1lL2dldCBtaW5pLWNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9jbG91ZG11c2ljL3dlYnBhY2svcnVudGltZS9nZXQgdXBkYXRlIG1hbmlmZXN0IGZpbGVuYW1lIiwid2VicGFjazovL2Nsb3VkbXVzaWMvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL2Nsb3VkbXVzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jbG91ZG11c2ljL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly9jbG91ZG11c2ljL3dlYnBhY2svcnVudGltZS9ob3QgbW9kdWxlIHJlcGxhY2VtZW50Iiwid2VicGFjazovL2Nsb3VkbXVzaWMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vY2xvdWRtdXNpYy93ZWJwYWNrL3J1bnRpbWUvY3NzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY2xvdWRtdXNpYy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jbG91ZG11c2ljL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xvdWRtdXNpYy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2xvdWRtdXNpYy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy9pbXBvcnQoJy4uL3NyYy9jc3MvcmFkaW8uY3NzJylcclxubGV0IG11c2ljcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2F1ZGlvJylcclxuY29uc3QgYnV0dG9uaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbWltZycpXHJcbmNvbnN0IHNvbmcxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvbmcnKVxyXG5jb25zdCBzb25nZXIyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvbmdlcjEnKVxyXG5sZXQgbmFtZXMgPSBbXVxyXG5sZXQgbXVzaWNsaXN0ID0gW11cclxubGV0IHNvbmdlcmxpc3QgPSBbXVxyXG5sZXQgaWRzID0gW11cclxubGV0IGltZ3MgPSBbXVxyXG5sZXQgaW5kZXggPSAwXHJcbi8vIGxldCB0ZXh0YXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJylcclxubGV0IHNvbmduYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvbmctbmFtZScpXHJcbmxldCBhbGJ1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGJ1bScpXHJcbmxldCBzb25nZXIzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvbmdlcicpXHJcbmxldCBjaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2lyY2xlLXBpYycpXHJcbmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIilcclxuLy8gbGV0IHJlcyA9IEpTT04ucGFyc2UoIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicmVzXCIpKVxyXG4vLyBuYW1lcy5wdXNoKHJlc1tpXS5uYW1lKVxyXG4vLyBpZHMucHVzaChyZXNbaV0uaWQpXHJcbi8vIGJ1dHRvbnBpYy5wdXNoKHJlc1tpXS5hbGJ1bS5hcnRpc3QuaW1nMXYxVXJsKVxyXG4vLyBzb25nZXJsaXN0LnB1c2gocmVzW2ldLmFydGlzdHNbMF0ubmFtZSlcclxubGV0IGRpYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaWEnKVxyXG5sZXQgdm9sdW1lY29udG9ybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWUtY29udHJvbCcpXHJcbmxldCBseXJpY3MxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmx5cmljcycpXHJcbmNvbnN0IEF1ZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1ZGlvJyk7XHJcbmNvbnN0IGNvbnRvcmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub24nKTtcclxuY29uc3QgY29udG9ybERvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250cm9sLWRvdCcpO1xyXG5jb25zdCBjb250b3JsUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udHJvbC1wcm9ncmVzcycpO1xyXG5jb25zdCBjb250b3JsUHJvZ3Jlc3NCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZ3Jlc3MnKTtcclxuY29uc3QgY3VycmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50Jyk7XHJcbmNvbnN0IGR1cmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1cmF0aW9uJyk7XHJcbmxldCB2b2x1bWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lJylcclxubGV0IHZvbHVtZU5vdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudm9sdW1lLW5vd1wiKVxyXG5sZXQgdm9sdW1lTWF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52b2x1bWUtbWF4XCIpXHJcbmxldCBkb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZvbHVtZS1jb250cm9sLWRvdFwiKVxyXG5sZXQgYnRuaWYgPSB0cnVlXHJcbmNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKVxyXG5cclxuXHJcbmxldCB1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG93blwiKVxyXG5jb25zb2xlLmxvZyh1cCk7XHJcbmxldCBkb3duMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXBcIilcclxuLy8gdXAub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGZldGNoKGBodHRwOi8vcmVkcm9jay51ZGRheS5jbjoyMDIyL3NvbmcvdXJsP2lkPSR7aWRzW2luZGV4XX1gKS50aGVuKChyZXMpID0+IHtcclxuLy8gICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxyXG4vLyAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcbi8vICAgICAgICAgaW5kZXgrKztcclxuLy8gICAgICAgICBpZiAoaW5kZXggPT0gbmFtZXMubGVuZ3RoKVxyXG4vLyAgICAgICAgICAgICBpbmRleCA9IDBcclxuLy8gICAgICAgICBBdWRpby5zcmMgPSByZXMuZGF0YVswXS51cmxcclxuLy8gICAgIH0pXHJcblxyXG4vLyAgICAgc3dpdGNoQXVkaW8oKVxyXG4vLyB9XHJcbi8vIGRvd24xLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBmZXRjaChgaHR0cDovL3JlZHJvY2sudWRkYXkuY246MjAyMi9zb25nL3VybD9pZD0ke2lkc1tpbmRleF19YCkudGhlbigocmVzKSA9PiB7XHJcbi8vICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcclxuLy8gICAgIH0pLnRoZW4oKHJlcykgPT4ge1xyXG4vLyAgICAgICAgIGluZGV4ID0gaW5kZXggLSAxXHJcbi8vICAgICAgICAgaWYgKGluZGV4ID09IC0xKSB7XHJcbi8vICAgICAgICAgICAgIGluZGV4ID0gbmFtZXMubGVuZ3RoIC0gMVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBBdWRpby5zcmMgPSByZXMuZGF0YVswXS51cmxcclxuLy8gICAgIH0pXHJcblxyXG4vLyAgICAgc3dpdGNoQXVkaW8oKVxyXG4vLyB9XHJcblxyXG5cclxuZnVuY3Rpb24gdHJhbnNUaW1lKHZhbHVlKSB7XHJcbiAgICBsZXQgdGltZSA9ICcnO1xyXG4gICAgbGV0IGggPSBwYXJzZUludChgJHt2YWx1ZSAvIDM2MDB9YCk7XHJcbiAgICB2YWx1ZSAlPSAzNjAwO1xyXG4gICAgbGV0IG0gPSBwYXJzZUludChgJHt2YWx1ZSAvIDYwfWApO1xyXG4gICAgbGV0IHMgPSBwYXJzZUludChgJHt2YWx1ZSAlIDYwfWApO1xyXG4gICAgaWYgKGggPiAwKSB7XHJcbiAgICAgICAgdGltZSA9IGZvcm1hdFRpbWUoaCArICc6JyArIG0gKyAnOicgKyBzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGltZSA9IGZvcm1hdFRpbWUobSArICc6JyArIHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aW1lO1xyXG59XHJcbi8vIOihpembtlxyXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHZhbHVlKSB7XHJcbiAgICBsZXQgdGltZSA9ICcnO1xyXG4gICAgbGV0IHMgPSB2YWx1ZS5zcGxpdCgnOicpO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgZm9yICg7IGkgPCBzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIHRpbWUgKz0gc1tpXS5sZW5ndGggPT09IDEgPyAnMCcgKyBzW2ldIDogc1tpXTtcclxuICAgICAgICB0aW1lICs9ICc6JztcclxuICAgIH1cclxuICAgIHRpbWUgKz0gc1tpXS5sZW5ndGggPT09IDEgPyAnMCcgKyBzW2ldIDogc1tpXTtcclxuXHJcbiAgICByZXR1cm4gdGltZTtcclxufVxyXG5jb250b3JsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBpZiAoZS50YXJnZXQuaW5uZXJUZXh0ID09PSAn4pa2Jykge1xyXG4gICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9ICfilIPilIMnO1xyXG4gICAgICAgIEF1ZGlvLnBsYXkoKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9ICfilrYnO1xyXG4gICAgICAgIEF1ZGlvLnBhdXNlKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuQXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBlID0+IHtcclxuICAgIGR1cmF0aW9uLmlubmVyVGV4dCA9IHRyYW5zVGltZShlLnRhcmdldC5kdXJhdGlvbik7XHJcbn0pO1xyXG5cclxuQXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIGUgPT4ge1xyXG4gICAgbGV0IHZhbHVlID0gZS50YXJnZXQuY3VycmVudFRpbWUgLyBBdWRpby5kdXJhdGlvbjtcclxuICAgIGN1cnJlbnQuaW5uZXJUZXh0ID0gdHJhbnNUaW1lKGUudGFyZ2V0LmN1cnJlbnRUaW1lKTtcclxuICAgIGNvbnRvcmxQcm9ncmVzcy5zdHlsZS53aWR0aCA9IGAke3ZhbHVlICogMTAwfSVgO1xyXG4gICAgY29udG9ybERvdC5zdHlsZS5sZWZ0ID0gYCR7dmFsdWUgKiAxMDB9JWA7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2cobHlyaWNCb3guc3R5bGUuYnV0dG9tKTtcclxufSk7XHJcblxyXG5BdWRpby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGUgPT4ge1xyXG4gICAgY29udG9ybC5pbm5lclRleHQgPSAn4pa2JztcclxufSk7XHJcblxyXG5cclxuY29uc3QgcG9zaXRpb24gPSB7XHJcbiAgICBvcmlPZmZlc3RMZWZ0OiAwLCAvLyDnp7vliqjlvIDlp4vml7bov5vluqbmnaHnmoTngrnot53nprvov5vluqbmnaHnmoTlgY/np7vlgLxcclxuICAgIG9yaVg6IDAsIC8vIOenu+WKqOW8gOWni+aXtueahHjlnZDmoIdcclxuICAgIG1heExlZnQ6IDAsIC8vIOWQkeW3puacgOWkp+WPr+aLluWKqOi3neemu1xyXG4gICAgbWF4UmlnaHQ6IDAsIC8vIOWQkeWPs+acgOWkp+WPr+aLluWKqOi3neemu1xyXG59O1xyXG5sZXQgZmxhZyA9IGZhbHNlOyAvLyDmoIforrDmmK/lkKbmi5bliqjlvIDlp4tcclxuXHJcbmNvbnN0IGRvd24gPSBldmVudCA9PiB7XHJcbiAgICBpZiAoIUF1ZGlvLnBhdXNlIHx8IEF1ZGlvLmN1cnJlbnRUaW1lICE9PSAwKSB7XHJcbiAgICAgICAgZmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHBvc2l0aW9uLm9yaU9mZmVzdExlZnQgPSBjb250b3JsRG90Lm9mZnNldExlZnQ7XHJcbiAgICAgICAgcG9zaXRpb24ub3JpWCA9IGV2ZW50LnRvdWNoZXMgP1xyXG4gICAgICAgICAgICBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOlxyXG4gICAgICAgICAgICBldmVudC5jbGllbnRYO1xyXG4gICAgICAgIC8vIOimgeWQjOaXtumAgumFjW1vdXNlZG93buWSjHRvdWNoc3RhcnTkuovku7ZcclxuICAgICAgICBwb3NpdGlvbi5tYXhMZWZ0ID0gcG9zaXRpb24ub3JpT2ZmZXN0TGVmdDtcclxuICAgICAgICAvLyDlkJHlt6bmnIDlpKflj6/mi5bliqjot53nprtcclxuICAgICAgICBwb3NpdGlvbi5tYXhSaWdodCA9IGNvbnRvcmxQcm9ncmVzc0JveC5vZmZzZXRXaWR0aCAtXHJcbiAgICAgICAgICAgIHBvc2l0aW9uLm9yaU9mZmVzdExlZnQ7IC8vIOWQkeWPs+i+ueacgOWkp+WPr+aLluWKqOi3neemu1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQucHJldmVudERlZmF1bHQpIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZWxzZSBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlbHNlIHdpbmRvdy5ldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgfVxyXG59O1xyXG5jb25zdCBtb3ZlID0gZXZlbnQgPT4ge1xyXG4gICAgaWYgKGZsYWcpIHtcclxuICAgICAgICBsZXQgY2xpZW50WCA9IGV2ZW50LnRvdWNoZXMgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFggOiBldmVudC5jbGllbnRYO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSBjbGllbnRYIC0gcG9zaXRpb24ub3JpWDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gcG9zaXRpb24ubWF4UmlnaHQpIHtcclxuICAgICAgICAgICAgbGVuZ3RoID0gcG9zaXRpb24ubWF4UmlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsZW5ndGggPCAtcG9zaXRpb24ubWF4TGVmdCkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSAtcG9zaXRpb24ubWF4TGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwZ3NXaWR0aCA9IHBhcnNlRmxvYXQoXHJcbiAgICAgICAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRvcmxQcm9ncmVzc0JveCwgbnVsbCkud2lkdGgucmVwbGFjZSgncHgnKSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBsZXQgcmF0ZSA9IChwb3NpdGlvbi5vcmlPZmZlc3RMZWZ0ICsgbGVuZ3RoKSAvIHBnc1dpZHRoO1xyXG5cclxuICAgICAgICBBdWRpby5jdXJyZW50VGltZSA9IEF1ZGlvLmR1cmF0aW9uICogcmF0ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGVuZCA9ICgpID0+IHtcclxuICAgIGZsYWcgPSBmYWxzZTtcclxufTtcclxuLy8g6byg5qCH5oyJ5LiLXHJcbmNvbnRvcmxEb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZG93biwgZmFsc2UpO1xyXG5jb250b3JsRG90LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBkb3duLCBmYWxzZSk7XHJcblxyXG4vLyDlvIDlp4vmi5bliqhcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZSwgZmFsc2UpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3ZlLCBmYWxzZSk7XHJcblxyXG4vLyDmi5bliqjnu5PmnZ9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGVuZCwgZmFsc2UpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGVuZCwgZmFsc2UpO1xyXG5cclxuZG90Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCB5ID0gZS5wYWdlWSAtIGRvdC5vZmZzZXRUb3AgKyBkb3Qub2Zmc2V0SGVpZ2h0IC8gMlxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBndW5kb25nMSlcclxuXHJcbiAgICBmdW5jdGlvbiBndW5kb25nMShlKSB7XHJcbiAgICAgICAgaWYgKGUucGFnZVkgLSB5IDwgMCkge1xyXG4gICAgICAgICAgICBkb3Quc3R5bGUudG9wID0gMCArIFwicHhcIlxyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5wYWdlWSAtIHkgPiA4MCkge1xyXG4gICAgICAgICAgICBkb3Quc3R5bGUudG9wID0gODAgKyBcInB4XCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb3Quc3R5bGUudG9wID0gKGUucGFnZVkgLSB5KSArIFwicHhcIlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkb3Quc3R5bGUudG9wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdm9sdW1lTm93LnN0eWxlLmhlaWdodCA9IDgwIC0gcGFyc2VJbnQoZG90LnN0eWxlLnRvcCkgKyBcInB4XCJcclxuICAgICAgICBjb25zb2xlLmxvZyh2b2x1bWVOb3cuc3R5bGUuaGVpZ2h0KTtcclxuICAgICAgICBBdWRpby52b2x1bWUgPSAxIC0gKHBhcnNlSW50KGRvdC5zdHlsZS50b3ApIC8gODApXHJcbiAgICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGd1bmRvbmcxKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5sZXQgYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYWwnKVxyXG5sZXQgZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFyJylcclxuYmFjay5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygxKVxyXG4gICAgY29uc29sZS5sb2coMSk7XHJcbn1cclxuZ28ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LmdvKDEpXHJcbiAgICBjb25zb2xlLmxvZygyKTtcclxufVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCB0aGVFdmVudCA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgbGV0IGNvZGUgPSB0aGVFdmVudC5rZXlDb2RlIHx8IHRoZUV2ZW50LndoaWNoIHx8IHRoZUV2ZW50LmNoYXJDb2RlO1xyXG4gICAgaWYgKGNvZGUgPT0gMTMpIHtcclxuICAgICAgICAvL+Wbnui9puaJp+ihjOafpeivolxyXG4gICAgICAgIGZldGNoKGBodHRwOi8vcmVkcm9jay51ZGRheS5jbjoyMDIyL3NlYXJjaD9rZXl3b3Jkcz0ke3NlYXJjaGJveC52YWx1ZX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dldCdcclxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcclxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5yZXN1bHQuc29uZ3M7XHJcbiAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicmVzXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2VhcmNodmFsdWVcIiwgc2VhcmNoYm94LnZhbHVlKVxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcIi4uXFxcXGh0bWxcXFxcc2VhcmNoLmh0bWxcIilcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gdm9sdW1lLm9uY2xpY2sgPSB4ID0+IHtcclxuLy8gICAgIHZvbHVtZWNvbnRvcmwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuLy8gfVxyXG5sZXQgaGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaW1nJylcclxuaGltZy5vbmNsaWNrID0geCA9PiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcIi4uXFxcXGh0bWxcXFxcY2xvdWRtdXNpYy5odG1sXCIpXHJcbi8vIGxldCB1c2VyaWQgPSAgbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyaWRcIilcclxuLy8gZmV0Y2goYGh0dHA6Ly9yZWRyb2NrLnVkZGF5LmNuOjIwMjIvdXNlci9wbGF5bGlzdD91aWQ9JHt1c2VyaWR9YClcclxuLy8gICAgIC50aGVuKChyZXMpID0+IHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyh1c2VyaWQpO1xyXG4vLyAgICAgICAgIHJldHVybiByZXMuanNvbigpXHJcbi8vICAgICB9KS50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpXHJcbi8vIGxldCBsaXN0ZGF0YSA9ICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxpc3RkYXRhXCIpXHJcbi8vIGxldCByYWRpb3NvbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhZGlvc29uZ3MnKVxyXG5cclxuXHJcbmZ1bmN0aW9uIEdldFVybFBhcmEoKSB7XHJcbiAgICBsZXQgdXJsID0gZG9jdW1lbnQubG9jYXRpb24udG9TdHJpbmcoKTsgLy/ojrflj5blvZPliY1VUkxcclxuICAgIGlmICh1cmwuaW5kZXhPZihcIj9cIikgIT0gLTEpIHsgLy/liKTmlq1VUkzvvJ/lkI7pnaLkuI3kuLrnqbpcclxuICAgICAgICBsZXQgYXJyVXJsID0gdXJsLnNwbGl0KFwiP1wiKTsgLy/liIblibLvvJ9cclxuICAgICAgICBsZXQgcGFyYSA9IGFyclVybFsxXTsgLy/ojrflj5blj4LmlbDpg6jliIZcclxuICAgICAgICBpZiAocGFyYSkgeyAvL+WIpOaWreS8oOWFpeeahOWPguaVsOmDqOWIhuS4jeS4uuepulxyXG4gICAgICAgICAgICBjb25zdCBhcnIgPSBwYXJhLnNwbGl0KFwiIVwiKTtcclxuICAgICAgICAgICAgY29uc3QgcmVzID0gYXJyLnNsaWNlKDEsIDQpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7IC8v5YiG5YmyPVxyXG4gICAgICAgICAgICAvLyB2YXIgcmVzID0gYXJyWzFdOyAvL+iOt+WPluWPguaVsOeahOWAvFxyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5sZXQgcmVzID0gR2V0VXJsUGFyYSgpO1xyXG5jb25zb2xlLmxvZyhyZXMpO1xyXG5sZXQgaSA9IHJlc1swXS5zcGxpdChcIiZcIilbMF1cclxubGV0IGEgPSAyMDA7IC8v5q2M6K+N5a655Zmo5Yiw6auY77yM6ZqP5L6/5pS5LOS9huacgOWlveWSjOS9oOiHquW3seWGmeWIsOmCo+S4qmRpduS4gOagt+mrmO+8m1xyXG5sZXQgYiA9IDM1O1xyXG5sZXQgbGlkID0gcmVzWzFdXHJcbmNvbnNvbGUubG9nKGkpO1xyXG5jb25zb2xlLmxvZyhsaWQpO1xyXG5mZXRjaChgaHR0cDovL3JlZHJvY2sudWRkYXkuY246MjAyMi9wbGF5bGlzdC9kZXRhaWw/aWQ9JHtsaWR9YCkudGhlbigocmVzKSA9PiB7XHJcbiAgICByZXR1cm4gcmVzLmpzb24oKTtcclxufSkudGhlbigocmVzKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICBzb25nMS5pbm5lckhUTUwgPSByZXMucGxheWxpc3QudHJhY2tzW2ldLm5hbWVcclxuICAgIHNvbmduYW1lLmlubmVySFRNTCA9IHJlcy5wbGF5bGlzdC50cmFja3NbaV0ubmFtZVxyXG4gICAgYWxidW0uaW5uZXJIVE1MID0gcmVzLnBsYXlsaXN0LnRyYWNrc1tpXS5hbC5uYW1lXHJcbiAgICBzb25nZXIyLmlubmVySFRNTCA9IHJlcy5wbGF5bGlzdC50cmFja3NbaV0uYXJbMF0ubmFtZVxyXG4gICAgc29uZ2VyMy5pbm5lckhUTUwgPSByZXMucGxheWxpc3QudHJhY2tzW2ldLmFyWzBdLm5hbWVcclxuICAgIGJ1dHRvbmluZy5zcmMgPSByZXMucGxheWxpc3QudHJhY2tzW2ldLmFsLnBpY1VybFxyXG4gICAgY2lyY2xlLnNyYyA9IHJlcy5wbGF5bGlzdC50cmFja3NbaV0uYWwucGljVXJsXHJcbiAgICBpZHNbaV0gPSByZXMucGxheWxpc3QudHJhY2tzW2ldLmlkXHJcbiAgICBmZXRjaChgaHR0cDovL3JlZHJvY2sudWRkYXkuY246MjAyMi9seXJpYz9pZD0ke3Jlcy5wbGF5bGlzdC50cmFja3NbaV0uaWR9YCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG5cclxuICAgICAgICB0ZXh0YXJlYS5pbm5lckhUTUwgPSByZXMubHJjLmx5cmljXHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmxyYy5seXJpYyk7XHJcbiAgICAgICAgcmV0dXJuIHRleHRhcmVhLmlubmVySFRNTFxyXG4gICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgbHJjID0gcmVzXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNwbGl0KCkgeyAvL+aKimxyY+atjOivjeWIhuWJsuaIkOaVsOe7hO+8jFxyXG4gICAgICAgICAgICBsZXQgc3BsaXRfMSA9IGxyYy5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBzcGxpdF8xLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxyY0FyciA9IHNwbGl0XzFbaV07XHJcbiAgICAgICAgICAgICAgICBzcGxpdF8xW2ldID0gY2hhbmdlKGxyY0Fycik7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hhbmdlKHN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBscmMgPSBzdHIuc3BsaXQoJ10nKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZXIgPSBscmNbMF0ucmVwbGFjZSgnWycsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyX211c2ljID0gbHJjWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lX3NwbGl0ID0gdGltZXIuc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcyA9ICt0aW1lX3NwbGl0WzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaW4gPSArdGltZV9zcGxpdFswXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiBtaW4gKiA2MCArIHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxyYzogc3RyX211c2ljIC8v5YiG5Ymy5aW95Yiw5q2M6K+N5ZKM5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzcGxpdF8xXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBscmNBcnIgPSBzcGxpdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVMaSgpIHsgLy/moLnmja7mrYzor43mlbDnu4TliJvlu7psaVxyXG4gICAgICAgICAgICBsZXQgbGVuID0gbHJjQXJyLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxyY19saSA9IGxyY0FycltpXTtcclxuICAgICAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgICAgICBsaS5pbm5lclRleHQgPSBscmNfbGkubHJjO1xyXG4gICAgICAgICAgICAgICAgbGkuc3R5bGUuaGVpZ2h0ID0gYiArICdweCdcclxuICAgICAgICAgICAgICAgIGxpLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInXHJcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAgICAgbGkuc3R5bGUucGFkZGluZyA9ICcwJztcclxuICAgICAgICAgICAgICAgIGxpLnN0eWxlLmNvbG9yID0gJyM5OTknXHJcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS50cmFuc2l0aW9uID0gJzAuMydcclxuXHJcbiAgICAgICAgICAgICAgICBkaWEuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNyZWF0ZUxpKClcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0Q3VycmVudExpKCkge1xyXG4gICAgICAgICAgICBsZXQgdGltZSA9IEF1ZGlvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbHJjQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGxheTEgPSBscmNBcnJbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZSAtIHBsYXkxLnRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGN1cnJlbnQoKSB7IC8v6K6+572udG9w77yM6K6p5YW25rua5YqoXHJcbiAgICAgICAgICAgIGxldCBsaSA9IHNldEN1cnJlbnRMaSgpO1xyXG4gICAgICAgICAgICBsZXQgZGl2SGVpZ2h0ID0gYTtcclxuICAgICAgICAgICAgbGV0IGxpSGVpZ2h0ID0gYjtcclxuICAgICAgICAgICAgbGV0IHRvcCA9IGxpSGVpZ2h0ICogbGkgLSBkaXZIZWlnaHQgLyAyICsgbGlIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBpZiAodG9wIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdG9wID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkaWEuc3R5bGUubWFyZ2luVG9wID0gLXRvcCArICdweCc7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b3AnK3RvcCk7XHJcbiAgICAgICAgICAgIGxldCBwbGF5TGkgPSBkaWEucXVlcnlTZWxlY3RvcignLnBsYXkxJylcclxuICAgICAgICAgICAgaWYgKHBsYXlMaSkge1xyXG4gICAgICAgICAgICAgICAgcGxheUxpLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsaSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsaSk7XHJcbiAgICAgICAgICAgICAgICAvLyBsaS5zdHlsZS5jc3NUZXh0ID0gXCJjb2xvcjogIzAwMDtmb250LXNpemU6IDIwcHg7XCJcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpYS5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICBkaWEuY2hpbGRyZW5bbGkgLSAxXS5jbGFzc05hbWUgPSAncGxheTEnXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkaWEuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgQXVkaW8ub250aW1ldXBkYXRlID0gY3VycmVudDtcclxuXHJcbiAgICAgICAgLy8gIFxyXG5cclxuXHJcblxyXG4gICAgfSlcclxuICAgIGZldGNoKGBodHRwOi8vcmVkcm9jay51ZGRheS5jbjoyMDIyL3NvbmcvdXJsP2lkPSR7cmVzLnBsYXlsaXN0LnRyYWNrc1tpXS5pZH1gKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxyXG4gICAgfSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgQXVkaW8uc3JjID0gcmVzLmRhdGFbMF0udXJsXHJcbiAgICB9KVxyXG4gICAgZmV0Y2goYGh0dHA6Ly9yZWRyb2NrLnVkZGF5LmNuOjIwMjIvY29tbWVudC9tdXNpYz9pZD0ke3Jlcy5wbGF5bGlzdC50cmFja3NbaV0uaWR9YCkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcclxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbW1lbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVuZCcpXHJcbiAgICAgICAgICAgIGxldCBjb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgIGNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbicpXHJcbiAgICAgICAgICAgIGxldCBjb21jb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgIGNvbWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NvbWNvbicpXHJcbiAgICAgICAgICAgIGxldCB1c2VycGljID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICAgICAgdXNlcnBpYy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3VzZXJwaWMnKVxyXG4gICAgICAgICAgICBsZXQgdGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgICAgIHRpbWUuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aW1lJylcclxuICAgICAgICAgICAgbGV0IGxpa2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgIGxldCBpbWcyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxyXG4gICAgICAgICAgICBsaWtlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGlrZScpXHJcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpXHJcbiAgICAgICAgICAgIC8vIGxpa2UuYXBwZW5kQ2hpbGQoaWNvbjEwKVxyXG5cclxuICAgICAgICAgICAgdXNlcnBpYy5hcHBlbmRDaGlsZChpbWcpXHJcbiAgICAgICAgICAgIGNvbi5hcHBlbmRDaGlsZCh1c2VycGljKVxyXG4gICAgICAgICAgICBjb24uYXBwZW5kQ2hpbGQodGltZSlcclxuICAgICAgICAgICAgY29uLmFwcGVuZENoaWxkKGxpa2UpXHJcbiAgICAgICAgICAgIGNvbi5hcHBlbmRDaGlsZChjb21jb24pXHJcbiAgICAgICAgICAgIGNvbW1lbmQuYXBwZW5kQ2hpbGQoY29uKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VycGljKTtcclxuICAgICAgICAgICAgY29tY29uLmlubmVySFRNTCA9IHJlcy5ob3RDb21tZW50c1tpXS51c2VyLm5pY2tuYW1lICsgXCI6XCIgKyByZXMuaG90Q29tbWVudHNbaV0uY29udGVudFxyXG4gICAgICAgICAgICBsaWtlLmlubmVySFRNTCA9IFwi8J+RjVwiICsgcmVzLmhvdENvbW1lbnRzW2ldLmxpa2VkQ291bnRcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHJlcy5ob3RDb21tZW50c1tpXS51c2VyLmF2YXRhclVybFxyXG4gICAgICAgICAgICB0aW1lLmlubmVySFRNTCA9IHJlcy5ob3RDb21tZW50c1tpXS50aW1lU3RyXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIGxldCB1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG93blwiKVxyXG4gICAgY29uc29sZS5sb2codXApO1xyXG4gICAgbGV0IGRvd24xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51cFwiKVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaEF1ZGlvKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29uZ1wiKS5pbm5lckhUTUwgPSByZXMucGxheWxpc3QudHJhY2tzW2ldLm5hbWVcclxuICAgICAgICBidXR0b25pbmcuc3JjID0gcmVzLnBsYXlsaXN0LnRyYWNrc1tpXS5hbC5waWNVcmxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvbmdlcjFcIikuaW5uZXJIVE1MID0gcmVzLnBsYXlsaXN0LnRyYWNrc1tpXS5hclswXS5uYW1lXHJcbiAgICAgICAgLy8gdGV4dGFyZWEuaW5uZXJIVE1MID0gcmVzLmxyYy5seXJpYztcclxuICAgICAgICBjb21jb24uaW5uZXJIVE1MID0gcmVzLmhvdENvbW1lbnRzW2ldLnVzZXIubmlja25hbWUgKyBcIjpcIiArIHJlcy5ob3RDb21tZW50c1tpXS5jb250ZW50XHJcbiAgICAgICAgbGlrZS5pbm5lckhUTUwgPSByZXMuaG90Q29tbWVudHNbaV0ubGlrZWRDb3VudFxyXG4gICAgICAgIGltZy5zcmMgPSByZXMuaG90Q29tbWVudHNbaV0udXNlci5hdmF0YXJVcmxcclxuICAgICAgICB0aW1lLmlubmVySFRNTCA9IHJlcy5ob3RDb21tZW50c1tpXS50aW1lU3RyXHJcbiAgICAgICAgY2lyY2xlLnNyYyA9IHJlcy5wbGF5bGlzdC50cmFja3NbaV0uYWwucGljVXJsXHJcbiAgICAgICAgQXVkaW8ucGxheSgpXHJcbiAgICB9XHJcbiAgICB1cC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcy5wbGF5bGlzdC50cmFja3NbaV0uaWQpO1xyXG4gICAgICAgIGZldGNoKGBodHRwOi8vcmVkcm9jay51ZGRheS5jbjoyMDIyL3NvbmcvdXJsP2lkPSR7cmVzLnBsYXlsaXN0LnRyYWNrc1tpXS5pZH1gKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcclxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBuYW1lcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBpID0gMFxyXG4gICAgICAgICAgICBBdWRpby5zcmMgPSByZXMuZGF0YVswXS51cmxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzd2l0Y2hBdWRpbygpXHJcbiAgICB9XHJcbiAgICBkb3duMS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZldGNoKGBodHRwOi8vcmVkcm9jay51ZGRheS5jbjoyMDIyL3NvbmcvdXJsP2lkPSR7cmVzLnBsYXlsaXN0LnRyYWNrc1tpXS5pZH1gKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcclxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaSA9IGkgLSAxXHJcbiAgICAgICAgICAgIGlmIChpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpID0gbmFtZXMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEF1ZGlvLnNyYyA9IHJlcy5kYXRhWzBdLnVybFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHN3aXRjaEF1ZGlvKClcclxuICAgIH1cclxufSlcclxuXHJcbnNvbmdlcmxpc3QucHVzaChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNvbmdlclwiKSlcclxuc29uZ25hbWUuaW5uZXJIVE1MID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzb25nXCIpXHJcbm5hbWVzLnB1c2gobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzb25nXCIpKVxyXG5pbWdzLnB1c2gobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwaWNcIikpXHJcblxyXG5jb25zb2xlLmxvZyhzb25nZXJsaXN0KTtcclxuLy9idXR0b25pbmcuc3JjID0gIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicGljXCIpXHJcbmNvbnNvbGUubG9nKG5hbWVzKTtcclxuXHJcblxyXG4vLyBsZXQgdGx5cmljID0gW11cclxuLy8gbGV0IHRlbXAxMTEgPSAwXHJcbi8vIGxldCBnZXRMeSA9IGZ1bmN0aW9uICgpIHsgLy/mm7TmlrDmkq3mlL7ov5vluqZcclxuLy8gICAgIG5vd1RpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXVkaW8nKS5jdXJyZW50VGltZS50b0ZpeGVkKDMpXHJcbi8vIH1cclxuLy8gbGV0IGNvbXBhcmUgPSBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVBcnIubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICBpZiAobm93VGltZSA+IHRpbWVBcnJbaV0pIHsgLy/mkq3mlL7ml7bpl7TotoXlh7rml7bpl7TovbTml7bpl7TvvIzku6Pooajov5nlj6XmrYzor43lt7Lnu4/ov4fljrtcclxuLy8gICAgICAgICAgICAgdGVtcDExMSA9IGlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gbGV0IHNjcm9sbCA9IGZ1bmN0aW9uICgpIHsgLy/mrYzor43mu5rliqjmlYjmnpxcclxuLy8gICAgIGlmICh0ZW1wMTExID09IDApIHtcclxuLy8gICAgICAgICBseXJpY0JveC5xdWVyeVNlbGVjdG9yQWxsKCdwJykuZm9yRWFjaCgoY3VycmVudFZhbHVlKSA9PiB7IC8v5o6S5LuW5oCd5oOz5pS55Y+Y5qC35byPXHJcbi8vICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5jbGFzc05hbWUgPSAnbHlvdXQnXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgICAgICBseXJpY0JveC5xdWVyeVNlbGVjdG9yQWxsKCdwJylbdGVtcDExMV0uY2xhc3NOYW1lID0gJ2x5aW4nXHJcblxyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBseXJpY0JveC5xdWVyeVNlbGVjdG9yQWxsKCdwJykuZm9yRWFjaCgoY3VycmVudFZhbHVlKSA9PiB7XHJcbi8vICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5jbGFzc05hbWUgPSAnbHlvdXQnXHJcbi8vICAgICAgICAgfSlcclxuLy8gICAgICAgICBseXJpY0JveC5xdWVyeVNlbGVjdG9yQWxsKCdwJylbdGVtcDExMV0uY2xhc3NOYW1lID0gJ2x5aW4nXHJcbi8vICAgICB9XHJcbi8vICAgICBpZiAodGx5cmljICE9ICcnKSB7IC8v5aaC5p6c5pyJ57+76K+R77yM6KaB5rua5b6X5aSa5LiA5LqbXHJcbi8vICAgICAgICAgbHlyaWNCb3guc2Nyb2xsKHtcclxuLy8gICAgICAgICAgICAgdG9wOiAodGVtcDExMSkgKiAxNTAsXHJcbi8vICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIGx5cmljQm94LnNjcm9sbCh7XHJcbi8vICAgICAgICAgICAgIHRvcDogKHRlbXAxMTEpICogOTAsXHJcbi8vICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4vLyAgICAgICAgIH0pXHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcblxyXG5cclxuLy8gZnVuY3Rpb24gcm9sbCgpIHtcclxuLy8gICAgIC8vbHlyaWNzKClcclxuLy8gICAgIGxldCBwID0gbHlyaWNzMS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBcIilcclxuLy8gICAgIC8vY29uc29sZS5sb2cocCk7XHJcbi8vICAgICBsZXQgY3VyVGltZVxyXG4vLyAgICAgbXVzaWNzWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgICBjdXJUaW1lID0gcGFyc2VJbnQodGhpcy5jdXJyZW50VGltZSlcclxuLy8gICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VyVGltZSkpIHtcclxuLy8gICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgICAgICBwW2ldLnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZTogMTVweDtcIlxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1clRpbWUpKTtcclxuLy8gICAgICAgICAgICAgLy8gbGV0IHZhbHVlID0gZS50YXJnZXQuY3VycmVudFRpbWUgLyBBdWRpby5kdXJhdGlvbjtcclxuXHJcbi8vICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1clRpbWUpLnN0eWxlLmNzc1RleHQgPSBcImNvbG9yOiAjMDAwO2ZvbnQtc2l6ZTogMjBweDtcIlxyXG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJUaW1lKS5zdHlsZS50b3ApO1xyXG5cclxuLy8gICAgICAgICAgICAgLy9jb250b3JsRG90LnN0eWxlLmxlZnQgPSBgJHt2YWx1ZSAqIDEwMH0lYDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KVxyXG4vLyB9XHJcblxyXG4vLyByb2xsKClcclxubGV0IGNvbW1lbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVuZCcpXHJcbmxldCBpY29uMTAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbjEwJylcclxuXHJcbmJ1dHRvbmluZ1snb25jbGljayddID0geCA9PiB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcIi4uXFxcXGh0bWxcXFxcY2xvdWRtdXNpYy5odG1sXCIpXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGNhY2hlZE1vZHVsZS5lcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBjYWNoZWRNb2R1bGUuZXJyb3I7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHRyeSB7XG5cdFx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uaS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHsgaGFuZGxlcihleGVjT3B0aW9ucyk7IH0pO1xuXHRcdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0XHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXHR9IGNhdGNoKGUpIHtcblx0XHRtb2R1bGUuZXJyb3IgPSBlO1xuXHRcdHRocm93IGU7XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmh1ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRiA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJyYWRpby5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjhjNzdiY2JjOWU3MmI2ZWJmMjRmXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcImNsb3VkbXVzaWM6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCJ2YXIgY3VycmVudE1vZHVsZURhdGEgPSB7fTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jO1xuXG4vLyBtb2R1bGUgYW5kIHJlcXVpcmUgY3JlYXRpb25cbnZhciBjdXJyZW50Q2hpbGRNb2R1bGU7XG52YXIgY3VycmVudFBhcmVudHMgPSBbXTtcblxuLy8gc3RhdHVzXG52YXIgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzID0gW107XG52YXIgY3VycmVudFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4vLyB3aGlsZSBkb3dubG9hZGluZ1xudmFyIGJsb2NraW5nUHJvbWlzZXM7XG5cbi8vIFRoZSB1cGRhdGUgaW5mb1xudmFyIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzO1xudmFyIHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuXHRcdGRhdGE6IGN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuXHR9O1xuXHRjdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG5cdHJldHVybiBob3Q7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhuZXdTdGF0dXMpIHtcblx0Y3VycmVudFN0YXR1cyA9IG5ld1N0YXR1cztcblx0dmFyIHJlc3VsdHMgPSBbXTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcblx0XHRyZXN1bHRzW2ldID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwocmVzdWx0cyk7XG59XG5cbmZ1bmN0aW9uIHRyYWNrQmxvY2tpbmdQcm9taXNlKHByb21pc2UpIHtcblx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRzZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuXHRcdFx0YmxvY2tpbmdQcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXHRcdFx0d2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pIHtcblx0aWYgKGJsb2NraW5nUHJvbWlzZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZm4oKTtcblx0dmFyIGJsb2NrZXIgPSBibG9ja2luZ1Byb21pc2VzO1xuXHRibG9ja2luZ1Byb21pc2VzID0gW107XG5cdHJldHVybiBQcm9taXNlLmFsbChibG9ja2VyKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGJsb2NraW5nUHJvbWlzZXMgPSBbXTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDKS5yZWR1Y2UoZnVuY3Rpb24gKFxuXHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRrZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yQ1trZXldKFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUuYyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlLnIsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5tLFxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZWRNb2R1bGVzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2VzO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0W10pXG5cdFx0XHRcdCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChhcHBseU9uVXBkYXRlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KGFwcGx5T25VcGRhdGUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkTW9kdWxlcztcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuYWxBcHBseShvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCk7XG5cblx0dmFyIHJlc3VsdHMgPSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycy5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRyZXR1cm4gaGFuZGxlcihvcHRpb25zKTtcblx0fSk7XG5cdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gdW5kZWZpbmVkO1xuXG5cdHZhciBlcnJvcnMgPSByZXN1bHRzXG5cdFx0Lm1hcChmdW5jdGlvbiAocikge1xuXHRcdFx0cmV0dXJuIHIuZXJyb3I7XG5cdFx0fSlcblx0XHQuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuXHRcdHJldHVybiBzZXRTdGF0dXMoXCJhYm9ydFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IGVycm9yc1swXTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuXHR2YXIgZGlzcG9zZVByb21pc2UgPSBzZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuXG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5kaXNwb3NlKSByZXN1bHQuZGlzcG9zZSgpO1xuXHR9KTtcblxuXHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG5cdHZhciBhcHBseVByb21pc2UgPSBzZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuXHR2YXIgZXJyb3I7XG5cdHZhciByZXBvcnRFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcblx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcblx0fTtcblxuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0aWYgKHJlc3VsdC5hcHBseSkge1xuXHRcdFx0dmFyIG1vZHVsZXMgPSByZXN1bHQuYXBwbHkocmVwb3J0RXJyb3IpO1xuXHRcdFx0aWYgKG1vZHVsZXMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChbZGlzcG9zZVByb21pc2UsIGFwcGx5UHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG5cdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiZmFpbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBsaXN0O1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImlkbGVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKSB7XG5cdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRpZiAoIWN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzKSBjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufSIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiOyIsInZhciBjcmVhdGVTdHlsZXNoZWV0ID0gKGNodW5rSWQsIGZ1bGxocmVmLCByZXNvbHZlLCByZWplY3QpID0+IHtcblx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdHZhciBvbkxpbmtDb21wbGV0ZSA9IChldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcy5cblx0XHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG51bGw7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJykge1xuXHRcdFx0cmVzb2x2ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5jb2RlID0gXCJDU1NfQ0hVTktfTE9BRF9GQUlMRURcIjtcblx0XHRcdGVyci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0ZXJyLnJlcXVlc3QgPSByZWFsSHJlZjtcblx0XHRcdGxpbmtUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaW5rVGFnKVxuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9XG5cdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gb25MaW5rQ29tcGxldGU7XG5cdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IChocmVmLCBmdWxsaHJlZikgPT4ge1xuXHR2YXIgZXhpc3RpbmdMaW5rVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nTGlua1RhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdMaW5rVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpIHx8IHRhZy5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuXHRcdGlmKHRhZy5yZWwgPT09IFwic3R5bGVzaGVldFwiICYmIChkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpKSByZXR1cm4gdGFnO1xuXHR9XG5cdHZhciBleGlzdGluZ1N0eWxlVGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3R5bGVcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ1N0eWxlVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ1N0eWxlVGFnc1tpXTtcblx0XHR2YXIgZGF0YUhyZWYgPSB0YWcuZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpO1xuXHRcdGlmKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikgcmV0dXJuIHRhZztcblx0fVxufTtcbnZhciBsb2FkU3R5bGVzaGVldCA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSAob3B0aW9ucykgPT4ge1xuXHRyZXR1cm4geyBkaXNwb3NlOiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG9sZFRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBvbGRUYWcgPSBvbGRUYWdzW2ldO1xuXHRcdFx0aWYob2xkVGFnLnBhcmVudE5vZGUpIG9sZFRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZFRhZyk7XG5cdFx0fVxuXHRcdG9sZFRhZ3MubGVuZ3RoID0gMDtcblx0fSwgYXBwbHk6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gKGNodW5rSWRzLCByZW1vdmVkQ2h1bmtzLCByZW1vdmVkTW9kdWxlcywgcHJvbWlzZXMsIGFwcGx5SGFuZGxlcnMsIHVwZGF0ZWRNb2R1bGVzTGlzdCkgPT4ge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y2h1bmtJZHMuZm9yRWFjaCgoY2h1bmtJZCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdHZhciBvbGRUYWcgPSBmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZik7XG5cdFx0aWYoIW9sZFRhZykgcmV0dXJuO1xuXHRcdHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsICgpID0+IHtcblx0XHRcdFx0dGFnLmFzID0gXCJzdHlsZVwiO1xuXHRcdFx0XHR0YWcucmVsID0gXCJwcmVsb2FkXCI7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0sIHJlamVjdCk7XG5cdFx0XHRvbGRUYWdzLnB1c2gob2xkVGFnKTtcblx0XHRcdG5ld1RhZ3MucHVzaCh0YWcpO1xuXHRcdH0pKTtcblx0fSk7XG59IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHRcInJhZGlvXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG52YXIgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdDtcbnZhciB3YWl0aW5nVXBkYXRlUmVzb2x2ZXMgPSB7fTtcbmZ1bmN0aW9uIGxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHRcdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkXG5cdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBob3QgdXBkYXRlIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkKTtcblx0fSk7XG59XG5cbnNlbGZbXCJ3ZWJwYWNrSG90VXBkYXRlY2xvdWRtdXNpY1wiXSA9IChjaHVua0lkLCBtb3JlTW9kdWxlcywgcnVudGltZSkgPT4ge1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0aWYoY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCkgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgY3VycmVudFVwZGF0ZVJ1bnRpbWUucHVzaChydW50aW1lKTtcblx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKCk7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG52YXIgY3VycmVudFVwZGF0ZUNodW5rcztcbnZhciBjdXJyZW50VXBkYXRlO1xudmFyIGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGVSdW50aW1lO1xuZnVuY3Rpb24gYXBwbHlIYW5kbGVyKG9wdGlvbnMpIHtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikgZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtcjtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHVuZGVmaW5lZDtcblx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKHVwZGF0ZU1vZHVsZUlkKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG5cdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cblx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hhaW46IFtpZF0sXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuXHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuXHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFtb2R1bGUgfHxcblx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuXHRcdFx0KVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG5cdFx0XHRcdHZhciBwYXJlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbcGFyZW50SWRdO1xuXHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG5cdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcblx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcblx0XHRcdFx0cXVldWUucHVzaCh7XG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRpZDogcGFyZW50SWRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcblx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcblx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuXHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gYltpXTtcblx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcblx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuXHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG5cdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUobW9kdWxlKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyBtb2R1bGUuaWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcblx0XHQpO1xuXHR9O1xuXG5cdGZvciAodmFyIG1vZHVsZUlkIGluIGN1cnJlbnRVcGRhdGUpIHtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdFx0dmFyIG5ld01vZHVsZUZhY3RvcnkgPSBjdXJyZW50VXBkYXRlW21vZHVsZUlkXTtcblx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cblx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRpZiAobmV3TW9kdWxlRmFjdG9yeSkge1xuXHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHMobW9kdWxlSWQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0ID0ge1xuXHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG5cdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcblx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcblx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuXHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuXHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGVycm9yOiBhYm9ydEVycm9yXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9BcHBseSkge1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IG5ld01vZHVsZUZhY3Rvcnk7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG5cdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcblx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjdXJyZW50VXBkYXRlID0gdW5kZWZpbmVkO1xuXG5cdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cblx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuXHRmb3IgKHZhciBqID0gMDsgaiA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGorKykge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2pdO1xuXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0aWYgKFxuXHRcdFx0bW9kdWxlICYmXG5cdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkIHx8IG1vZHVsZS5ob3QuX21haW4pICYmXG5cdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG5cdFx0XHRhcHBsaWVkVXBkYXRlW291dGRhdGVkTW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmUgJiZcblx0XHRcdC8vIHdoZW4gY2FsbGVkIGludmFsaWRhdGUgc2VsZi1hY2NlcHRpbmcgaXMgbm90IHBvc3NpYmxlXG5cdFx0XHQhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkXG5cdFx0KSB7XG5cdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG5cdFx0XHRcdG1vZHVsZTogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0cmVxdWlyZTogbW9kdWxlLmhvdC5fcmVxdWlyZVNlbGYsXG5cdFx0XHRcdGVycm9ySGFuZGxlcjogbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG5cblx0cmV0dXJuIHtcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHR9KTtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gdW5kZWZpbmVkO1xuXG5cdFx0XHR2YXIgaWR4O1xuXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG5cdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcblx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuXHRcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG5cdFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuXHRcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0ZGlzcG9zZUhhbmRsZXJzW2pdLmNhbGwobnVsbCwgZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJEW21vZHVsZUlkXSA9IGRhdGE7XG5cblx0XHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcblx0XHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuXHRcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcblx0XHRcdFx0ZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHR2YXIgY2hpbGQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcblx0XHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcblx0XHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuXHRcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuXHRcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cblx0XHRcdHZhciBkZXBlbmRlbmN5O1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YXBwbHk6IGZ1bmN0aW9uIChyZXBvcnRFcnJvcikge1xuXHRcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG5cdFx0XHRmb3IgKHZhciB1cGRhdGVNb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oYXBwbGllZFVwZGF0ZSwgdXBkYXRlTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW3VwZGF0ZU1vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJ1biBuZXcgcnVudGltZSBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRVcGRhdGVSdW50aW1lLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lW2ldKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdHZhciBhY2NlcHRDYWxsYmFjayA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXIgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0aWYgKGFjY2VwdENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGFjY2VwdENhbGxiYWNrKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGFjY2VwdENhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzLnB1c2goZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MucHVzaChkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBjYWxsYmFja3MubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3Nba10uY2FsbChudWxsLCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZXJyb3JIYW5kbGVyc1trXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzW2tdKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIG8gPSAwOyBvIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgbysrKSB7XG5cdFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW29dO1xuXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpdGVtLnJlcXVpcmUobW9kdWxlSWQpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRtb2R1bGU6IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHR9XG5cdH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkuanNvbnAgPSBmdW5jdGlvbiAobW9kdWxlSWQsIGFwcGx5SGFuZGxlcnMpIHtcblx0aWYgKCFjdXJyZW50VXBkYXRlKSB7XG5cdFx0Y3VycmVudFVwZGF0ZSA9IHt9O1xuXHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSBbXTtcblx0XHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0fVxuXHRpZiAoIV9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF07XG5cdH1cbn07XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMuanNvbnAgPSBmdW5jdGlvbiAoXG5cdGNodW5rSWRzLFxuXHRyZW1vdmVkQ2h1bmtzLFxuXHRyZW1vdmVkTW9kdWxlcyxcblx0cHJvbWlzZXMsXG5cdGFwcGx5SGFuZGxlcnMsXG5cdHVwZGF0ZWRNb2R1bGVzTGlzdFxuKSB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0ge307XG5cdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gcmVtb3ZlZENodW5rcztcblx0Y3VycmVudFVwZGF0ZSA9IHJlbW92ZWRNb2R1bGVzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrZXkpIHtcblx0XHRvYmpba2V5XSA9IGZhbHNlO1xuXHRcdHJldHVybiBvYmo7XG5cdH0sIHt9KTtcblx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0Y2h1bmtJZHMuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdGlmIChcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZFxuXHRcdCkge1xuXHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHR9XG5cdH0pO1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yID0gZnVuY3Rpb24gKGNodW5rSWQsIHByb21pc2VzKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3MgJiZcblx0XHRcdFx0IV9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZFxuXHRcdFx0KSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpKTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNID0gKCkgPT4ge1xuXHRpZiAodHlwZW9mIGZldGNoID09PSBcInVuZGVmaW5lZFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnQ6IG5lZWQgZmV0Y2ggQVBJXCIpO1xuXHRyZXR1cm4gZmV0Y2goX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGKCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHJldHVybjsgLy8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuXHRcdGlmKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBtYW5pZmVzdCBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pO1xufTtcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIiIsIi8vIG1vZHVsZSBjYWNoZSBhcmUgdXNlZCBzbyBlbnRyeSBpbmxpbmluZyBpcyBkaXNhYmxlZFxuLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9qcy9yYWRpby5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJtdXNpY3MiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidXR0b25pbmciLCJxdWVyeVNlbGVjdG9yIiwic29uZzEiLCJzb25nZXIyIiwibmFtZXMiLCJtdXNpY2xpc3QiLCJzb25nZXJsaXN0IiwiaWRzIiwiaW1ncyIsImluZGV4Iiwic29uZ25hbWUiLCJhbGJ1bSIsInNvbmdlcjMiLCJjaXJjbGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGlhIiwidm9sdW1lY29udG9ybCIsImx5cmljczEiLCJBdWRpbyIsImNvbnRvcmwiLCJjb250b3JsRG90IiwiY29udG9ybFByb2dyZXNzIiwiY29udG9ybFByb2dyZXNzQm94IiwiY3VycmVudCIsImR1cmF0aW9uIiwidm9sdW1lIiwidm9sdW1lTm93Iiwidm9sdW1lTWF4IiwiZG90IiwiYnRuaWYiLCJ0ZXh0YXJlYSIsInVwIiwiY29uc29sZSIsImxvZyIsImRvd24xIiwidHJhbnNUaW1lIiwidmFsdWUiLCJ0aW1lIiwiaCIsInBhcnNlSW50IiwibSIsInMiLCJmb3JtYXRUaW1lIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJpbm5lclRleHQiLCJwbGF5IiwicGF1c2UiLCJjdXJyZW50VGltZSIsInN0eWxlIiwid2lkdGgiLCJsZWZ0IiwicG9zaXRpb24iLCJvcmlPZmZlc3RMZWZ0Iiwib3JpWCIsIm1heExlZnQiLCJtYXhSaWdodCIsImZsYWciLCJkb3duIiwiZXZlbnQiLCJvZmZzZXRMZWZ0IiwidG91Y2hlcyIsImNsaWVudFgiLCJvZmZzZXRXaWR0aCIsInByZXZlbnREZWZhdWx0IiwicmV0dXJuVmFsdWUiLCJzdG9wUHJvcGFnYXRpb24iLCJ3aW5kb3ciLCJjYW5jZWxCdWJibGUiLCJtb3ZlIiwicGdzV2lkdGgiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInJlcGxhY2UiLCJyYXRlIiwiZW5kIiwib25tb3VzZWRvd24iLCJ5IiwicGFnZVkiLCJvZmZzZXRUb3AiLCJvZmZzZXRIZWlnaHQiLCJndW5kb25nMSIsInRvcCIsImhlaWdodCIsIm9ubW91c2V1cCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJiYWNrIiwiZ28iLCJvbmNsaWNrIiwiaGlzdG9yeSIsInRoZUV2ZW50IiwiY29kZSIsImtleUNvZGUiLCJ3aGljaCIsImNoYXJDb2RlIiwiZmV0Y2giLCJzZWFyY2hib3giLCJtZXRob2QiLCJ0aGVuIiwicmVzIiwianNvbiIsInJlc3VsdCIsInNvbmdzIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJsb2NhdGlvbiIsImhpbWciLCJ4IiwiR2V0VXJsUGFyYSIsInVybCIsInRvU3RyaW5nIiwiaW5kZXhPZiIsImFyclVybCIsInBhcmEiLCJhcnIiLCJzbGljZSIsImEiLCJiIiwibGlkIiwiaW5uZXJIVE1MIiwicGxheWxpc3QiLCJ0cmFja3MiLCJuYW1lIiwiYWwiLCJhciIsInNyYyIsInBpY1VybCIsImlkIiwibHJjIiwibHlyaWMiLCJzcGxpdF8xIiwiY2hhbmdlIiwic3RyIiwidGltZXIiLCJzdHJfbXVzaWMiLCJ0aW1lX3NwbGl0IiwibWluIiwibHJjQXJyIiwiY3JlYXRlTGkiLCJsZW4iLCJscmNfbGkiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0QWxpZ24iLCJwYWRkaW5nIiwiY29sb3IiLCJ0cmFuc2l0aW9uIiwiYXBwZW5kQ2hpbGQiLCJzZXRDdXJyZW50TGkiLCJwbGF5MSIsImRpdkhlaWdodCIsImxpSGVpZ2h0IiwibWFyZ2luVG9wIiwicGxheUxpIiwiY2xhc3NOYW1lIiwiY2hpbGRyZW4iLCJvbnRpbWV1cGRhdGUiLCJkYXRhIiwiY29tbWVuZCIsImNvbiIsInNldEF0dHJpYnV0ZSIsImNvbWNvbiIsInVzZXJwaWMiLCJsaWtlIiwiaW1nMiIsImltZyIsImhvdENvbW1lbnRzIiwidXNlciIsIm5pY2tuYW1lIiwiY29udGVudCIsImxpa2VkQ291bnQiLCJhdmF0YXJVcmwiLCJ0aW1lU3RyIiwic3dpdGNoQXVkaW8iLCJwdXNoIiwiaWNvbjEwIl0sInNvdXJjZVJvb3QiOiIifQ==