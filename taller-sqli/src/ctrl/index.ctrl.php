<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/taller-sqli/config.php';
$sesion = Session::get_instance();


if ($sesion->is_active()){
  require_once $SERVER_PATH . 'tmpl/index.tmpl.php';
}
else {
  $sesion->redirect($WEB_PATH . 'src/ctrl/login.ctrl.php');
  
}
