// ==UserScript==
// @name         图片格式转换保存
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  保存图片为 PNG/JPG 格式
// @author       VincentPViod
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // 图片路径中带有指定字段才显示另存为按钮
  const tarTypeArr = ['png', 'jpg', 'webp', 'tumblr', 'twimg']
  const pageUrl = window.location.href.toLocaleLowerCase();

  // 如果需要在所有网页的图片都显示另存为按钮，去掉这个if判断条件
  if (tarTypeArr.some(key => pageUrl.includes(key))) {
    
    // 按钮菜单等样式
    GM_addStyle(`
        #vpv-img-format-wrapper{
          position: absolute;
          width:100px;
          height:50px;
          display: none;
        }
        .img-format-btn {
            position: absolute;
            left:0;
            top:0;
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
            z-index: 9999;
            // display: none;
        }
        .img-format-btn:hover {
            background: rgba(0,0,0,0.9);
        }
        .img-format-menu {
            position: absolute;
            top: 26px;
            left: 5px;
            background: white;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 9999;
            display: none;
        }
        .img-format-menu button {
            display: block;
            width: 100%;
            padding: 8px 15px;
            border: none;
            background: white;
            cursor: pointer;
            text-align: left;
            font-size: 13px;
            color:#333;
        }
        .img-format-menu button:hover {
            background: #f0f0f0;
        }
    `);

    // 总容器
    const mainDiv = document.createElement('div');
    mainDiv.id = "vpv-img-format-wrapper";

    // 另存为按钮
    const btn = document.createElement('button');
    btn.className = 'img-format-btn';
    btn.textContent = '保存为...';

    // 菜单
    const menu = document.createElement('div');
    menu.className = 'img-format-menu';

    // 格式按钮
    const formats = ['PNG', 'JPG'];
    formats.forEach(format => {
      const option = document.createElement('button');
      option.textContent = format;
      option.onclick = function (e) {
        e.stopPropagation();
        saveImageAs(currentImg, format);
        hideMenu();
      };
      menu.appendChild(option);
    });

    // 把总体容器插入页面中
    document.body.appendChild(mainDiv);
    // 按钮和菜单放入总体容器
    mainDiv.appendChild(btn);
    mainDiv.appendChild(menu);
    

    // 当前需要保存的图片元素
    let currentImg = null;

    // 显示另存为按钮（鼠标移入时）
    function showSaveBtn(img, x, y) {
      currentImg = img;
      mainDiv.style.left = x + 'px';
      mainDiv.style.top = y + 'px';
      mainDiv.style.display = 'block';
    }

    // 点击另存为按钮显示可选格式菜单
    function showMenu() {
      menu.style.display = 'block';
    }
    
    // 隐藏菜单和按钮显示
    function hideMenu() {
      mainDiv.style.display = 'none';
      menu.style.display = 'none';
      // btn.style.display = 'none';
    }

    // 保存图片函数
    function saveImageAs(img, format) {
      if (!img) return;

      // 处理跨域问题
      const imgUrl = img.src;
      const imgName = img.alt || 'image';

      // 创建 Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 创建一个新图片对象来处理跨域
      const newImg = new Image();
      newImg.crossOrigin = 'Anonymous';

      newImg.onload = function () {
        canvas.width = newImg.width;
        canvas.height = newImg.height;
        ctx.drawImage(newImg, 0, 0);

        // 根据格式转换
        let mimeType, quality;
        let extension = format.toLowerCase();

        switch (format) {
          case 'PNG':
            mimeType = 'image/png';
            quality = undefined;
            break;
          case 'JPG':
            mimeType = 'image/jpeg';
            quality = 0.92; // 默认质量
            break;
          default:
            mimeType = 'image/png';
        }

        try {
          // 转换为目标格式
          const dataUrl = canvas.toDataURL(mimeType, quality);

          // 创建下载链接
          const link = document.createElement('a');
          link.download = `${imgName}.${extension}`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          console.error('格式转换失败:', e);
          alert('格式转换失败，可能不支持该格式');
        }
      };

      newImg.onerror = function () {
        // debugger
        // 如果跨域加载失败，尝试直接使用原图（新窗口打开原图）
        try {
          const link = document.createElement('a');
          link.download = `${imgName}.${format.toLowerCase()}`;
          link.href = imgUrl;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          alert('保存失败，请检查图片地址');
        }
      };
      newImg.src = imgUrl;
    }

    // 鼠标移入事件
    document.addEventListener('mouseover', function (e) {
      const target = e.target;
      // 当前元素为img并且尺寸大于50x50
      if (target.tagName === 'IMG' && target.width > 50 && target.height > 50) {
        // 获取图片元素位置
        const rect = target.getBoundingClientRect();
        showSaveBtn(target, rect.left + 5, rect.top + 5);
      }
    });

    // 点击另存为按钮，显示可选格式菜单
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      showMenu();
    });

    // 点击其他位置隐藏菜单和按钮
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && e.target !== btn) {
        hideMenu();
      }
    });
  }


})();
