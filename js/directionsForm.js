const cp = document.getElementById("CP-user");
const Neighborhoods = document.getElementById("Neighborhoods");
const city = document.getElementById("city-user");
const state = document.getElementById("state-user");

cp.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (cp) {
      console.log(cp.value);
      serchDirection("zip_code=" + cp.value);
    }
  }
});
async function serchDirection(direction) {
  try {
    const allZipCodes = await getAllZipCodes(direction);
    autofillInputs(allZipCodes);
  } catch (error) {
    console.error("Error al obtener todos los códigos postales:", error);
  }
}
async function getAllZipCodes(direction) {
  let totalPages = 1;
  let allZipCodes = [];
  const numPagesResponse = await fetch(
    `https://sepomex.icalialabs.com/api/v1/zip_codes?${direction}`
  );
  const numPagesData = await numPagesResponse.json();
  totalPages = numPagesData.meta.pagination.total_pages;
  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(
      `https://sepomex.icalialabs.com/api/v1/zip_codes?page=${page}&${direction}`
    );
    const data = await response.json();
    const zipCodes = data.zip_codes;
    allZipCodes = allZipCodes.concat(zipCodes);
  }

  return allZipCodes;
}
function autofillInputs(directions) {
  Neighborhoods.innerHTML = "";
  if (directions.length > 0) {
    console.log(directions[0]);
    city.value = directions[0].d_ciudad!=null ?directions[0].d_ciudad:directions[0].d_mnpio;
    state.value = directions[0].d_estado;

    let html = `<select name="Neighborhood-cp" id="Neighborhoods-cp" class="input" aria-placeholder="Colonias">`;
    for (let direction of directions) {
      html += `<option value="${direction.d_asenta}">${direction.d_asenta}</option>`;
    }
    html += `</select>`;
    Neighborhoods.innerHTML = html;
  } else {
    console.log("No hay datos disponibles para llenar los campos.");
    city.value = "";
    state.value = "";
    Neighborhoods.innerHTML = `<p>No hay colonias disponibles</p>`;
  }
}
async function setRequest() {
    const client = sessionStorage.getItem("user");
    const cityClient = document.getElementById('city-user').value;
    const StreetNumbre = document.getElementById("StreetNomber-user").value;
    const streetName = document.getElementById("street-user").value;
    const stateClient = document.getElementById('state-user').value;
    const zipCode = document.getElementById('CP-user').value;
    const country = "Mexico";
    const NeighborhoodsCP = document.getElementById("Neighborhoods-cp").value;
    const deliveryInstructions = document.getElementById("DeliveryInstructions").value;
  
    try {
      const response = await fetch("https://proyectoesdrascopado.com/v1/directionRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: client,
          city: cityClient,
          StreetNumber: StreetNumbre,
          StreetName: streetName,
          State: stateClient,
          ZIPCode: zipCode,
          Country: country,
          Neighborhood: NeighborhoodsCP,
          DeliveryInstructions: deliveryInstructions
        }),
      });
  
      if (response.ok) {
        console.log("Request sent successfully");
        window.location.href="directions.html"
        // Handle success if needed
      } else {
        console.error("Failed to send request:", response.status);
        // Handle failure if needed
      }
    } catch (error) {
      console.error("Error sending request:", error);
      // Handle error if needed
    }
  }

//search by state
/**
 * state.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      if (state) {
        const stateName = state.value;
        getStateIdByName(stateName)
          .then((stateId) => {
            if (stateId) {
              serchDirection("state=" + stateId);
            } else {
              console.error("Estado no encontrado:", stateName);
            }
          })
          .catch((error) => {
            console.error("Error al obtener el ID del estado:", error);
          });
      }
    }
  });
  
  async function getStateIdByName(stateName) {
    try {
      const allStates = await getAllStates();
      const state = allStates.find(
        (state) => state.name.toLowerCase() === stateName.toLowerCase()
      );
      if (state) {
        console.log(state.id);
        return state.id;
      } else {
        throw new Error("Estado no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
  
  async function getAllStates() {
    let totalPages = 1;
    let allStates = [];
  
    const numPagesResponse = await fetch(
      `https://sepomex.icalialabs.com/api/v1/states`
    );
    const numPagesData = await numPagesResponse.json();
    totalPages = numPagesData.meta.pagination.total_pages;
  
    // Hacer solicitudes a cada página
    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `https://sepomex.icalialabs.com/api/v1/states?page=${page}`
      );
      const data = await response.json();
      const states = data.states;
      allStates = allStates.concat(states);
    }
  
    return allStates;
  }
 */
