// ==UserScript==
// @name         百度文库测试
// @namespace    https://github.com/VincentPvoid
// @version      0.1
// @description  百度文库提取文字测试用脚本
// @author       VincentPViod
// @match        https://wenku.baidu.com/view/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';
  // setTimeout(()=>{
  //   console.log(pageData)
  // }, 2000)

  // 为了避免获取不到全局变量pageData，所以放在了异步任务setTimeout中
  setTimeout(() => {
    // 测试文字按钮，点击进行跨域请求
    let testDiv = document.createElement('div');
    testDiv.setAttribute('id', 'vpv_wenku_test_btn')
    testDiv.innerHTML = '<button style="display:fixed;top:0;left:0;z-index:99999;">测试</button>'

    testDiv.addEventListener('click', async () => {
      // 对应请求页面数组放在pageData.readerInfo.htmlUrls.json这个数组每一个对象的pageLoadUrl中
      // 但有可能根本没有htmlUrls这个值，没有的时候无法使用这种方法提取
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

  // 按列表顺序生成Promise列表并发送
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
        // 原始响应数据字符串格式wenke_xx({xxx,xxx...})
        // temp = item.split('(')[1].replace(')', '')

        // 对原始字符串进行处理提取json格式字符串
        temp = item.replace(/^wenku_[0-9]+/, '')
        temp = temp.substring(1, temp.length - 1)
        // console.log(temp)
        
        // 把json格式字符串转换为json对象
        // temp = (new Function("return " + temp))();
        temp = JSON.parse(temp)
        
        // 提取需要的文字内容数组
        // 文字内容放在该json对象中的body数组中每一个对象中的c中
        strArr = temp.body.map(item => item.c)
        // textArr.push(temp)
        textArr.push(strArr)
      })
      // console.log(textArr)
      // temp = textArr.map(item => item.c)
      // console.log(textArr)

      
      let str = ""
      // textArr格式为嵌套数组[[],[],[]...]
      // 循环遍历数组拼接所有文字
      for(let i = 0 ; i < textArr.length; i++){
        str += textArr[i].join('')
      }
      console.log(str)
      // return resArr;
    })
  }

  // 发送请求函数，使用tampermonkey自带的可进行跨域的请求函数
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

})();
