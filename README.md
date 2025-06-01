Perfecto. Aquí tienes el `README.md` ya formateado especialmente para GitHub. Puedes copiarlo **tal cual** y pegarlo directamente en tu repositorio:

```markdown
# 🏡 Sistema de Gestión Inmobiliaria

Este es un sistema web básico para la gestión de propiedades inmobiliarias. Incluye funcionalidades para usuarios y administradores, permitiendo el registro, inicio de sesión, publicación de propiedades y solicitudes de arriendo o compra.

---

## 🚀 Funcionalidades principales

- Registro e inicio de sesión para usuarios.
- Panel de control para usuarios y administradores.
- Publicación de propiedades con nombre, precio e imagen.
- Solicitudes de arriendo o compra por parte de los usuarios.
- Gestión de solicitudes por parte del administrador.
- API en PHP para manejar las operaciones del sistema.

---

## 📁 Estructura del proyecto

```

inmobiliaria/
├── index.html               # Página principal
├── login.html               # Inicio de sesión
├── register.html            # Registro de usuarios
├── user-dashboard.html      # Panel del usuario
├── admin-dashboard.html     # Panel del administrador
├── api/                     # Backend en PHP
│   ├── addProperty.php
│   ├── getProperties.php
│   ├── requestProperty.php
│   ├── getRequests.php
│   ├── register.php
│   ├── login.php
│   ├── logout.php
│   ├── check-session.php
│   └── config.php           # Configuración de conexión a la base de datos
├── css/
│   └── styles.css           # Estilos personalizados
├── js/
│   └── script.js            # Funciones JavaScript

````

---

## ⚙️ Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP
- **Base de datos**: MySQL
- **Servidor local recomendado**: XAMPP o WAMP

---

## 💡 Cómo usar este proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
````

2. Coloca el proyecto en la carpeta `htdocs` de XAMPP.

3. Crea una base de datos MySQL llamada `inmobiliaria`.

4. Importa las tablas necesarias (puedo ayudarte a generar el script SQL si lo necesitas).

5. Configura tu conexión en `api/config.php`.

6. Inicia Apache y MySQL desde XAMPP y accede en el navegador a:

   ```
   http://localhost/inmobiliaria/index.html
   ```

---

## 📸 Capturas de pantalla

*(Puedes agregar imágenes del sistema aquí)*

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

---

> Desarrollado con ❤️ por Firewall

```

