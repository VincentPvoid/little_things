// ==UserScript==
// @name         B站搜索屏蔽用户
// @namespace    https://github.com/VincentPvoid
// @version      0.1
// @description  B站搜索屏蔽用户
// @author       VincentPViod
// @match        https://search.bilibili.com/*
// ==/UserScript==

(function () {
  'use strict';
  // 遍历黑名单时间间隔；如果翻页间隔时间短可以适当调短时间，避免屏蔽不到位，但间隔过短可能会浪费资源
  let timeSec = 200;
  let banList = [{ name: '用户名；其实没有用到，可以不输入', id: '用户UID，用于筛选屏蔽' }]
  setInterval(() => {
    let as = document.querySelectorAll('.video-item .up-name')
    // let as = document.getElementsByClassName('up-name')
    for (let i = 0; i < as.length; i++) {
      let tar = null;
      banList.forEach(item => {
        if (as[i].href.includes(item.id)) {
          tar = as[i].parentElement.parentElement.parentElement.parentElement;
          tar.style.display = 'none';
        }
      })
    }
  }, timeSec)
})();
