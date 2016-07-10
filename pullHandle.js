
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['zepto'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory(require('zepto'));
    } else {
        // 浏览器全局变量(root 即 window)
        root.returnExports = factory(root.zepto);
    }
}(this, function () {
    //    方法

    var pullHandle = function(options){

            var self = this;

            self.options = options;
            self.offset = options.offset || 0;
            self.page = options.page || 1;
            // 记录原来规定的起始页
            this.opage = options.page || 1;
            self.container = options.container || '#pullContainer';
            self.size = options.size ? options.size : 10;
            self.loading = false;
            self.finished = false;
            // self.collection = self.view.collection
            self.url = options.url || ''
            self.callback = options.callback ? options.callback : function() {};


            /*上拉加载*/

            if(!!options.pullUp){
                if($(".body-loading").length==0){
                     $(self.container).append('<aside class="body-loading"><div class="loading-animate">'+
                    '<div class="bounce1"></div>'+
                    '<div class="bounce2"></div>'+
                    '<div class="bounce3"></div>'+
                    '</div><aside>')
                }
                if($(self.container).height()<window.innerHeight-self.offset){
                  self.fetch(options.pullUp.callback);
                }


                $(window).on('scroll',function() {
                    var scrollHeight = $(document).height() - $(window).height();
                    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
                    if (scrollTop > scrollHeight - 30 && !self.loading && !self.finished) {
                        $('.body-loading').removeClass('hide');
                        self.fetch(options.pullUp.callback);
                    }
                });

            }

            /*下拉刷新*/

                /*插入下拉刷新元素*/
                var loading;
                var obj = $(self.container);
                if($(".refresh").length==0){

                    loading = $('<div class="loading-animate refresh">'+
                        '<div class="bounce1"></div>'+
                        '<div class="bounce2"></div>'+
                        '<div class="bounce3"></div>'+
                        '</div>')

                    obj.prepend(loading)
                }else{
                    loading = $(".refresh")[0]
                }




                var start,
                    end,
                    length,
                    isLock = false,//是否锁定整个操作
                    isCanDo = false,//是否移动滑块
                    isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
                    hasTouch = 'ontouchstart' in window && !isTouchPad;


                var offset=loading.height();
                var objparent = obj.parent();




                /*操作方法*/
                var fn =
                {
                    //移动容器
                    translate: function (diff) {
                        obj.css({
                          webkitTransform:'translate3d(0,'+diff+'px,0)',
                          transform:'translate3d(0,'+diff+'px,0)',
                        })
                    },
                    //设置效果时间
                    setTransition: function (time) {
                      obj.css({
                        webkitTransition:'transform '+time+'s ease',
                        transition:'transform '+time+'s ease'
                      })

                    },
                    //返回到初始位置
                    back: function (reset) {
                        fn.setTransition(.2)
                        // fn.translate(0 - offset);
                        fn.translate(0);
                        if(reset){
                            setTimeout(function(){
                              loading.html(
                                  '<div class="bounce1"></div>'+
                                  '<div class="bounce2"></div>'+
                                  '<div class="bounce3"></div>'
                                  )
                            },200)
                        }
                        //标识操作完成
                        isLock = false;
                    },
                    addEvent:function(element,event_name,event_fn){
                        if (element.addEventListener) {
                            element.addEventListener(event_name, event_fn, false);
                        } else if (element.attachEvent) {
                            element.attachEvent('on' + event_name, event_fn);
                        } else {
                            element['on' + event_name] = event_fn;
                        }
                    },
                    removeEvent:function(element,event_name,event_fn){
                        if (element.removeEventListener) {
                            element.removeEventListener(event_name, event_fn, false);
                        } else if (element.detachEvent) {
                            element.detachEvent('on' + event_name, event_fn);
                        } else {
                            element['on' + event_name] = null;
                        }
                    }
                };

                this.removeEvent = function(){
                    fn.removeEvent(obj[0],'touchstart',touchStart);
                    fn.removeEvent(obj[0],'touchmove',touchMove);
                    fn.removeEvent(obj[0],'touchend',touchEnd);
                    $(loading).remove();
                    fn.setTransition(0);
                    fn.translate(0);
                };


                if(!!options.pullDown) {
                    // fn.translate(0 - offset);
                    fn.translate(0);
                    fn.addEvent(obj[0], 'touchstart', touchStart);
                    fn.addEvent(obj[0], 'touchmove', touchMove);
                    fn.addEvent(obj[0], 'touchend', touchEnd);
                }else{
                    this.destroy()
                }

                //滑动开始
                function touchStart(e) {

                    if ($('body').scrollTop() <= 35 && !isLock) {
                        var even = typeof event == "undefined" ? e : event;
                        //标识操作进行中
                        isLock = true;
                        isCanDo = true;
                        //保存当前鼠标Y坐标
                        start = hasTouch ? even.touches[0].pageY : even.pageY;
                        //消除滑块动画时间
                        fn.setTransition(0);
                        //loading.innerHTML='下拉刷新数据';
                    }
                    return false;
                }

                //滑动中
                function touchMove(e) {
                    if ($('body').scrollTop() <= 0 && isCanDo) {
                        var even = typeof event == "undefined" ? e : event;
                        //保存当前鼠标Y坐标
                        end = hasTouch ? even.touches[0].pageY : even.pageY;

                        if (start < end) {

                            even.preventDefault();
                            //消除滑块动画时间
                            fn.setTransition(0);
                            //移动滑块

                            if((end-start)/2<=150) {
                                length=((end - start) / 3);
                                fn.translate(length);
                            }
                            else {
                                length+=0.3;
                                fn.translate(length);
                            }
                            if (end - start >= 180) {
                                //loading.innerHTML='释放刷新';
                            }
                        }
                    }
                }
                //滑动结束
                function touchEnd(e) {
                    if (isCanDo) {
                        isCanDo = false;
                        //判断滑动距离是否大于等于指定值

                        if (end - start >= 120 && Math.abs(e.changedTouches[0].pageY-start)>20) {
                            // debugger;
                            //设置滑块回弹时间
                            fn.setTransition(.2);
                            //保留提示部分
                            fn.translate(offset);

                            //定时开始请求
                            var complete = false

                            var postTime = 0;
                            var timer = setInterval(function(){
                                postTime++;
                                if(complete&&postTime==1){
                                    fn.back();
                                    self.reset();
                                    clearInterval(timer)
                                }
                            },1000)

                            $.ajax(
                              {
                                url: self.url,
                                data: {
                                  page: options.page || 0,
                                  size: options.size || 5,
                                },
                                complete: function(xhr,status){
                                  var data = JSON.parse(xhr.responseText)
                                  if(status=='success'){
                                    if(postTime>=1){
                                        fn.back();
                                        options.pullDown.callback&&options.pullDown.callback(data)
                                        self.reset();
                                        clearInterval(timer)
                                    }else{
                                        complete = true
                                    }
                                  }else if(status=='error'){
                                    clearInterval(timer)
                                    loading.html('数据读取失败，请检查您的网络');
                                    setTimeout(function(){
                                        fn.back(true);
                                    },2000)
                                  }
                                }
                              })

                        } else {
                            //返回初始状态
                            fn.back();
                        }
                    }
                }



        }



        pullHandle.prototype.changeUrl = function(url){
            this.url = url
        }

        pullHandle.prototype.hide = function(){
            $('.body-loading').addClass('hide');
            this.finished = true;
            this.loading = true;
        }

        pullHandle.prototype.reset = function(){
            $('.body-loading').html('<div class="loading-animate">'+
                '<div class="bounce1"></div>'+
                '<div class="bounce2"></div>'+
                '<div class="bounce3"></div>'+
                '</div>')
            if($(this.container).height()<window.innerHeight-this.offset){
              this.fetch(this.options.pullUp.callback);
            }
            this.finished = false;
            this.loading = false;
            this.page = this.opage;
        }
        pullHandle.prototype.fetch = function(callback){
          var self = this;
          self.loading = true
          self.page ++;
          //定时开始请求
          var complete = false
          var postTime = 0;
          var timer = setInterval(function(){
              postTime++;
              if(complete&&postTime==1){
                  complete()
                  complete = false
                  clearInterval(timer)
              }
          },1000)

          $.ajax(
            {
              url: self.url,
              data: {
                page: self.page,
                size: self.size
              },
              complete: function(xhr,status){
                var data = JSON.parse(xhr.responseText)
                if(status=='success'){
                  if(postTime>=1){
                      $('.body-loading').addClass('hide');
                      self.loading = false;
                      callback&&callback(data)
                      clearInterval(timer)
                  }else{
                      complete = function(){
                          $('.body-loading').addClass('hide');
                          self.loading = false;
                          callback&&callback(data)
                      }
                  }

                }else if (status=='error'){
                  clearInterval(timer)
                  $('.body-loading').html('<span class="text-tip">数据加载出错，请检查您的网络</span>')
                }
              }
            })
        }

        pullHandle.prototype.destroy = function(){
            var obj = document.querySelector(this.container);
            obj.style.marginBottom = '0';
            this.removeEvent()
        }


        pullHandle.prototype.noData = function(){
          this.finished = true;
          $('.body-loading').removeClass('hide');
          $('.body-loading').html('<span class="text-tip">没有更多内容。</span>')
        }

    window.pullHandle = pullHandle;

    //    暴露公共方法
    return pullHandle;
}));
