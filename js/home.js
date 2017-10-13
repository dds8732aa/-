window.onload = function () {
 $(document).scrollTop(0);
 };
//首屏滑动
(function () {
    var $logo, $wrap, $swp, $oEmbed;
    $wrap = $("#warp");
    $swp = $wrap.find(".swp");
    $oEmbed = $("#bg").find("embed");

    setTimeout(function () {
        $oEmbed.css("opacity",1)
    },2000)
    $swp.eq(0).animate({//注意书写格式最后一个不需要符号
        opacity: 1,
        left: 0
    },1500)
    $swp.eq(1).animate({
        opacity: 1,
        right: 20
    },1500)
    $swp.eq(2).animate({
        opacity: 1,
        top: 80
    },1500)
    $swp.eq(3).animate({
        opacity: 1,
        top: 610
    },1500)


})();
//视频弹窗
(function () {
    var $wrap = $("#warp"),
        $video = $wrap.find(".video"),
        $videoBtn = $wrap.find(".video-btn"),
        $close = $wrap.find(".close");
    $videoBtn.click(function () {
        $video.show();
        $(document.body).addClass("noScroll");
    });
    $close.click(function () {
        $video.hide();
        $(document.body).removeClass("noScroll");
    });
})();
//新情报弹窗
(function () {
    //弹窗
    var $newInfo = $(".newwinfo"),
        $infoLise = $newInfo.find(".infoList ul li"),
        $txt = $newInfo.find(".txt"),
        $pop = $newInfo.find(".popwindow"),
        $popLi = $pop.find(".content ul li"),
        $txt = $(".txt"),
        index = 0,
        $popClose = $pop.find(".close"),
        $btn = $pop.find(".btn"),
        length = $popLi.length,
        txtH = $txt.height();

    //点击弹窗
    $infoLise.click(function () {
        index = $(this).index();
        $(document.body).addClass("noScroll");
        $pop.show();
        $popLi.eq(index).show();

        //自定义滚动条
        $txt.each(function () {
            var  $mainTxt = $popLi.eq(index).find(".mainTxt"),//这里不能用$(this)
                $scroll = $popLi.eq(index).find(".scroll"),
                $bar = $popLi.eq(index).find(".bar"),
                mainH = $mainTxt.height(),//注意隐藏时为0，先显示再获取
                barH = txtH*txtH/(mainH),
                topMax = txtH - barH,
                topMin = 0;

            $bar.height(barH);
            //点击拖拽
            $bar.mousedown(function (e) {
                var y = e.clientY,
                    sTop = $(this).position().top,
                    $This = $(this),
                    $mainTxt = $(this).parent().siblings();
                $(document).mousemove(function (e) {
                    var ny = e.clientY,
                    top = sTop + ny -y;//实际的top
                    top = Math.min(top,topMax);//范围
                    top = Math.max(top,topMin);
                    $This.css("top",top);
                    $mainTxt.css("top",-top*mainH/txtH);
                }).mouseup(function () {
                    $(this).off("mousedown").off("mousemove");
                });
                return false;
            });
            //滚动
            $(this).mousewheel(function (e,d) {
                var top = $bar.position().top;
                if ( d < 0 ){
                    //拉
                    top += 10;
                }else{
                    //推
                    top -= 10;
                }
                top = Math.min(top , topMax);
                top = Math.max(top , topMin);
                $bar.css("top" , top);
                $mainTxt.css("top" , -top*mainH/txtH);
                return false;
            });
            //点击滚动条移动
            $scroll.click(function (e) {
                if ( e.target === this ){//点$bar触发
                    var y = e.clientY-($(this).offset().top-$(document).scrollTop()),//当前点击的值-文档的距离-滚动高度
                        top = $bar.position().top;//确定$bar的top值
                    top = y<top?top-100:top+100;
                    top = Math.min(top , topMax);
                    top = Math.max(top , topMin);
                    $bar.stop().animate({"top" : top},500);
                    $mainTxt.stop().animate({"top" : -top*mainH/txtH},500);
                }
            })
        })
    });
    //弹窗的左右按钮切换
    $btn.click(function () {
        console.log($(this).index(".btn"));
        if($(this).index(".btn")){//判断这是第几个按钮 第二个的序号是1 也就是turn
            index ++;
            index %= length;
        }else {
            index --;
            if(index<0){
                index = length - 1;
            }
        }
        $popLi.eq(index).show().siblings().hide();//siblings 匹配同胞
    })
    //清除
    $popClose.click(function () {
        $(document.body).removeClass("noScroll");
        $pop.hide();
        $popLi.hide();
    });

})();
//滚动延迟显示
(function () {
    var $newInfo = $(".newwinfo"),
        $infoLise = $newInfo.find(".infoList ul li"),
        $title = $newInfo.find(".title"),
        objArr = [];//存放所有需要判断的标签

    //滚动前样式初始化
    init($title,$infoLise);
    function init() {
        for (var i = 0,length = arguments.length;i<length;i++){
            arguments[i].each(function () {//argumrnts是传入的$title等元素的集合
                this.ifshow = false;
                this.oddTop = $(this).offset().top;//自定义属性 原始高度
                $(this).addClass("hide");//给所有变量添加类名
                objArr.push(this);
            })
           /* arguments[i].css({
                top: 60,
                opacity: 0
            })*/
        }
    }
    //滚动延迟加载
    $(window).scroll(function () {
        var height = $(document).scrollTop() + $(window).height();//滚动高度+窗口高度
        console.log(height);
        for(var i = objArr.length - 1; i >=0; i--){
            var obj = objArr[i];;
           if (!obj.ifshow && height >= obj.oddTop){
                (function () {
                    var $This = $(obj);
                    setTimeout(function () {
                        $This.removeClass("hide");
                    },($This.index()%3)*200);//序号延迟.5秒 按照一排三个来算
                    objArr.slice(i,1);//显示后移除队列
                })()//This闭包
            }
          /*  if (!obj.ifshow && height >= obj.oddTop) {//这里不能用this.oddtop
                $(obj).animate({
                    top: 0,
                    opacity: 1
                }, 1000)
                obj.ifshow = true;
            }*/
        }
    });

})();
//游戏特色
(function () {
    var $game = $(".game"),
        $picLi = $game.find(".pic ul li"),
        length = $picLi.length,
        $btn = $game.find(".btn div"),
        index = 0;
    //图片切换
    $picLi.click(function () {
        if($(this).index() !== index){
            index = $(this).index();
            chang();
        }
    })
    //按钮
    $btn.click(function () {
        console.log($(this).index());
        if($(this).index()){
            index ++;
            index %= length;
        }else{
            index --;
            if(index<0)index=length-1;
        }
        chang();
    })
    //变换函数
    function chang() {
        var lIndex = index - 1,
            rIndex = index +1;
        if(lIndex<0)lIndex = length -1;
        if(rIndex>=length)rIndex = 0;
        $picLi.removeClass("left mid right");
        $picLi.eq(lIndex).addClass("left");
        $picLi.eq(rIndex).addClass("right");
        $picLi.eq(index).addClass("mid");
    }
})();