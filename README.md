# little_things
用来放一些无聊小玩意

## plane.js
跟随鼠标小飞机

## penguin_ani
企鹅小动画

## svg_mask
svg的遮罩效果，就是ff网站的那个效果，觉得这效果很有意思就单独提出来了  
图片没有上传，要看效果的话把两个img的地址换成有效图片就可以

## weibo_search_ban_user.js
一个用来在微博搜索页面中屏蔽特定用户的js脚本  
当时就是写来临时用一下所以没弄界面  
预留的用户name信息是可能到时整界面出来的时候查看用的，实际上屏蔽只需要用到UID

## PM_auto_answer.js
一个自动答题脚本，因为答案直接写在网页里所以就随便写了个脚本测试  
最快速度大概2.75s

## wenku_test.js
百度文库提取文档文字的简单脚本，需要点击左下角按钮进行跨域请求  
对于获取到文字数据后使用canvas显示的某些文档有效  
随便测试了几个，有些返回的本身就是图片的无法使用；普通免费文字文档大概还是可以提取到的  
其实并没有使用文档的需求，就是看到使用了canvas所以无法直接复制文字，但应该可以找到canvas数据的请求所以试着写了一下，界面也很简陋

## bilibili_search_ban_users.js
B站搜索页面屏蔽特定用户  
也是临时用一下所以没有界面  
屏蔽只需要UID  

## bilibili_videodetail_ban_script.js
B站视频播放页面推荐视频列表屏蔽特定用户  
临时使用所以也没界面  
屏蔽只需要UID  
感觉似乎之前见过有人做过一个B站的多功能插件包含了这个功能，但现在找不到了，所以随便写了一个  
这次用了监听容器的方法，而不是之前的轮询，不过因为体量太小了所以感觉不到太大差别，写起来反而麻烦了  
加了过滤视频标题关键词功能，大小写不敏感  
因为不仅是屏蔽用户所以顺便改了个名

## glitch_test.html
glitch效果动画，主要靠keyframes的动画效果，顺便记录一下  

## vk_clear_modal.js
在vk相册找图整天弹登录框所以随便写个简单脚本移除一下

## fb_album_scroll_bottom.js
facebook自动滚动到相册底部继续加载的简单脚本，可点击开始/停止  
还是不能后台加载，但至少可以自动一点不用一直按键盘  
加载多了之后速度会变慢，也是随便写的随便用一下

## bilibili_videodetail_toggle_like.js
之前不知为什么我B站旧版播放页点不了赞，似乎其他人没这问题  
新版播放页就可以，看了一下旧版播放页好像没发请求也没用到点赞的接口，所以就自己写了个发请求的脚本恢复点赞功能  
但刚写好点赞功能就恢复了OTZ  
脚本和官方功能一起使用会有bug，也就是说现在点赞没问题的情况下这个脚本完全没用  
不过也算是踩点坑学习一下吧  
- 在@grant不为none，开启了sandbox的情况下，需要使用unsafeWindow来获取全局变量，如果没使用@grant则可以直接使用window获取全局变量  
- 可使用document.cookie获取cookie字符串，如果需要其中的特定值则需要进行处理  
- tampermonkey自带的GM_xmlhttpRequest函数，发送POST请求时，data需要转换为 key=value 的字符串形式发送
