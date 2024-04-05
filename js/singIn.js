
async function singIn(email, password) {
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
        console.error('Failed to login');
    }
}
