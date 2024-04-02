const userData = sessionStorage.getItem("user");

function cargarCarrito() {
  const botonesAgregarCarrito = document.querySelectorAll(".button-cart");

  botonesAgregarCarrito.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var spanElement = boton.querySelector(".material-symbols-outlined");
      if (boton.classList.contains("clicked")) {
        cambiarIcono(boton, spanElement, "add_shopping_cart");
        boton.classList.remove("clicked"); // Eliminar la clase "clicked"
      } else {
        cambiarIcono(boton, spanElement, "done");
        boton.classList.add("clicked"); // Agregar la clase "clicked"
        add_shopping_cart(boton);
      }
    });
  });
}

function cambiarIcono(boton, spanElement, spanText) {
  spanElement.textContent = spanText;
}
function getNameArticle(button) {
  var article = button.closest(".article");
  var productName = article.querySelector(".title").textContent;
  return productName;
}
async function add_shopping_cart(button) {
  const nameArticle = getNameArticle(button);
  console.log(nameArticle, userData);
  if ((nameArticle, userData)) {
    const result = await fetch("http://localhost:3000/v1/cartRoutes/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: nameArticle,
        idClient: userData,
      }),
    });
    console.log(result);
  }
}
function subtract_shopping_cart() {}
