$(function(){
    $("#form1").bootstrapValidator({
        message : "登录信息填写有误！" ,
        feedbackIcons: {			// 图标设置
//			valid: 'glyphicon glyphicon-ok',		// 合格
//			invalid: 'glyphicon glyphicon-remove',	// 不合格
            validating: 'glyphicon glyphicon-refresh'	// 校验中，，，
        },
        fields : {
            username : {
                message : '<font color="red">请准确填写登录账号！</font>' ,
                //trigger : 'blur keyup' ,
                //threshold : int值
                validators : {
                    notEmpty : {
                        message : '<font color="red">账号不能为空！</font>' ,
                        color:'red'
                    }
                } ,
            } ,
            password : {
                message : '<font color="red">账号不能为空！</font>密码填写错误！</font>' ,
                validators : {
                    notEmpty : {
                        message : '<font color="red">请填写登录密码！</font>'
                    } ,
                    stringLength : {
                        message : '<font color="red">长度应该在3--10位之间！</font>' ,
                        min : 3 ,
                        max : 10
                    }
                } ,
            } ,

        }
    }).on('success.form.bv', function(e) {//点击提交之后
        // 阻止表单提交
        e.preventDefault();

        // 获取表单引用
        var $form = $(e.target);

        // 得到bootstrapvalidator实例
        var bv = $form.data('bootstrapValidator');

        // 使用Ajax提交表单并进行校验
        $.post('user/login.do', $form.serialize(), function(result) {
            // 服务器返回结果处理
            // 注意，使用console.dir(result)
            // 如果result结果属性使用双引号引起来，则需要调用调用JSON.parse(jsonstr)进行格式转换；如果属性并未使用双引号引起来，说明结果已经是一个javascript的对象，不需要转换
            //result=JSON.parse(result);
            //console.dir(result) ;
            //alert(result);
            if(result==null||result=="") {
                bootbox.alert("<font color='black'>登录失败！</font>") ;
            } else {
                bootbox.alert("<font color='black'>登录成功！</font>") ;
                // 将用户数据保存，cookie

                //$.cookie('userid',result.id,{path:'/'});
                //$.cookie('username',result.username,{path:'/'});
                var type=$("#user_type").val();
                if(type==1){
                    var id=result.id;
                    var name=result.username;
                    var email=result.email;
                    var sex=result.sex;
                    var phone=result.phone;
                    var description=result.description;
                    var userImg=result.userImg;
                    var login=[];
                    var aa={
                        "id":id,
                        "name":name,
                        "email":email,
                        "sex":sex,
                        "phone":phone,
                        "description":description,
                        "userImg":userImg
                    }
                    login.push(aa);
                    localStorage.setItem("login",JSON.stringify(login));
                    location.href="index.html";
                }else{

                    $.cookie('admin',result.username,{path:'/'});
                    location.href="backstage/index1.html";
                }
//					$.cookie('username',result.username,{path:'/'});
//					$.cookie('userImg',result.userImg,{path:'/'});

                //   页面跳转

            }
            //var resultObj = JSON.parse(result) ;
            //console.dir(resultObj) ;

        });
    });

})

//    var account1=account.concat(regist);
//    localStorage.setItem("account", JSON.stringify(account1));
//
//    var b = false;
//    for (var i = 0; i < account1.length; i++) {
//        if (account1[i].txt1 == user && account1[i].txt2 == pwd) {
//            b = true;
//            break;
//        }
//    }
//
//        if (b) {
//        var login=[];
//        var aa={
//            "user":user,
//            "password":pwd
//        }
//        login.push(aa);
//        localStorage.setItem("login",JSON.stringify(login));
//
//
//            location.href = "index.html";
//        } else {
//            alert("请核对用户名与密码");
//        }

//    }