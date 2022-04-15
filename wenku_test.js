// ==UserScript==
// @name         百度文库测试
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://wenku.baidu.com/view/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';
  // setTimeout(()=>{
  //   console.log(pageData)
  // }, 2000)

  setTimeout(() => {
    let testDiv = document.createElement('div');
    testDiv.setAttribute('id', 'vpv_wenku_test_btn')
    testDiv.innerHTML = '<button style="display:fixed;top:0;left:0;z-index:99999;">测试</button>'

    testDiv.addEventListener('click', async () => {
      let pageUrlArr = pageData.readerInfo.htmlUrls
      if (!pageUrlArr) {
        return;
      }
      pageUrlArr = pageUrlArr.json
      sendList(pageUrlArr)
      // console.log(temp)
    })
    document.body.appendChild(testDiv)
  })


  // setTimeout(async () => {
  //   let pageUrlArr = window.pageData.readerInfo.htmlUrls
  //   if(!pageUrlArr){
  //     return;
  //   }
  //   pageUrlArr = pageUrlArr.json
  //   let temp = await sendList(pageUrlArr)
  //   console.log(temp)
  // },2000)

  function sendList(listArr) {
    let promiseArr = [];
    let resArr = []
    listArr.forEach(item => {
      promiseArr.push(baseSendRequest(item.pageLoadUrl))
    })
    // console.log(promiseArr,'bbbbbbbbb')
    Promise.all(promiseArr).then(res => {
      res.forEach((xhr, index) => {
        // console.log(xhr, index)
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = xhr.response;
          // if (response.indexOf(keyword) === -1) {
          //   invaildArr.push(listArr[index])
          // }
          resArr.push(response)
        }
      })
      // console.log(resArr)
      let textArr = []
      let temp = "";
      let strArr = []
      resArr.forEach(item => {
        // temp = item.split('(')[1].replace(')', '')
        temp = item.replace(/^wenku_[0-9]+/, '')
        temp = temp.substring(1, temp.length - 1)
        // console.log(temp)
        // temp = (new Function("return " + temp))();
        temp = JSON.parse(temp)
        strArr = temp.body.map(item => item.c)
        // textArr.push(temp)
        textArr.push(strArr)
      })
      // console.log(textArr)
      // temp = textArr.map(item => item.c)
      // console.log(textArr)
      let str = ""
      for(let i = 0 ; i < textArr.length; i++){
        str += textArr[i].join('')
      }
      console.log(str)
      // return resArr;
    })
  }
  // 发送请求函数
  function baseSendRequest(url, sendType = 'GET') {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: sendType,
        url,
        onload: (response) => {
          resolve(response)
        },
      })
    })
  }

  // Your code here...
})();