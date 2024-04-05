const divMainArticles= document.getElementById('main-articles');
const nextButton= document.getElementById('nextButtoon');
async function getItemsCart() {
  const idClient = sessionStorage.getItem("user");
  if (!idClient) {
    window.location.href = "index.html";
  }
  const response = await fetch(
    `https://proyectoesdrascopado.com/v1/cartRoutes/${idClient}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    sessionStorage.setItem("products", JSON.stringify(data.data));
    printItemsCart(data.data);
    loadCostInformation(data);
    articleButtonClick();
  }
}
function printItemsCart(products) {
  let htmlArticle =
   `
  <div class="productTitle">
  <h2>Productos</h2>
    </div>
    <div class="div-separador"></div>
    <table class="grid-table">
`;

  for (let i = 0; i < products.length; i++) {
    htmlArticle += `
    <div class="article">
    
    <div class="img-product">
      
      <img src="${products[i].image}" alt="" class="image" />
    </div>
    <div class="information">
      <div class="product-title">
        <span class="title">${products[i].name}</span>
      </div>
      <div class="product-description">
        <span class="description">
            ${products[i].description}
        </span>
      </div>
    </div>
    <div class="product-price">
      <span class="price">
        <span class="symbol-money">$</span>
        <span class="cost">${products[i].price*products[i].quantity}</span>
      </span>
    </div>

    <div class="icons">
      <div class="add-cart">
        <button id="subtractProduct" class="subtractProduct">
          <span class="material-symbols-outlined"> remove </span>
        </button>
        <input type="text" value="${products[i].quantity}" />
        <button id="addProduct" class="addProduct">
          <span id="iconShopping" class="material-symbols-outlined">
            add
          </span>
        </button>
      </div>
    </div>
  </div>
    `;
    if(i<products.length - 1) {
        htmlArticle+='<div class="div-separador"></div>';
    }
  }

  divMainArticles.innerHTML =htmlArticle
}
function loadCostInformation(data){
    const costInformation = document.getElementById('costInformation');
    let costoTotal=0;
    if(!isNaN(data.shippingCost)){
        costoTotal=data.shippingCost+data.totalCost;
    }else{
        costoTotal=data.totalCost;
    }
    let htmlCost=`
    <table class="grid-table">
    <tr>
      <td>Productos(${data.productsLength})</td>
      <td>$${data.totalCost}</td>
    </tr>
    <tr>
      <td>Envio</td>
      <td>$${data.shippingCost}</td>
    </tr>
    <tr>
      <td class="total">Total</td>
      <td class="total">$${costoTotal}</td>
    </tr>
  </table>
  `;
  costInformation.innerHTML=htmlCost;

}


getItemsCart();
