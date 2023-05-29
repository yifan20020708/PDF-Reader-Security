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
mysqli_select_db($database,"user_information" );
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
$Nsc_number = 0;
$Ete_number = 0;
$Mssc_number = 0;
$Hsc_number = 0;
$Ssc_number = 0;
$Syn_number = 0;

$Nsc_number_agv = 0;
$Ete_number_agv = 0;
$Mssc_number_agv = 0;
$Hsc_number_agv = 0;
$Ssc_number_agv = 0;
$Syn_number_agv = 0;


while ($row = mysqli_fetch_array($result)){
    if($row['tag'] == 'N-Sc') $Nsc_number++;
    if($row['tag'] == 'E-Te') $Ete_number++;
    if($row['tag'] == 'MS-Sc') $Mssc_number++;
    if($row['tag'] == 'H-Sc') $Hsc_number++;
    if($row['tag'] == 'S-Sc') $Ssc_number++;
    if($row['tag'] == 'Syn') $Syn_number++;
}

while ($row1 = mysqli_fetch_array($result_agv)){
    if($row1['tag'] == 'N-Sc') $Nsc_number_agv++;
    if($row1['tag'] == 'E-Te') $Ete_number_agv++;
    if($row1['tag'] == 'MS-Sc') $Mssc_number_agv++;
    if($row1['tag'] == 'H-Sc') $Hsc_number_agv++;
    if($row1['tag'] == 'S-Sc') $Ssc_number_agv++;
    if($row1['tag'] == 'Syn') $Syn_number_agv++;
}
$Nsc_number_agv = $Nsc_number_agv / $count_name;
$Ete_number_agv = $Ete_number_agv / $count_name;
$Mssc_number_agv = $Mssc_number_agv / $count_name;
$Hsc_number_agv = $Hsc_number_agv / $count_name;
$Ssc_number_agv = $Ssc_number_agv / $count_name;
$Syn_number_agv = $Syn_number_agv / $count_name;

echo "<nsc>" . $Nsc_number ."</nsc>";
echo "<ete>" . $Ete_number ."</ete>";
echo "<mssc>" . $Mssc_number ."</mssc>";
echo "<hsc>" . $Hsc_number ."</hsc>";
echo "<ssc>" . $Ssc_number ."</ssc>";
echo "<syn>" . $Syn_number ."</syn>";

echo "<nsc1>" . $Nsc_number_agv ."</nsc1>";
echo "<ete1>" . $Ete_number_agv ."</ete1>";
echo "<mssc1>" . $Mssc_number_agv ."</mssc1>";
echo "<hsc1>" . $Hsc_number_agv ."</hsc1>";
echo "<ssc1>" . $Ssc_number_agv ."</ssc1>";
echo "<syn1>" . $Syn_number_agv ."</syn1>";

echo "</result>";

?>
