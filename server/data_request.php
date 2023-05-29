<?php
header('Content-Type: text/xml; charset=utf-8');
header("Cache-Control: no-cache, must-revalidate");
#获取对应的表单数据
$account_receive = $_REQUEST['account'];
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

$query_number = 'SELECT COUNT(*) FROM register_information_secure ';
$result_number = mysqli_query($database,$query_number);
$count_name = mysqli_fetch_array($result_number)['COUNT(*)'];

$query_agv = 'SELECT * FROM pdf_user_information' ;
$result_agv = mysqli_query($database,$query_agv);

echo '<?xml version="1.0" encoding="ISO-8859-1"?>
<result>';
$Jan_number = 0;
$Feb_number = 0;
$Mar_number = 0;
$Apr_number = 0;
$May_number = 0;
$Jun_number = 0;
$Jul_number = 0;
$Aug_number = 0;
$Sep_number = 0;
$Oct_number = 0;
$Nov_number = 0;
$Dec_number = 0;

$Jan_number_agv = 0;
$Feb_number_agv = 0;
$Mar_number_agv = 0;
$Apr_number_agv = 0;
$May_number_agv = 0;
$Jun_number_agv = 0;
$Jul_number_agv = 0;
$Aug_number_agv = 0;
$Sep_number_agv = 0;
$Oct_number_agv = 0;
$Nov_number_agv = 0;
$Dec_number_agv = 0;

while ($row = mysqli_fetch_array($result)){
    if(substr($row['data'],4,3) == 'Jan')  $Jan_number++;
    if(substr($row['data'],4,3) == 'Feb')  $Feb_number++;
    if(substr($row['data'],4,3) == 'Mar')  $Mar_number++;
    if(substr($row['data'],4,3) == 'Apr')  $Apr_number++;
    if(substr($row['data'],4,3) == 'May')  $May_number++;
    if(substr($row['data'],4,3) == 'Jun')  $Jun_number++;
    if(substr($row['data'],4,3) == 'Jul')  $Jul_number++;
    if(substr($row['data'],4,3) == 'Aug')  $Aug_number++;
    if(substr($row['data'],4,3) == 'Sep')  $Sep_number++;
    if(substr($row['data'],4,3) == 'Oct')  $Oct_number++;
    if(substr($row['data'],4,3) == 'Nov')  $Nov_number++;
    if(substr($row['data'],4,3) == 'Dec')  $Dec_number++;
}

while ($row1 = mysqli_fetch_array($result_agv)){
    if(substr($row1['data'],4,3) == 'Jan')  $Jan_number_agv++;
    if(substr($row1['data'],4,3) == 'Feb')  $Feb_number_agv++;
    if(substr($row1['data'],4,3) == 'Mar')  $Mar_number_agv++;
    if(substr($row1['data'],4,3) == 'Apr')  $Apr_number_agv++;
    if(substr($row1['data'],4,3) == 'May')  $May_number_agv++;
    if(substr($row1['data'],4,3) == 'Jun')  $Jun_number_agv++;
    if(substr($row1['data'],4,3) == 'Jul')  $Jul_number_agv++;
    if(substr($row1['data'],4,3) == 'Aug')  $Aug_number_agv++;
    if(substr($row1['data'],4,3) == 'Sep')  $Sep_number_agv++;
    if(substr($row1['data'],4,3) == 'Oct')  $Oct_number_agv++;
    if(substr($row1['data'],4,3) == 'Nov')  $Nov_number_agv++;
    if(substr($row1['data'],4,3) == 'Dec')  $Dec_number_agv++;
}
$Jan_number_agv = $Jan_number_agv / $count_name;
$Feb_number_agv = $Feb_number_agv / $count_name;
$Mar_number_agv = $Mar_number_agv / $count_name;
$Apr_number_agv = $Apr_number_agv / $count_name;
$May_number_agv = $May_number_agv / $count_name;
$Jun_number_agv = $Jun_number_agv / $count_name;
$Jul_number_agv = $Jul_number_agv / $count_name;
$Aug_number_agv = $Aug_number_agv / $count_name;
$Sep_number_agv = $Sep_number_agv / $count_name;
$Oct_number_agv = $Oct_number_agv / $count_name;
$Nov_number_agv = $Nov_number_agv / $count_name;
$Dec_number_agv = $Dec_number_agv / $count_name;
echo "<Jan>" . $Jan_number ."</Jan>";
echo "<Feb>" . $Feb_number ."</Feb>";
echo "<Mar>" . $Mar_number ."</Mar>";
echo "<Apr>" . $Apr_number ."</Apr>";
echo "<May>" . $May_number ."</May>";
echo "<Jun>" . $Jun_number ."</Jun>";
echo "<Jul>" . $Jul_number ."</Jul>";
echo "<Aug>" . $Aug_number ."</Aug>";
echo "<Sep>" . $Sep_number ."</Sep>";
echo "<Oct>" . $Oct_number ."</Oct>";
echo "<Nov>" . $Nov_number ."</Nov>";
echo "<Dec>" . $Dec_number ."</Dec>";

echo "<Jan1>" . $Jan_number_agv ."</Jan1>";
echo "<Feb1>" . $Feb_number_agv ."</Feb1>";
echo "<Mar1>" . $Mar_number_agv ."</Mar1>";
echo "<Apr1>" . $Apr_number_agv ."</Apr1>";
echo "<May1>" . $May_number_agv ."</May1>";
echo "<Jun1>" . $Jun_number_agv ."</Jun1>";
echo "<Jul1>" . $Jul_number_agv ."</Jul1>";
echo "<Aug1>" . $Aug_number_agv ."</Aug1>";
echo "<Sep1>" . $Sep_number_agv ."</Sep1>";
echo "<Oct1>" . $Oct_number_agv ."</Oct1>";
echo "<Nov1>" . $Nov_number_agv ."</Nov1>";
echo "<Dec1>" . $Dec_number_agv ."</Dec1>";
echo "</result>";

?>
