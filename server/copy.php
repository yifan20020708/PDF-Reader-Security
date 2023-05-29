<?php
#获取对应的表单数据
$account_receive = $_REQUEST['account'];
$path_receive = $_REQUEST['path'];
$data_receive = $_REQUEST['data'];
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
#抵抗mysql注入攻击
$account_receive_security = mysqli_real_escape_string($database,$account_receive);
$data_receive_security = mysqli_real_escape_string($database,$data_receive);
$path_receive_security = mysqli_real_escape_string($database,$path_receive);
#进行对应数据库的选择
mysqli_select_db($database,"user_information" );
$query = 'SELECT * FROM pdf_user_information WHERE Account=\'' . $account_receive_security . '\'' .'and path=\'' . $path_receive_security . '\'';
$result = mysqli_query($database,$query);
$row = mysqli_fetch_array($result);
$name_receive = '(C)' . $row['name'];
$tag_receive = $row['tag'];
$path_receive_process = str_replace($row['name'],$name_receive,$path_receive_security) ;
copy($path_receive,$path_receive_process);

#进行用户数据的输入
if(mysqli_query($database,"INSERT INTO pdf_user_information (account,path,name,tag,data)
VALUES ('$account_receive_security','$path_receive_process','$name_receive','$tag_receive','$data_receive_security')")){
    $response = "Load file successfully!" ;
}
else {
    $response = "Fail to Load : " . mysqli_error($database) ;
}
echo $response ;

mysqli_close($database);
?>
