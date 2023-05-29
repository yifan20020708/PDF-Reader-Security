<?php
$path = $_REQUEST['path'];
unlink('/var/www/html/2304.pdf');
copy($path,'/var/www/html/2304.pdf');
?>
