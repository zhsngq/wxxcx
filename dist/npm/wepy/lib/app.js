"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},RequestMQ={map:{},mq:[],running:[],MAX_REQUEST:5,push:function(t){for(t.t=+new Date;this.mq.indexOf(t.t)>-1||this.running.indexOf(t.t)>-1;)t.t+=10*Math.random()>>0;this.mq.push(t.t),this.map[t.t]=t},next:function(){var t=this,e=this;if(0!==this.mq.length&&this.running.length<this.MAX_REQUEST-1){var n=function(){var n=t.mq.shift(),r=t.map[n],i=r.complete;return r.complete=function(){for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];e.running.splice(e.running.indexOf(r.t),1),delete e.map[r.t],i&&i.apply(r,n),e.next()},t.running.push(r.t),{v:wx.request(r)}}();if("object"===("undefined"==typeof n?"undefined":_typeof(n)))return n.v}},request:function(t){return t=t||{},t="string"==typeof t?{url:t}:t,this.push(t),this.next()}},_class=function(){function t(){_classCallCheck(this,t),this.$addons={},this.$interceptors={}}return _createClass(t,[{key:"init",value:function(t){this.initAPI(t),this.$wxapp=getApp()}},{key:"use",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];"string"==typeof t&&this[t]?(this.$addons[t]=1,this[t](n)):this.$addons[t.name]=new t(n)}},{key:"intercept",value:function(t,e){this.$interceptors[t]=e}},{key:"promisify",value:function(){}},{key:"requestfix",value:function(){}},{key:"initAPI",value:function(t){var e=this,n={stopRecord:!0,pauseVoice:!0,stopVoice:!0,pauseBackgroundAudio:!0,stopBackgroundAudio:!0,showNavigationBarLoading:!0,hideNavigationBarLoading:!0,createAnimation:!0,createContext:!0,createCanvasContext:!0,hideKeyboard:!0,stopPullDownRefresh:!0};Object.keys(wx).forEach(function(r){n[r]||"on"===r.substr(0,2)||/\w+Sync$/.test(r)?Object.defineProperty(t,r,{get:function(){return function(t){return wx[r](t)}}}):Object.defineProperty(t,r,{get:function(){return function(t){if(t=t||{},e.$interceptors[r]&&e.$interceptors[r].config){var n=e.$interceptors[r].config.call(e,t);if(n===!1)return e.$addons.promisify?Promise.reject("aborted by interceptor"):void(t.fail&&t.fail("aborted by interceptor"));t=n}return"request"===r&&(t="string"==typeof t?{url:t}:t),e.$addons.promisify?new Promise(function(n,i){var o={};["fail","success","complete"].forEach(function(s){o[s]=t[s],t[s]=function(t){e.$interceptors[r]&&e.$interceptors[r][s]&&(t=e.$interceptors[r][s].call(e,t)),"success"===s?n(t):"fail"===s&&i(t)}}),e.$addons.requestfix&&"request"===r?RequestMQ.request(t):wx[r](t)}):void!function(){var n={};["fail","success","complete"].forEach(function(i){n[i]=t[i],t[i]=function(t){e.$interceptors[r]&&e.$interceptors[r][i]&&(t=e.$interceptors[r][i].call(e,t)),n[i]&&n[i].call(e,t)}}),e.$addons.requestfix&&"request"===r?RequestMQ.request(t):wx[r](t)}()}}})})}}]),t}();exports.default=_class;