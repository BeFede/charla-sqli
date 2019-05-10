<?php

class GestorAcademicoBd
{


    public static function consultar_materias()
    {
        $query = "SELECT id, nombre FROM materias";
        $conexion = PoolConnectionDb::get_instance()->get_connection_db();
        $resultados = $conexion->query_insecure($query);
        return $resultados;
    }


    public static function consultar_cursos($filtros = null)
    {
        $query = <<<SQL
            SELECT DISTINCT  c.id, c.nombre 
            FROM cursos c
            LEFT JOIN alumnos_x_cursos ac
            ON c.id = ac.id_curso
            WHERE 1 = 1
SQL;
        $parametros = array();

        if (!empty($filtros) && !empty($filtros['alumno'])){
            $query .= ' AND ac.legajo_alumno = {alumno}';
            $parametros['alumno'] = [$filtros['alumno'], 'i'];
        }
        $conexion = PoolConnectionDb::get_instance()->get_connection_db();
        $resultados = $conexion->query($query, $parametros);

        return $resultados;
    }



    public static function consultar_curso($filtros)
    {

        if (empty($filtros['id_curso'])){
            return;
        }



        $query = "
            SELECT DISTINCT  c.id as 'id_curso', c.nombre as 'nombre_curso', m.nombre as 'materia', 
               p.legajo as 'legajo_profesor' , p.nombre as 'nombre_profesor' 
            FROM cursos c
            INNER JOIN materias_x_profesores_x_cursos mpc
            ON mpc.id_curso = c.id
            INNER JOIN profesores p 
            ON p.legajo = mpc.legajo_profesor
            INNER JOIN materias m
            ON m.id = mpc.id_materia
            LEFT JOIN alumnos_x_cursos ac
            ON c.id = ac.id_curso
            WHERE c.id = " . $filtros['id_curso'] ;

        $parametros = array();


        if (!empty($filtros) && !empty($filtros['alumno'])){
            $query .= ' AND ac.legajo_alumno = ' . $filtros['alumno'];
        }
        $conexion = PoolConnectionDb::get_instance()->get_connection_db();
        $resultados = $conexion->query_insecure($query);

        return $resultados;
    }

}




?>
