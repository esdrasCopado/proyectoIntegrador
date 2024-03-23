
const botonesAgregarCarrito = document.querySelectorAll('.button-cart');

botonesAgregarCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() {
        var spanElement = boton.querySelector('.material-symbols-outlined');
        if(boton.classList.contains("clicked")){
            cambiarIcono(boton, spanElement, "add_shopping_cart");
            boton.classList.remove("clicked"); // Eliminar la clase "clicked"
        } else {
            cambiarIcono(boton, spanElement, "done");
            boton.classList.add("clicked"); // Agregar la clase "clicked"
        }
    });
});

function cambiarIcono(boton, spanElement, spanText) {
    spanElement.textContent = spanText;
}






