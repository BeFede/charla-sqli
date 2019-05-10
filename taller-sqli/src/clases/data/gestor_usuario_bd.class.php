<?php

class GestorUsuarioBd
{


    public static function validar_usuario_inseguro($user, $pass)
    {
        /**/

        $query = "SELECT id, id_rol FROM usuarios WHERE nombre_usuario = '" . $user . "' AND password = '" . $pass . "'";


        $conexion = PoolConnectionDb::get_instance()->get_connection_db();
        $resultados = $conexion->query_insecure($query);



        return count($resultados) > 0;
    }



    public static function get_rol($usuario)
    {
        $sist_gestion_db = PoolConnectionDb::get_instance()->get_connection_db('taller_sqli');
        $query = <<<SQL
         SELECT r.nombre
         FROM usuarios u
         INNER JOIN roles r
         ON r.id = u.id_rol
         WHERE u.nombre_usuario = {username}
SQL;
        $parametros = ["username" => [$usuario, 's']];
        return $sist_gestion_db->query($query, $parametros);
    }

    public static function get_id($usuario)
    {
        $sist_gestion_db = PoolConnectionDb::get_instance()->get_connection_db('taller_sqli');
        $query = <<<SQL
         SELECT u.id as 'id'
         FROM usuarios u
         WHERE u.nombre_usuario = {username}
SQL;
        $parametros = ["username" => [$usuario, 's']];
        return $sist_gestion_db->query($query, $parametros)[0]['id'];
    }



    public static function consultar_alumno_con_usuario($id_usuario)
    {
        $sist_gestion_db = PoolConnectionDb::get_instance()->get_connection_db('taller_sqli');
        $query = <<<SQL
         SELECT a.legajo
         FROM alumnos a
         INNER JOIN usuarios u
         ON a.id_usuario = u.id
         WHERE u.id = {usuario}
SQL;
        $parametros = ["usuario" => [$id_usuario, 'i']];
        $res = $sist_gestion_db->query($query, $parametros);


        return (count($res) > 0) ? $res[0]['legajo'] : null;
    }




}




?>
