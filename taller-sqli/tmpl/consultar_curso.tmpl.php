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

            <?php if ($curso != null){ ?>
            <div class="col-xs-12">
                <br>
                <br>
                <h1><?php echo $curso[0]['nombre_curso']?></h1>
                <br>
                <h3>Materias y profesores</h3>

                <br>
                <ul>
                    <?php for ($i=0; $i < count($curso); $i++){ ?>
                        <li><?php echo $curso[$i]['materia'] . " - " . $curso[$i]['nombre_profesor']?></li>
                    <?php } ?>

                </ul>
            </div>

        </div>
        <?php } ?>
        <br>
        <br>
        <div style="text-align: right">
            <a class="btn btn-warning" href="<?php echo $WEB_PATH ?>src/ctrl/logout.ctrl.php">Cerrar sesión</a>
        </div>



    </div>
</div> <!-- Fin de container-fluid -->
</body>

</html>
