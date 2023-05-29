//file为对应上传的文件
var file = null;
//给按钮绑定相应的函数
function choose_file(){
    document.getElementById('pdf_show_table').style.display = 'none';
    document.getElementById('show_upload').style.display = 'none';
    document.getElementById('get_img').style.display = 'block';
}

function modify_password(){
    document.getElementById('none_one').style.opacity= 0.5;
    document.getElementById('modify_password').style.display = 'block';
}

function back_path(){
    document.getElementById('none_one').style.opacity= 1;
    document.getElementById('modify_password').style.display = 'none';
}

function modify_password_button(){
    var account_receive = window.sessionStorage.getItem("account");
    var password = document.getElementById('input_password').value;
    var new_password = document.getElementById('input_new').value;
    var password_again = document.getElementById('password_again').value;
    if(password_again == '' || password == '' || new_password == ''){
        document.getElementById('none_one').style.opacity= 1;
        document.getElementById('modify_password').style.display = 'none';
    }
    else {
        if(new_password != password_again) window.alert("请输入相同的密码");
        else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 200) {
                    if(this.responseText == 'Login result:Fail to login,your password is wrong!') window.alert("原密码输入错误");
                    else {
                        var xhttp1 = new XMLHttpRequest();
                        xhttp1.onreadystatechange = function (){
                            if(this.readyState == 4 && this.status == 200) {
                                document.getElementById('none_one').style.opacity= 1;
                                document.getElementById('modify_password').style.display = 'none';
                            }
                        };
                        xhttp1.open("POST","/server/Modify.php",true);
                        var send_message1 = "account=" + account_receive + "&password=" + new_password;
                        xhttp1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xhttp1.send(send_message1);
                    }
                }
            };
            xhttp.open("POST","/server/Login.php",true);
            var send_message = "account=" + account_receive + "&password=" + password;
            xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhttp.send(send_message);
        }
    }
}

function logout() {
    location.href = '../Login/Login.html';
}

function back() {
    document.getElementById('get_img').style.display = 'none';
    document.getElementById('pdf_show_table').style.display = 'block';
}
function input_file() {
    document.querySelector('#choose_file').click();
}

function delete_button(){
    var name = file['name'];
    var account_receive = window.sessionStorage.getItem("account");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            if(this.responseText == 'success') {
                document.getElementById('get_img').style.display = 'none';
                document.getElementById('pdf_show_table').style.display = 'block';
                file = null;
            }
            else {
                var xhttp1 = new XMLHttpRequest();
                xhttp1.onreadystatechange = function () {
                    if(this.readyState == 4 && this.status == 200) {
                        document.getElementById('get_img').style.display = 'none';
                        document.getElementById('pdf_show_table').style.display = 'block';
                        file = null;
                    }
                }
                xhttp1.open("POST","/server/delete_button.php",true);
                var send_message = "account=" + account_receive + "&name=" + name;
                xhttp1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xhttp1.send(send_message);
            }
        }
    };
    xhttp.open("POST","/server/is_file.php",true);
    var send_message = "account=" + account_receive + "&name=" + name;
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);
}



//点击获取上传的文件
function selectFile(e) {
    //为每个用户创建对应的文件夹
    var account_receive = window.sessionStorage.getItem("account");
    if(e.target.files[0].type == 'application/pdf') {
        file = e.target.files[0];
        var formData = new FormData();
        formData.append("file",file);
        formData.append('account',account_receive);
        //进行相应文件的上传
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST","/server/file_process.php",true);
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200){
                var response = this.responseText;
                if(response == 'fail')
                    window.alert("文件过大，目前不支持上传！");
                else{
		if(file['name'].length <=7 ) var name = file['name'];
                else var name = file['name'].substring(0,7) + '…' + '.pdf';
                document.getElementById('name').innerHTML = name;
                document.getElementById('show_upload').style.display = 'block';
		}
            }
        };
        xhttp.send(formData);
    }
    else window.alert("请选择正确类型的文件");
}
function Thesis_warehouse() {
    flush_pdf_table();
    document.getElementById('pdf_show_area').style.display = 'block';
    document.getElementById('show_img_one').style.display = 'none';
    document.getElementById('show_img_two').style.display = 'none';
    document.getElementById('study_card').style.display = 'none';
}

function Reading_analysis() {
    document.getElementById('pdf_show_area').style.display = 'none';
    document.getElementById('show_img_one').style.display = 'block';
    document.getElementById('show_img_two').style.display = 'none';
    document.getElementById('study_card').style.display = 'none';

    var Jan_data;
    var Feb_data;
    var Mar_data;
    var Apr_data;
    var May_data;
    var Jun_data;
    var Jul_data;
    var Aug_data;
    var Sep_data;
    var Oct_data;
    var Nov_data;
    var Dec_data;

    var Jan_data_agv;
    var Feb_data_agv;
    var Mar_data_agv;
    var Apr_data_agv;
    var May_data_agv;
    var Jun_data_agv;
    var Jul_data_agv;
    var Aug_data_agv;
    var Sep_data_agv;
    var Oct_data_agv;
    var Nov_data_agv;
    var Dec_data_agv;

    var account_receive = window.sessionStorage.getItem("account");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            Jan_data = parseInt(xmlDoc.getElementsByTagName("Jan")[0].childNodes[0].nodeValue);
            Feb_data = parseInt(xmlDoc.getElementsByTagName("Feb")[0].childNodes[0].nodeValue);
            Mar_data = parseInt(xmlDoc.getElementsByTagName("Mar")[0].childNodes[0].nodeValue);
            Apr_data = parseInt(xmlDoc.getElementsByTagName("Apr")[0].childNodes[0].nodeValue);
            May_data = parseInt(xmlDoc.getElementsByTagName("May")[0].childNodes[0].nodeValue);
            Jun_data = parseInt(xmlDoc.getElementsByTagName("Jun")[0].childNodes[0].nodeValue);
            Jul_data = parseInt(xmlDoc.getElementsByTagName("Jul")[0].childNodes[0].nodeValue);
            Aug_data = parseInt(xmlDoc.getElementsByTagName("Aug")[0].childNodes[0].nodeValue);
            Sep_data = parseInt(xmlDoc.getElementsByTagName("Sep")[0].childNodes[0].nodeValue);
            Oct_data = parseInt(xmlDoc.getElementsByTagName("Oct")[0].childNodes[0].nodeValue);
            Nov_data = parseInt(xmlDoc.getElementsByTagName("Nov")[0].childNodes[0].nodeValue);
            Dec_data = parseInt(xmlDoc.getElementsByTagName("Dec")[0].childNodes[0].nodeValue);

            Jan_data_agv = parseFloat(xmlDoc.getElementsByTagName("Jan1")[0].childNodes[0].nodeValue);
            Feb_data_agv = parseFloat(xmlDoc.getElementsByTagName("Feb1")[0].childNodes[0].nodeValue);
            Mar_data_agv = parseFloat(xmlDoc.getElementsByTagName("Mar1")[0].childNodes[0].nodeValue);
            Apr_data_agv = parseFloat(xmlDoc.getElementsByTagName("Apr1")[0].childNodes[0].nodeValue);
            May_data_agv = parseFloat(xmlDoc.getElementsByTagName("May1")[0].childNodes[0].nodeValue);
            Jun_data_agv = parseFloat(xmlDoc.getElementsByTagName("Jun1")[0].childNodes[0].nodeValue);
            Jul_data_agv = parseFloat(xmlDoc.getElementsByTagName("Jul1")[0].childNodes[0].nodeValue);
            Aug_data_agv = parseFloat(xmlDoc.getElementsByTagName("Aug1")[0].childNodes[0].nodeValue);
            Sep_data_agv = parseFloat(xmlDoc.getElementsByTagName("Sep1")[0].childNodes[0].nodeValue);
            Oct_data_agv = parseFloat(xmlDoc.getElementsByTagName("Oct1")[0].childNodes[0].nodeValue);
            Nov_data_agv = parseFloat(xmlDoc.getElementsByTagName("Nov1")[0].childNodes[0].nodeValue);
            Dec_data_agv = parseFloat(xmlDoc.getElementsByTagName("Dec1")[0].childNodes[0].nodeValue);

            //图片显示
            const colors = ['#5470C6', '#91CC75', '#EE6666'];
            var option = {
                title: {
                    text: '月份阅读量分析'
                },
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['用户阅读', '平均阅读', 'Evaporation Trend', 'Precipitation Trend']
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: [
                        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                    ]
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '用户阅读',
                        position: 'left',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} 篇'
                        }
                    },
                    {
                        type: 'value',
                        name: '平均阅读',
                        position: 'right',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} 篇'
                        }
                    }
                ],
                series: [
                    {
                        name: '用户阅读',
                        type: 'bar',
                        data: [
                            Jan_data, Feb_data, Mar_data, Apr_data, May_data, Jun_data,
                            Jul_data, Aug_data, Sep_data, Oct_data, Nov_data, Dec_data
                        ],
                        markLine: {
                            symbol: 'none',
                            lineStyle: {
                                type: 'dashed'
                            },

                        }
                    },
                    {
                        name: '平均阅读',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: [
                            Jan_data_agv, Feb_data_agv, Mar_data_agv, Apr_data_agv, May_data_agv, Jun_data_agv,
                            Jul_data_agv, Aug_data_agv, Sep_data_agv, Oct_data_agv, Nov_data_agv, Dec_data_agv
                        ],
                        markLine: {
                            symbol: 'none',
                            lineStyle: {
                                type: 'dashed'
                            },
                        }
                    },
                    // Evaporation 的折线图配置
                    {
                        name: '用户阅读',
                        type: 'line',
                        yAxisIndex: 0,
                        smooth: false,
                        showSymbol: false,
                        lineStyle: {
                            color: colors[0]
                        },
                        data: [
                            Jan_data, Feb_data, Mar_data, Apr_data, May_data, Jun_data,
                            Jul_data, Aug_data, Sep_data, Oct_data, Nov_data, Dec_data
                        ]
                    },
                    // Precipitation 的折线图配置
                    {
                        name: '平均阅读',
                        type: 'line',
                        yAxisIndex: 1,
                        smooth: false,
                        showSymbol: false,
                        lineStyle: {
                            color: colors[1]
                        },
                        data: [
                            Jan_data_agv, Feb_data_agv, Mar_data_agv, Apr_data_agv, May_data_agv, Jun_data_agv,
                            Jul_data_agv, Aug_data_agv, Sep_data_agv, Oct_data_agv, Nov_data_agv, Dec_data_agv
                        ]
                    }
                ]
            };

            var myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption(option);
            window.addEventListener('resize', function() {
                myChart.resize();
            });
        }
    };
    xhttp.open("POST","/server/data_request.php",true);
    var send_message = "account=" + account_receive ;
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);
}

function max(x,y) {
    if(x>=y) return x;
    else return y;
}

function Content_lookup() {
    document.getElementById('pdf_show_area').style.display = 'none';
    document.getElementById('show_img_one').style.display = 'none';
    document.getElementById('show_img_two').style.display = 'block';
    document.getElementById('study_card').style.display = 'none';
    var account_receive = window.sessionStorage.getItem("account");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var nsc;
            var ete;
            var mssc;
            var hsc;
            var ssc;
            var syn;

            var nsc_avg;
            var ete_avg;
            var mssc_avg;
            var hsc_avg;
            var ssc_avg;
            var syn_avg;

            var xmlDoc = this.responseXML;

            nsc = parseInt(xmlDoc.getElementsByTagName("nsc")[0].childNodes[0].nodeValue);
            ete = parseInt(xmlDoc.getElementsByTagName("ete")[0].childNodes[0].nodeValue);
            mssc = parseInt(xmlDoc.getElementsByTagName("mssc")[0].childNodes[0].nodeValue);
            hsc = parseInt(xmlDoc.getElementsByTagName("hsc")[0].childNodes[0].nodeValue);
            ssc = parseInt(xmlDoc.getElementsByTagName("ssc")[0].childNodes[0].nodeValue);
            syn = parseInt(xmlDoc.getElementsByTagName("syn")[0].childNodes[0].nodeValue);

            nsc_avg = parseFloat(xmlDoc.getElementsByTagName("nsc1")[0].childNodes[0].nodeValue);
            ete_avg = parseFloat(xmlDoc.getElementsByTagName("ete1")[0].childNodes[0].nodeValue);
            mssc_avg = parseFloat(xmlDoc.getElementsByTagName("mssc1")[0].childNodes[0].nodeValue);
            hsc_avg = parseFloat(xmlDoc.getElementsByTagName("hsc1")[0].childNodes[0].nodeValue);
            ssc_avg = parseFloat(xmlDoc.getElementsByTagName("ssc1")[0].childNodes[0].nodeValue);
            syn_avg = parseFloat(xmlDoc.getElementsByTagName("syn1")[0].childNodes[0].nodeValue);

            if(nsc !=0 || nsc_avg !=0) var nsc_max = Math.ceil(max(nsc,nsc_avg)/0.7);
            else var nsc_max = 1;
            if(ete !=0 || ete_avg !=0) var ete_max = Math.ceil(max(ete,ete_avg)/0.7);
            else var ete_max = 1;
            if(mssc !=0 || mssc_avg !=0) var mssc_max = Math.ceil(max(mssc,mssc_avg)/0.7);
            else var mssc_max = 1;
            if(hsc !=0 || hsc_avg !=0) var hsc_max = Math.ceil(max(hsc,hsc_avg)/0.7);
            else var hsc_max = 1;
            if(ssc !=0 || ssc_avg !=0) var ssc_max = Math.ceil(max(ssc,ssc_avg)/0.7);
            else var ssc_max = 1;
            if(syn !=0 || syn_avg !=0) var syn_max = Math.ceil(max(syn,syn)/0.7);
            else var syn_max = 1;

            //图片二显示
            var option1 = {
                title: {
                    text: '标签雷达图分析'
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['用户阅读', '平均阅读']
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: 'N-Sc', max: nsc_max },
                        { name: 'E-Te', max: ete_max },
                        { name: 'MS-Sc', max: mssc_max },
                        { name: 'H-Sc', max: hsc_max },
                        { name: 'S-Sc', max: ssc_max },
                        { name: 'Syn', max: syn_max }
                    ]
                },
                tooltip: {
                    formatter: function(params) {
                        var data = params.value;
                        var sales = data[0];
                        var administration = data[1];
                        var it = data[2];
                        var customerSupport = data[3];
                        var development = data[4];
                        var marketing = data[5];
                        return (
                            '<div style="text-align:left">' +
                            '<div>N-Sc: ' + sales + '</div>' +
                            '<div>E-Te: ' + administration + '</div>' +
                            '<div>MS-Sc: ' + it + '</div>' +
                            '<div>H-Sc: ' + customerSupport + '</div>' +
                            '<div>S-Sc: ' + development + '</div>' +
                            '<div>Syn: ' + marketing + '</div>' +
                            '</div>'
                        );
                    }
                },
                series: [
                    {
                        name: '用户 vs 平均',
                        type: 'radar',
                        data: [
                            {
                                value: [nsc, ete, mssc, hsc, ssc, syn],
                                name: '用户阅读'
                            },
                            {
                                value: [nsc_avg, ete_avg, mssc_avg, hsc_avg, ssc_avg, syn_avg],
                                name: '平均阅读'
                            }
                        ]
                    }
                ]
            };
            var radarChart = echarts.init(document.getElementById('radarChart'));
            window.addEventListener('resize', function() {
                radarChart.resize();
            });
            // 使用刚指定的配置项和数据显示图表。
            radarChart.setOption(option1);
        }
    }
    xhttp.open("POST","/server/img_request.php",true);
    var send_message = "account=" + account_receive ;
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);

}

function study_card(){
    document.getElementById('pdf_show_area').style.display = 'none';
    document.getElementById('show_img_one').style.display = 'none';
    document.getElementById('show_img_two').style.display = 'none';
    flush_card_table();
    document.getElementById('study_card').style.display = 'block';
}

function send_message_button() {
    var name_input = file['name'];
    var tag_input = document.getElementById('tag_file').value;
    var lang_input = document.getElementById('lang_file').value;
    var account_receive = window.sessionStorage.getItem("account");
    var data = Date().substring(0,24);
    if(tag_input == '')  window.alert("请选择相应的标签");
    if(lang_input == '') window.alert("请选择相应的语言");
    if(lang_input != '' && tag_input != ''){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200) {
                flush_pdf_table();
		window.alert(this.responseText);
		document.getElementById('get_img').style.display = 'none';
                document.getElementById('pdf_show_table').style.display = 'block';
            }
        };
        xhttp.open("POST","/server/Individual_center.php",true);
        var send_message = "account=" + account_receive + "&name=" + name_input
            + "&tag=" + tag_input + "&data=" + data + "&lang=" + lang_input;
        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhttp.send(send_message);
    }
}

function showResult(str){
    var account = window.sessionStorage.getItem("account");
    var input = str;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            if(str == '') flush_pdf_table();
            else {
                var i;
                var name_put;
                var xmlDoc = this.responseXML;
                if(xmlDoc.getElementsByTagName("name").length == 0){
                    document.getElementById('pdf_show_table').remove();
                    var htmlinner = '<div class="pdf_show_table" id="pdf_show_table">';
                    htmlinner = htmlinner + '</div>';
                    document.getElementById('test').innerHTML = htmlinner;
                }
                else {
                    document.getElementById('pdf_show_table').remove();
                    var x = xmlDoc.getElementsByTagName("name").length;
                    var htmlinner = '<div class="pdf_show_table" id="pdf_show_table">';
                    for(i = 0; i < x; ++i) {
                        if(xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue.length>=6){
                            name_put = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue.substring(0,6) + '.pdf';
                        }
                        else name_put = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                        n = 3 + i*16;
                        htmlinner = htmlinner +
                            '<div class="pdf_single_show" style="top:' + n.toString() + '%">' +
                            '<div class="pdf_name">' +
                            '<img src="https://www.z4a.net/images/2023/05/10/2023-05-10-00.33.08.png" class="pdf_img">' +
                            '<div id="c' + i.toString() + '">' +
                            '<div id="fond">' +
                            '<a id="b' + i.toString() + '">'  + name_put +' ('+ xmlDoc.getElementsByTagName("tag")[i].childNodes[0].nodeValue+ ')' + '</a>' +
                            '</div>' +
                            '<div style="display: none">' +
                            '<p id="a' + i.toString() + '" class="path_">' + xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue  + '</p>' +
                            '</div>' +
                            '</div>'+
                            '</div>' +
                            '<div class="pdf_time">' +
                            '<p>' + xmlDoc.getElementsByTagName("data")[i].childNodes[0].nodeValue + '</p>' +
                            '</div>' +
                            '<div class="pdf_action">' +
                            '<button id="d' + i.toString() + '">' +
                            '<img src="https://www.z4a.net/images/2023/05/10/2023-05-10-01.24.58.png" class="pdf_delete">' +
                            '<div style="display: none">' +
                            '<p id="e' + i.toString() + '" class="path_">' + xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue  + '</p>' +
                            '</div>' +
                            '<div style="display: none">' +
                            '<a id="x' + i.toString() + '" class="name_">'  + xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue + '</a>' +
                            '</div>' +
                            '</button>' +
                            '<button id="z' + i.toString() + '">' +
                            '<img src="https://www.z4a.net/images/2023/05/10/2023-05-10-01.24.17.png" class="pdf_copy">' +
                            '<div style="display: none">' +
                            '<p id="f' + i.toString() + '" class="path_">' + xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue  + '</p>' +
                            '</div>' +
                            '</button>' +
                            '</div>' +
                            '</div>' ;
                    }
                    htmlinner = htmlinner + '</div>';
                    document.getElementById('test').innerHTML = htmlinner;
                    for(i = 0; i < x; ++i) {
                        var pdf_id = 'c' + i.toString();
                        var button_id = 'd' + i.toString();
                        var button_id_copy = 'z' + i.toString();
                        document.getElementById(pdf_id).onclick = function () {
                            var path = this.innerHTML.match(/class="path_">(.*?)<\/p>/)[1];
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function () {
                                if(this.readyState == 4 && this.status == 200) {
                                    path = path.slice(13);
                                    window.sessionStorage.setItem("pdf_path",path);
                                    location.href = '../index.html';
                                }
                            };
                            xhttp.open("POST","/server/transform.php",true);
                            var send_message = "&path=" + path;
                            xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                            xhttp.send(send_message);
                        };
                        document.getElementById(button_id).onclick = function (){
                            var path = this.innerHTML.match(/class="path_">(.*?)<\/p>/)[1];
                            var name = this.innerHTML.match(/class="name_">(.*?)<\/a>/)[1];
                            var account = window.sessionStorage.getItem("account");
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function () {
                                if(this.readyState == 4 && this.status == 200) {
                                    flush_pdf_table();
                                }
                            };
                            xhttp.open("POST","/server/delete.php",true);
                            var send_message = "account=" + account + "&path=" + path + "&name=" + name;
                            xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                            xhttp.send(send_message);
                        };
                        document.getElementById(button_id_copy).onclick = function () {
                            var path = this.innerHTML.match(/class="path_">(.*?)<\/p>/)[1];
                            var account = window.sessionStorage.getItem("account");
                            var data = Date().substring(0,24);
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function () {
                                if(this.readyState == 4 && this.status == 200) {
                                    flush_pdf_table();
                                }
                            };
                            xhttp.open("POST","/server/copy.php",true);
                            var send_message = "account=" + account + "&path=" + path + "&data=" + data;
                            xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                            xhttp.send(send_message);
                        };
                    }
                }

            }
        }
    };
    xhttp.open("POST","/server/search.php",true);
    var send_message = "account=" + account + "&input=" + input;
    console.log(send_message);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);
}

function flush_pdf_table() {
    var account_receive = window.sessionStorage.getItem("account");
    var xhttp = new XMLHttpRequest();
    var n = 0;
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            var i;
            var name_put;
            var xmlDoc = this.responseXML;
            if(xmlDoc.getElementsByTagName("name").length == 0){
                document.getElementById('pdf_show_table').remove();
                var htmlinner = '<div class="pdf_show_table" id="pdf_show_table">';
                htmlinner = htmlinner + '</div>';
                document.getElementById('test').innerHTML = htmlinner;
            }
            else {
                document.getElementById('pdf_show_table').remove();
                var x = xmlDoc.getElementsByTagName("name").length;
                var htmlinner = '<div class="pdf_show_table" id="pdf_show_table">';
                for(i = 0; i < x; ++i) {
                    if(xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue.length>=6){
                        name_put = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue.substring(0,6) + '.pdf';
                    }
                    else name_put = xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
                    n = 3 + i*16;
                    htmlinner = htmlinner +
                        '<div class="pdf_single_show" style="top:' + n.toString() + '%">' +
                        '<div class="pdf_name">' +
                        '<img src="https://www.z4a.net/images/2023/05/10/2023-05-10-00.33.08.png" class="pdf_img">' +
                        '<div id="c' + i.toString() + '">' +
                        '<div id="fond">' +
                        '<a id="b' + i.toString() + '">'  + name_put +' ('+ xmlDoc.getElementsByTagName("tag")[i].childNodes[0].nodeValue+ ')' + '</a>' +
                        '</div>' +
                        '<div style="display: none">' +
                        '<p id="a' + i.toString() + '" class="path_">' + xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue  + '</p>' +
                        '</div>' +
                        '</div>'+
                        '</div>' +
                        '<div class="pdf_time">' +
                        '<p>' + xmlDoc.getElementsByTagName("data")[i].childNodes[0].nodeValue + '</p>' +
                        '</div>' +
                        '<div class="pdf_action">' +
                        '<button id="d' + i.toString() + '">' +
                        '<img src="https://www.z4a.net/images/2023/05/10/2023-05-10-01.24.58.png" class="pdf_delete">' +
                        '<div style="display: none">' +
                        '<p id="e' + i.toString() + '" class="path_">' + xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue  + '</p>' +
                        '</div>' +
                        '<div style="display: none">' +
                        '<a id="x' + i.toString() + '" class="name_">'  + xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue + '</a>' +
                        '</div>' +
                        '</button>' +
                        '<button id="z' + i.toString() + '">' +
                        '<img src="https://www.z4a.net/images/2023/05/10/2023-05-10-01.24.17.png" class="pdf_copy">' +
                        '<div style="display: none">' +
                        '<p id="f' + i.toString() + '" class="path_">' + xmlDoc.getElementsByTagName("path")[i].childNodes[0].nodeValue  + '</p>' +
                        '</div>' +
                        '</button>' +
                        '</div>' +
                        '</div>' ;
                }
                htmlinner = htmlinner + '</div>';
                document.getElementById('test').innerHTML = htmlinner;
                for(i = 0; i < x; ++i) {
                    var pdf_id = 'c' + i.toString();
                    var button_id = 'd' + i.toString();
                    var button_id_copy = 'z' + i.toString();
                    document.getElementById(pdf_id).onclick = function () {
                        var path = this.innerHTML.match(/class="path_">(.*?)<\/p>/)[1];
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if(this.readyState == 4 && this.status == 200) {
                                path = path.slice(13);
                                window.sessionStorage.setItem("pdf_path",path);
                                location.href = '../index.html';
                            }
                        };
                        xhttp.open("POST","/server/transform.php",true);
                        var send_message = "&path=" + path;
                        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xhttp.send(send_message);
                    };
                    document.getElementById(button_id).onclick = function (){
                        var path = this.innerHTML.match(/class="path_">(.*?)<\/p>/)[1];
                        var name = this.innerHTML.match(/class="name_">(.*?)<\/a>/)[1];
                        var account = window.sessionStorage.getItem("account");
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if(this.readyState == 4 && this.status == 200) {
                                flush_pdf_table();
                            }
                        };
                        xhttp.open("POST","/server/delete.php",true);
                        var send_message = "account=" + account + "&path=" + path + "&name=" + name;
                        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xhttp.send(send_message);
                    };
                    document.getElementById(button_id_copy).onclick = function () {
                        var path = this.innerHTML.match(/class="path_">(.*?)<\/p>/)[1];
                        var account = window.sessionStorage.getItem("account");
                        var data = Date().substring(0,24);
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if(this.readyState == 4 && this.status == 200) {
                                flush_pdf_table();
                            }
                        };
                        xhttp.open("POST","/server/copy.php",true);
                        var send_message = "account=" + account + "&path=" + path + "&data=" + data;
                        xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xhttp.send(send_message);
                    };
                }
            }
        }

    };
    xhttp.open("POST","/server/flush_pdf_table.php",true);
    var send_message = "account=" + account_receive;
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);
}

function flush_card_table() {
    var account_receive = window.sessionStorage.getItem("account");
    var xhttp = new XMLHttpRequest();
    var n = 0;
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            if(xmlDoc.getElementsByTagName("word").length == 0){
                document.getElementById('study_card_show_table').remove();
                var htmlinner = '<div class="pdf_show_table" id="study_card_show_table">';
                htmlinner = htmlinner + '</div>';
                document.getElementById('test2').innerHTML = htmlinner;
            }
            else {
                document.getElementById('study_card_show_table').remove();
                var card_length = xmlDoc.getElementsByTagName("word").length;
                var htmlinner = '<div class="pdf_show_table" id="study_card_show_table">';
                for(var i = 0; i < card_length; ++i) {
                    n = 3 + 63 * i;
                    htmlinner +=
                        '<div class = "study_card_block" style = "top:' + n.toString() +'%">' +
                            '<div class="study_card_block_name">' +
                                '<img src="https://www.z4a.net/images/2023/05/11/2023-05-11-21.37.16.png" class="study_icon">' +
                                '<div class="study_card_block_name_div">' +
                                    '<p class="study_card_name" style="left: 0">' + xmlDoc.getElementsByTagName("word")[i].childNodes[0].nodeValue + '</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="study_card_block_content">' +
                                '<p class="study_card_block_content_fond">' + xmlDoc.getElementsByTagName("detail")[i].childNodes[0].nodeValue + '</p>' +
                            '</div>' +
                        '</div>' ;
                }
                htmlinner += '</div>';
                document.getElementById('test2').innerHTML = htmlinner;
            }
        }
    }
    xhttp.open("POST","/server/flush_card_table.php",true);
    var send_message = "account=" + account_receive;
    // console.log(send_message);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);
}

function showCard(str) {
    var account = window.sessionStorage.getItem("account");
    var xhttp = new XMLHttpRequest();
    var n = 0;
    var input = str;
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            if(str == '') flush_card_table();
            else{
                var xmlDoc = this.responseXML;
                console.log(xmlDoc);
                if(xmlDoc.getElementsByTagName("word").length == 0){
                    document.getElementById('study_card_show_table').remove();
                    var htmlinner = '<div class="pdf_show_table" id="study_card_show_table">';
                    htmlinner = htmlinner + '</div>';
                    document.getElementById('test2').innerHTML = htmlinner;
                }
                else {
                    document.getElementById('study_card_show_table').remove();
                    var card_length = xmlDoc.getElementsByTagName("word").length;
                    var htmlinner = '<div class="pdf_show_table" id="study_card_show_table">';
                    for(var i = 0; i < card_length; ++i) {
                        n = 3 + 63 * i;
                        htmlinner +=
                            '<div class = "study_card_block" style = "top:' + n.toString() +'%">' +
                            '<div class="study_card_block_name">' +
                            '<img src="https://www.z4a.net/images/2023/05/11/2023-05-11-21.37.16.png" class="study_icon">' +
                            '<div class="study_card_block_name_div">' +
                            '<p class="study_card_name" style="left: 0">' + xmlDoc.getElementsByTagName("word")[i].childNodes[0].nodeValue + '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="study_card_block_content">' +
                            '<p class="study_card_block_content_fond">' + xmlDoc.getElementsByTagName("detail")[i].childNodes[0].nodeValue + '</p>' +
                            '</div>' +
                            '</div>' ;
                    }
                    htmlinner += '</div>';
                    document.getElementById('test2').innerHTML = htmlinner;
                }
            }
        }
    }
    let send_message = "input=" + input + "&account=" + account;
    console.log(send_message);
    xhttp.open("POST","/server/search_card.php",true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhttp.send(send_message);
}