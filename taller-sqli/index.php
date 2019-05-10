<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/taller-sqli/config.php';

$sesion = Session::get_instance();


if (!$sesion->is_active()){
  $sesion->redirect($WEB_PATH . 'src/ctrl/login.ctrl.php');
}
else {
  $sesion->redirect($WEB_PATH .'src/ctrl/index.ctrl.php');
}

?>
