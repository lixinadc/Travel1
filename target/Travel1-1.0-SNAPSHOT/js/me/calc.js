$(function () {

    var m = $("#text_box1");
    var p=parseFloat($("#price").text());
    //alert(p);
    $("#add1").click(function () {
        if (m.val() == 10) {
            $("#stat1").html("<font color='red'>库存已达到上限</font>");
            return false;
        } else {
            var m1 = m.val(parseInt(m.val()) + 1);
            $("#stat1").html("");
            $("#text_box1").html(m1);
        }
        //alert(m1.val());
        var pay1 = (m1.val()) *p;
        $("#singlepay1").html("<font size='5px'>"+pay1+"</font>");
    });
    $("#min1").click(function () {
        if (m.val() == 0) {
            $("#stat1").html("<font color='red'>库存已达到下限</font>");
            return false;
        } else {
            var m2 = m.val(parseInt(m.val()) - 1);
            $("#stat1").html("");
            $("#text_box1").html(m2);
        }
        var pay1 = (m2.val()) *p;
        $("#singlepay1").html("<font size='5px'>"+pay1+"</font>");

    });

})
// function getTotal() {
//     var total= $("#text_box1").val()*200+ $("#text_box2").val()*100;
//
//     $("#total2").html(total);
// }