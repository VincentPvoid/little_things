// ==UserScript==
// @name         BOSS直聘搜索屏蔽关键词
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  BOSS直聘搜索屏蔽指定关键词
// @author       VincentPViod
// @match        https://www.zhipin.com/web/geek/*
// ==/UserScript==

(function () {
  'use strict';

  // 要屏蔽的标签关键词
  let banKwsList = ['不接受居家办公'];

  let observerEle = document.querySelector('.search-job-result');
  let timer = null;
  
  if (observerEle) {
    initObserver(observerEle)
  } else {
    timer = setInterval(() => {
      observerEle = document.querySelector('.search-job-result');
      if (observerEle) {
        initObserver(observerEle);
        clearInterval(timer)
      }
      // console.log(observerEle, 'lll')
    }, 200)
  }



  // 当容器内子元素增加时调用的回调函数
  function mutationCallback(mutationsList) {
    // console.log(mutationsList,'skdlffj')
    for (let mutation of mutationsList) {
      const addedNodes = mutation.addedNodes;  //增加节点数组
      // 会根据上面的的设置触发相应事件，这里可以判断触发的事件类型
      // console.log(addedNodes[0].className, 'mmmmm')
      // console.log(addedNodes, 'bbbbbbbbbbbb')
      if (mutation.type === 'childList' && addedNodes.length > 0) {
        // debugger
        if (addedNodes[0].className && addedNodes[0].className.includes('job-list-box')) {
          handleKwFilter(addedNodes[0]);
          break;
        }
      }
    }
  };


  // 过滤指定关键词
  function handleKwFilter(eleA) {
    let tagListEle = eleA.querySelectorAll('.job-card-footer .tag-list');
    let tarsArr = [];

    for (let i = 0; i < tagListEle.length; i++) {
      let lis = tagListEle[i].querySelectorAll('li');
      // lis = [].slice.call(lis);
      let tar = null;
      for (let j = 0; j < lis.length; j++) {
        tar = null;
        tar = banKwsList.find(item => {
          if (lis[j].innerHTML.includes(item)) {
            return true;
          }
        })
        if (tar) {
          tarsArr.push(tagListEle[i]);
          break;
        }
      }
    }
    // console.log(tarsArr)
    tarsArr.forEach((item) => {
      // ul -- div -- li
      let li = item.parentElement.parentElement;
      // li.style.display = 'none';
      li.remove();
    })
  }

  // 初始化观察器
  function initObserver(tarEle) {
    const config = {
      attributes: false,      // 检测节点属性变化，这里用不到，为减少不必要的触发这里不用开启
      childList: true,        // 检测子节点添加和删除
      subtree: false,           // 检测包含后代节点
      // attributeOldValue: true, // 返回的参数对象中有一个属性oldValue用来记录上一次的属性值
    };
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(mutationCallback);
    // 以上述配置开始观察目标节点
    observer.observe(tarEle, config);
  }

})();
