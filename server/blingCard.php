<?php
header('charset=utf-8');
header('Access-Control-Allow-Origin:*');

// 获取表单数据
$username_receive = $_REQUEST['username'];
$pdf_receive = $_REQUEST['pdf'];
$word_receive = $_REQUEST['word'];
$detail_receive = $_REQUEST['detail'];
// 进行数据库服务器的连接
$servername = "localhost";
$username = "pdfreader";
$password = "yifan0708";
// 创建连接
$conn = new mysqli($servername, $username, $password);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}


mysqli_query($conn, "set names utf8");
// 防止SQL注入攻击和XSS存储攻击
$username_receive_security = htmlspecialchars(mysqli_real_escape_string($conn,$username_receive),ENT_QUOTES,'UTF-8');
$pdf_receive_security = htmlspecialchars(mysqli_real_escape_string($conn,$pdf_receive),ENT_QUOTES,'UTF-8');
$word_receive_security = htmlspecialchars(mysqli_real_escape_string($conn,$word_receive),ENT_QUOTES,'UTF-8');
$detail_receive_security = htmlspecialchars(mysqli_real_escape_string($conn,$detail_receive),ENT_QUOTES,'UTF-8');


// 创建数据库
$sql = "CREATE DATABASE IF NOT EXISTS ". $username_receive_security;
mysqli_query($conn, $sql);

#进行用户信息表的建立
mysqli_select_db($conn, $username_receive_security);
$sql_table = "CREATE TABLE IF NOT EXISTS $pdf_receive_security
(
word varchar(100),
PRIMARY KEY (word),
detail varchar(2048)
)
";
mysqli_query($conn, $sql_table);
#闪卡数据的输入
if(mysqli_query($conn,"INSERT INTO $pdf_receive (word,detail)
VALUES ('$word_receive_security','$detail_receive_security')")){
    $response = "Write DB successfully!" ;
}
else {
    $response = "Fail to register : " . mysqli_error($conn) ;
}
echo $response;
$conn->close();
?>
