let currentUserData = sessionStorage.getItem('user');


async function findDirections() {
    try {
        const response = await fetch(`https://proyectoesdrascopado.com/v1/directionRoutes/${currentUserData}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const directions = await response.json();
        printDirections(directions.data);
        buttonDirecctions();
    } catch (e) {
        console.error("Error al buscar direcciones:", e);
    }
}

function printDirections(directions) {
    let htmlDirections = "<h3>Mis domicilios </h3>";
    if(directions!=null) {
    directions.forEach((direction) => {
        const {_id, ZIPCode, StreetName, StreetNumber, city } = direction; // Asegúrate de que estos campos existen en el objeto direction
        htmlDirections += `
        <div class="clientDirections">
            <input type="radio" id="${_id}" name="radioGroupMethods" class="custom-radio">
            <div class="clientDirection">
                <label for="${_id}" class="custom-radio-label">Seleccionar: ${ZIPCode}</label>
                <span>${StreetName} ${StreetNumber} - ${city}</span>
            </div>
        </div>
        `;
    });
}
    htmlDirections += `
    <div class="addNewDirection" onclick="formDirection()">
        <span>Agregar nueva direccion</span>
    </div>
    <div class="button">
        <div onclick="buttonPay()" class="checkout-btn"><h3>Continuar</h3></div>
    </div>
    `;
    document.getElementById("mainDirections").innerHTML = htmlDirections;
}
function buttonDirecctions() {
    const seleccion = document.querySelectorAll('.clientDirections');
    seleccion.forEach((element) => {
        
        element.addEventListener('click', () => {
            const radioButton = element.querySelector('.custom-radio');
            if (radioButton) {
                radioButton.checked = true;
            }
        });
    });
}

findDirections();