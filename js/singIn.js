
async function singIn(email, password) {
    const response = await fetch('http://localhost:3000/v1/userRoutes/singIn', {
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
        sessionStorage.setItem('user', JSON.stringify(data.message)); // Almacena el mensaje en sessionStorage
        window.location.href = "e-shop.html";
    } else {
        console.error('Failed to login');
    }
}
