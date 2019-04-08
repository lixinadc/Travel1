$(function () {
    $("#acar").click(function () {
        var name=$("#localname").text();
        //alert(name)
        if(name.length!=0){
            location.href="carts.html";
        }else{
            alert("请登录");
        }
    });
    $("#person").click(function () {
        var name=$("#localname").text();
        //alert(name)
        if(name.length!=0){
            location.href="personOne.html";
        }else{
            alert("请登录");
        }
    });
});