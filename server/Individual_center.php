<?php
#获取对应的表单数据
$account_receive = $_REQUEST['account'];
$name_receive = $_REQUEST['name'];
$path_receive = '/var/www/html/pdf/' . $account_receive . '/' . $name_receive;
$tag_receive = $_REQUEST['tag'];
$data_receive = $_REQUEST['data'];
$lang_receive = $_REQUEST['lang'];
#进行数据库服务器的连接
$dbServername = 'localhost';
$dbUsername = 'root';
$dbPassword = 'yifan0708';
$database = mysqli_connect($dbServername,$dbUsername,$dbPassword);
if (!$database) {
    $response_die = "'Could not connect: ' . mysql_error()";
    echo $response_die;
    die();
}
mysqli_query($database,"set names utf8");
#防止sql注入攻击
$account_receive_security = mysqli_real_escape_string($database,$account_receive);
$name_receive_security = mysqli_real_escape_string($database,$name_receive);
$path_receive_security = mysqli_real_escape_string($database,$path_receive);
$tag_receive_security = mysqli_real_escape_string($database,$tag_receive);
$data_receive_security = mysqli_real_escape_string($database,$data_receive);
$lang_receive_security = mysqli_real_escape_string($database,$lang_receive);
#进行用户信息表的建立
mysqli_select_db( $database,"user_information");
$sql_table = "CREATE TABLE pdf_user_information
(
account varchar(100) NOT NULL ,
path varchar(255) NOT NULL ,
name varchar(255),
tag varchar(100),
data varchar(100),
lang varchar(100),
PRIMARY KEY (account,path,name)
)
";
mysqli_query($database,$sql_table);
#进行用户数据的输入
if(mysqli_query($database,"INSERT INTO pdf_user_information (account,path,name,tag,data,lang)
VALUES ('$account_receive_security','$path_receive_security','$name_receive_security','$tag_receive_security','$data_receive_security','$lang_receive_security')")){
    $response = "上传成功!" ;
}
else {
    $response = mysqli_error($database);
}
echo $response ;
mysqli_close($database);
?>
