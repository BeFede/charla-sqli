<?php


class GestorPermisosBd{

public static function consultar_permisos($rol){
$sist_gestion_db = PoolConnectionDb::get_instance()->get_connection_db('taller_sqli');
 $query = <<<SQL
      SELECT r.nombre as 'recurso', tp.alias as 'tipo'
      FROM recursos r
      INNER JOIN permisos p
      ON p.id_recurso = r.id
      INNER JOIN tipos_permisos tp
      ON tp.id = p.id_tipo_permiso
      WHERE p.id_rol = (SELECT id FROM roles WHERE nombre={rol});
SQL;

    $parametro = array("rol" => [$rol, 's']);
    return $sist_gestion_db->query($query, $parametro);
}



}

?>
