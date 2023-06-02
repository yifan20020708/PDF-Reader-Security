<?php
#获取相应的表单数据，在对应的数据库中进行查询
$account_receive = $_REQUEST['account'];
$password_receive = $_REQUEST['password'];
#进行对应数据库的连接
$dbServername = 'localhost';
$dbUsername = "pdfreader";
$dbPassword = 'yifan0708';
$database = mysqli_connect($dbServername,$dbUsername,$dbPassword);
if (!$database) {
    $response_die = "'Could not connect: ' . mysql_error()";
    echo $response_die;
    echo "<br>";
    die();
}
mysqli_query($database,"set names utf8");
#防止sql注入攻击和XSS存储攻击
$account_receive_security = htmlspecialchars(mysqli_real_escape_string($database,$account_receive),ENT_QUOTES,'UTF-8');
#进行对应数据库的选择
mysqli_select_db($database,"user_information");
#进行对应账户的查询
$query = 'SELECT Password_hash FROM register_information_secure WHERE Account=\'' . $account_receive_security . '\'';
$password_correct = mysqli_query($database,$query);
echo 'Login result:';
while ($row = mysqli_fetch_array($password_correct)){
    $password_hash = $row['Password_hash'];
    if(mysqli_real_escape_string($database,md5($password_receive)) == $password_hash){
        $path_pdf = '/var/www/html/pdf' ;
        //写入文件夹时改变相应的权限，可以写入
        chmod($path_pdf,0777);
        $path = '/var/www/html/pdf/' . $account_receive ;
        //此刻并没有提供相应可写的权限，需要写入文件时再进行权限的改变
        mkdir($path,0755,true);
        //写入文件夹之后变回原本的权限，禁止写入
        chmod($path_pdf,0755);
        echo "Successfully login!";
    }
    else echo "Fail to login,your password is wrong!";
}
?>
