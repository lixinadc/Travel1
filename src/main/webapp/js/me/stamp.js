function uid() {

    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
$(function () {
   
   //alert(url);
	
   
   $("#buy").click(function () {
       var user=$("#localname").text();
       bootbox.setLocale("zh_CN");
       if(user.length==0) {
           bootbox.alert("请登录");
       }else {
           if ($("#text_box1").val() == 0) {
               bootbox.alert({
                   message: "请您选择一个数量"
               });
               return;
           }


           //    bootbox.confirm({
           //        message:"",
           //
           //        callback: function(result){
           //
           //        },
           // })
           $("#mymodal").modal("show");

       }
  });
    $("#shopcart").click(function () {
        var user=$("#localname").text();
        if(user.length==0) {
            bootbox.alert("请登录");
        }else {
            if ($("#text_box1").val() == 0) {
                bootbox.alert({
                    message: "请您选择一个数量"
                });
                return;
            }
            bootbox.alert({
                message: "您已加入购物车"
            });
            //var uid1 = uid();
            var typename=$("#typename").text();
            //alert(typename);
            var pname = $("#pname").text();
            var price = $("#price").text();
            var num = $("#text_box1").val();
            var name=loginUser();
            var url=$("#url").val();
            //var price = $("#singlepay1").text();
            //alert(uid1)
//            var cart = {
//                "uid1": uid1,
//                "shopname": shopname,
//                "priceF": priceF,
//                "num": num,
//                "price": price
//            }
        	$.ajax({
        		url : "ProductServlet?method=addPro",
        		type : "post",
        		dataType : "json",
        		data : {
        			"typename" : typename,
        			"pname" : pname,
        			"price" : price,
        			"num" : num,
        			"name":name,
        			"url":url
        		},
        		function(data) {
        			if (data.result == "true") {
        				booxbox.alert("成功加入购物车");
//        				$('#').bootstrapTable('destroy');
//        				createTable();
        				//$('#addModel').modal('hide');
        			}
        		},
        		error : function() {
        			alert("请求错误");
        		}
        	})
//            if (localStorage.getItem("cart") == null) {
//                localStorage.setItem("cart", JSON.stringify(cart));
//            } else {
//                if (localStorage.getItem("cart").indexOf("[") == -1) {
//                    var ss = [];
//                    ss.push(JSON.parse(localStorage.getItem("cart")));
//                    ss.push(cart);
//                }
//                else {
//                    var ss = JSON.parse(localStorage.getItem("cart"));
//                    ss.push(cart);
//                }
//                localStorage.setItem("cart", JSON.stringify(ss));
//            }

        }
    });
});
function loginUser(){
	var login1=JSON.parse(localStorage.getItem("login"));
	var user;
    if(!(login1==null||login1.length==0)){
    	  for (var i = 0; i < login1.length; i++) {
	             user = login1[i].name;
	            
	        }
    }else {
      booxbox.alert("请您登录")
}
    //alert(user);
    return user;
}
//function productOne(){
//	var proID=$("#productId").val();
//	alert(proID);
//}