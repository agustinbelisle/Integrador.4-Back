
## 🧪 Proyecto Final Backend - Integrador.4

Este proyecto forma parte del curso de desarrollo Full Stack en NUCBA.  
Consiste en una aplicación web funcional con frontend y backend desplegados, base de datos en la nube y simulación de envío de correos.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React + Vite + Material UI + Emotion  
- **Backend**: Node.js + Express + TypeScript  
- **Base de datos**: PostgreSQL (Render)  
- **ORM**: Prisma  
- **Autenticación**: JWT  
- **Correo**: Mailtrap (simulación de envío)  
- **Deploy**: Vercel (frontend) y Render (backend)

---

## 🌐 Accesos

- 🔗 [Frontend online](https://integrador-4-front.vercel.app/)  
- 🔗 [Backend online](https://integrador-4-back.onrender.com/)  
- 📦 [Repositorio Frontend](https://github.com/agustinbelisle/Integrador.4-Front)  
- 🛠️ [Repositorio Backend](https://github.com/agustinbelisle/Integrador.4-Back)

---

## 📬 Funcionalidades principales

- Registro y login de usuarios  
- Visualización de productos  
- Carrito de compras para visitantes y usuarios logueados  
- Creación y gestión de órdenes de compra  
- Envío de confirmación por correo  
- Panel de administración con gestión de usuarios y roles

---

## 🛒 Carrito de compras

- Permite agregar, modificar y eliminar productos, tanto para visitantes como usuarios autenticados.  
- El backend acepta un producto por petición (`POST /api/cart/:userId`), mientras que el frontend gestiona múltiples llamadas.  
- La lógica está integrada con Redux, con persistencia local para visitantes y sincronización con la base de datos para usuarios logueados.

---

## 🔐 Registro y login

- Registro mediante `POST /api/auth/register`, con validación de nombre, email y contraseña.  
- Login vía `POST /api/auth/login`, que retorna un token JWT para acceder a funcionalidades protegidas.  
- El token se guarda en `localStorage` y se usa en los headers para autenticar cada acción.  
- Redux gestiona el estado de autenticación y permite navegación condicional.

---

## 📧 Envío de correos

- Al finalizar una compra, se genera una orden y se envía un correo de confirmación al usuario.  
- El backend utiliza Mailtrap para simular el envío sin exponer datos reales.  
- El correo incluye productos comprados, total y estado inicial (`pendiente`).  
- Esta funcionalidad valida el flujo completo de compra y comunicación.

---

## 🛠️ Panel de administración

- Acceso exclusivo para usuarios con rol `admin`.  
- Permite gestionar productos, órdenes y usuarios mediante endpoints protegidos (`PUT /users/:id/role`, `DELETE /products/:id`, etc.).  
- El backend valida el rol con JWT y restringe el acceso según permisos.  
- El panel ofrece una estructura escalable para futuras funcionalidades.

---

## 🧪 Testeo

- Todos los endpoints fueron testeados manualmente y con Postman.  
- Se validó el flujo completo: registro, login, gestión de productos, carrito, órdenes y envío de correos.

---

## 🔐 Seguridad

- Autenticación con JWT  
- Validación de roles (`user`, `admin`)  
- Protección de rutas sensibles

---

📡 Endpoints principales (Backend)


🟢 Acceso Público

GET /api/products
📌 Lista todos los productos

GET /api/products/:id
📌 Detalle de producto por ID

POST /api/auth/register
📌 Registro de usuario

POST /api/auth/login
📌 Inicia sesión

POST /api/contact
📌 Envía mensaje de contacto

🔵 Usuarios (requieren login con token)

POST /api/cart/:userId
📌 Agrega producto al carrito

GET /api/cart/:userId
📌 Ver carrito del usuario

PUT /api/cart/:userId
📌 Actualiza cantidad de un producto en el carrito

DELETE /api/cart/:userId/:productId
📌 Elimina producto del carrito

POST /api/orders/:userId
📌 Finaliza compra y genera orden

GET /api/orders/:id
📌 Detalle de orden

GET /api/users/:id
📌 Ver perfil de usuario

PUT /api/users/:id
📌 Actualiza perfil

DELETE /api/users/:id
📌 Elimina usuario

🔴 Solo Admin

POST /api/products
📌 Crea producto

PUT /api/products/:id
📌 Actualiza producto

DELETE /api/products/:id
📌 Elimina producto

GET /api/users
📌 Lista todos los usuarios

PUT /api/users/:id/role
📌 Cambia rol de usuario


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

