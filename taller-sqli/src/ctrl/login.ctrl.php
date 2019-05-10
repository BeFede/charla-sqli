<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';
$sesion = Session::get_instance();

if ($_SERVER['REQUEST_METHOD'] == 'GET'){

  if ($sesion->is_active()){
		$sesion->redirect($WEB_PATH . 'index.php');
	}

  require_once $SERVER_PATH . 'tmpl/login.tmpl.php';

}

else {

	if ($sesion->is_active()){
		$sesion->redirect($WEB_PATH . 'index.php');
	}

	$usuario = filter_input(INPUT_POST, 'username');
	$pass = filter_input(INPUT_POST, 'password');

  if (GestorUsuarioBd::validar_usuario_inseguro($usuario, $pass)){
		$_SESSION['login-error'] = false;
		$rol = GestorUsuarioBd::get_rol($usuario)[0]['nombre'];
    	$id_usuario = GestorUsuarioBd::get_id($usuario);
		$user = new Usuario($id_usuario, $usuario, new Rol($rol));
		$sesion->log_in($user);
		$_SESSION['rol'] = $rol;


		$sesion->redirect($WEB_PATH . 'index.php');
	}
	else {
		$_SESSION['login-error'] = true;
		require_once $SERVER_PATH . 'tmpl/login.tmpl.php';
	}

}

?>
