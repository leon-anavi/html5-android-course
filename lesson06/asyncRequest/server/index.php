<?php
$name = (isset($_REQUEST['name'])) ? $_REQUEST['name'] : '';
$age = (isset($_REQUEST['age'])) ? $_REQUEST['age'] : 0;
$data = array('name' => $name, 'age' => $age);
echo json_encode($data);
?>
