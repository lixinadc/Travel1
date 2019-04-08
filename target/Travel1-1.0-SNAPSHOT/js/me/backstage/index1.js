moment.locale("zh-cn");
        var currentTime=function(){
            $("#currentTime").html(moment().format("YYYY-MM-DD dddd HH:mm:ss"));
        }

        $(function () {
            setInterval(currentTime,1000);
            var name=$.cookie('admin');
            $("#userName").html(name);

            $.getJSON("menuList.json",function (d) {
                $("#tree").treeview({
                    data:d,
                    selectedBackColor:"#0F3E6E",
                    selectedIcon:"glyphicon glyphicon-user",
                    expandIcon:"glyphicon glyphicon-time",
                    onNodeSelected:function (event,data) {
                        var parent=$("#tree").treeview("getNode",data.parentId);
                        $("#breadcrumb").html("<li id='aa'>"+parent.text+"</li>"+"<li>"+data.text+"</li>");

                        $("#contentFrame").attr("src",data.href);

                        $("#aa").click(function () {
                            $("#breadcrumb").html("<li id='aa'>"+parent.text+"</li>");
                            $("#contentFrame").attr("src","help.html");

                        });
                    }

                });
            });
            $("#adminout").click(function () {
                $.cookie('admin','',{path:'/'});

                location.href="../login.html";
            });
        });