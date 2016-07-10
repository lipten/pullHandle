<?php
  $page =$_GET['page'];
  $array = array('1','2');
  if($page>='4'){
    $array = array();
  }
  echo json_encode($array);
?>
