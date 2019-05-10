<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/taller-sqli/config.php';
$sesion = Session::get_instance();

$sesion->add_error_message("ERROR. No posee permisos para realizar esta operación");
$sesion->redirect( $WEB_PATH . 'tmpl/marco/message.tmpl.php');

?>
