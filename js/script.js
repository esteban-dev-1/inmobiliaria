
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log('Respuesta login:', data);  // Para depuración

        if (data.success) {
            // Guardar datos en sessionStorage
            sessionStorage.setItem('user_id', data.userData.id);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('type', data.userData.type);
            
            // Redirigir según tipo de usuario
            if (data.userData.type === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión: ' + error.message);
    }
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const type = document.getElementById('type').value;

    try {
        const response = await fetch('api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, type }),
        });

        const data = await response.json();

        if (data.success) {
            window.location.href = 'login.html';
        } else {
            alert('Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar usuario');
    }
});


async function loadProperties() {
    const propertiesList = document.getElementById('propertiesList');

    try {
        const response = await fetch('api/getProperties.php');
        const data = await response.json();

        console.log(data);

        if (propertiesList) {
            let propertiesHTML = '';
            data.forEach(property => {
                propertiesHTML += `
                    <div class="property-card propiedad-grid">
                        <img src="${property.imagen_url}" alt="${property.tipo}">
                        <h3>${property.tipo}</h3>
                        <p>Dirección: ${property.direccion}</p>
                        <p>Habitaciones: ${property.habitaciones}</p>
                        <p>Superficie: ${property.superficie}</p>
                        <p>Precio: ${property.precio}</p>
                        <button class="btn" onclick="requestProperty(${property.id})">Solicitar</button>
                    </div>
                `;
            });
            propertiesList.innerHTML = propertiesHTML;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Solicitar propiedad
async function requestProperty(propertyId) {
    try {
        const username = localStorage.getItem('username');
        const response = await fetch('api/requestProperty.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ propertyId, username }),
        });

        const data = await response.json();

        if (data.success) {
            alert('Solicitud enviada con éxito');
            loadProperties();
        } else {
            alert('Error al solicitar propiedad');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al solicitar propiedad');
    }
}

// Agregar propiedad para el administrador
document.getElementById('addPropertyForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const direccion = document.getElementById('direccion').value;
    const tipo = document.getElementById('tipo').value;
    const habitaciones = document.getElementById('habitaciones').value;
    const superficie = document.getElementById('superficie').value;
    const precio = document.getElementById('precio').value;
    const imagen_url = document.getElementById('imagen_url').value;

    try {
        const response = await fetch('api/addProperty.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ direccion, tipo, habitaciones, superficie, precio, imagen_url }),
        });

        const data = await response.json();

        if (data.success) {
            alert('Propiedad agregada con éxito');
            document.getElementById('addPropertyForm').reset();
        } else {
            alert('Error al agregar propiedad');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar propiedad');
    }
});

// Cargar solicitudes para el administrador
async function loadRequests() {
    const requestsList = document.getElementById('requestsList');

    try {
        const response = await fetch('api/getRequests.php');
        const data = await response.json();

        if (requestsList) {
            let requestsHTML = '';
            data.forEach(request => {
                requestsHTML += `
                    <div class="request-card">
                        <h3>Solicitud para propiedad ID: ${request.property_id}</h3>
                        <p>Usuario: ${request.username}</p>
                        <p>Fecha: ${request.date}</p>
                    </div>
                `;
            });
            requestsList.innerHTML = requestsHTML;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cerrar sesión
document.getElementById('logout')?.addEventListener('click', () => {
    localStorage.removeItem('username');
    window.location.href = 'login.html';
});

// Ejecutar al cargar la página
window.onload = () => {
    const page = window.location.pathname.split('/').pop();
    
    if (['user-dashboard.html', 'admin-dashboard.html'].includes(page)) {

        const username = localStorage.getItem('username');
        if (!username) {
            window.location.href = 'login.html';
            return;
        }


        if (page === 'user-dashboard.html') {
            loadProperties();
        } else if (page === 'admin-dashboard.html') {
            loadRequests();
        }
    }
};


async function checkSession() {
    try {
        const response = await fetch('api/check-session.php');
        const data = await response.json();
        
        if (data.loggedIn) {
            sessionStorage.setItem('user_id', data.userData.id);
            sessionStorage.setItem('username', data.userData.username);
            sessionStorage.setItem('type', data.userData.type);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        return false;
    }
}

// Actualizar el evento onload
window.onload = async () => {
    const page = window.location.pathname.split('/').pop();
    
    if (['user-dashboard.html', 'admin-dashboard.html'].includes(page)) {
        // Verificar sesión en el servidor
        const isLoggedIn = await checkSession();
        
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return;
        }

        // Cargar datos según la página
        if (page === 'user-dashboard.html') {
            loadProperties();
        } else if (page === 'admin-dashboard.html') {
            loadRequests();
        }
    }
};

// Actualizar función de logout
document.getElementById('logout')?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        // Cerrar sesión en el servidor
        await fetch('api/logout.php');
        
        // Limpiar almacenamiento local
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('type');
        
        // Redirigir a login
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión');
    }
});
