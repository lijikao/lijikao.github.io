;(function () {
  function Tab(options) {
    //options：配置参数
    this.tab = $(options.ele)
    this.tabBtn = $(options.ele).children(".tab_btn")
    this.btns = this.tabBtn.children("li")
    this.divs = $(options.ele).children(".tab_item").children("li")
    this.num = 0
    this.timer = null
    this.options = options
    this.settings = {
      //默认参数
      etype: "onclick", //默认点击触发，如果事件写错了，当作单击
      autoplay: false, //有时间值(按照事件自动播放)和false(不自动播放)
      invoke: 1, //默认是第一项。
      effect: "display" //display/opacity
    }
    this.init()
  }

  Tab.prototype.init = function () {
    var that = this
    extend(this.settings, this.options)
    if (
      this.settings.etype == "onclick" ||
      this.settings.etype != "onmouseover"
    ) {
      this.tabSwitch("onclick")
    } else if (this.settings.etype == "onmouseover") {
      this.tabSwitch(this.settings.etype)
    }
    if (this.settings.autoplay) {
      //如果配置参数传入一个时间，允许自动轮播，轮播的时间传过去
      this.autoplay(this.settings.autoplay)
    }
    if (this.settings.invoke >= 1 && this.settings.invoke <= this.btns.length) {
      this.num = this.settings.invoke - 1
      this.tabchange()
    }
    this.tab.onmouseover = function () {
      clearInterval(that.timer)
    }
    this.tab.onmouseout = function () {
      that.autoplay(that.settings.autoplay)
    }
  }

  Tab.prototype.tabSwitch = function (e) {
    var that = this
    for (var i = 0; i < this.btns.length; i++) {
      this.btns[i].index = i
      this.btns[i][e] = function () {
        that.num = this.index
        that.tabchange()
      }
    }
  }
  Tab.prototype.tabchange = function () {
    for (var i = 0; i < this.btns.length; i++) {
      this.btns[i].className = ""
      this.divs[i].className = "hide"
      if (this.settings.effect == "opacity") {
        buffermove(this.divs[i], { opacity: 0 })
        this.divs[i].style.display = "none"
      }
    }
    this.btns[this.num].className = "active"
    if (
      this.settings.effect == "display" ||
      this.settings.effect != "opacity"
    ) {
      this.divs[this.num].className = "show"
    } else if (this.settings.effect == "opacity") {
      this.divs[this.num].style.display = "block"
      buffermove(this.divs[this.num], { opacity: 100 })
    }
  }
  Tab.prototype.autoplay = function (time) {
    var that = this
    this.timer = setInterval(function () {
      that.num++
      if (that.num >= that.btns.length) {
        that.num = 0
      }
      that.tabchange()
    }, time)
  }

  function extend(obj1, obj2) {
    for (var i in obj2) {
      obj1[i] = obj2[i]
    }
    return obj1
  }
  window.Tab = Tab
})()

$(function () {
  /**
   * 节制函数
   * @param {Function} method 需要节制的函数
   * @param {Number} delay  间隔时间
   * @param {Number} duration 超出时间
   * @param {Boolean} controlType 1防抖 0节流 默认0
   * @return Function
   */
  function control(method, delay, duration, controlType) {
    let timer = null
    let flag = false
    let start = new Date().getTime()
    return function () {
      let context = this
      let args = arguments
      if (controlType) {
        if (!flag) {
          method.apply(context, args)
          flag = true
          start = new Date().getTime()
        }
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
          flag = false
          let end = new Date().getTime()
          if (end - start >= duration) {
            method.apply(context, args)
            start = end
          }
        }, delay)
      } else {
        let end = new Date().getTime()
        if (timer) clearTimeout(timer)
        if (end - start >= duration) {
          method.apply(context, args)
          start = end
        } else {
          timer = setTimeout(function () {
            method.apply(context, args)
            start = new Date().getTime()
          }, delay)
        }
      }
    }
  }
  var win_width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    win_height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  //js-title
  $(document).on("mouseenter", ".js-title", function () {
    if (
      this.scrollWidth > this.offsetWidth ||
      this.scrollHeight > this.offsetHeight
    ) {
      $(this).attr("title", $.trim($(this).text()))
    } else {
      $(this).attr("title", "")
    }
  })
  //easing
  jQuery.extend(jQuery.easing, {
    easeOutSine: function (x, t, b, c, d) {
      return c * Math.sin((t / d) * (Math.PI / 2)) + b
    }
  })
  //锚点定位缓动
  $(document).on("click", 'a[href^="#"]', function (event) {
    var target = $(this).attr("href").substr(1)
    var top = 0
    if ($("#" + target).length > 0) {
      top = $("#" + target).offset().top
    } else if ($("[name='" + target + "']").length > 0) {
      top = $("[name='" + target + "']").offset().top
    }
    event.preventDefault()
    $("body,html")
      .stop()
      .animate(
        {
          scrollTop: top - 80
        },
        500,
        "easeOutSine",
        function () {}
      )
  })

  if (win_width >= 979) {
    pc()
  } else {
    mobile()
  }

  function pc() {
    var mySwiperGuest = new Swiper(".swiper-guest", {
      loop: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      autoplay: 2000,
      slidesPerView: 3,
      spaceBetween: 20,
      autoplayDisableOnInteraction: false,
      pagination: ".swiper-pagination-guest",
      paginationClickable: true
    })
    var mySwiperVideobox = new Swiper(".swiper-videobox", {
      loop: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      slidesPerView: 1,
      effect: "fade",
      autoplayDisableOnInteraction: false,
      onSlideChangeStart: function (swiper) {
        $(".videobox video").each(function () {
          $(this)[0].pause()
          $(this).siblings(".play-icon").show()
          $(this).siblings(".close-icon").hide()
        })
        if (swiper.activeIndex == 3) {
          $(".videobox .l-content-b li")
            .eq(2)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else if (swiper.activeIndex == 2) {
          $(".videobox .l-content-b li")
            .eq(1)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else if (swiper.activeIndex == 1) {
          $(".videobox .l-content-b li")
            .eq(0)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else if (swiper.activeIndex == 0) {
          $(".videobox .l-content-b li")
            .eq(2)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else {
          $(".videobox .l-content-b li")
            .eq(0)
            .addClass("active")
            .siblings()
            .removeClass("active")
        }
      }
    })
    $(".videobox .l-content-b li").on("click", function () {
      mySwiperVideobox.slideTo($(this).index() + 1)
    })
    var swiperHouette = new Swiper(".swiper-houette", {
      slidesPerView: "auto",
      loop: true,
      speed: 2000,
      autoplay: 1,
      loopedSlides: 5,
      loopAdditionalSlides: 2,
      delay: 0,
      stopOnLastSlide: false,
      centeredSlides: true,
      autoplayDisableOnInteraction: false,
      disableOnInteraction: false,
      spaceBetween: 40,
      centeredSlides: true,
      watchSlidesProgress: true,
      prevButton: ".houette-pre",
      nextButton: ".houette-next",
      pagination: ".swiper-pagination-houette"
    })
    //awards
    var solutionTabAwards = new Tab({
      ele: ".solution-awards",
      etype: "onmouseover", //默认点击触发
      autoplay: false, //有时间值(按照事件自动播放)和false(不自动播放)
      invoke: 1 //默认是第一项。
    })

    $(".houette").hover(
      function () {
        swiperHouette.params.speed = 300
        swiperHouette.stopAutoplay()
      },
      function () {
        swiperHouette.params.speed = 2000
        swiperHouette.startAutoplay()
      }
    )

    $(".talk .section-viewpoint .viewpoint-card a").hover(
      function () {
        $(this).closest(".viewpoint-card").addClass("active")
      },
      function () {
        $(this).closest(".viewpoint-card").removeClass("active")
      }
    )

    $(".guest .swiper-container")
      .mouseenter(function () {
        mySwiperGuest.stopAutoplay()
      })
      .mouseleave(function () {
        mySwiperGuest.startAutoplay()
      })

    //number
    var numFalg = false
    var triggerNumber = function triggerNumber() {
      if (numFalg) return
      var top = $(".intpopuction").offset().top
      if ($(window).height() / 2 + 120 + $(document).scrollTop() >= top) {
        numFalg = true
        $(".add-number").each(function () {
          var num = parseInt($(this).find("span").attr("data-num"))
          if (num >= 200) {
            setNum1(num, $(this).find("span").eq(0))
          } else {
            setNum(num, $(this).find("span").eq(0))
          }
        })
      } else {
      }
    }

    function setNum(num, ele) {
      var nums = 0
      var t = setInterval(function () {
        nums++
        ele.html(nums + "+")
        if (nums == num) {
          clearInterval(t)
        }
      }, 10)
    }
    function setNum1(num, ele) {
      var nums = 0
      var t = setInterval(function () {
        nums = nums + 5
        ele.html(nums + "+")
        if (nums == num) {
          clearInterval(t)
        }
      }, 10)
    }

    $(window).on("scroll", triggerNumber)
    triggerNumber()
  }

  //tel
  $(".tel-online").on("click", function () {
    $("#udesk_btn .udesk-client-btn").trigger("click")
  })

  function mobile() {
    var mySwiperGuest = new Swiper(".swiper-guest", {
      loop: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      autoplay: 2000,
      freeMode: true,
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 20,
      pagination: ".swiper-pagination-guest",
      autoplayDisableOnInteraction: false
    })
    var mySwiperVideobox = new Swiper(".swiper-videobox", {
      loop: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      slidesPerView: 1,
      autoplayDisableOnInteraction: false,
      onSlideChangeStart: function (swiper) {
        $(".videobox video").each(function () {
          $(this)[0].pause()
          $(this).siblings(".play-icon").show()
          $(this).siblings(".close-icon").hide()
        })
        if (swiper.activeIndex == 3) {
          $(".videobox .l-content-b li")
            .eq(2)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else if (swiper.activeIndex == 2) {
          $(".videobox .l-content-b li")
            .eq(1)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else if (swiper.activeIndex == 1) {
          $(".videobox .l-content-b li")
            .eq(0)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else if (swiper.activeIndex == 0) {
          $(".videobox .l-content-b li")
            .eq(2)
            .addClass("active")
            .siblings()
            .removeClass("active")
        } else {
          $(".videobox .l-content-b li")
            .eq(0)
            .addClass("active")
            .siblings()
            .removeClass("active")
        }
      },
      pagination: ".swiper-pagination-video-box",
      autoplayDisableOnInteraction: false
    })
    var mySwiperAuthority = new Swiper(".swiper-authority", {
      loop: true,
      prevButton: ".swiper-button-prev",
      nextButton: ".swiper-button-next",
      slidesPerView: 1,
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      pagination: ".swiper-pagination-authority",
      autoplayDisableOnInteraction: false
    })
    var swiperHouette = new Swiper(".swiper-houette", {
      slidesPerView: "auto",
      loop: true,
      speed: 2000,
      autoplay: 1,
      loopedSlides: 5,
      loopAdditionalSlides: 2,
      delay: 0,
      stopOnLastSlide: false,
      centeredSlides: true,
      autoplayDisableOnInteraction: false,
      disableOnInteraction: false,
      spaceBetween: 20,
      centeredSlides: true,
      watchSlidesProgress: true,
      prevButton: ".houette-pre",
      nextButton: ".houette-next"
    })
    //awards
    var solutionTabAwards = new Tab({
      ele: ".solution-awards",
      etype: "onclick", //默认点击触发
      autoplay: false, //有时间值(按照事件自动播放)和false(不自动播放)
      invoke: 1 //默认是第一项。
    })

    //awards
    $(".awardss .scroll-box li").on("click", function () {
      $(this)
        .closest(".scroll-box")
        .siblings(".tab_btn")
        .find("li")
        .eq($(this).index())
        .trigger("click")
      $(this).addClass("active").siblings().removeClass("active")
    })
    $(".awardss .scroll-box li").eq(0).addClass("active")
    //number
    var numFalg = false
    var triggerNumber = function triggerNumber() {
      numFalg = true
      $(".add-number").each(function () {
        var num = parseInt($(this).find("span").attr("data-num"))
        if (num >= 200) {
          setNum1(num, $(this).find("span").eq(0))
        } else {
          setNum(num, $(this).find("span").eq(0))
        }
      })
    }

    function setNum(num, ele) {
      ele.html(num + "+")
      // var nums = 0
      // var t = setInterval(function () {
      //   nums++
      //   ele.html(nums + "+")
      //   if (nums == num) {
      //     clearInterval(t)
      //   }
      // }, 1)
    }
    function setNum1(num, ele) {
      ele.html(num + "+")
      // var nums = 0
      // var t = setInterval(function () {
      //   nums = nums + 5
      //   ele.html(nums + "+")
      //   if (nums == num) {
      //     clearInterval(t)
      //   }
      // }, 1)
    }

    triggerNumber()
  }

  //agenda
  var solutionTabClick = new Tab({
    ele: ".solution-tab",
    etype: "onmouseover", //默认点击触发
    autoplay: false, //有时间值(按照事件自动播放)和false(不自动播放)
    invoke: 1 //默认是第一项。
  })

  //frommodel
  $(document).on("click", ".from-btn-click", function (event) {
    $(".form-box").addClass("active")
  })
  $(document).on("click", ".form-box .close-icon", function (event) {
    event.preventDefault()
    $(".form-box").removeClass("active")
  })
  $(document).on("click", function (event) {
    if (
      $(event.target).closest(".from-content").hasClass("from-content") ||
      $(event.target).closest(".yuyue").hasClass("yuyue") ||
      $(event.target).closest(".l-btn").hasClass("l-btn") ||
      $(event.target).closest(".header-btn").hasClass("header-btn")
    ) {
      return
    } else {
      $(".form-box").removeClass("active")
    }
  })

  //videoplay
  $(document).on("click", ".play-icon", function () {
    $(this).closest(".video-box").find("video")[0].play()
    $(this).siblings(".close-icon").show()
    $(this).hide()
  })
  $(document).on("click", ".video-box .close-icon", function () {
    $(this).closest(".video-box").find("video")[0].pause()
    $(this).hide()
    $(this).siblings(".play-icon").show()
  })

  //talk
  var triggerFunc = function triggerFunc() {
    var win_width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      win_height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    if (win_width < 979) {
      $(".section-viewpoint-magic").addClass("active")
      return
    }
    var top = $(".section-viewpoint-magic").offset().top

    if ($(window).height() / 2 + 120 + $(document).scrollTop() >= top) {
      $(".section-viewpoint-magic").addClass("active")
    } else {
      $(".section-viewpoint-magic").removeClass("active")
    }
  }

  $(window).on("scroll", triggerFunc)
  triggerFunc()

  //headerscroll
  function headerScroll() {
    var h = $(".content").offset().top
    var H = $(window).scrollTop()
    if (H - h >= 72) {
      $(".head").addClass("header-fixed")
    } else {
      $(".head").removeClass("header-fixed")
    }
  }
  headerScroll()
  $(window).on("scroll", headerScroll)

  //videoplay
  $("#banner-video")[0].play()

  //倒计时
  var time = null
  function leftTimer(year, month, day, hour, minute, second) {
    var leftTime =
      new Date(year, month - 1, day, hour, minute, second) - new Date() //计算剩余的毫秒数
    if (leftTime <= 0) {
      $(".time-box").html("火热进行中...")
      $(".banner .l-btn").html("观看直播")
      $(".banner .l-btn").attr(
        "href",
        "https://wx.vzan.com/live/tvchat-1506326265?shauid=bRqRTLXdTKQpv6MiE0ri_w**&vprid=0&sharetstamp=1637062982697#/"
      )
      clearInterval(time)
      return false
    }
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
    var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10) //计算剩余的小时
    var minutes = parseInt((leftTime / 1000 / 60) % 60, 10) //计算剩余的分钟
    var seconds = parseInt((leftTime / 1000) % 60, 10) //计算剩余的秒数
    days = checkTime(days)
    hours = checkTime(hours)
    minutes = checkTime(minutes)
    seconds = checkTime(seconds)
    $(".time-box .time-date").eq(0).html(days.toString().substr(0, 1))
    $(".time-box .time-date").eq(1).html(days.toString().substr(-1))
    $(".time-box .time-hour").eq(0).html(hours.toString().substr(0, 1))
    $(".time-box .time-hour").eq(1).html(hours.toString().substr(-1))
    $(".time-box .time-min").eq(0).html(minutes.toString().substr(0, 1))
    $(".time-box .time-min").eq(1).html(minutes.toString().substr(-1))
  }
  function checkTime(i) {
    //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
      i = "0" + i
    }
    return i
  }
  time = setInterval(function () {
    leftTimer(2022, 1, 6, 8, 30, 0)
  }, 1000)

  //radio checkbox
  $(".radio-box p").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active")
  })
  $(".checkbox-box p").on("click", function () {
    $(this).toggleClass("active")
  })

  //fromrule
  $(".name-box")
    .find("input")
    .bind("input propertychange", function () {
      if ($(this).val() != "") {
        $(this).closest(".name-box").addClass("inputs")
      } else {
        $(this).closest(".name-box").removeClass("inputs")
      }
      var ret = /^[\s\S]{1,10}$/
      if (ret.test($(this).val())) {
        $(this).addClass("success").removeClass("error")
      } else {
        $(this).addClass("error").removeClass("success")
      }
    })
  $(".tel-box")
    .find("#mobile")
    .bind("input propertychange", function () {
      if ($(this).val() != "") {
        $(this).closest(".tel-box").addClass("inputs")
      } else {
        $(this).closest(".tel-box").removeClass("inputs")
      }
      var ret = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      if (ret.test($(this).val())) {
        $(this).addClass("success").removeClass("error")
      } else {
        $(this).addClass("error").removeClass("success")
      }
    })
  $(".tel-box")
    .find("#code")
    .bind("input propertychange", function () {
      if ($(this).val() != "") {
        $(this).closest(".tel-box").addClass("inputss")
      } else {
        $(this).closest(".tel-box").removeClass("inputss")
      }
      var ret = /^[0-9]\d{5}$/
      if (ret.test($(this).val())) {
        $(this).addClass("success").removeClass("error")
      } else {
        $(this).addClass("error").removeClass("success")
      }
    })
  $(".company-box")
    .find("input")
    .bind("input propertychange", function () {
      if ($(this).val() != "") {
        $(this).closest(".company-box").addClass("inputs")
      } else {
        $(this).closest(".company-box").removeClass("inputs")
      }
      var ret = /[\s\S]{1,20}/
      if (ret.test($(this).val())) {
        $(this).addClass("success").removeClass("error")
      } else {
        $(this).addClass("error").removeClass("success")
      }
    })
  $(".position-box")
    .find("input")
    .bind("input propertychange", function () {
      if ($(this).val() != "") {
        $(this).closest(".position-box").addClass("inputs")
      } else {
        $(this).closest(".position-box").removeClass("inputs")
      }
      var ret = /[\s\S]{1,10}/
      console.log($(this).val())
      if (ret.test($(this).val())) {
        $(this).addClass("success").removeClass("error")
      } else {
        $(this).addClass("error").removeClass("success")
      }
    })

  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=")
      if (c_start != -1) {
        c_startc_start = c_start + c_name.length + 1
        var c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }
  $(document).ready(function () {
    //准备对接数据
    window.clInfo = {} //获取token
    $.ajax({
      type: "get",
      url:
        "https://host.huiju.cool/formdata/get/73d59294f34f40f68ac2c619422c2ff0",
      contentType: "application/json;charset=utf-8",
      success: function (data) {
        clInfo.cltoken = result.token
      }
    })
  })
  $("#btnSubmit").click(function (e) {
    if (
      $(".form-box input").hasClass("error") ||
      !$(".name-box").find("input").val() ||
      !$(".company-box").find("input").val() ||
      !$(".position-box").find("input").val() ||
      !$(".tel-box").find("#mobile").val() ||
      !$(".tel-box").find("#code").val() ||
      !$(".shape-box .radio-box p").hasClass("active") ||
      !$(".join-box .checkbox-box p").hasClass("active")
    ) {
      $(".form-box .tips").addClass("show")
      $(".form-box .tipss").removeClass("show")
      $(".form-box .tipsss").removeClass("show")
      return false
    } else {
      $(".form-box .tips").removeClass("show")
      $(".form-box .tipss").removeClass("show")
      $(".form-box .tipsss").removeClass("show")
    }

    //准备表单数据
    clInfo.name = $(".name-box").find("input").val()
    clInfo.mobile = $(".tel-box").find("#mobile").val()
    clInfo.company = $(".company-box").find("input").val()
    clInfo.title = $(".position-box").find("input").val()
    if ($(".shape-box .radio-box p.active").index() == -1) {
      clInfo.custom_353155 = ""
    } else {
      clInfo.custom_353155 = $(".shape-box .radio-box p.active").index()
    }
    clInfo.custom_887759 = ""
    $(".join-box .checkbox-box p").each(function () {
      if ($(this).hasClass("active"))
        clInfo.custom_887759 = clInfo.custom_887759 + $(this).index()
    })

    clInfo.utma = getCookie("c__utma")
    clInfo.utmb = getCookie("c__utmb") //添加身份信息
    clInfo.identityType = "pc"
    clInfo.identityValue = "13800000000" //提交表单数据到荟聚

    $.ajax({
      type: "post",
      url: "https://t-dahui-api.vhall.com/api/sends/checkCode",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      data: {
        phone: $(".tel-box").find("#mobile").val(),
        code: $(".tel-box").find("#code").val()
      },
      success: function (data) {
        if (data.code == 200) {
          $.ajax({
            type: "post",
            url:
              "https://host.huiju.cool/form/73d59294f34f40f68ac2c619422c2ff0",
            // url: "https://host.huiju.cool/form/1e7dbd725c104001a002f3d054769b20",
            data: clInfo,
            success: function (data) {
              $(".form-box .tipsss").addClass("show")
              $(".form-box .tipss").removeClass("show")
              $(".form-box .tips").removeClass("show")
            },
            error: function () {}
          })
        } else {
          $(".form-box .tipss").addClass("show")
          $(".form-box .tipsss").removeClass("show")
          $(".form-box .tips").removeClass("show")
        }
      },
      error: function () {}
    })
  })

  //code
  var codeFlad = false
  function codesSetNum(num, ele) {
    var nums = 60
    var t = setInterval(function () {
      nums--
      ele.html(nums + "s")
      if (nums == num) {
        clearInterval(t)
        codeFlad = false
        ele.html("发送验证码")
      }
    }, 1000)
  }
  $("#sendCodeBtn").click(function (e) {
    if (
      $(".form-box input").hasClass("error") ||
      !$(".tel-box").find("#mobile").val()
    ) {
      $(".form-box .tips").addClass("show")
      return false
    } else {
      $(".form-box .tips").removeClass("show")
    }
    if (codeFlad) return
    $.ajax({
      type: "post",
      url:
        "https://t-dahui-api.vhall.com/api/sends/sendCode?phone=" +
        $(".tel-box").find("#mobile").val(),
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      data: {
        phone: $(".tel-box").find("#mobile").val()
      },
      success: function (data) {
        console.log(data)
        codeFlad = true
        codesSetNum(0, $(".tel-box a"))
      }
    })
  })
})
