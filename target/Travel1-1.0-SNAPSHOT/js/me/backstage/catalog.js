$(function () {
    //alert(1);
    var typeid=$(".selCata").val();
    //var nameKey=$("#nameKey").val();
    createTable2(typeid);
    $("#query").click(function () {

        $('#catalogTab').bootstrapTable('destroy');
        // var tpid=$(".selCata").val();
        // alert(tpid)
        typeid=$(".selCata option:checked").val();
        createTable2(typeid);
    });

    select1();

    // $('#box').bootstrapSwitch({
    //     state:false,
    //     onText:'是',
    //     offText:'否'
    // });
    $("#addpro").click(function(){

        var formData = new FormData($('#addproduct')[0]);
        $.ajax({
            type : 'POST',
            url : '../../upload/addProduct.do',
            data : formData,
            cache : false,
            processData : false,
            contentType : false,
            success:function(data) {
                //var result = JSON.parse(data);
                //alert(data);
                console.dir(data);
                if(data.result){
                    // $("#img2").attr("src","userphoto/"+data.result1);
                    // $.cookie('userImg' ,data.result1 ,{path:'/'});
                    //$("#img2").attr("src","img/user.png");
                    bootbox.alert("添加成功");
                    $('#catalogTab').bootstrapTable('refresh');
                    // createTable2();

                }else{
                    bootbox.alert("添加失败");
                }
                //location.reload(true);

            },
            error:function() {
                bootbox.alert("上传失败");
            }
        });
    });

});


function select1(){
    $(".selCata").empty();
    var op=new Option("全部",-1);

    $(".selCata").append(op);

    $.get(
        "../../type/getType.do",
        function(result){
            console.dir(result);
            $.each(result,function(index,item){
                // typeStr+="<option value="+item.tid+">"+item.type+"</option>";
                op=new Option();
                op.text=item.type;
                op.value=item.tid;
                $(".selCata").append(op);
            });
            //$("#selCata").html(typeStr);
            $(".selCata").selectpicker("refresh");
            $(".selCata").selectpicker("render");
        }
    );


}
function createTable2(typeid){


    // alert(nameKey)
     //alert(typeid)
    $("#catalogTab").bootstrapTable({
            url : '../../product/getPageOne.do?typeid='+typeid ,   // 初始化加载数据来源
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
                {field : 'id' , title : '商品ID' ,align: 'center', visible : false} ,


                {
                    field: 'url',
                    title: '图片',
                    align: 'center',
                    formatter: function(value,row,index){
                        //alert(row);
                        return "<img  src=../../"+row.url +" class='img-rounded' style='width:80px;height:50px'>";
                    }
                },
                {field : 'typeid' ,
                    align: 'center',
                    title : '商品类别' ,
                    formatter: function(value,row,index){
                        //alert(JSON.stringify(row));
                        //alert(row);
                        //alert(row.proType.type);
                        if(row.typeid==row.proType.tid){
                            //alert(row.proType.type);
                            return row.proType.type;
                        }

                    }
                } ,

                {field : 'pname' ,align: 'center', title : '商品名' } ,
                {field : 'price' , align: 'center',title : '单价'} ,
                {field : 'oprice' , align: 'center',title : '原价'} ,
                {field : 'sale' , align: 'center',title : '打折'} ,
                {field : 'pnum' , align: 'center',title : '数量'} ,
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
    'click .edit' : function(e , value , row , index) {
        //console.dir('edit : ') ;
        //console.dir(row) ;
        // 弹框：表单==>表单元素应该填充上本行数据默认值
        // bootstrap -- 模态框
        // 模态框显示数据
        $("#editWindow #editId").val(row.id) ;
        $("#editWindow #img1").attr("src","../../"+row.url);
        $("#editWindow #edit_pname").val(row.pname) ;
        $("#editWindow #edit_typeid").val(row.typeid) ;
        //$("#editWindow #edit_typeid").attr("value",row.typeid);
        $("#editWindow #edit_typeid option:checked").val(row.typeid)
        $("#editWindow #edit_price").val(row.price) ;
        $("#editWindow #edit_oprice").val(row.oprice) ;
        $("#editWindow #edit_sale").val(row.sale);
        $("#editWindow #edit_pnum").val(row.pnum);
        // 未激活 0   激活  1   禁用 2
        //$('#editWindow input[name="status"]').eq(row.state).prop('checked', 'checked');
        // 模态框显示
        $("#editWindow").modal("show") ;

        $("#editSubmitBtn").one('click' , function(){
            var formData = new FormData($('#editForm')[0]);
            // ajax 提交更新
            $.ajax({
                type : 'POST',
                url:'../../upload/updateProduct.do?url='+row.url,
                data : formData,
                cache : false,
                processData : false,
                contentType : false,
                success:function (data) {
                    if (data.result == true) {
                        bootbox.alert('更新成功!');
                        //totalPrices();

                        window.location.reload();
                        $("#productTable").bootstrapTable('refresh') ;
                    } else {
                        bootbox.alert('更新失败！');

                    }
                    // 表单重置
                    $("#editForm")[0].reset();
                    // 模态框关闭
                    $("#editWindow").modal("hide");
                },
                error:function() {
                    bootbox.alert("更新失败");
                }
        }) ;

        }) ;
    } ,
    'click .remove' : function(e , value , row , index) {
        //console.dir(row) ;
        bootbox.setLocale("zh_CN");
        bootbox.confirm('确认删除?' , function(confirmR){
            if(confirmR) {
                // ajax 执行删除操作
                $.get(
                    '../../product/delProduct.do?id='+row.id ,
                    function(result) {
                        if(result == "true") {
                            bootbox.alert('删除成功！') ;
                            //totalPrices();
                            window.location.reload();
                            $("#productTable").bootstrapTable('refresh') ;
                        } else {
                            bootbox.alert('删除失败！')
                        }
                    }
                );
            }
        }) ;

    }
}
function link(){
    var link=$("#catalogTab").bootstrapTable("getSelections");
    if(link==null||link.length==0){
        bootbox.alert("请选择一行");
        return;
    } else{
        var zid1=link[0].zid;
        var zname2=link[0].zname;
        var zpp1=link[0].zpp;
        var zghs1=link[0].zghs;
        var zsize1=link[0].zsize;
        var stInfo1=link[0].stInfo;
        $("#zid1").val(zid1);
        $("#zname2").val(zname2);
        $("#zpp1").val(zpp1);
        $("#zghs1").val(zghs1);
        $("#zsize1").val(zsize1);
        $("#stInfo1").val(stInfo1);
    }
    $("#mymodal1").modal("show");
}
