const articleDiv = document.getElementById('container-articles');
const loadingAnimation= document.getElementById('container-cards')

async function getProducts() {
    printLoadingCards();
    const response = await fetch('https://proyectoesdrascopado.com/v1/productRoutes/');
    if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.data)) {
            printProducts(data.data);
            setTimeout(() => {
                loadingAnimation.style.display = 'none';
 
            }, 600); 
            articleDiv.style.display = 'flex';
            cargarCarrito()

        } else {
            console.error("La propiedad 'data' no es un array:", data.data);
        }
    } else {
        console.error("Error al obtener los productos");
    }
}
function printLoadingCards() {
    let htmlContent=`
    <div class="card__skeleton card__title"></div>
    <div class="main-loading-animation">
    `;
    for(let i = 0; i <20; i++) {
        const htmlArticle = `
        <div class="card">
            <div class="card__skeleton card__description">         </div>
        </div>
        `
        htmlContent += htmlArticle;
    }
    htmlContent+=`</div>`;
    loadingAnimation.innerHTML = htmlContent;
}

function printProducts(products) {
    // Inicializar una variable para construir el HTML
    let htmlContent = "";

    // Recorrer el array de productos y construir el HTML para cada producto
    for (const product of products) {
        const htmlArticle = `
            <div class="article">
                <div class="img-product">
                    <img src="${product.image}" alt="" class="image">
                </div>
                <div class="product-title">
                    <span class="title">${product.name}</span>  
                </div>
                <div class="main-cost">
                    <div class="product-price">
                        <span class="price">
                            <span class="symbol-money">$</span>
                            <span class="cost">${product.price}</span>
                        </span>
                    </div>
                    <div class="add-cart">
                        <button id="cartBoton" class="button-cart">
                            <span id="iconShopping" class="material-symbols-outlined">
                                add_shopping_cart
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            `;
        // Agregar este bloque de producto al HTML total
        htmlContent += htmlArticle;
    }

    // Actualizar el innerHTML de articleDiv una sola vez al final
    articleDiv.innerHTML = htmlContent;
}


getProducts();

