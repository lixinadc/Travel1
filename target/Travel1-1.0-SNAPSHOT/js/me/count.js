$(function () {
   zhexian();
   circle()
   square();
});
function zhexian() {
    var myChart=echarts.init(document.getElementById("main"));
    myChart.showLoading();
    var years=[];
    var nums=[];

    $.ajax({
        //url:'json/count.json',
        url:'fcke/count1.do',
        type:'get',
        dataType:'json',
        success:function (result) {
            for (var i = 0; i <result.length ; i++) {
                years.push(result[i].year);
                nums.push(result[i].num);
            }
            myChart.hideLoading();
            myChart.setOption({
                title:{
                    text:'历年天天旅游的游客量'
                },
                legend:{
                    data:['游客数'],
                    right:70
                },
                xAxis:[{
                    type:'category',
                    data:years
                }],
                yAxis:[{
                    type:'value'
                }],
                series:[{
                    'name':"游客数",
                    'type':'line',
                    'data':nums,
                    'areaStyle': {}
                }]
            });
        }
    });
}
function circle() {
    var myChart1=echarts.init(document.getElementById("main1"));
    myChart1.showLoading();
    var city=[];
    var people=[];
    //var name="";
    $.ajax({
        //url:'json/scratch_2.json',
        url:'count/circle.do',
        type:'get',
        dataType:'json',
        success:function (result) {
            var res=[];

            for (var i = 0; i <result.length ; i++) {
                var name=result[i].city;
                var value=result[i].people;
                var a={
                    "name":name,
                    "value":value
                }
                res.push(a);

            }
        for(var i=0;i<res.length;i++){
            city.push(res[i].name);
            people.push(res[i].value);
        }
            //console.dir(city);
            //  var result2=[
            //
            //  ];
            // for (var i = 0; i < result2 ; i++) {
            //
            // }
            myChart1.hideLoading();

                myChart1.setOption({
                title:{
                    text:'景点人流量',
                    left: 10,
                    top: 10,

                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend:{
                    //data:['游客数'],
                    orient : 'vertical',
                    itemGap:10, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                    itemHeight:9,
                    left : 100,
                    top:40,
                    data : city
                },

                series:[{
                    name:'游客数',
                    type:'pie',
                    radius : "75%",
                    center: ['45%', '55%'],
                    data:res,
                    itemStyle : {
                        emphasis : {
                            shadowBlur : 10,
                            shadowOffsetX : 0,
                            shadowColor : 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    //'areaStyle': {}
                }]
            });

        }
    });
}
function square() {
    var myChart=echarts.init(document.getElementById("main2"));
    myChart.showLoading();
    var years=[];
    var nums=[];

    $.ajax({
        //url:'json/count.json',
        url:'fcke/count1.do',
        type:'get',
        dataType:'json',
        success:function (result) {
            for (var i = 0; i <result.length ; i++) {
                years.push(result[i].year);
                nums.push(result[i].num);
            }
            myChart.hideLoading();
            myChart.setOption({
                title:{
                    text:'历年信誉度'
                },
                legend:{
                    data:['游客数']
                },
                xAxis:[{
                    type:'category',
                    data:years
                }],
                yAxis:[{
                    type:'value'
                }],
                series:[{
                    'name':"游客数",
                    'type':'bar',
                    'data':nums,
                    'areaStyle': {}
                }]
            });
        }
    });
}