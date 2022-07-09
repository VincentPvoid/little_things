// ==UserScript==
// @name         B站播放页屏蔽推荐视频
// @namespace    https://github.com/VincentPvoid
// @version      0.1
// @description  B站播放页屏蔽推荐视频
// @author       You
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let banList = [{ name: '用户名；其实没有用到，可以不输入', id: '用户UID，用于筛选屏蔽' }]
  let as = document.querySelectorAll('#reco_list .video-page-card .up a')
  for (let i = 0; i < as.length; i++) {
    let tar = null;
    banList.forEach(item => {
      let temp = as[i].href.split('/');
      let linkId = temp[temp.length - 2]
      // console.log(linkId)
      if (linkId === item.id) {
        tar = as[i].parentElement.parentElement.parentElement.parentElement;
        tar.style.display = 'none';
        // tar.parentElement.removeChild(tar)
      }
    })
  }

  const listCon = document.querySelector('.rec-list');
  const config = {
    attributes: false,      // 检测节点属性变化，这里用不到，为减少不必要的触发这里不用开启
    childList: true,        // 检测子节点添加和删除
    subtree: false,           // 检测包含后代节点
    // attributeOldValue: true, // 返回的参数对象中有一个属性oldValue用来记录上一次的属性值
  };


  // 当容器内子元素增加时调用的回调函数
  function mutationCallback(mutationsList) {
    for (let mutation of mutationsList) {
      const type = mutation.type;
      const addedNodes = mutation.addedNodes;  //增加节点数组
      // 会根据上面的的设置触发相应事件，这里可以判断触发的事件类型
      // console.log(mutation, 'bbbbbbbbbbbb')
      switch (type) {
        case 'childList':
          // 当前为子元素列表变化，并为增加元素时
          if (addedNodes.length > 0) {
            // let as = document.querySelectorAll('#reco_list .video-page-card .up a')
            // list = $('.entry-list');
            // const list = document.querySelector('.rec-list');
            // if (list.children.length) {
            //   //停止观察
            //   loadObserver.disconnect();
            //   //过滤操作
            // }
            let tar = addedNodes[0].querySelector('.up a');
            if (tar) {
              handleFilter(tar)
            }
          }
          break;
      }
    }
  };

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(mutationCallback);
  // 以上述配置开始观察目标节点
  observer.observe(listCon, config);

  // 元素增加时进行过滤
  function handleFilter(eleA) {
    banList.forEach(item => {
      let tar = null;
      let temp = eleA.href.split('/');
      let linkId = temp[temp.length - 2]
      // console.log(eleA.parentElement.parentElement.parentElement.parentElement,'bbbbb')
      if (linkId === item.id) {
        tar = eleA.parentElement.parentElement.parentElement.parentElement;
        tar.style.display = 'none';
        // tar.parentElement.removeChild(tar)
      }
    })
  }

})();
