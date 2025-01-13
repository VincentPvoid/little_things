// ==UserScript==
// @name         B站播放页屏蔽推荐视频
// @namespace    https://github.com/VincentPvoid
// @version      0.2
// @description  B站播放页屏蔽推荐视频
// @author       You
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let banList = [{ name: '用户名；其实没有用到，可以不输入', id: '用户UID，用于筛选屏蔽' }]

  let banKeywordsList = ['需要屏蔽的关键词']

  // 屏蔽指定用户
  // let as = document.querySelectorAll('#reco_list .video-page-card .up a')
  let as = document.querySelectorAll('.rec-list .upname a')
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

  // setInterval(() => {
  //   let titleAs = document.querySelectorAll('#reco_list .video-page-card .info>a')
  //   let temp = null;
  //   titleAs = [].slice.call(titleAs)
  //   if (banKeywordsList.length) {
  //     let tarArr = [];
  //     let tempSpan = null;
  //     let tar = null;
  //     for (let i = 0; i < titleAs.length; i++) {
  //       tar = banKeywordsList.find(item => {
  //         tempSpan = titleAs[i].querySelector('span');
  //         if (tempSpan && tempSpan.title && tempSpan.title.toLowerCase().includes(item)) {
  //           return true;
  //         }
  //       })
  //       if (tar) {
  //         tarArr.push(titleAs[i])
  //       }
  //     }
  //     tarArr.forEach(item => {
  //       temp = item.parentElement.parentElement.parentElement;
  //       temp.style.display = 'none';
  //       // item.parentElement.parentElement.parentElement.parentElement.removeChild(temp);
  //     })
  //     // console.log(tarArr,'bbbbbbbbbbbb')
  //   }
  // }, 300);


  // 屏蔽视频标题关键词（不区分大小写）
  // let titleAs = document.querySelectorAll('#reco_list .video-page-card .info>a')
  let titleEles = document.querySelectorAll('.rec-list .card-box .info p')
  let temp = null;
  titleEles = [].slice.call(titleEles)
  if (banKeywordsList.length) {
    let tarArr = [];
    let tempSpan = null;
    let tar = null;
    for (let i = 0; i < titleEles.length; i++) {
      tar = banKeywordsList.find(item => {
        // tempSpan = titleEles[i].querySelector('span');
        // if (tempSpan && tempSpan.title && tempSpan.title.toLowerCase().includes(item)) {
        //   return true;
        // }
        tempSpan = titleEles[i];
        if (tempSpan.title && tempSpan.title.toLowerCase().includes(item)) {
          return true;
        }
      })
      if (tar) {
        tarArr.push(titleEles[i])
      }
    }
    tarArr.forEach(item => {
      temp = item.parentElement.parentElement.parentElement.parentElement;
      temp.style.display = 'none';
      // item.parentElement.parentElement.parentElement.parentElement.removeChild(temp);
    })
    // console.log(tarArr,'bbbbbbbbbbbb')
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

            // 过滤up
            let tar = addedNodes[0].querySelector('.upname a');
            if (tar) {
              handleFilter(tar)
            }
            // 过滤标题关键词
            tar = addedNodes[0].querySelector('.info p');
            if (tar) {
              handleKwFilter(tar)
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

  // 元素增加时进行up主过滤
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

  // 元素增加时进行标题关键词过滤
  function handleKwFilter(eleA) {
    // let tempSpan = eleA.querySelector('span')
    let tempSpan = eleA;
    banKeywordsList.forEach(item => {
      let tar = null;
      if (tempSpan && tempSpan.title && tempSpan.title.toLowerCase().includes(item)) {
        tar = eleA.parentElement.parentElement.parentElement.parentElement;
        tar.style.display = 'none';
      }
    })
  }

})();
