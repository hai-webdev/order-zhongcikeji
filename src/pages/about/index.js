// 引入公共css
import "../common/reset.css";
import "@/assets/global.less";
// 引入页面公共部分的js
import "../common/header";
import list from "@/api/list";

import "./index.less";
import "../common/footer";
import Swiper from "swiper";
const bannerSwiper = new Swiper(".banner-swiper", {
  autoHeight: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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
$(".date-item").on("click", function () {
  $(this).addClass("on").siblings().removeClass("on");
});
// 资质荣誉
const vm = new Vue({
  el: "#app",
  data() {
    return {
      index: 0,
      i: 0,
      certList: [],
    };
  },
  async created() {
    const certInfo = await list({ id: "zzry" });
    const certList = certInfo.rslist;
    const certListMap = certList.map((item) => {
      return {
        id: item.id,
        number: item.title,
        title: item.subtitle,
        contTitle: item.subtitle,
        img: item.thumb.filename,
      };
    });
    const certListGroup = this.group(certListMap, 8);
    this.certList.push(...certListGroup);
  },
  methods: {
    certPopupShow(index, i) {
      this.i = i;
      this.index = index;
      $(".cert-popup").fadeIn();
    },
    group(arr, len) {
      let index = 0;
      let newArr = [];
      while (index < arr.length) {
        newArr.push(arr.slice(index, (index += len)));
      }
      return newArr;
    },
  },
  mounted() {
    new Swiper(".honor-swiper", {
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // autoHeight:true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
    });
  },
});
$(".close").on("click", function () {
  $(".cert-popup").fadeOut();
});
// 发展历程
const historyBodyWidth = $(".info-item").outerWidth(true);
$(".date-item").on("click", function () {
  $(this).addClass("on").siblings().removeClass("on");
  const index = $(this).index();
  $(".info-list").css({
    left: -historyBodyWidth * index + "px",
  });
});
// 禁止当前选中的导航再次点击
$(".module-nav-item a").on("click", function(){
  if($(this).parent(".module-nav-item").hasClass("on")){
    console.log(1);
    return false;
  }
})

const infoTop = $(".company-container").offset().top - parseInt($(".company-container").css("padding-top")) - 42;
const visionTop = $(".vision-container").offset().top - parseInt($(".vision-container").css("padding-top")) - 42;
const historyTop = $(".history-container").offset().top - parseInt($(".history-container").css("padding-top")) - 42;
const honorTop = $(".honor-container").offset().top - parseInt($(".honor-container").css("padding-top")) - 42;
// 导航位置
function navPosition() {
  let scrollTop = $(window).scrollTop();
  if (scrollTop > navTop) {
    $(".module-nav-container").addClass("on");
    $(".module-nav-item").removeClass("on");
    if (scrollTop > infoTop && scrollTop < visionTop) {
      $(".module-nav-item").eq(0).addClass("on");
    } else if (scrollTop > visionTop && scrollTop < historyTop) {
      $(".module-nav-item").eq(1).addClass("on");
    } else if (scrollTop > historyTop && scrollTop < honorTop) {
      $(".module-nav-item").eq(2).addClass("on");
    } else if (scrollTop > honorTop) {
      $(".module-nav-item").eq(3).addClass("on");
    }
  } else {
    $(".module-nav-container").removeClass("on");
  }
}
var navTop = 0;

setTimeout(() => {
  navTop = $(".module-nav-container").offset().top - 40;
  navPosition();
}, 0);

$(window).scroll(function () {
  navPosition();
});
