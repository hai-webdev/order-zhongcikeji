import "swiper/css/swiper.css";
// 头部的js代码
import "./index.less";
$(".nav-btn").on("click", () => {
    $(".nav-wrapper").addClass("show");
    $(".nav-mask").addClass("show");
})
$(".nav-close").on("click", () => {
    $(".nav-wrapper").removeClass("show");
    $(".nav-mask").removeClass("show");
})
$(".nav-item").on("click", function(){
    $(this).find(".nav-sublist").show();
})
$(".nav-back").on("click", function(){
    console.log( $(this).parents(".nav-sublist"));
    $(this).parents(".nav-sublist").hide();
    return false;
})

