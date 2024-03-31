
const userData = JSON.parse(sessionStorage.getItem('user'));

if (userData) {
    // Aquí puedes utilizar los datos del usuario, por ejemplo:
    findUser(userData)
        .then(user => {
            loadUserInformation(user);
        })
        .catch(error => {
            console.error('Error al buscar usuario:', error);
        });
} else {
    console.log('No hay datos de usuario en sessionStorage');
    window.location.href = 'index.html';
}
function loadUserInformation(userData) {
    const divUserInfo = document.getElementById('userInformation');
    divUserInfo.innerHTML = '';

    // Verificar si hay datos de usuario
    if (userData && userData.data && userData.data.name) {
        const userName = userData.data.name;

        // Crear el HTML con el nombre del usuario
        const htmlInformation = `
            <span class="nav-user-1">Hola ${userName}</span>
            <span class="nav-user-2">Informacion de la cuenta</span>
        `;

        // Insertar el HTML en el div
        divUserInfo.innerHTML = htmlInformation;
    } else {
        console.error('No se pudo cargar la información del usuario');
    }
}


async function findUser(idUser) {
    try {
        const response = await fetch('http://localhost:3000/v1/userRoutes/' + idUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener datos del usuario');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}

