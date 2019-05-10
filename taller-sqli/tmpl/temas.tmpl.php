<!DOCTYPE html>
<html>
  <head>
    <?php require_once 'resources.tmpl.php'; ?>
    <script type="text/javascript" src="<?php echo $WEB_PATH; ?>lib/jscolor/jscolor.js"></script>
  </head>
  <body>
    <div class="container-fluid">
      <div id="sidebar">
        <?php require $SERVER_PATH . 'tmpl/marco/side_menu.tmpl.php'; ?>
      </div>
      <!-- Fin barra de navegación, comienza el contenido de la página -->
      <div class="col-xs-12 contenido">
        <div class="h1-portrait inline">
          <i class="material-icons portrait" >settings</i>
        </div>
        <h1 class="titulo">Configuraciones</h1>
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="panel-portrait">
                <i class="material-icons portrait">brush</i>
              </div>
              <div class="panel-header">Esquema de colores
              </div>
            </div>
            <div class="panel-body">
              <div class="form-row">
                <div class="row">
                  <div class="col-xs-12 col-sm-4">
                      <label class="placeholder-select">Seleccione un color</label>
                      <input type="button" id="color-picker" class="jscolor form-control" value="38B1AB" onblur="onBlurSelect()" onfocus="focusSelect()" style= " height: 32px; font-size: 18px; border: 2px solid black !important">
                    </div>
                    <div class="col-xs-12 col-sm-4">
                        <input type="button" class="btn btn-primary" style=" width: 100%; margin-top: 24px;" onclick="setColor()" value="Aplicar">
                      </div>
                      <div class="col-xs-12 col-sm-4">
                          <input type="button" class="btn btn-primary" style="width: 100%; margin-top: 24px;" onclick="setColor(true)" value="Predeterminado">
                        </div>
              </div>
            </div>
          </div>
        </div>
    </div>

  </div>

    <?php require $SERVER_PATH . 'tmpl/marco/footer.tmpl.php'; ?>
  </body>


  <script>
      function returnDefaultColor(){
        const user = "<?php echo $user_tema?>";

        let strg = JSON.parse(localStorage.getItem("colorTemaSS"));

        if(strg)
        for(let i = 0; i < strg.length; i++){
          if(user == strg[i].user){
            strg[i].color = document.documentElement.style.getPropertyValue("--def-color");
          }
          strg.pop(strg[i]);
        };

        localStorage.setItem("colorTemaSS", JSON.stringify(array));
        location.reload();
      }

      function setColor(){
        let color = $("#color-picker").val();
        color = color.match(/.{1,2}/g);
        if(color && (color[0] < "C0" || color[1] < "C0" || color[2] < "C0")){
        color = color.join("");
        const user = "<?php echo $user_tema?>";

        let array = [];
        let strg = JSON.parse(localStorage.getItem("colorTemaSS"));
        let flag = false;

        if(strg)
        for(let i = 0; i < strg.length; i++){
          if(user == strg[i].user){
            strg[i].color = color;
            flag = true;
          }
          array.push(strg[i]);
        };

        if (!flag){
          let json = {'color': color, 'user': user};
          array.push(json);
        }

        localStorage.setItem("colorTemaSS", JSON.stringify(array));
        location.reload();
      }
      else{
        alertSS("Seleccione un color más oscuro!");
      }
  
      }
    </script>
  </html>

