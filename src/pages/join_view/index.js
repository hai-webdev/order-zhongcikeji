// 引入公共css
import "../common/reset.css";
import "@/assets/global.less";
// 引入页面公共部分的js
import "../common/header";
import "./index.less";



$(".apply").on("click",function(){
  location.href = "message.html";
})