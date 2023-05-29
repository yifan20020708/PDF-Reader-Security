<?php
header('Content-Type: text/xml; charset=utf-8');
header("Cache-Control: no-cache, must-revalidate");
#获取对应的表单数据
$account_receive = $_REQUEST['account'];
$input_receive = $_REQUEST['input'];
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
#进行对应数据库的选择
mysqli_select_db($database,"user_information");
#进行对应账户的查询
$query = 'SELECT * FROM pdf_user_information WHERE Account=\'' . $account_receive_security . '\'';
$result = mysqli_query($database,$query);
$card_array = array();
$number = 0;
while($row = mysqli_fetch_array($result)) {
   $card_array[$number++] =str_replace('.pdf', '',$row['name']);
}
mysqli_select_db($database,$account_receive);
echo '<?xml version="1.0" encoding="ISO-8859-1"?>
<result>';
$i = 0;
while($i < $number) {
    $query_card = 'SELECT * FROM ' . $card_array[$i] ;
    $result_card = mysqli_query($database,$query_card);
    while($row_card = mysqli_fetch_array($result_card)){
        $name_process = '~@#$%&*' . $row_card['word'];
        if(strpos($name_process, $input_receive)) {
            echo "<word>" . $row_card['word'] ."</word>";
            echo "<detail>" . $row_card['detail'] ."</detail>";
        }
    }
    $i = $i + 1;
}
echo "</result>";
?>