<?php
  require_once $_SERVER['DOCUMENT_ROOT'].'/taller-sqli/config.php';
  $sesion = Session::get_instance();
?>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <?php require_once $SERVER_PATH . 'tmpl/resources.tmpl.php';?>
</head>
<body>

  <!-- Fin barra de navegación, comienza el contenido de la página -->
   <div class="row contenido " style="margin-top: 5%; padding-top: 1%; padding-bottom: 1%;">
     <div class="col-xs-6 ">
       <div class="panel panel-default">
         <div class="panel-heading">
           <div class="panel-portrait panel-message">
             <i class="material-icons portrait">info_outline</i>
           </div>
           <div class="panel-header">
             Atención
           </div>
         </div>
         <div class="panel-body">
           <div class="row-padding-bottom">
           <div class="col-xs-10 col-xs-offset-1">
              <?php require_once 'session_messages.tmpl.php'; ?>
           </div>
        </div>
        <div class="row-padding-bottom">
           <div class="col-xs-10 col-xs-offset-1">
              <form method="GET" id="redirect-page" class="pull-right" name="formRedirect">
                <input type="button" class="btn btn-primary message-button" onclick="redireccionar('src/ctrl/index.ctrl.php')" value="Inicio">
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <script>
      function redireccionar(pagina){
         document.formRedirect.action = "<?php echo  $WEB_PATH ?>" + pagina ;
         $("#redirect-page").submit();
      }
   </script>

   <script>


   </script>
</body>


</html>
