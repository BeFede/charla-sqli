<?php

class Permiso{

  CONST ACCESS = 'a';
  CONST READ = 'r';
  CONST WRITE = 'w';


  public $recurso = "";
  public $accion = "";

  public function __construct($recurso, $accion){
      $this->recurso = $recurso;
      $this->accion = $accion;
  }

  public function get_recurso(){
    return $this->recurso;
  }

  public function get_accion(){
    return $this->accion;
  }

}

 ?>
