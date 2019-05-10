<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/taller-sqli/config.php';
$sesion = Session::get_instance();


if (!$sesion->is_active()){
    $sesion->redirect($WEB_PATH . 'index.php');
}


if ($sesion->is_active() && !$sesion->get_user()->can_access("consultar_cursos")){
    $sesion->redirect($WEB_PATH . 'src/ctrl/forbidden.ctrl.php');
}


$filtros = array();
if ($sesion->get_user()->es_alumno()){
    $filtros['alumno'] = $sesion->get_user()->get_alumno();
}

$cursos = GestorAcademicoBd::consultar_cursos($filtros);

require_once $SERVER_PATH . 'tmpl/consultar_cursos.tmpl.php';

