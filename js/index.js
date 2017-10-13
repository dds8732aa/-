/*
导航部分*/
(function () {
    var $nav = $(".nav"),
        $haveHide = $nav.find(".haveHide"),
        $ulHide = $(".ulHide"),
        $left = $nav.find(".left"),
        $aHide = $ulHide.find(".hide"),
        $logo2 = $(".logo2");

    $logo2.delay(500).animate({
        left: 60,
        opacity: 1
    },800)
   /* $logo2.delay(1000).queue(function(){
        $(this).css({
            left : 60,
            opacity : 1
        });//给非动画添加队列延迟
    });*/
    $haveHide.hover(function () {//移入移除
        $(this).addClass("hover");
        $ulHide.stop().slideDown();
        $aHide.eq($(this).index(".haveHide")).stop().fadeIn();
        $nav.addClass("hover");

    },function () {
        $(this).removeClass("hover");
        $ulHide.stop().slideUp();
        $aHide.eq($(this).index(".haveHide")).stop().fadeOut();
        $nav.removeClass("hover");
        });
    $aHide.hover(function () {
        $haveHide.eq($(this).index()).addClass("hover")
        $ulHide.stop().slideDown();
        $(this).stop().slideDown();
        $nav.addClass("hover");
    },function () {
        $haveHide.eq($(this).index()).removeClass("hover");
        $ulHide.stop().slideUp();
        $(this).stop().slideUp();
        $nav.removeClass("hover");
    })
    //scrollt();
    $(window).scroll(scrollt());//自执行 再返回函数名
    function scrollt() {
        if($(document).scrollTop()){//是否大于零
            $nav.addClass("scroll");
            $left.stop().fadeIn();
            $logo2.addClass("scale");

        }else{
            $nav.removeClass("scroll");
            $left.stop().fadeOut();
            $logo2.removeClass("scale");
            /*setTimeout(function () {
             $logo2.removeClass("scale")
             },500)//延迟 避免nav的背景未隐藏完显示*/
        }
        return scrollt; //返回函数名 相当于返回函数
    }
})();
//on类名添加除去的公用函数
function on(btn) {
    $(this).addClass("on").siblings(btn).removeClass("on");
}
/*角色动画*/
(function () {
    var $rol1 = $(".rol1").find("img"),
        $rol2 = $(".rol2").find("img"),
        $btn = $(".roles").find(".btn"),
        show = false;


    $rol1.removeClass("hide");
    $btn.click(function () {
       show?chang($rol2,$rol1):chang($rol1,$rol2);
        show = !show;
    })
    //人物切换函数
    function chang($1,$2) {
        $1.stop(true,false);//不直接到队列结束
        $2.stop(true,false);
        $1.addClass("hide").delay(800).queue(function () {
            $2.removeClass("hide");
        })
    }
})();
/*服务器列表*/
(function () {
    var $servar = $(".servar"),
        $servarList = $(".serverList"),
        $close = $servarList.find(".close");

    $servar.click(function () {

        $servarList.fadeIn().addClass("show");
        $servarList.find(".main").addClass("show");
    })
    $close.click(function () {
        $servarList.find(".main").removeClass("show");
        setTimeout(function () {
            $servarList.fadeOut();
        },500)
    })
})();
/*游戏日历*/
(function () {
    var $slide = $(".slide"),
        $download = $slide.find(".download"),
        $onStretch = $download.find(".onStretch"),
        $onShrink = $onStretch.find(".onShrink"),
        $mainLi = $slide.find("ul li"),
        $shrink = $download.find(".shrink");

    $shrink.click(function () {
        $download.addClass("stretch");
        $onShrink.show();
        $(this).hide()
    })
    $onShrink.click(function () {
        $download.removeClass("stretch");
        $(this).hide();
        $shrink.stop().delay(300).queue(function () {
            $shrink.show();
        })
    })
    //日历滑动
    $mainLi.hover(function () {
        $(this).stop().addClass("pos");
    },function () {
        $(this).delay(300).queue(function () {
            $(this).stop().removeClass("pos");
        })
    })
})();
/*/!*新闻轮播部分*!/
(function () {
    var $banner = $(".content .banner"),
        $pic = $banner.find(".pic"),
        $picUl = $banner.find(".pic ul"),
        $picLi = $picUl.children(),
        lengt = $picLi.length,
        width = $picLi.width(),
        index = 0,
        time = null,
        timeauo = null,
        $tabSpan = $pic.find(".tab span");

    /!*轮播*!/
    $tabSpan.mouseenter(function () {
        var $this = $(this);
        clearTimeout(time);//不管移多快 都清除
        time = setTimeout(function () {
            index = $this.index();
            $this.addClass("on").siblings().removeClass("on");
            $picUl.stop().animate({
                left: -width * index
            },300)
        },200)
    })
    //自动轮播
    //移动暂停自动轮播
     $banner.hover(function () {
        clearInterval(timeauo);
     },auto);//这里的auto的函数加（）自执行的话会导致auto执行两次导致index多加了一
    auto();
    function auto() {
       timeauo = setInterval(function () {
           index ++;
           index %= lengt;
           $tabSpan.eq(index).addClass("on").siblings().removeClass("on");
           $picUl.stop().animate({
               left: -width * index
           },300)
       },2000)
}
})();*/
/*新闻内容生成*/
(function(){
    var $inform = $(".news .inform"),
        $tabLi = $inform.find(".tab ul li"),
        $warpUl = $inform.find(".show .warpUl"),
        $warpLi = $warpUl.find(".warpli"),
        width = $warpLi.width();
        
    $tabLi.mouseenter(function(){
    	index = $(this).index();
    	$(this).addClass("on").siblings().removeClass("on");
    	$warpUl.stop().animate({
    		left: -width*index
    	})
    });
    $warpLi.each(function(i){//i是$warpLi的序号
    	var $ul = $("<ul class='list'></ul>");//需要生成的标签
        var num = 0;//计数器
        var tise = [];	
        var $ul = $("<ul class='list'></ul>");
        var num = 0;
        for (var j = 0,length=newData.length; j < length; j++) {
            if (!i || newData[j].typeX === (i-1) ){
                $ul.append("<li><p><a href='javascript:void(0)'>"+newData[j].title+"</a></p><span>"+newData[j].time+"</span></li>");
                num ++;
                if (num == 5)break;
            }
        }
        $(this).append($ul);//生成ul标签
    });

})();
/*式神*/
(function () {
    var $shishen = $(".shishenM"),
        $shishenLi = $shishen.find(".title ul li"),
        $shishenList = $shishen.find(".main .shishenList"),
        $shishenTab = $shishenList.find(".shishenTab ul li");

    $shishenLi.click(on);
    $shishenTab.click(on);
})();



//面向对象的写法
/*
 *
    * 左右切换面向对象写法 
    * 占用全局变量  Banr（不带自动）  和   Banr2（带自动）
    * 启动函数  .exe()
 * */
(function(){
    //面向对象写法
    function Banr( $ul , $pic , $tab ) {//构造函数
        this.$ul = $ul;
        this.$tab = $tab;
        this.index = 0;
        this.length = $pic.length;
        this.width = $pic.width();
        this.timeOut = null;
    }
    Banr.prototype = {//原型
        exe : function () {//启动程序
            this.addEvent();
        },
        addEvent : function () {//执行函数
            var This = this;
            this.$tab.mouseenter(function () {
                clearTimeout(This.timeOut);
                var $this = $(this);
                This.timeOut = setTimeout(function () {
                    This.index = This.$tab.index($this);
                    $this.addClass("on").siblings().removeClass("on");
                    This.$ul.stop().animate({
                        left : -This.width*This.index
                    },300);
                },200);
            });
        }
    };

    //继承 并添加新方法$wrap
    function Banr2($ul , $pic , $tab , $wrap) {
        Banr.call(this,$ul , $pic , $tab);
        this.$wrap = $wrap;
        this.timer = null;
    }
    function Fn(){}
    Fn.prototype = Banr.prototype;//类继承
    Banr2.prototype = new Fn();
    Banr2.prototype.temp = Banr2.prototype.exe;//新扩展
    Banr2.prototype.exe = function () {//新扩展
        this.temp();
        this.auto();
        this.clearTime();
    };
    Banr2.prototype.clearTime = function () {//新扩展
        var This = this;
        this.$wrap.hover(function () {
            clearInterval(This.timer);
        },function(){
            This.auto();
        });
    };
    Banr2.prototype.auto = function (){//新扩展
        var This = this;
        this.timer = setInterval(function () {
            This.index ++;
            This.index %= This.length;
            This.$tab.eq(This.index).addClass("on").siblings().removeClass("on");
            This.$ul.stop().animate({
                left : -This.width*This.index
            },300);
        },3000);
    };
    window.Banr = Banr;//设置全局
    window.Banr2 = Banr2;
})();
//banner
(function(){
    var $banner = $(".content .banner"),
        $picUl = $banner.find(".pic ul"),
        $picLi = $picUl.children(),
        $tabSpan = $banner.find(".tab span"),
        banner = new Banr2($picUl , $picLi , $tabSpan , $banner);

    banner.exe();
})();
//inform
(function(){
    var $news = $("#news"),
        $tabLi = $news.find(".inform .tab ul li"),
        $wrapUl = $news.find(".inform .show .wrapUl"),
        $wrapLi =  $wrapUl.find(".wrapLi");
    $tabLi.mouseenter(function () {
        $(this).addClass("on").siblings().removeClass("on");
    });
    $wrapLi.each(function (i) {
        var $ul = $("<ul class='list'></ul>");
        var num = 0;
        for (var j = 0,length=newData.length; j < length; j++) {
            if (!i || newData[j].typeX === (i-1) ){
                $ul.append("<li><p><a href='javascript:void(0)'>"+newData[j].title+"</a></p><span>"+newData[j].time+"</span></li>");
                num ++;
                if (num == 5)break;
            }
        }
        $(this).append($ul);
    });
    var banner = new Banr($wrapUl,$wrapLi,$tabLi);
    banner.exe();
})();
//式神列表生成
(function () {
    var $shishenList = $(".shishenList"),
        $mainListUl = $shishenList.find(".mainList .mUl>ul");

    //生成所有的式神图标
    var count = [
        [0,null],
        [0,null],
        [0,null],
        [0,null],
        [0,null]
    ];//每个对应的计数器 null对应存放的位置
    for (var i = 0,length=shishenData.length; i < length; i++) {
        var index = 0;
        switch ( shishenData[i].level ){
            case "SSR":
                index = 1;
                break;
            case "SR":
                index = 2;
                break;
            case "R":
                index = 3;
                break;
            case "N":
                index = 4;
                break;
        }
        count[0][0] ++;//all
        count[index][0] ++;
        if ( count[0][0] % 2 ){//奇数个生产li
            count[0][1] = $("<li class='ssList'></li>");//存放li偶数个可以查找
            $mainListUl.eq(0).append(count[0][1]);
        }
        if ( count[index][0] % 2 ){
            count[index][1] = $("<li class='ssList'></li>");
            $mainListUl.eq(index).append(count[index][1]);
        }


        var str = shishenData[i].isNew?"<i class='new'></i>":"";

        var $div = $("<div class='shishen'>" +
            "<img src='img/index/content/shishen/"+shishenData[i].id+".png'>" +
            "<p class='cover'><span>"+shishenData[i].name+"</span></p>" +
            str +
            "</div>");
        var $clone = $div.clone();//克隆一个
        count[0][1].append($div);
        count[index][1].append($clone);
    }
})();
//式神列表的左右点击
(function () {
    var $shishenM = $('.shishenM'),
        $mUl = $shishenM.find('.shishenList .mainList .mUl'),
        $shishenListTab = $shishenM.find(".shishenTab .clickBtn"),
        width = $mUl.width();

    $shishenListTab.click(function () {
        var i = $(this).index();
        on(".clickBtn");
        $mUl.eq(i).show().siblings().hide().each(function () {
            var $btn = $(this).children(".btn");
            this.index = 0;
            this.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
            this.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();
            $(this).children("ul").css("marginLeft" , 0);
        });
    });

    $mUl.each(function () {
        var $ul = $(this).children("ul"),
            $li = $ul.children("li"),
            $btn = $(this).children(".btn"),
            length = Math.ceil($li.length / 6);

        this.index = 0;

        this.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
        this.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();

        $btn.click(function () {
            var i = $(this).index(),
                parent = this.parentNode;
            if ( i === 2 ){
                parent.index ++;
                parent.index %= length;
            }else{
                parent.index --;
                if (parent.index<0)parent.index = 0;
            }
            parent.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
            parent.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();

            $ul.stop().animate({
                marginLeft : parent.index * -width
            },300);
        });
    });
})();
//主角列表选项卡切换
(function () {
    var $shishenM = $(".shishenM"),
        $zhujueList = $shishenM.find(".zhujueList"),
        $tabLi = $zhujueList.find(".tab>ul>li"),
        $picLi = $zhujueList.find(".pic>ul>li"),
        $titleTab = $shishenM.find(".title .tab"),
        $titlePic = $shishenM.find(".main>div"),
        index = 0;
    $titleTab.click(function () {
        var i = $(this).index(".shishenM .title .tab");
        console.log(i);
        $(this).addClass("active").siblings(".tab").removeClass("active");
        $titlePic.eq(i).stop().fadeIn().siblings().stop().fadeOut();
    });
    $tabLi.click(function () {
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $picLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
    });
})();
//startegy
(function () {
    var $strategy = $(".strategy"),
        $banner = $strategy.find(".leftPart .banner"),
        $picUl = $banner.find(".pic ul"),
        $picLi = $banner.find(".pic ul li"),
        $tabLi = $banner.find(".tab ul li"),
        $right = $strategy.find(".rightPart"),
        $titleTab = $right.find(".title .tab"),
        $ul = $right.find(".mContent ul");
    //左侧banner
    var b1 = new Banr2($picUl , $picLi , $tabLi , $banner);
    b1.exe();

    //右侧选项卡内容生产
    var typeArr = ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"];
    $ul.each(function (i) {
        var num = 0;
        for (var j = 0,length = strateData.length; j < length; j++) {
            var data = strateData[j],
                reg = new RegExp(i-1);
            if ( !i || reg.test(data.type) ){
                var index = !i?data.type.charAt(data.type.length-1):i-1;
                $(this).append('<li>' + '<a href="javascript:void(0)">' + '<i></i> ' + '<p class="mTitle">【<span class="type">'+typeArr[index]+'</span>】&nbsp;'+data.title+'</p> ' + '<p class="author">作者：<span>'+data.author+'</span></p>' + '</a>' + '</li>');
            }
        }
    });

    //右侧选项卡切换
    var b2 = new Banr($right.find('.mContent .show'), $ul , $titleTab);
    b2.exe();
})();

//fan
(function(){
    var $fan = $(".fan"),
        $show = $fan.find(".mFan .show"),
        $tab = $fan.find(".tab .tabNav ul li"),
        length = 6;

    for (var i = 0; i < length; i++) {
        var $ul = $("<ul></ul>");
        for (var j = i*8; j < (i+1)*8; j++) {
            $ul.append('<li>\
                <div class="pic">\
                <img src="'+fanData[j].url+'" alt="">\
                <span><b></b></span>\
                </div>\
                <p class="sTitle">'+fanData[j].title+'</p>\
            </li>');
        }
        $show.append($ul);
    }

    var b1 = new Banr($show , $show.children("ul") , $tab);
    b1.exe();
})();

//返回顶部
(function(){
    var $goTop = $(".contact").find(".goTop");
    $goTop.click(function () {
        //$(document).scrollTop(0);
        $("body,html").animate({
            scrollTop : 0
        },300);
    });
})();