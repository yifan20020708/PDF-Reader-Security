<?php
$account_receive = $_REQUEST['account'];
//防止SQL注入攻击和XSS存储攻击
$account_receive_security = htmlspecialchars($account_receive,ENT_QUOTES,'UTF-8');
$path = '/var/www/html/pdf/' . $account_receive_security;
//改变相应的权限，使其可以写入pdf文件
chmod($path,0777);
$output_dir = '/var/www/html/pdf/' . $account_receive_security . '/';
$fileName = $_FILES["file"]['name'];
$file = $_FILES['file'];
if(move_uploaded_file($file['tmp_name'],$output_dir.$fileName)){
    chmod($output_dir.$fileName,0000);
    echo "Success!";
}
else echo "fail";
//改变回相应的权限，使其不可写入文件
chmod($path,0755);
?>
