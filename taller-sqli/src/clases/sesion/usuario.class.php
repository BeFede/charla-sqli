<?php

class Usuario extends SessionUser {

    private $id = 1;
    private $name = "";
    private $rol;

    public function __construct($id, $name, $rol) {
        $this->id = $id;
        $this->name = $name;
        $this->rol = $rol;
    }

    public function get_id() {
        return $this->id;
    }

    public function get_name() {
        return $this->name;
    }

    public function get_rol(){
      return $this->rol;
    }

    public function update_user() {
        $this->name = "T";
        return $this;
    }

    public function can_access($resource, $action = 'a') {
      return $this->rol->can_access($resource, $action);
    }

    public function get_alumno() {
        if ($this->rol->es_alumno()){
          return GestorUsuarioBd::consultar_alumno_con_usuario($this->id);
        }
        else return -1;
    }


    public function es_alumno(){
        return $this->rol->es_alumno();
    }


}

?>