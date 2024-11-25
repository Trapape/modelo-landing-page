function showMessage() {
    alert('¡Gracias por visitar mi landing page!');
}

async function initiateLogin() {
    const clientId = 'rp1'; // Reemplaza con tu clientId
    const redirectUri = encodeURIComponent('https://example.com'); // Reemplaza con tu redirectUri
    const scope = 'openid';
    const responseType = 'code';

    // Construye la URL para iniciar el proceso de autenticación
    const loginUrl = `https://opencred.loca.lt/context/login?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    // Actualiza el contenedor QR con la URL para el código QR
    document.getElementById('qr-container').innerHTML = `
        <a href="${loginUrl}" target="_blank">Escanear QR</a>
    `;
}

initiateLogin();

async function checkExchangeStatus(exchangeId, accessToken) {
    try {
        const response = await fetch(`https://opencred.loca.lt/workflows/YOUR_WORKFLOW_ID/exchanges/${exchangeId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();

        if (data.status === 'complete') {
            document.getElementById('status').innerText = 'Autenticación completada.';
            // Redirige o muestra el contenido autorizado
        } else if (data.status === 'pending') {
            document.getElementById('status').innerText = 'Esperando autenticación...';
        } else {
            document.getElementById('status').innerText = 'Error en la autenticación.';
        }
    } catch (error) {
        console.error('Error al verificar el estado:', error);
    }
}

// Llama a la función cada cierto tiempo (por ejemplo, cada 5 segundos)
setInterval(() => {
    const exchangeId = 'YOUR_EXCHANGE_ID'; // Debes obtenerlo en el proceso inicial de autenticación
    const accessToken = 'YOUR_ACCESS_TOKEN'; // Debes obtenerlo en el proceso inicial de autenticación
    checkExchangeStatus(exchangeId, accessToken);
}, 5000);
