<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/taller-sqli/config.php';
$sesion = Session::get_instance();


if (!$sesion->is_active()){
    $sesion->redirect($WEB_PATH . 'index.php');
}


if ($sesion->is_active() && !$sesion->get_user()->can_access("consultar_cursos")){
    $sesion->redirect($WEB_PATH . 'src/ctrl/forbidden.ctrl.php');
}

$id_curso = $_GET['id_curso'];

$filtros = array(
    "id_curso" => $id_curso
);

if ($sesion->get_user()->es_alumno()){
    $filtros['alumno'] = $sesion->get_user()->get_alumno();
}

$curso_consultado = GestorAcademicoBd::consultar_curso($filtros);

if (count($curso_consultado) > 0 ){
    $curso = $curso_consultado;
}
else {
    $curso = null;
}



require_once $SERVER_PATH . 'tmpl/consultar_curso.tmpl.php';

