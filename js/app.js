const mp = new MercadoPago("APP_USR-83f51ded-7e73-427e-b8cb-4c15efe4b947", { local: "es-MX" });

let checkoutButtonClicked = false; // Variable para rastrear si ya se hizo clic en el botón

document.getElementById("chechout-btn").addEventListener("click", async () => {
  if (!checkoutButtonClicked) { // Verifica si el botón aún no ha sido clickeado
    checkoutButtonClicked = true; // Marca que el botón ha sido clickeado
    
    try {
      const orderData = {
        title: "botas de armadillo",
        quantity: 1,
        price: 1,
      };

      const responce = await fetch("http://localhost:3000/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const preference = await responce.json();

      createCheckoutButton(preference.id);
    } catch (error) {
      alert("error :(");
    }
  }
});

const createCheckoutButton = (preferenceId) => {
  const bricksBuilder = mp.bricks();

  const renderComponent = async () => {
    if (window.checkoutButton) window.checkoutButton.unmount();

    await bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId,
      },
    });
  };

  renderComponent();
};
