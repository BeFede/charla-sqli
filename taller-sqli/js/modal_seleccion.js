
window.addEventListener('load', function () {
    function devolverClick(columna) {
        $(tabla).find('tr').click(function () {
            return $(this).children(':nth-child(#tabla-seleccion)').text();
        }
        )
    }
});