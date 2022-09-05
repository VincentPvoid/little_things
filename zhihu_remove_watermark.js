// ==UserScript==
// @name         知乎去水印
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.zhihu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let div = document.querySelector('#root > div > div[class^="css-"]')
  div.parentElement.removeChild(div)
})();
