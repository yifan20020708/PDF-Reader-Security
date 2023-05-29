<?php
$account_receive = $_REQUEST['account'];
$name_receive = $_REQUEST['name'];
$path = '/var/www/html/pdf/' . $account_receive . '/' . $name_receive;
if(is_file($path)) echo "success";
else echo "fail";
?>
