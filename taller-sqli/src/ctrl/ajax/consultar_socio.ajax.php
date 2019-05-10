<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/taller-sqli/config.php';
$sesion = Session::get_instance();

$id_socio = filter_input(INPUT_GET, 'id_socio', FILTER_SANITIZE_SPECIAL_CHARS);



if (!$sesion->is_active()){
    $sesion->redirect($WEB_PATH . 'index.php');
}


$error = false;
$objeto_error = array("id" => -1, "descripcion" => "");
$objeto_datos = [];


    if (($sesion->get_user()->can_access("consultar_socios"))){



        try {

            $objeto_datos['socio'] = GestorSociosBd::consultar_socio($id_socio);



        } catch (Exception $ex) {
            $error = true;
            $objeto_error = array("id" => 1, "descripcion" => "Error al consultar los datos: " . $ex->getMessage());
        }
    }
    else {
        $objeto_error['mensaje'] = "No tiene permisopara consultar los socios";
    }

    $respuesta = array(
        "estado" => ($error === true) ? "error" : "ok"
    );

    if ($error === false) {
        $respuesta["datos"] = $objeto_datos;
    } else {
        $respuesta["error"] = $objeto_error;
    }

echo json_encode($respuesta);




?>
