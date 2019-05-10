<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';

class GestorArchivo {

	//Tipos de archivos permitidos
	private static $allowed_types = array(
		'image/png',
		'image/jpeg',
		'image/jpeg',
		'image/gif');

	/**
	* Valida si los archivos pasados por parámetro están correctos
	* Se valida:
	* si fueron subido via HTTP POST
	* si es file
	* el mime type
	* la extensión [Not implemented]
	* @param array asociativo con los archivos ($_FILES)

	* Si se encuentra alguna restricción que no se cumple para cualquiera
	* de los archivos que se analizan, se lanza una excepción
	*/
	public static function validarArchivo($archivo){
			if ($archivo['error'] !== UPLOAD_ERR_OK && !is_uploaded_file($archivo['tmp_name'])){
				throw new Exception("Error en la subida de los archivo");
			}
			$tipo_archivo = mime_content_type($archivo['tmp_name']);
			//$extension_archivo = pathinfo($archivos['tmp_name'])['extension'];
			if (!is_file($archivo['tmp_name']) || !GestorArchivo::validarTipoArchivo($tipo_archivo)){
					throw new InvalidArgumentException("Tipo de Archivo no soportado");
			}
	}


	/**
	* Validar el tipo del archivo (Content type)
 	* Se compara el tipo de contenido con los tipos válidos
	* @param $type => Content type del archivo
  * @return => true si es un tipo válido, false si no lo es
	*/
	private static function validarTipoArchivo($type){
		global $allowed_types;
		foreach (GestorArchivo::$allowed_types as $tipo) {
			if ($tipo == $type){
				return true;
			}
		}
		return false;
	}

	/**
	* Validar el tipo del archivo por la extension
  * Se compara el tipo de contenido con los tipos válidos
  * @param $type => Content type del archivo
	* @return => true si es un tipo válido, false si no lo es
	*/
	private static function validarExtensionArchivo($archivo){
		throw new Exception("Not implemented");
	}


	/**
	* Borra del directorio de archivos todos aquellos arhivos que no pertenecen a
	* ninguna entidad como por ejemplo una foto que pertenezca a ningún artículo
	*/
	public static function borrar_archivos_viejos(){
		$archivos_a_borrar = GestorArchivoBd::obtener_archivos_deprecados();
	}

}

?>
