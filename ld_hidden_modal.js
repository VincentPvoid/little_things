// ==UserScript==
// @name         屏蔽蓝点网弹框
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽蓝点网弹框
// @author       You
// @match        https://www.landiannews.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  chooseTarEle();


  function chooseTarEle() {
    // let tar = document.querySelector('.fc-ab-root');
    let tar = document.querySelector('.fc-dialog-overlay');
    if (tar) {
      // tar.style.display = 'none';
      tar.parentElement.remove(tar);
    } else {
      setTimeout(() => {
        chooseTarEle();
      }, 200);
    }
    document.body.style['overflow-x'] = "hidden";
    document.body.style['overflow-y'] = "scroll";
  }

})();
