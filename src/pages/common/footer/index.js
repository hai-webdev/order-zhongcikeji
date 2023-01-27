// 页尾的js代码
import "./index.less";
import "../showToast";
import inputIosInvalid from "@/assets/global";
import showToast from "@/assets/showToast";
inputIosInvalid()
$("#submit_message").submit(function(){
    //提交表单
    //这里填写客户端验证
    const title = $('#title').val();
    const tel = $('#tel').val();
    const email = $('#email').val();
    const content = $('#content').val();
    if(!title){
        showToast("姓名不能为空");
        return false;
    }
    if(!tel){
        showToast("电话不能为空");
        return false;
    }
    if(!email){
        showToast("电子邮箱不能为空");
        return false;
    }
    if(!content){
        showToast("内容不能为空");
        return false;
    }
    $.ajax({
        url:"/api.phphongci14.oskj215.com/api.php?c=post&f=ok",
        type:"post",
        data:{
            id:"message",
            title,
            tel,
            email,
            content
        },
        success(res){
            console.log(res);
            if(res.status){
                showToast("提交成功",function(){
                    location.href = "/"
                })
            }
        }
    })
    return false;
});

