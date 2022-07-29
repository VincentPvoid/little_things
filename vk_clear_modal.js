// ==UserScript==
// @name         vk自动取消弹框
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://vk.com/album*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const bodyEle = document.body;
  document.body.style.overflow = 'auto';

  let modalDiv = document.getElementById('box_layer_wrap')
  let maskDiv = document.getElementById('box_layer_bg')
  // console.log(modalDiv, maskDiv, 'aaaaaaaaaaa')
  bodyEle.removeChild(modalDiv)
  bodyEle.removeChild(maskDiv)
  
  setInterval(() => {
    document.body.style.overflow = 'auto';
  }, 300);
  
})();
