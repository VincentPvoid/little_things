// ==UserScript==
// @name         微博搜索屏蔽用户
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://s.weibo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let banList = [{name:'用户名；其实没有用到，可以不输入', id:用户UID，用于筛选屏蔽}]
    let as = document.querySelectorAll('.card .content .info .name')
    for(let i = 0; i< as.length; i++){
      let tar = null;
      banList.forEach(item => {
        if(as[i].href.includes(item.id)){
         tar = as[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
         tar.style.display = 'none';
        }
      })
    }

    // Your code here...
})();
