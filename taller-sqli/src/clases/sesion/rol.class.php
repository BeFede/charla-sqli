<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';

  class Rol{

    private $name = "";
    private $permisos = array();

    public function __construct($name){
      $this->name = $name;
    }

    public function get_name(){
      return $this->name;
    }

    private function cargar_permisos(){
      if (empty($this->permisos)){
        $this->permisos = $this->get_permisos();
      }
    }

    public function es_alumno(){
        return $this->name == 'alumno';
    }



    public function es_administrador(){
        return $this->name == 'administrador';
    }

    /**
    * Busca en el array de permisos si se encuentra el recurso y el permiso asociado
    */
    public function can_access($resource, $action = 'a'){
      $this->cargar_permisos();
      //print_r(($this->permisos[0])->get_recurso());

      foreach ($this->permisos as $permiso) {
        if ($permiso->get_recurso() == $resource
            && $permiso->get_accion() == $action){
              return true;
        }
      }
      return false;
    }

    private function add_permiso($permiso){
      $this->permisos[] = $permiso;
    }

    /**
    * Obtiene los permisos que tiene este rol sobre el sistema
    * Los permisos se leen de la bd.
    * @return array de permisos del actual rol
    */
    private function get_permisos(){
      require_once $_SERVER['DOCUMENT_ROOT']. '/taller-sqli/src/clases/data/gestor_permiso_bd.class.php';
      $permisos_consultados = GestorPermisosBd::consultar_permisos($this->name);
      $permisos = array();
      for ($i=0; $i < count($permisos_consultados); $i++) {

        $permiso = new Permiso($permisos_consultados[$i]['recurso'], $permisos_consultados[$i]['tipo']);
        $permisos[] = $permiso;
      }

      return $permisos;
    }


  }

 ?>
