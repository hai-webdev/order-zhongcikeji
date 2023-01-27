// 引入公共css
import "../common/reset.css";
import "@/assets/global.less";
// 引入页面公共部分的js
import "../common/header";
import "../common/footer";
import "./index.less";

import Swiper from "swiper";

const product = new Swiper(".product-swiper", {
    navigation:{
        prevEl:".swiper-button-prev",
        nextEl:".swiper-button-next",
    },
    loop: true,
    autoplay:{
        // delay:3000,
    }
})

const navLen = $(".product-nav-item").length;
const navIndex = $(".product-nav-item.on").index();
const navLeft = $(".product-nav-item.on").offset().left;
const navWidth = $(".product-nav-item.on").width();
// console.log(navLen,navIndex,navLeft,$(".product-nav-list").width(), navWidth);

if(navLeft > $(".product-nav-list").width() - navWidth){
  $(".product-nav-list").scrollLeft(navLeft - 10)
}
// 导航位置
function navPosition() {
    if ($(window).scrollTop() > navTop) {
      $(".product-nav-container").addClass("on");
    } else {
      $(".product-nav-container").removeClass("on");
    }
  }
  var navTop = 0;
  
  setTimeout(() => {
    navTop = $(".product-nav-container").offset().top;
    navPosition();
  }, 0);
  
  $(window).scroll(function () {
    navPosition();
  });
