// 引入公共css
import "../common/reset.css";
import "@/assets/global.less";
// 引入页面公共部分的js
import "../common/header";
import "../common/footer";

import "./index.less";
import Swiper from "swiper";
const bannerSwiper = new Swiper(".banner-swiper", {
  autoHeight: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable:true,
  },
  navigation: {
    prevEl: ".swiper-btn-prev",
    nextEl: ".swiper-btn-next",
  },
  on: {
    slideChangeTransitionStart: function () {
      $(".banner-item").each((index, item) => {
        if ($(item).find("video").length) {
          $(item).find("video")[0].pause();
        }
      });
      const video = $(".banner-item").eq(this.activeIndex).find("video");
      if (video.length) {
        video.get(0).play();
      }
    },
  },
});
$(".date-item").on("click", function(){
  $(this).addClass("on").siblings().removeClass("on");
})
// 资质荣誉
const vm = new Vue({
  el:"#app",
  data(){
    return {
      index: 0,
      certList:[
        {
          id:0,
          number:"ISO9001",
          title:"质量管理体系质量管理体系质量管理体系质量管理体系质量管理体系质量管理体系",
          contTitle:"质量管理体系认证证书",
          img:"/public/imgs/honor.jpg"
        },
        {
          id:1,
          number:"ISO9001",
          title:"质量管理体系<br>认证证书",
          contTitle:"质量管理体系认证证书",
          img:"/public/imgs/cert01.jpg"
        },
        {
          id:2,
          title:"互联网药品信息服务资质证书",
          contTitle:"互联网药品信息服务资质证书",
          img:"/public/imgs/cert02.jpg"
        },
        {
          id:3,
          number:"ISO9001",
          title:"质量管理体系<br>认证证书",
          contTitle:"质量管理体系认证证书",
          img:"/public/imgs/cert01.jpg"
        },
        {
          id:4,
          number:"ISO9001",
          title:"质量管理体系<br>认证证书",
          contTitle:"质量管理体系认证证书",
          img:"/public/imgs/cert01.jpg"
        },
        {
          id:5,
          number:"ISO9001",
          title:"质量管理体系<br>认证证书",
          contTitle:"质量管理体系认证证书",
          img:"/public/imgs/cert01.jpg"
        },
        {
          id:6,
          number:"ISO9001",
          title:"质量管理体系<br>认证证书",
          contTitle:"质量管理体系认证证书",
          img:"/public/imgs/cert01.jpg"
        },
      ]
    }
  },
  methods:{
    certPopupShow(index){
      this.index = index;
      $(".cert-popup").fadeIn();
    }
  }
})
$(".close").on("click", function(){
  $(".cert-popup").fadeOut();
})
// 发展历程
const historyBodyWidth = $(".info-item").outerWidth(true);
$(".date-item").on("click", function(){
  $(this).addClass("on").siblings().removeClass("on");
  const index = $(this).index();
  $(".info-list").css({
    left: - historyBodyWidth * index + "px"
  })
})

// 导航位置
function navPosition(){
  if($(window).scrollTop() > navTop){
    $(".module-nav-container").addClass("on");
  } else{
    $(".module-nav-container").removeClass("on");
  }
}
var navTop = 0;
setTimeout(()=>{
  navTop = $(".module-nav-container").offset().top;
  navPosition();
},0)


$(window).scroll(function(){
  navPosition();
})