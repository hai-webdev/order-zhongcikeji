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