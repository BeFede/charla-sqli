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
            <div class="col-xs-3">
                <a class="btn btn-default" href="<?php echo $WEB_PATH?>src/ctrl/index.ctrl.php">Volver</a>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <br>
                <ul>
                    <?php  for ($i = 0; $i < count($materias); $i++) {?>
                        <li><?php echo $materias[$i]['nombre']?></li>
                    <?php } ?>

            </div>
            </ul>
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
