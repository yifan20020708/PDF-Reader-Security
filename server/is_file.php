<?php
$account_receive = $_REQUEST['account'];
$name_receive = $_REQUEST['name'];
$account_receive_security = htmlspecialchars($account_receive,ENT_QUOTES,'UTF-8');
$name_receive_security = htmlspecialchars($name_receive,ENT_QUOTES,'UTF-8');
$path = '/var/www/html/pdf/' . $account_receive_security . '/' . $name_receive_security;
if(is_file($path)) echo "success";
else echo "fail";
?>
