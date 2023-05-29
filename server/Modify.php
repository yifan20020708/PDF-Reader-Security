<?php
$password_receive = $_REQUEST['password'];
$account_receive = $_REQUEST['account'];
#进行对应数据库的连接
$dbServername = 'localhost';
$dbUsername = 'root';
$dbPassword = 'yifan0708';
$database = mysqli_connect($dbServername,$dbUsername,$dbPassword);
if (!$database) {
    $response_die = "'Could not connect: ' . mysql_error()";
    echo $response_die;
    echo "<br>";
    die();
}
mysqli_query($database,"set names utf8");
#防止sql注入攻击
$account_receive_security = mysqli_real_escape_string($database,$account_receive);
#进行对应数据库的选择
mysqli_select_db($database,"user_information");
$password_hash = md5($password_receive);
$password_security = mysqli_real_escape_string($database,$password_hash);
$updata = 'UPDATE register_information_secure SET Password_hash = \'' . $password_security . '\'WHERE Account =\'' . $account_receive_security . '\'';
mysqli_query($database,$updata);
echo mysqli_error($database);
?>
