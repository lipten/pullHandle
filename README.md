# pullHandle
Demo:http://lipten.link/projects/pullHandle/


> pullHandle是一款基于zepto的轻量高性能的下拉插件，基于原生滚动的下拉刷新，滚动性能秒杀iScroll、xScroll等滚动框架。

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

####pullhandle.reset()
重置滚动加载和下拉刷新

####pullhandle.destroy()
销毁整个插件

