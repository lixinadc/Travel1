$(function(){
    $("#pname").html($.cookie('pname'));
    $("#typename").html($.cookie('type'));
    $("#price").html($.cookie('price'));
    $("#oprice").html($.cookie('oprice'));
    $("#sale").html($.cookie('sale'));
    $("#img2").attr("src",$.cookie('url'));
    $("#img2").attr("jqimg",$.cookie('jqzurl'));
    $("#img2").css("width","300px");
    $("#img2").css("height","300px");
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
	            //var type=$("#typename").text();
	            //alert(typename);
	            var pname = $("#pname").text();
	            var price = $("#price").text();
	            var num = $("#text_box1").val();
	            var name=loginUser();
	            var url=$.cookie('url');
	            var typeid=$.cookie('typeid');
	        	$.ajax({
	        		url : "carts/addCart.do",
	        		type : "post",
	        		dataType : "json",
	        		data : {
                        "typeid" : typeid,
                        "pname" : pname,

	        			"price" : price,
	        			"num" : num,
	        			"name":name,
	        			"url":url
	        		},
                    succuss:function(result) {
	        			if (result == "true") {
	        				booxbox.alert("成功加入购物车");
//	        				$('#').bootstrapTable('destroy');
//	        				createTable();
	        				//$('#addModel').modal('hide');
	        			}
	        		},
	        		error : function() {
	        			alert("请求错误");
	        		}
	        	});
	        }
	    });
});
function loginUser(){
	var login1=JSON.parse(localStorage.getItem("login"));
	var user;
    if(!(login1==null||login1.length==0)){
    	  for (var i = 0; i < login1.length; i++) {
	             user = login1[i].username;
	            
	        }
    }else {
      booxbox.alert("请您登录")
}
    //alert(user);
    return user;
}