async function singIn(email, password) {
    try {
        const response = await fetch('https://proyectoesdrascopado.com/v1/userRoutes/singIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('user', data.message);
            window.location.href = "e-shop.html";
        } else {
            if (response.status === 401) {
                // Manejar caso de credenciales inválidas
                alert("Credenciales inválidas");
            } else if (response.status === 500) {
                // Manejar caso de error del servidor
                alert("Error del servidor");
            } else {
                // Manejar otros casos de error
                alert("Error: " + response.statusText);
            }
            console.error('Failed to login');
        }
    } catch (error) {
        // Manejar errores de red u otros errores imprevistos
        console.error('Error during login:', error.message);
        alert("Error durante el inicio de sesión");
    }
}


