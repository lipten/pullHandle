# pullHandle
Demo:http://lipten.link/projects/pullHandle/


> pullHandle是一款基于zepto的轻量高性能的下拉插件，基于原生滚动的下拉刷新，带有滚动加载功能。

###Usage

####1、下载pullHandle
克隆到本地
```
git clone https://github.com/lipten/pullHandle.git
```


####2、引用相关文件
```
// loading动画样式，可自己编写
<link rel="stylesheet" href="pullHandle.css">                       
```

####3、引用js文件
```
// zepto.js或者jquery类库
<script src="//cdn.bootcss.com/zepto/1.1.6/zepto.min.js"></script>  
//pullHandle主文件
<script src="pullHandle.js"></script>                               
```

####4、初始化代码
```
var pullhandle = new pullHandle()
```

## Configuration

<pre>
var pullhandle = new pullHandle({
  container:'#pullContainer',
  url: './api.php',
  page: '1',
  size: '10',
  pullDown: {
    callback: function(data){

    }
  },
  pullUp: {
    callback: function(data){

    }
  },
})
</pre>


##Options
####container
初始化页面滚动容器，默认'#pullContainer'
####url
刷新和加载的接口url地址
####page
page参数默认值，在请求接口时加入page参数，代表第几页，默认为1
####size
size参数默认值，在请求接口时加入size参数，代表每页有几个item，默认为10
####pullDown
开启下拉刷新，不需要回调时赋值true即可，关闭赋值false，需要回调时带入一个对象并写在callback属性
####pullUp
开启滚动加载，不需要回调时赋值true即可，关闭赋值false，需要回调时带入一个对象并写在callback属性

##Method

####pullhandle.changeUrl(url)
改变接口地址，url传入接口地址字符串

####pullhandle.noData()
让滚动加载显示没有更多数据

####pullhandle.hide()
隐藏滚动加载动画，并停止加载

####pullhandle.fetch()
强制加载更多

####pullhandle.reset()
重置滚动加载和下拉刷新

####pullhandle.destroy()
销毁整个插件


---

##History

###-update v1.2-
1.新增一个性化的功能，可以手动播放指定页面的动画元素(页面滚动不会自动触发)，只要把需要动画的元素的step类换成lazy（即不会自动触发动画的元素），然后在任意时刻调用[slidePage.fire(index)][1]触发指定页面的lazy动画即可，详见demo.html

2.修正FireFox浏览器的兼容性问题

###-update v1.1-
1.正式版之后的改版，为了在避免在项目中遇到UI组件混乱，实现清晰的功能划分，废除了一些绑定html结构的功能（分页组件、音乐组件）

2.初始化方法的参数开出多两个回调函数（next和prev）,可以自由的做二次开发，demo中利用这两个回调和methon实现了分页组件，下面有详细说明这两个参数。


###-update v1.0-
1.正式版，从0.6.2版本修复稳定。

###-update v0.6.2-
1.全面支持jquery和zepto！

2.将zepto-touch.js改造了一下，使jquery也能以同样的方式调用触屏事件;

3.将改造后的zepto-touch.js取名为slidePage-touch.js,并与主文件合并压缩成slidePage.min.js


###-update v0.6-
1.加入了分页组件。

2.开放了三个方法：slidePage.index()、slidePage.next()和slidePage.prev(),详情见文档;



###-update v0.5.2-
1.html结构有所改变：滚动的父容器除了加"slidePage-container"的class样式外还要加多个"slidePage-container"的id
```
<div class="slidePage-container" id="slidePage-container">
```

###-update v0.5.1-
1.去除了slidePage_Mobile版本(只有十行左右的区别，没必要)。

2.mobile版本的需求衍生成useWheel和useKeyboard两个参数来开关键盘事件和滚轮事件.

###-update v0.5-
1.兼容了桌面系统，使用鼠标滚轮或者键盘上下键即可全屏滚动。

###-update v0.4-
1.新增参数speed(页面过渡的动画时间，毫秒为单位)

2.修复refresh参数的bug.

###-update v0.3-
1.新增参数refresh(回滚的时候是否重新执行动画，默认为true)

2.修复无page参数的bug.

###-update v0.2-
1.新增url参数pege跳转指定页，优先于index参数.

2.已加入bower大军.


  [1]: https://github.com/lipten/slidePage#slidepagefirepageindex
  [2]: https://github.com/lipten/slidePage#using-animation
