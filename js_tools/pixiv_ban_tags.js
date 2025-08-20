// ==UserScript==
// @name         pixiv过滤tag
// @namespace    https://github.com/VincentPvoid
// @version      2025-08-19
// @description  过滤带有指定tag的脚本
// @author       VincentPViod
// @match        https://www.pixiv.net/*
// @run-at       document-start
// @grant        none
// ==/UserScript==


(function () {
  "use strict";

  // 需要屏蔽的tag列表
  const banTagList = []

  let novelList = [];
  let imgList = [];


  // 保存原生fetch方法
  const originalFetch = window.fetch;

  // 重写fetch
  window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);

    // 检查目标URL（按需修改）
    if (args[0].includes('/ajax/search/')) {
      const clonedResponse = response.clone(); // 克隆响应以避免冲突
      const data = await clonedResponse.json();


      // 如果当前返回的数据没有报错
      if (!data.error) {
        // 修改响应数据
        // data.someField = "Modified by Tampermonkey!";
        if (data.body.novel) {
          // 小说列表
          // novelList = data.body.novel.data;
          novelList = filterList(data.body.novel.data);
          data.body.novel.data = novelList;
        }
        if (data.body.illustManga) {
          // 图片列表
          imgList = filterList(data.body.illustManga.data);
          data.body.illustManga.data = imgList
        }

      }

      // console.log(imgList, 'dddddddddddd')



      // 返回修改后的响应
      return new Response(JSON.stringify(data), {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });
    }

    return response;
  };

  // 拦截XMLHttpRequest（类似原理）；（没用上所以没写具体逻辑）
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    this.addEventListener('load', function () {
      if (url.includes('/ajax/search/')) {
        let modifiedData = JSON.parse(this.responseText);
        console.log(this.responseText, '111111111111111')
        // modifiedData.someField = "Tampermonkey modified XHR!";

        // if (!data.error) {
        //   // 修改响应数据（示例：修改某个字段）
        //   // data.someField = "Modified by Tampermonkey!";
        //   if (data.body.novel) {
        //     novelList = data.body.novel.data;
        //   }
        //   if (data.body.illustManga) {
        //     imgList = data.body.illustManga.data;
        //   }

        // }


        Object.defineProperty(this, 'responseText', {
          value: JSON.stringify(modifiedData)
        });
      }
    });
    originalXHROpen.apply(this, arguments);
  };


  // 列表过滤
  function filterList(oriList) {
    let resList = []
    // 需要过滤的列表和屏蔽列表都有值时才进行过滤
    if (oriList && oriList.length && banTagList.length) {
      for (let i = 0; i < oriList.length; i++) {
        // 如果不包含屏蔽tag，说明是需要的项
        if (!banTagList.find(item => oriList[i].tags.includes(item))) {
          resList.push(oriList[i])
        }
      }
    }
    return resList;
  }





})();
