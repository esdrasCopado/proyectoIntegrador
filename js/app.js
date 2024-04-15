const mp = new MercadoPago("APP_USR-27d41402-138f-46f0-bf77-a22285ae9696", { local: "es-MX" });

let checkoutButtonClicked = false; // Variable para rastrear si ya se hizo clic en el botón
/**
 * document.getElementById("chechout-btn").addEventListener("click", async () => {
  if (!checkoutButtonClicked) { // Verifica si el botón aún no ha sido clickeado
    checkoutButtonClicked = true; // Marca que el botón ha sido clickeado
    
    try {
      const orderData = {
        title: "botas de armadillo",
        quantity: 1,
        price: 1,
      };

      const responce = await fetch("https://proyectoesdrascopado.com/create_preference", {
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
 * 
 */
async function create_preference() {
  try {
    const user = sessionStorage.getItem("user");
    const orderData = {
      products: [
        {
          title: "botas de armadillo",
          quantity: 1,
          price: 1,
        },
        {
          title: "Motorola g5",
          quantity: 1,
          price: 5,
        }
      ]
    };
    
    const response = await fetch("https://proyectoesdrascopado.com/v1/mercadoPagoRoutes/createPreferences/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment preference: ${response.statusText}`);
    }

    const preference = await response.json();

    if (preference.id) {
      createCheckoutButton(preference.id);
    } else {
      // Manejar la situación donde no se recibe un ID de preferencia.
      throw new Error("No se pudo crear la preferencia de pago.");
    }
  } catch (error) {
    console.error("Error creating payment preference:", error);
    alert("Error al crear la preferencia de pago :(");
  }
}




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
window.addEventListener('load', (event) => {
  console.log('Todos los recursos han sido cargados');
  create_preference();
});
