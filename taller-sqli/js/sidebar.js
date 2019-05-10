$(document).ready(function () {
   $('.side ul li:has(ul)').click(function (e) {
        if ($(this).hasClass('activado')) {
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
			e;
        }
        else {
            $('.side li ul').slideUp();
            $('.side li').removeClass('activado');
            $(this).addClass('activado');
            $(this).children('ul').slideDown();
        }
    });

    $('.side ul li ul').click(function (e) {
      e.stopPropagation();
    });

});

function toggleSidebar()
{
  var element = document.getElementById('side'),
    style = window.getComputedStyle(element),
    left = style.getPropertyValue('left');

  if(left == '-260px'){
    document.getElementById("side").style.left = "0px";
  }
  else{
    document.getElementById("side").style.left = "-260px";
  }
  menuvis ? menuvis = false : menuvis = true;
  togglePanel();
  cambiarIcono();
};

function togglePanel(){
  menuvis ? $("#black-panel").fadeIn("fast") : $("#black-panel").fadeOut();
}

function blurLabel(){
  $(event.target).next().css("color", "#444");
  $(event.target).next().css("font-size", "14px");
  $(event.target).next().css("top", "-1px");
}

function focusLabel(){
  $(event.target).next().css("color", "var(--color)");
  $(event.target).next().css("font-size", "14px");
  $(event.target).next().css("top", "-1px");
  $(event.target).next().css("font-weight", "bold");
}

function focusSelect(){
  $(event.target).prev().css("color", "var(--color)");
  $(event.target).prev().css("transform", "scale(1.2)");
}

function onBlurSelect(){
  $(event.target).prev().css("color", "#444");
  $(event.target).prev().css("transform", "scale(1.0)");
}


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {                                         
    xDown = getTouches(evt)[0].clientX;                                      
    yDown = getTouches(evt)[0].clientY;                                      
};                                                


let menuvis = false;
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;


    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 && menuvis) {
            toggleSidebar();
            menuvis = false;
        }                     
    }

    /* reset values */
    xDown = null;
    yDown = null;                                             
};

function cambiarIcono(){
  $("#menu-span").fadeOut(150);
  setTimeout( function(){menuvis ? $("#menu-span").text("close") : $("#menu-span").text("menu")}, 151);
  $("#menu-span").fadeIn(150);
}