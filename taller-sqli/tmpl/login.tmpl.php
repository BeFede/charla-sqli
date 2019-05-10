<!DOCTYPE html>
<html>

<head>
  <?php
        require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';
        require_once 'resources.tmpl.php';
    ?>
  <link rel="stylesheet" href="<?php echo $WEB_PATH; ?>css/login.css">
  <link rel="stylesheet" href="<?php echo $WEB_PATH; ?>css/animate.css">
  <title>System Formosa - Login</title>
  <script>sessionStorage.clear();</script>

</head>

<body>


  <div class="row" style="height: 100vh; display: block">
    <div class="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
      <div class="container-login panel panel-default" style=" width: 100%">
        <div class="col-xs-12">
            <div class=" logo-login animated fadeIn"></div>
            <div>
              <h1 style="color: #000000; text-align: center">Taller SQLi</h1>
              <h2>Ejemplo: gestión académica</h2>
          </div>

        </div>
        <div class="col-xs-12">
          <!--<i class="hidden-xs material-icons portrait-centro animated fadeInLeft">shopping_cart</i>-->
        </div>
        <form class="form-group" action="<?php echo $WEB_PATH;?>src/ctrl/login.ctrl.php" method="post">
          <div class="inputs">
            <div class="row">
              <div class="col-xs-12" style="top:45px">
                <i class="material-icons ico inline pull-right" style "padding-top: 30px !important">account_circle</i>
              </div>
              <div class="col-xs-12">
                <label for="input_usr" class="placeholder-select">Usuario</label>
                <input type="text" id="input_usr" class="form-control inline" style="padding-right: 30px" name="username" onBlur="onBlurSelect()"
                  onFocus="focusSelect()" required/>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12" style="top:45px">
                <i class="material-icons ico inline pull-right" style "padding-top: 30px !important">lock</i>
              </div>
              <div class="col-xs-12">

                <label for="input_pass" class="placeholder-select">Contraseña</label>
                <input id="input_pass" type="password" class=" form-control" style="padding-right: 30px" name="password" onBlur="onBlurSelect()"
                  onFocus="focusSelect()" required/>
              </div>
            </div>
            <input type="submit" id="btn-sumbit" class="btn btn-primary" value="INGRESAR" />


            <?php if (isset($_SESSION['login-error']) && $_SESSION['login-error']){?>
            <div style="text-align: center">
              <h5 style="color: #f44336;">
                <b>Username o contraseña incorrecta</b>
              </h5>
            </div>
            <?php }?>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>

</html>