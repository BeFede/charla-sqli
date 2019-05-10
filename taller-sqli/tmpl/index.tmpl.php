<!DOCTYPE html>

<html>

<head>
    <?php
    require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';
    require_once 'resources.tmpl.php';
    $sesion = Session::get_instance();
    ?>



</head>

<body>
<div class="container">

    <div  style="padding-top: 5vh;">

        <div>
            <h1>Bienvenido <?php echo $sesion->get_user_name()?></h1>
            <h3>Rol: <?php echo $_SESSION['rol']?></h3>
        </div>

        <div class="row">
            <br>

            <?php if ($sesion->get_user()->can_access('consultar_materias')){ ?>
                <div class="col-xs-3">
                    <a class="btn btn-default btn-lg" href="<?php echo $WEB_PATH?>src/ctrl/consultar_materias.ctrl.php">Listar materias</a>
                </div>
            <?php }?>


            <?php if ($sesion->get_user()->can_access('consultar_cursos')){ ?>
                <div class="col-xs-3">
                    <a class="btn btn-default btn-lg" href="<?php echo $WEB_PATH?>src/ctrl/consultar_cursos.ctrl.php">Listar cursos</a>
                </div>
            <?php }?>
        </div>
        <br>
        <br>
        <div style="text-align: right">
            <a class="btn btn-warning" href="<?php echo $WEB_PATH ?>src/ctrl/logout.ctrl.php">Cerrar sesión</a>
        </div>



    </div>
</div> <!-- Fin de container-fluid -->
</body>

</html>
