
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

