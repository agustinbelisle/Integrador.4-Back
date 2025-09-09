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

Método			             Ruta												Descripción												      Acceso

GET									/api/products			  						Lista todos los productos								Público
GET									/api/products/:id								Detalle de producto por ID							Público
POST								/api/products			 						  Crea producto							  						Solo admin
PUT									/api/products/:id								Actualiza producto											Solo admin
DELETE							/api/products/:id								Elimina producto											  Solo admin
POST								/api/auth/register							Registra nuevo usuario									Público
POST								/api/auth/login									Inicia sesión							     				  Público
POST								/api/cart/:userId								Agrega producto al carrito							Usuario
POST								/api/orders/:userId							Finaliza compra y genera orden					Usuario
GET									/api/orders/user/:id					  Lista órdenes del usuario								Usuario
GET									/api/orders/:id									Detalle de orden						    				Usuario
PUT									/api/orders/:id									Actualiza estado de orden								Solo admin
DELETE							/api/orders/:id									Elimina orden													  Solo admin
GET									/api/users										  Lista todos los usuarios								Solo admin
GET									/api/users/:id									Ver perfil de usuario										Usuario
POST								/api/users										  Crea usuario													  Público
PUT									/api/users/:id									Actualiza perfil												Usuario
DELETE							/api/users/:id									Elimina usuario													Solo admin
PUT									/api/users/:id/role							Cambia rol de usuario										Solo admin


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

