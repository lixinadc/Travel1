$(function() {			
	    
	    numTotal();
	    totalPrices();
	    createTable();
		// 查询按钮动作
		$("#btn_query").click(function(){
			var name=$("#search_name").val();
			$.get(
	    			'carts/getSelectTotal.do?nameKey='+name+'&name='+loginUser() , 
	    			function(result) {
	    				//alert(result);
	    				$("#totalprice").html(result);
	    			}	
	    		);
			$("#productTable").bootstrapTable('refresh') ;
		});

		$("#btn_print").click(function(){
	        printTickerInfo();
	    });
		$("#zhifu").click(function () {
		       if(numTotal()==0){
		           bootbox.alert("请您购买一件");
		           return;
		       }
		       $("#mymodal2").modal("show");
		    });
		// 工具栏“删除”按钮动作
		$("#btn_delete").click(function(){
			var rows = $("#productTable").bootstrapTable('getSelections');
			// console.dir(rows) ;
			if(rows.length == 0) {
				bootbox.alert('请选中要删除的记录！') ;
				return ;
			}
			bootbox.confirm('确认删除?' , function(confirmR){
				 if(confirmR) {
					// 将选中行的id拼为一个字符串，使用逗号间隔
						var delIds = "" ;
						$.each(rows , function(index , item){
							delIds += item.id + "," ;
						})
						// 去掉末尾多余的逗号
						delIds = delIds.substr(0 , delIds.length-1) ;
						console.dir(delIds) ;
						// ajax请求删除
						 $.get(
							'carts/deleteMore.do?delIds='+delIds ,
							function(result) {
								if(result == "true") {
									bootbox.alert('删除成功！') ;
								    window.location.reload();

									totalPrices();

									//$("#productTable").bootstrapTable('refresh') ;
								} else {
									bootbox.alert('删除失败！')
								}
							}
						 );
				 }
			}) ;
		});
	});
	function numTotal(){
	$.get(
			'carts/getTotalCount.do?name='+loginUser() , 
			function(result) {
				//alert(result);
				
				$("#num").html(result);
			}	
		);
}
    function totalPrices(){
    	
    	$.get(
    			'carts/getSelectTotal.do?nameKey='+name+'&name='+loginUser() , 
    			function(result) {
    				//alert(result);
    				$("#totalprice").html(result);
    			}	
    		);
    }
	function createTable(){
	$("#productTable").bootstrapTable({
		url : 'carts/getAll.do?name='+loginUser() ,   // 初始化加载数据来源
		method : 'get' ,
		

	    toolbar : '#toolbar' ,   // 为表格绑定工具栏
		striped: true,			// 显示为斑马线格式，奇偶行不通背景色

		showRefresh: "true",	// 显示刷新按钮
		showToggle: "true",		// 显示格式切换按钮
		showColumns: "true",	// 显示列过滤按钮	

		
		// 分页相关  服務器端返回的数据需要包含有total属性和rows属性
		pagination: true,		// 显示分页
		pageNumber: 1,			// 初始化加载第一页
		pageSize: 2,			// 每页2条数据
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
			{field : 'id' , title : '商品ID' ,align: 'center', visible : false} ,
			{field : 'uuid' , title : '商品编号' ,align: 'center'} ,
			{
                field: 'url',
                title: '图片',
                align: 'center',
                formatter: function(value,row,index){
                	//alert(JSON.stringify(row));
                    return "<img  src="+row.url +" class='img-rounded' style='width:80px;height:50px'>";
                }
            },
			{field : 'typeid' ,
            	align: 'center',
            	title : '商品类别' ,
            	formatter: function(value,row,index){
                	//alert(JSON.stringify(row));
            		console.dir(row);
            		//alert(row.proType.type);
            		if(row.typeid==row.proType.tid){
            			//alert(row.proType.type);
            			return row.proType.type;
            		}
                    
                }
             } ,
			
			{field : 'pname' ,align: 'center', title : '商品名' } ,
			{field : 'price' , align: 'center',title : '单价'} ,
			{field : 'num' , align: 'center',title : '数量'} ,
			{field : 'pdate' ,align: 'center', title : '生产日期'} ,
			{field : 'name' ,align: 'center',title : '用户名',visible : false} ,
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
						 $("#editWindow #edit_pname").val(row.pname) ;
						 $("#editWindow #edit_price").val(row.price) ;
						 $("#editWindow #text_box1").val(row.num) ;
						 // 未激活 0   激活  1   禁用 2
						 //$('#editWindow input[name="status"]').eq(row.state).prop('checked', 'checked');
						 // 模态框显示
						 $("#editWindow").modal("show") ;						
							$("#editSubmitBtn").one('click' , function(){
								// ajax 提交更新
								$.post(
										'carts/update.do' ,
										$("#editForm").serialize() ,
										function(result) {
											if(result == "true") {
												bootbox.alert('更新成功!') ;
												totalPrices();
                                                window.location.reload();
												//$("#productTable").bootstrapTable('refresh') ;
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
					 } ,
					 'click .remove' : function(e , value , row , index) {	
						 //console.dir(row) ;
						 bootbox.setLocale("zh_CN");  
						 bootbox.confirm('确认删除?' , function(confirmR){
							 if(confirmR) {
								 // ajax 执行删除操作
								 $.get(
									'carts/del.do?id='+row.id ,
									function(result) {
										if(result == "true") {
											bootbox.alert('删除成功！') ;
											totalPrices();
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
	function exportTable(){
	    $("#productTable").tableExport({
	        headings: true,
	        footers: true,
	        formats: ["xls"],
	        fileName: "账单信息",
	        bootstrap: true,
	        position: "bottom",
	        ignoreRows: null,
	        ignoreCols: null,
            showExport: true,
            exportDataType:"all"
	    });
	}
	function printTickerInfo(){
	    $("#container").jqprint();
	}
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