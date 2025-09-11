🧪 Proyecto Final Backend - Integrador.4

Este proyecto es parte del curso de desarrollo Full Stack en NUCBA. 
Consiste en una aplicación web funcional con frontend y backend desplegados, base de datos en la nube y simulación de envío de correos.

🚀 Tecnologías utilizadas

- Frontend: React + Vite + Material UI + Emotion
- Backend: Node.js + Express + TypeScript
- Base de datos: PostgreSQL (Render)
- ORM: Prisma
- Mailtrap (simulación de envío de correos)
- Autenticación: JWT
- Deploy: Vercel (frontend) y Render (backend)

🌐 Accesos

🔗 Frontend online: https://integrador-4-front.vercel.app/
🔗 Backend online: https://integrador-4-back.onrender.com/
📦 Repositorio Frontend: https://github.com/agustinbelisle/Integrador.4-Front
🛠️ Repositorio Backend: https://github.com/agustinbelisle/Integrador.4-Back

📬 Funcionalidades principales

• Registro y login de usuarios
• Visualización de productos
• Carrito de compras para visitantes y usuarios logueados
• Creación y gestión de órdenes de compra
• Envío de confirmación por correo (Mailtrap)
• Panel de administración con gestión de usuarios y roles


🛒 Carrito de compras

• El sistema permite agregar múltiples productos al carrito, tanto para usuarios logueados como visitantes.
• Los usuarios pueden sumar, restar, eliminar y vaciar productos desde la interfaz.
• El backend acepta un producto por petición (POST /api/cart/:userId), pero el frontend gestiona múltiples llamadas automáticamente.
• La lógica está integrada con Redux, permitiendo persistencia local para visitantes y sincronización con la base de datos para usuarios autenticados.


🔐 Registro y login de usuarios

- El sistema permite crear cuentas nuevas mediante el endpoint `POST /api/auth/register`, validando nombre, email y contraseña.
- Los usuarios pueden iniciar sesión con `POST /api/auth/login`, obteniendo un token JWT que habilita funciones protegidas como carrito persistente, órdenes y perfil.
- El token se guarda en `localStorage` y se utiliza en los headers para autenticar cada acción.
- La lógica de autenticación está integrada con Redux y permite navegación condicional según el estado de login.

---

📧 Envío de confirmación por correo

- Al finalizar una compra, el sistema genera una orden y envía un correo de confirmación al usuario mediante Mailtrap.
- El backend utiliza una función de envío conectada a Mailtrap, simulando el flujo real de email sin exponer datos sensibles.
- El correo incluye detalles de la orden, productos comprados y estado inicial (`pendiente`).
- Esta funcionalidad permite validar el flujo completo de compra y comunicación, como en un sistema de producción.

---

🛠️ Panel de administración

- Los usuarios con rol `admin` pueden acceder a endpoints protegidos para gestionar productos, órdenes y usuarios.
- El backend valida el rol mediante el token JWT y restringe el acceso a funciones como `PUT /users/:id/role` o `DELETE /products/:id`.
- El panel permite visualizar usuarios registrados, cambiar roles y administrar el catálogo de productos.
- Esta funcionalidad demuestra control de permisos y estructura escalable para futuras extensiones.


🧪 Testeo

- Todos los endpoints fueron testeados manualmente y vía Postman.
- El sistema permite registro, login, gestión de productos, carrito y órdenes.
- Se validó el flujo completo de compra con token y persistencia.

---

📧 Envío de correos

- Al generar una orden, se envía un correo de confirmación al usuario mediante Mailtrap.
- El contenido incluye productos comprados, total y estado inicial.

---

🔐 Seguridad

- Autenticación con JWT
- Validación de roles (`user`, `admin`)
- Protección de rutas sensibles

📡 Endpoints principales (Backend)

## 🟢 Acceso Público

**Método:** GET  
**Ruta:** /api/products  
**Descripción:** Lista todos los productos  

**Método:** GET  
**Ruta:** /api/products/:id  
**Descripción:** Detalle de producto por ID  

**Método:** POST  
**Ruta:** /api/auth/login  
**Descripción:** Inicia sesión  

**Método:** POST  
**Ruta:** /api/users  
**Descripción:** Crea usuario  

---

## 🔵 Usuarios

**Método:** POST  
**Ruta:** /api/orders  
**Descripción:** Agrega producto al carrito  

**Método:** GET  
**Ruta:** /api/orders  
**Descripción:** Finaliza compra y genera orden  

**Método:** GET  
**Ruta:** /api/orders/:id  
**Descripción:** Detalle de orden  

**Método:** DELETE  
**Ruta:** /api/orders/:id  
**Descripción:** Elimina orden  

**Método:** GET  
**Ruta:** /api/users/:id  
**Descripción:** Ver perfil de usuario  

**Método:** PUT  
**Ruta:** /api/users/:id  
**Descripción:** Actualiza perfil  

**Método:** DELETE  
**Ruta:** /api/users/:id  
**Descripción:** Elimina usuario  

---

## 🔴 Solo Admin

**Método:** POST  
**Ruta:** /api/products  
**Descripción:** Crea producto  

**Método:** PUT  
**Ruta:** /api/products/:id  
**Descripción:** Actualiza producto  

**Método:** DELETE  
**Ruta:** /api/products/:id  
**Descripción:** Elimina producto  

**Método:** GET  
**Ruta:** /api/users  
**Descripción:** Lista todos los usuarios  

**Método:** PUT  
**Ruta:** /api/users/:id/role  
**Descripción:** Cambia rol de usuario  
```


🧪 Ejemplo de uso vía Postman

🔐 Registro
POST https://integrador-4-back.onrender.com/api/auth/register

Body:
{ "name": "Agustin", "email": "agustin@test.com", "password": "123456" }

Respuesta:
{ "user": { "id": 7, "name": "Agustin", "email": "agustin@test.com", "role": "user" }, "token": "..." }

🔑 Login
POST https://integrador-4-back.onrender.com/api/auth/login/

Body:
{ "email": "agustin@test.com", "password": "123456" }

Header:
Authorization: Bearer <TOKEN>

📬 Contacto
POST https://integrador-4-back.onrender.com/api/contact/

Body:

{
  "name": "Agustin",
  "email": "agustin@test.com",
  "message": "Hola, estoy probando el formulario de contacto desde Postman."
}

Respuesta:

{
  "message": "Mensaje enviado y guardado correctamente."
}


🛒 Agregar producto al carrito
POST https://integrador-4-back.onrender.com/api/cart/7

Body:
{ "productId": 1 }

Respuesta:
Producto Lenovo agregado con cantidad 1 y detalles completos.

📦 Finalizar compra
POST https://integrador-4-back.onrender.com/api/orders/7

Body: vacío

Header: mismo token

Respuesta: orden generada con estado pendiente y total $1.009.999

