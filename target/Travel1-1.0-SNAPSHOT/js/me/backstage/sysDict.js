$(function () {

    //var typeid=$(".selCata").val();
    //var nameKey=$("#nameKey").val();
    createTable3();
    $("#query").click(function () {

        $('#cityTable').bootstrapTable('destroy');
        // var tpid=$(".selCata").val();
        // alert(tpid)
        //typeid=$(".selCata option:checked").val();
        createTable3();
    });

    //select1();

    // $('#box').bootstrapSwitch({
    //     state:false,
    //     onText:'是',
    //     offText:'否'
    // });
    $("#addpla").click(function() {

        // var formData = new FormData($('#addplace')[0]);
        $.post(
            '../../count/addPlace.do',
            $("#addplace").serialize(),

            function (data) {
                //var result = JSON.parse(data);
                //alert(data);
                console.dir(data);
                if (data.result == "true") {
                    // $("#img2").attr("src","userphoto/"+data.result1);
                    // $.cookie('userImg' ,data.result1 ,{path:'/'});
                    //$("#img2").attr("src","img/user.png");
                    bootbox.alert("添加成功");
                    $('#cityTable').bootstrapTable('refresh');
                    // createTable2();

                } else {
                    bootbox.alert("添加失败");
                }
                //location.reload(true);

            }
            // error:function() {
            //     bootbox.alert("上传失败");
            // }
        );
    });

});



function createTable3(){


    // alert(nameKey)
    //alert(typeid)
    $("#cityTable").bootstrapTable({
            url : '../../count/getPlacePage.do',   // 初始化加载数据来源
            method : 'get' ,


            toolbar : '#toolbar' ,   // 为表格绑定工具栏
            striped: true,			// 显示为斑马线格式，奇偶行不通背景色

            showRefresh: "true",	// 显示刷新按钮
            showToggle: "true",		// 显示格式切换按钮
            showColumns: "true",	// 显示列过滤按钮


            // 分页相关  服務器端返回的数据需要包含有total属性和rows属性
            pagination: true,		// 显示分页
            pageNumber: 1,			// 初始化加载第一页
            pageSize: 3,			// 每页2条数据
            pageList: [2, 5, 10],	// 可以选择的每页数量
            sidePagination: "server", //表示服务端请求分页数据

            // 页面初始化时排序有关
            sortName : 'id' ,
            sortOrder : 'asc' ,

            // 提交到Server的参数列表 ，
            // 参数设定相关
            queryParamsType: "undefined",  // undefined：提交到服务器端的参数自定义
            queryParams: function(params) {
                // 参数params中自带 pageSize , pageNumber , sortName , sortOrder
                params.nameKey = $("#nameKey").val() ;

//			alert(params.pageNumber);
//			alert(params.pageSize);

                //alert((parseInt(params.pageNumber)-1)*parseInt(params.pageSize));

                console.dir(params) ;
                return params ;   // params 是一个js对象，该对象所有属性值都将被提交到服务器端

            },

            columns : [
                {checkbox : true} ,   // 显示为复选框
                {field : 'id' , title : 'ID' ,align: 'center', visible : false} ,




                {field : 'city' ,align: 'center', title : '城市名' } ,
                {field : 'people' , align: 'center',title : '人流量'} ,

                /*
                {field : 'state' , title : '状态' , formatter : function(value , row , index){   // 对该列值进行加工处理
                    if(value == '0') {
                        return '未激活' ;
                    } else if(value == '1') {
                        return '激活' ;
                    } else if(value == '2') {
                        return '禁用' ;
                    }
                }} ,

                */
                {	title : '操作' ,
                    formatter: operateFormatter,   	// 使用叫做operateFormatter函数来设置该列所显示的内容
                    events: operateEvents ,			// 设置该列按照class名称加载相应的用户动作，动作描述在window.operateEvents函数中
                }

            ] ,

        }

    );
    //console.log($(".pagination-info").text());
}
// 操作列对应的函数
function operateFormatter(value , row , index) {

    var update = '<button type="button" class="edit btn btn-xs btn-info"' +
        '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改' +
        '</button>&nbsp;&nbsp;';
    var del = '<button type="button" class="remove btn btn-xs btn-danger"' +
        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除' +
        '</button>';
    return update + del;
}
// 操作列按钮动作的函数
window.operateEvents = {
    // click表示绑定click动作，   .edit 表示为class是edit的元素绑定事件 【注意中间的空格】
    'click .edit': function (e, value, row, index) {
        //console.dir('edit : ') ;
        //console.dir(row) ;
        // 弹框：表单==>表单元素应该填充上本行数据默认值
        // bootstrap -- 模态框
        // 模态框显示数据
        $("#editWindow #editId").val(row.id);

        $("#editWindow #edit_city").val(row.city);
        $("#editWindow #edit_people").val(row.people);
        //$("#editWindow #edit_typeid").attr("value",row.typeid);

        // 未激活 0   激活  1   禁用 2
        //$('#editWindow input[name="status"]').eq(row.state).prop('checked', 'checked');
        // 模态框显示
        $("#editWindow").modal("show");

        $("#editSubmitBtn").one('click', function () {
            var formData = new FormData($('#editForm')[0]);
            // ajax 提交更新
            $.post(
                '../../count/updatePlace.do?id' + row.id,
                $("#editForm").serialize(),

                function (data) {
                    if (data.result == "true") {
                        bootbox.alert('更新成功!');
                        //totalPrices();

                        window.location.reload();
                        $("#cityTable").bootstrapTable('refresh');
                    } else {
                        bootbox.alert('更新失败！');

                    }
                    // 表单重置
                    $("#editForm")[0].reset();
                    // 模态框关闭
                    $("#editWindow").modal("hide");
                }
            );

        })
    },
    'click .remove': function (e, value, row, index) {
        //console.dir(row) ;
        bootbox.setLocale("zh_CN");
        bootbox.confirm('确认删除?', function (confirmR) {
            if (confirmR) {
                // ajax 执行删除操作
                $.get(
                    '../../count/delPlace.do?id=' + row.id,
                    function (result) {
                        if (result == "true") {
                            bootbox.alert('删除成功！');
                            //totalPrices();
                            window.location.reload();
                            $("#cityTable").bootstrapTable('refresh');
                        } else {
                            bootbox.alert('删除失败！')
                        }
                    }
                );
            }
        });


    }
}