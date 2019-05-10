<?php
  require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';
  $sesion = Session::get_instance();

  $sesion->log_out();
  $sesion->redirect($WEB_PATH . 'index.php');
?>
