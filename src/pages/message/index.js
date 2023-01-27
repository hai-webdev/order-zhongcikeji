// 引入公共css
import "../common/reset.css";
import "@/assets/global.less";
// 引入页面公共部分的js
import "../common/header";
import "../common/showToast";
import "./index.less";
import "font-awesome/css/font-awesome.css";
import Axios from "axios";
import { resolve } from "path";
import inputIosInvalid from "@/assets/global";
import showToast from "@/assets/showToast";
inputIosInvalid();
const vm = new Vue({
  el: "#app",
  data() {
    return {
      title: "",
      fullname: "",
      tel: "",
      email: "",
      cv: "",
      imgs: [],
      text: "张照片",
      isIos:true,
    };
  },
  created() {
    this.currentSystem();
  },
  mounted() {
    this.title = this.$refs.title.getAttribute("data-val");
  },
  methods: {
    async formSubmit() {
      const that = this;
      this.imgs.forEach((item, index) => {
        if(index === 0){
          that.cv += item.id
        }else{
          that.cv = that.cv + "," + item.id
        }
      })
 
      const { title, fullname, tel, email, cv } = this;
      if (!title) {
        showToast("申请职位不能为空");
        return false;
      }
      if (!fullname) {
        showToast("姓名不能为空");
        return false;
      }
      if (!tel) {
        showToast("电话不能为空");
        return false;
      }
      if (!email) {
        showToast("电子邮箱不能为空");
        return false;
      }
      if (!cv) {
        showToast("简历不能为空");
        return false;
      }
      $.ajax({
        url: "/api.php?c=post&f=ok",
        type: "post",
        data: {
          id: "job-applications",
          title,
          fullname,
          tel,
          email,
          cv,
        },
        success(res) {
          if (res.status) {
            $(".success").fadeIn();
            setTimeout(() => {
              that.fullname = "";
              that.tel = "";
              that.email = "";
              that.cv = "";
              that.imgs = [];
              $(".success").fadeOut();
            }, 2000);
            return false;
          }
        },
      });
    },
    photo() {
      this.fileHandling('photo');
    },
    camera() {
      this.fileHandling('camera');
    },
    selectFile() {
      this.fileHandling('file');
    },
    iosFiles() {
 
      this.fileHandling('iosfiles');
    },
    async fileHandling(ref) {
   
      if(ref === 'file'){
        this.text = "个文件"
      } else{
        this.text = "张照片"
      }
      const that = this;
      const upfiles = this.$refs[ref].files;
      const imgs = [];
      upfiles.forEach((item) => {
        const img = new Promise(async (resolve) => {
          const base64 = await that.filetoBase64(item);
          resolve(base64);
        });
        imgs.push(img);
        // if(ref === 'file'){
        //   imgs.push("/public/imgs/files.png");
        // } else{
        //   imgs.push(img);
        // }
      });
      $(".loading").fadeIn();
      imgs.forEach(async (item) => {
        const data = await item;
        const result = await new Promise((reslove, reject) => {
          $.ajax({
            url: "/api.php?c=upload&f=base64",
            type: "post",
            data: {
              cateid: 33,
              data,
            },
            dataType: "JSON",
            success(res) {
              if(res.status === 'ok' && res.content){
                $(".loading").fadeOut();
                reslove(res.content);
              } else {
                $(".loading").fadeOut();
                showToast(res.content);
                reject(res.content);
                return;
              }
            }

          });
        });
        that.imgs.push(result);
      });
      $(".select-list").slideToggle();
    },
    // 文件流转base64
    filetoBase64(file) {
      let reader = new FileReader(); //实例化文件读取对象
      reader.readAsDataURL(file); //将文件读取为 DataURL,也就是base64编码
      const result = new Promise((resolve, reject) => {
        reader.onload = (e) => {
          //文件读取成功完成时触发
          let dataURL = e.target.result; //获得文件读取成功后的DataURL,也就是base64编码
          resolve(dataURL);
        };
      });
      return result;
    },
    currentSystem(){
      const system = navigator.userAgent;
      if(system.includes('Android') || system.includes('Linux')){
        console.log("安卓");
        this.isIos = false;
      } else if(system.includes('iPhone') || system.includes('iOS')){
        console.log("苹果");
        this.isIos = true;
      }
    }
  },
});
$(".files .btn").on("click", function () {
  $(".select-list").slideToggle();
});
