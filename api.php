<?php
  $page =$_GET['page'];
  $array = array('1','2');
  if($page>='2'){
    $array = array();
  }
  echo json_encode($array);
?>
