// ==UserScript==
// @name         tumblr屏蔽rader推荐
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  tumblr屏蔽rader推荐部分
// @author       You
// @match        https://www.tumblr.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let timer = setInterval(() => {
    let divs = document.getElementsByClassName('FZkjV');
    divs = [].slice.call(divs);
    console.log(divs, 'ddddddddddd')
    if (divs.length > 1) {
      // divs[1].style.display = "none";
      divs[divs.length - 1].parentElement.removeChild(divs[divs.length - 1]);
      clearInterval(timer)
    }
  }, 1000);
})();
