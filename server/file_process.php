<?php
$account_receive = $_REQUEST['account'];
$output_dir = '/var/www/html/pdf/' . $account_receive . '/';
$fileName = $_FILES["file"]['name'];
$file = $_FILES['file'];
if(move_uploaded_file($file['tmp_name'],$output_dir.$fileName)){
    echo "Success!";
}
else echo "fail";
?>
