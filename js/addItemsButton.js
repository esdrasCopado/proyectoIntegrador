

function articleButtonClick(){
    const idUser = sessionStorage.getItem("user");
    if(!idUser){
        window.location.href = "index.html";
    }
    const addProductButton = document.querySelectorAll('.addProduct');
    const subtractProduct = document.querySelectorAll('.subtractProduct');

    addProductButton.forEach(function (boton) {
        boton.addEventListener("click", function () {
            var article = boton.closest(".article");
            var productName = article.querySelector(".title").textContent;
            addQuantityProduct(idUser, productName);
            setTimeout(function () {
                getItemsCart();
            },500);
            
            
        });
      });
      subtractProduct.forEach(function (boton) {
        boton.addEventListener("click", function () {
            var article = boton.closest(".article");
            var productName = article.querySelector(".title").textContent;
            var input = article.querySelector("input");
            var quantity = Number(input.value);
            if(quantity>1){
                subtractQuantityProduct(idUser,productName)
                setTimeout(function () {
                    getItemsCart();
                },500);
            }else{
                deleteProduct(idUser,productName);
                alert("articulo eliminado!");
                setTimeout(function () {
                    getItemsCart();
                },500);
            }
        });
      }); 
}

async function addQuantityProduct(idUser, productName) {
    try {
        const encodedProduct = encodeURIComponent(productName);
        // Nota el uso directo de variables sin comillas extras en la URL
        const response = await fetch(`http://localhost:3000/v1/cartRoutes/addQuantityProduct/${idUser}/${encodedProduct}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
    } catch(e) {
        console.error("Error al añadir cantidad al producto:", e);
    }
}
async function subtractQuantityProduct(idUser, productName) {
    try {
        const encodedProduct = encodeURIComponent(productName);
        // Nota el uso directo de variables sin comillas extras en la URL
        const response = await fetch(`http://localhost:3000/v1/cartRoutes/subtractQuantityProduct/${idUser}/${encodedProduct}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
    } catch(e) {
        console.error("Error al añadir cantidad al producto:", e);
    }
}
async function deleteProduct(idUser, productName) {
    try {
        const encodedProduct = encodeURIComponent(productName);
        // Nota el uso directo de variables sin comillas extras en la URL
        const response = await fetch(`http://localhost:3000/v1/cartRoutes/${idUser}/${encodedProduct}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } 
    } catch(e) {
        console.error("Error al añadir cantidad al producto:", e);
    }
}
