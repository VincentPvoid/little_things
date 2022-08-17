// ==UserScript==
// @name         facebook自动滚动底部加载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://www.facebook.com/*/photos*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // let timer = setInterval(() => {
  //   document.scrollingElement.scrollTop += 500
  // }, 500)

  let timer = null;

  let testDiv = document.createElement('div');
  testDiv.setAttribute('id', 'vpv_fb_btn_wrapper')
  testDiv.innerHTML = `<button class="stop">停止</button><br>
  <button class="start">开始</button>`
  testDiv.style = 'position:fixed;top:0;left:0;z-index:99999;'

  document.body.appendChild(testDiv)

  let btnStart = document.querySelector('#vpv_fb_btn_wrapper .start')
  let btnStop = document.querySelector('#vpv_fb_btn_wrapper .stop')

  btnStart.addEventListener('click', () => {
    clearInterval(timer)
    let addNum = Math.ceil(document.scrollingElement.scrollHeight / 1000) * 500
    timer = setInterval(() => {
      document.scrollingElement.scrollTop += addNum
    }, 500)
    // console.log(document.scrollingElement)
  })
  btnStop.addEventListener('click', () => {
    clearInterval(timer)
  })

})();
