// ==UserScript==
// @name         PM自动答题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @match        https://pokemon-kentei.jp/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';



  let index = 0;
  let timer = null;


  timer = setInterval(() => {
    if (index < 10) {
      index = clickAnswer(index)
      // console.log(index)
    } else {
      clearInterval(timer)
    }
  }, 30)
  // let as = document.querySelector('.choice').getElementsByTagName('a')

  function clickAnswer(num) {
    let target = document.getElementsByClassName('choice')[0];
    if (target) {
      let as = target.getElementsByTagName('a')
      for (let i = 0; i < as.length; i++) {
        if (as[i].onclick.toString().includes('(1)')) {
          as[i].click()
          break;
        }
      }
      num++;
    }
    return num;
  }

})();