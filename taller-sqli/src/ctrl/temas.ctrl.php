<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';
  $sesion = Session::get_instance();

if (!$sesion->is_active()){
  $sesion->redirect($WEB_PATH . 'index.php');
}

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
  $user_tema = $sesion->get_user()->get_id();
  require_once $SERVER_PATH . 'tmpl/temas.tmpl.php';
}
