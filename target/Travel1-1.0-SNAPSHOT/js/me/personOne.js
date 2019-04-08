$(function () {
    var userInfo=JSON.parse(localStorage.getItem("login"));
    var username=userInfo[0].name;
    $("#img1").attr("src",userInfo[0].userImg);

    $("#editForm1 #edit_username1").val(username);
    $("#editForm1 #edit_email1").val(userInfo[0].email);
    var cc="";
    if(userInfo[0].sex==0){
        cc="女";
    }else{
        cc="男";
    }
    $("#editForm1 #edit_sex1").val(cc);
    $("#editForm1 #edit_phone1").val(userInfo[0].phone);
    $("#editForm1 #edit_description1").val(userInfo[0].description);
    $("#editSubmitBtn").one('click', function () {
        var formData = new FormData($('#editForm')[0]);
        var userImg=userInfo[0].userImg;
        console.dir(formData);
        // ajax 提交更新
        $.ajax({
            url: 'uploadUser/update.do?userImg='+userImg,
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                console.dir(res.result);
                if (res.result == true) {
                    bootbox.alert('更新成功!');
                    //totalPrices();
                    $("#img1").attr("src", res.result1.userImg);
                    $("#editForm1 #edit_username1").val(res.result1.username);
                    $("#editForm1 #edit_email1").val(res.result1.email);
                    //var aa="";
                    // if(res.result1.sex==0){
                    //     aa="女";
                    // }else{
                    //     aa="男";
                    // }
                    $("#editForm1 #edit_sex1").val(res.result1.sex);
                    $("#editForm1 #edit_phone1").val(res.result1.phone);
                    $("#editForm1 #edit_description1").val(res.result1.description);
                    for(var i=0;i<userInfo.length;i++){
                        userInfo[i].email=res.result1.email;
                        var bb="";
                        // if(res.result1.sex==0){
                        //     bb="女";
                        // }else{
                        //     bb="男";
                        // }
                        userInfo[i].sex=bb;
                        userInfo[i].phone=res.result1.phone;
                        userInfo[i].description=res.result1.description;
                        userInfo[i].userImg=res.result1.userImg;
                    }
                    localStorage.setItem("login",JSON.stringify(userInfo));
                    //(userInfo).setItem('name',res.result1.username);
                    //(userInfo).setItem('email',res.result1.email);
                    // userInfo[0].setItem('email',res.result1.email);
                    // userInfo[0].setItem('sex',res.result1.sex);
                    // userInfo[0].setItem('phone',res.result1.phone);
                    // userInfo[0].setItem('description',res.result1.description);
                    // userInfo[0].setItem('userImg',res.result1.userImg);
                    $("#editWindow").modal("hide");
                    window.location.reload();
                    //$("#productTable").bootstrapTable('refresh') ;
                } else {
                    bootbox.alert('更新失败！');
                }
                // 表单重置
                //$("#editForm")[0].reset();
                // 模态框关闭

            },
            error:function(res) {
                console.dir("fail") ;
                console.dir(res);
            }
        });

    });
});


    // click表示绑定click动作，   .edit 表示为class是edit的元素绑定事件 【注意中间的空格】

        //console.dir('edit : ') ;
        //console.dir(row) ;
        // 弹框：表单==>表单元素应该填充上本行数据默认值
        // bootstrap -- 模态框
        // 模态框显示数据
   function update1() {


       var userInfo = JSON.parse(localStorage.getItem("login"));
       $("#img2").attr("src", userInfo[0].userImg);
       $("#editWindow #editId").val(userInfo[0].id);
       $("#editWindow #edit_username").val(userInfo[0].name);
       $("#editWindow #edit_email").val(userInfo[0].email);
       $("#editWindow #edit_sex").val(userInfo[0].sex);
       $("#editWindow #edit_phone").val(userInfo[0].phone);
       $("#editWindow #edit_description").val(userInfo[0].description);
       // 未激活 0   激活  1   禁用 2
       //$('#editWindow input[name="status"]').eq(row.state).prop('checked', 'checked');
       // 模态框显示
       //$("#editWindow").modal("show");
   }


