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
  on: {
    slideChangeTransitionStart: function () {
        $(".banner-item").each((index, item,) => {
            if($(item).find("video").length){
                console.log($(item).find("video")[0]);
                $(item).find("video")[0].pause();
            }
        })
     const video =  $(".banner-item").eq(this.activeIndex).find("video")
     if(video.length){
         video.get(0).play();
     }
    },
  },
});
