$(function (){
    var login=JSON.parse(localStorage.getItem("login"));
    if(login==null||login.length==0){
        return;
    }else {
        for (var i = 0; i < login.length; i++) {
            var user = login[i].name;
            $("#localname").html("<font color='white'>您好," + user + "</font>");
        }
    }
    $("#cancel").click(function () {
       if(login==null||login.length==0){
           return;
       } else{
           var aa=[];
           aa.push(login);
           aa.splice(0,1);
           localStorage.setItem("login",JSON.stringify(aa));
           var a=JSON.parse(localStorage.getItem("login"));
           $("#localname").html("<font>" + a + "</font>");

       }
    });
   });
	
	