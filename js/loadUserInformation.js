
const currentUserData = sessionStorage.getItem('user');
if (currentUserData) {
    findUser(currentUserData)
        .then(userInfo => {
            loadUserInformation(userInfo);
        })
        .catch(error => {
            console.error('Error al buscar usuario:', error);
            alert('Error al cargar la información del usuario');
            redirectToLoginPage();
        });
} else {
    console.log('No hay datos de usuario en sessionStorage');
    redirectToLoginPage();
}

function loadUserInformation(userData) {
    const divUserInfo = document.getElementById('userInformation');
    divUserInfo.innerHTML = '';
    if (userData && userData.data && userData.data.name) {
        const userName = userData.data.name;
        const htmlInformation = `
            <span class="nav-user-1">Hola ${userName}</span>
            <span class="nav-user-2">Informacion de la cuenta</span>
        `;
        divUserInfo.innerHTML = htmlInformation;
    } else {
        console.error('No se pudo cargar la información del usuario');
        alert('No se pudo cargar la información del usuario');
    }
}

async function findUser(idUser) {
    try {
        const response = await fetch('https://proyectoesdrascopado.com/v1/userRoutes/' + idUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Error al obtener datos del usuario');
        }
        const userData = await response.json();
        sessionStorage.setItem('nameUser', userData.data.name);
        return userData;
    } catch (error) {
        throw error;
    }
}

function redirectToLoginPage() {
    window.location.href = 'index.html';
}


