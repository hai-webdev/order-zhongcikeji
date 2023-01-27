function showToast(text, func){
    $(".alert-container").fadeIn();
    $(".alert-container").find(".text").find(".title").text(text);
    $(".alert-container").find(".text").find(".sure").on("click",function(){
        $(".alert-container").hide();
        if(func){
            func();
        }
    })
}
export default showToast;