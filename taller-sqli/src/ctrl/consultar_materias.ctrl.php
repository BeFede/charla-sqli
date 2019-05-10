<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/taller-sqli/config.php';
$sesion = Session::get_instance();


if (!$sesion->is_active()){
    $sesion->redirect($WEB_PATH . 'index.php');
}


if ($sesion->is_active() && !$sesion->get_user()->can_access("consultar_materias")){
    $sesion->redirect($WEB_PATH . 'src/ctrl/forbidden.ctrl.php');
}

$materias = GestorAcademicoBd::consultar_materias();

require_once $SERVER_PATH . 'tmpl/consultar_materias.tmpl.php';

