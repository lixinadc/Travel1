var rowid="";

var selCata=-1;
var nameKey="";

$(function(){
	page=1;
    size=$("#pageId").val();
	createTable1(selCata,nameKey,1);
	select1();
	$("#query").click(function () {
       
        selCata=$("#selCata option:checked").val();
        //alert(selCata);
        nameKey=$("#nameKey").val();
        //alert(nameKey);
        createTable1(selCata,nameKey,1);

        

    });
});
function batt(rowid){
	 //var proID=$(".a1").parent().find(".productId").val();
	var proID=rowid; 
    //alert(proID);
	    
	    $.get(
    			'product/getProductOne.do?id='+proID ,
    			function(result) {
    				//result=JSON.parse(result);
                    // alert(result)
                    // alert(result.pname)
    				$.cookie('pname', result.pname,  {path: '/'});
                    //alert($.cookie('pname'))
    				$.cookie('typeid', result.typeid,  {path: '/'});
                    $.cookie('type', result.proType.type,  {path: '/'});
    				$.cookie('price', result.price,  {path: '/'});
    				$.cookie('oprice', result.oprice,  {path: '/'});
    				$.cookie('sale', result.sale,  {path: '/'});
                    $.cookie('pnum', result.pnum,  {path: '/'});
    				$.cookie('url', result.url,  {path: '/'});
    				$.cookie('jqzurl', result.jqzurl,  {path: '/'});
    				//alert(result.url);
    			}	
    		);

	   $("#pname").html($.cookie('pname'));
	   $("#typename").html($.cookie('type'));
	   $("#price").html($.cookie('price'));
	   $("#oprice").html($.cookie('oprice'));
	   $("#sale").html($.cookie('sale'));
	   $("#img2").attr("src",$.cookie('url'));
	   $("#img2").attr("jqimg",$.cookie('jqzurl'));
	   $("#img2").css("width","300px");
	   $("#img2").css("height","300px");
}
function select1(){
	$("#selCata").empty();
    var op=new Option("全部",-1);

    $("#selCata").append(op);

    $.get(
        "type/getType.do",
        function(result){
            console.dir(result);
            $.each(result,function(index,item){
               // typeStr+="<option value="+item.tid+">"+item.type+"</option>";
                op=new Option();
                op.text=item.type;
                op.value=item.tid;
                $("#selCata").append(op);
            });
            //$("#selCata").html(typeStr);
            $("#selCata").selectpicker("refresh");
            $("#selCata").selectpicker("render");
        }
    );


}
function createTable1(selCata,nameKey,page){
	$.get(
			   'product/getPage.do?page='+page+'&size='+size+'&nameKey='+nameKey+'&typeid='+selCata,
				function(result) {
					//result=JSON.parse(result);
					console.dir(result);
					showData(result)

				}
			);
}

function showData(proInfo) {
	product=proInfo.data;
    var str = "<tr>";
    var cnt=0;
    $.each(product,	function(index, item) {
        rowid=item.id;
        str += "<td><div class='divt'><a href='productOne.html' class='a1' onclick='batt("+item.id+")'><input type='hidden' class='productId'  value='"+item.id+"'/><img src='"+item.url+"' width='200px' height='200px'></a><br/><label>"+item.pname+"</label></div></td>"
        //+ "<td><label>"+item.pname+"</label></td>"
        //+ item.uname
        //+ "</td><td>"
        //+ item.number
        //+ "</td><td><div class='progress progress-striped active'><div class='progress-bar progress-bar-success' role='progressbar' aria-valuenow='"+(item.number/count*100).toFixed(2)+"' aria-valuemin='0' aria-valuemax='100' style='width: "+(item.number/count*100)+"%;'><font color='red'>"+(item.number/count*100).toFixed(2)+"%</font></div></td></tr>";
        cnt++;
        if(cnt%2==0){
            str+="</tr><tr>";
            //<tr><td>"+item.pname+"</td></tr>
        }
        //str+="<td>"+item.pname+"</td></tr>"
    });
    //$("#stable").html(str);
    if(proInfo.count!=0){
        $("#showNoData").html("");
        $("#showInfo").show();
        $("#stable").html(str);
        $("#showPage").html(proInfo.page);
        $("#pageCount").html(proInfo.pageCount);
        //$("#showSize").html(pageBook.size);
        $("#showCount").html(proInfo.count);


        linkStr="";
        if(1==proInfo.page){
            linkStr+="<span>上一页</span>";
        }else{

            linkStr+="<span><a href='javascript:void(0)' onclick='pf("+(proInfo.page-1)+")'>上一页</a></span>";
        }
        if(proInfo.page==proInfo.pageCount){
            linkStr+="<span>下一页</span>";
        }else{
            linkStr+="<span><a href='javascript:void(0)' onclick='pf("+(proInfo.page+1)+")'>下一页</a></span>";
        }
        $("#showLink").html(linkStr);
    }else{
        $("#showNoData").html("查无数据");
        $("#stable").html("");

        $("#showInfo").hide();
        $("#showLink").html("");
  }
}
function turns(){
    size=$("#pageId").val();
    createTable1(selCata,nameKey,1);
}

function pf(page) {
    nameKey=$("#nameKey").val();
    if(nameKey==""||nameKey==null){
        nameKey="";
    }

    createTable1(selCata,nameKey,page);
}