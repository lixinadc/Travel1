$(function(){
	userTable();
	$("#btn_query1").click(function(){
//		var name=$("#search_name1").val();
//	    //alert(name);
//		$.get(
//    			'../../UserOperServlet?method=searchByKey&nameKey='+name, 
//    			function(result) {
//    				//alert(result);
//    				//$("#totalprice").html(result);
//    			}	
//    		);
		$("#userTable").bootstrapTable('refresh') ;
	});
})
function userTable(){
	$("#userTable").bootstrapTable({
		url : '../../user/getUserPage.do',   // 初始化加载数据来源
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
			params.nameKey = $("#search_name").val() ;
//			alert(params.pageNumber);
//			alert(params.pageSize);
			
			//alert((parseInt(params.pageNumber)-1)*parseInt(params.pageSize));
			
			console.dir(params) ;
			return params ;   // params 是一个js对象，该对象所有属性值都将被提交到服务器端
			
		},

		columns : [
			{checkbox : true} ,   // 显示为复选框
			{field : 'id' , title : 'ID' ,align: 'center', visible : false} ,
			{
               field: 'userImg',
               title: '图片',
               align: 'center',
               formatter: function(value,row,index){
               	//alert(JSON.stringify(row));
                   return "<img  src=../../"+row.userImg +" class='img-rounded' style='width:80px;height:50px'>";
               }
           },
			{field : 'username' ,align: 'center', title : '用户名' } ,

			{field : 'email' ,align: 'center', title : '电子邮件' } ,
			{
				field : 'sex' ,
				align: 'center',
				title : '性别',
				formatter: function(value,row,index){
					if(row.sex==0){
						return "男";
					}else{
						return "女";
					}
				}
			    
			},
			{field : 'phone' , align: 'center',title : '联系方式'} ,
			{field : 'description' ,align: 'center', title : '地点'}
			
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
//			{	title : '操作' , 
//				formatter: operateFormatter,   	// 使用叫做operateFormatter函数来设置该列所显示的内容
//				events: operateEvents ,			// 设置该列按照class名称加载相应的用户动作，动作描述在window.operateEvents函数中
//			}
			
		] ,
		
	}
	
	);
}
//操作列对应的函数
function operateFormatter(value , row , index) {
    
//	var update = '<button type="button" class="edit btn btn-xs btn-info"' +
//	'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>修改' +
//	'</button>&nbsp;&nbsp;';
	var del = '<button type="button" class="remove btn btn-xs btn-danger"' +
		'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除' +
		'</button>';
	//return update + del;
	return del;
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
					 $("#editWindow #edit_name").val(row.name) ;
					 $("#editWindow #edit_price").val(row.price) ;
					 $("#editWindow #text_box1").val(row.num) ;
					 // 未激活 0   激活  1   禁用 2
					 //$('#editWindow input[name="status"]').eq(row.state).prop('checked', 'checked');
					 // 模态框显示
					 $("#editWindow").modal("show") ;						
						$("#editSubmitBtn").one('click' , function(){
							// ajax 提交更新
							$.post(
									'ProductServlet?method=update' ,
									$("#editForm").serialize() ,
									function(result) {
										if(result == "true") {
											bootbox.alert('更新成功!') ;
											totalPrices();
											$("#productTable").bootstrapTable('refresh') ;
										} else {
											bootbox.alert('更新失败！') ;
										}
										// 表单重置
										$("#editForm")[0].reset();
										// 模态框关闭
										$("#editWindow").modal("hide") ;
									}
							) ;
							
						}) ;
				 }

		 }