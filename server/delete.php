<?php
#获取对应的表单数据
$account_receive = $_REQUEST['account'];
$path_receive = $_REQUEST['path'];
$name_receive = $_REQUEST['name'];
#进行数据库服务器的连接
$dbServername = 'localhost';
$dbUsername = "pdfreader";
$dbPassword = 'yifan0708';
$database = mysqli_connect($dbServername,$dbUsername,$dbPassword);
if (!$database) {
    $response_die = "'Could not connect: ' . mysql_error()";
    echo $response_die;
    die();
}
mysqli_query($database,"set names utf8");
#进行sql注入的预防和XSS存储攻击
$account_receive_security = htmlspecialchars(mysqli_real_escape_string($database,$account_receive),ENT_QUOTES,'UTF-8');
$name_receive_security = htmlspecialchars(mysqli_real_escape_string($database,$name_receive),ENT_QUOTES,'UTF-8');
$path_receive_security = htmlspecialchars(mysqli_real_escape_string($database,$path_receive),ENT_QUOTES,'UTF-8');
#进行对应数据库的选择
mysqli_select_db($database,"user_information" );
#进行相应文件的删除
unlink($path_receive);
$query = 'DELETE FROM pdf_user_information WHERE Account=\'' . $account_receive_security . '\'' .'and path=\'' . $path_receive_security . '\'' .'and name=\'' . $name_receive_security . '\'' ;
mysqli_query($database,$query);
?>
