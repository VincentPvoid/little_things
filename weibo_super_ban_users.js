// ==UserScript==
// @name         微博超话屏蔽用户
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  微博超话屏蔽指定id用户
// @author       You
// @match        https://weibo.com/p/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let banList = [
    { name: '用户名', id: 用户id },
  ]
  let as = document.querySelectorAll('.WB_info a');
  let timer = null;

  if (!as.length) {
    timer = setInterval(() => {
      as = removeUser(as)
      console.log('timer')
      // if (as.length && as.length > 50) {
      //   clearInterval(timer)
      // }
    }, 300);

  }

  function removeUser(as) {
    as = document.querySelectorAll('.WB_info a');
    for (let i = 0; i < as.length; i++) {
      let tar = null;
      banList.forEach(item => {
        if (as[i].href.includes(item.id)) {
          tar = as[i].parentElement.parentElement.parentElement.parentElement;
          tar.style.display = 'none';
        }
      })
    }
    return as;
  }


})();
