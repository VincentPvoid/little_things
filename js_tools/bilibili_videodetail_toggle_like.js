// ==UserScript==
// @name         B站旧版播放页点赞
// @namespace    https://github.com/VincentPvoid
// @version      0.1
// @description  B站旧版播放页点赞修复
// @author       You
// @match        https://www.bilibili.com/video/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  let btnLike = document.querySelector('.like');
  // 记录未操作之前的点赞数字
  // let likeNum = parseInt(btnLike.textContent); // 过万会有问题
  // 所以使用title中的数字数据，前面有非数字，需要进行正则过滤
  let likeNum = btnLike.title.replace(/[^0-9]+/g, '') * 1; 
  btnLike.addEventListener('click', () => {
    // console.log(btnLike.classList.toString())
    let like = btnLike.classList.toString().includes('on') ? 2 : 1;
    const url = 'https://api.bilibili.com/x/web-interface/archive/like';
    // 获取cookie字符串并转换为对象，方便提取特定数据
    const cookieObj = getCookieObj(document.cookie)
    // console.log(unsafeWindow.__INITIAL_STATE__.aid)

    // 注意：@grant不为none，开启了sandbox之后，需要使用unsafeWindow来获取全局变量
    const data = {
      aid: unsafeWindow.__INITIAL_STATE__.aid,
      like,
      csrf: cookieObj.bili_jct,
    }

    const dataStr = getPostDataStr(data)
    // let cookie = document.cookie;
    // console.log(data,'bbbbbbbbb')
    baseSendRequest(url, 'POST', dataStr).then(xhr => {
      // console.log(xhr)
      let resStr = "";
      let res = null;
      if (xhr.status >= 200 && xhr.status < 300) {
        // 返回的成功响应格式字符串 "{\"code\":0,\"message\":\"0\",\"ttl\":1}"
        resStr = xhr.response;
        // 把字符串转换为对象
        res = JSON.parse(resStr)
        // 当code为0时表示操作成功
        if (res.code === 0) {
          // 先移除已赞的类名on
          btnLike.classList.remove('on')
          // 如果当前操作为点赞，则加上已赞类名
          if (like === 1) {
            btnLike.classList.toggle('on');
            likeNum++;
          } else {
            likeNum--;
          }
          // 更新点赞数字
          btnLike.innerHTML = decreaseNumText(btnLike, likeNum)
        }
      }
    })
  })


  // 更新后面的点赞数字
  function decreaseNumText(ele, newNum) {
    let tempArr = ele.innerHTML.split('</i>');
    tempArr[1] = `${newNum}\n    `;
    return tempArr.join('</i>')
  }

  // 把需要的参数对象转换为key=value&key=value...的字符串格式
  function getPostDataStr(obj) {
    let keysArr = Object.keys(obj);
    let str = "";
    keysArr.forEach((keyName, index) => {
      str += `${keyName}=${obj[keyName]}`
      if (index != keysArr.length - 1) {
        str += '&'
      }
    })
    return str;
  }

  // 把cookie字符串转换为对象，方便提取需要的数据
  function getCookieObj(str) {
    let tempArr = str.split('; ')
    let temp = []
    let cookieObj = {}
    tempArr.forEach(item => {
      temp = item.split('=')
      cookieObj[temp[0]] = temp[1]
    })
    return cookieObj;
  }

  // 发送请求函数，使用tampermonkey自带的可进行跨域的请求函数
  function baseSendRequest(url, sendType = 'POST', data = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: sendType,
        url,
        data,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        onload: (response) => {
          resolve(response)
        },
      })
    })
  }




})();
