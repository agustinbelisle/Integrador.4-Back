
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

## 📡 Endpoints principales (Backend)

### 🟢 Acceso Público

**Método:** GET  
**Ruta:** `/api/products`  
**Descripción:** Lista todos los productos  

**Método:** GET  
**Ruta:** `/api/products/:id`  
**Descripción:** Detalle de producto por ID  

**Método:** POST  
**Ruta:** `/api/auth/register`  
**Descripción:** Registro de usuario  

**Método:** POST  
**Ruta:** `/api/auth/login`  
**Descripción:** Inicia sesión  

**Método:** POST  
**Ruta:** `/api/contact`  
**Descripción:** Envía mensaje de contacto desde el formulario  

---

### 🔵 Usuarios (requieren login con token)

**Método:** POST  
**Ruta:** `/api/cart/:userId`  
**Descripción:** Agrega producto al carrito  

**Método:** GET  
**Ruta:** `/api/cart/:userId`  
**Descripción:** Ver carrito del usuario  

**Método:** PUT  
**Ruta:** `/api/cart/:userId/item/:itemId`  
**Descripción:** Actualiza cantidad de un producto en el carrito  

**Método:** DELETE  
**Ruta:** `/api/cart/item/:itemId`  
**Descripción:** Elimina producto del carrito  

**Método:** POST  
**Ruta:** `/api/orders/:userId`  
**Descripción:** Finaliza compra y genera orden  

**Método:** GET  
**Ruta:** `/api/orders/:id`  
**Descripción:** Detalle de orden  

**Método:** GET  
**Ruta:** `/api/users/:id`  
**Descripción:** Ver perfil de usuario  

**Método:** PUT  
**Ruta:** `/api/users/:id`  
**Descripción:** Actualiza perfil  


---

### 🔴 Solo Admin

**Método:** POST  
**Ruta:** `/api/products`  
**Descripción:** Crea producto  

**Método:** PUT  
**Ruta:** `/api/products/:id`  
**Descripción:** Actualiza producto  

**Método:** DELETE  
**Ruta:** `/api/products/:id`  
**Descripción:** Elimina producto  

**Método:** DELETE  
**Ruta:** `/api/orders/:id`  
**Descripción:** Elimina orden  

**Método:** GET  
**Ruta:** `/api/users`  
**Descripción:** Lista todos los usuarios  

**Método:** PUT  
**Ruta:** `/api/users/:id/role`  
**Descripción:** Cambia rol de usuario  

**Método:** DELETE  
**Ruta:** `/api/users/:id`  
**Descripción:** Elimina usuario  

---


# 🧪 Ejemplo de uso vía Postman


---

## 🟢 Público


### 🔍 Listar productos

```
GET /api/products

Respuesta: Array de productos con id, name, description, price, category, images.
```

### 🔍 Detalle de producto

```
GET /api/products/4

Respuesta:

{
  "id": 4,
  "name": "PlayStation 5",
  "price": 1259999,
  "category": { "id": 5, "name": "Gaming" },
  "images": [ ... ]
}
```

### 📝 Registro

```
POST /api/auth/register

Body:

{
  "name": "Agustin",
  "email": "agustin@test.com",
  "password": "123456"
}

Respuesta:

{
  "user": { "id": 7, "name": "Agustin", "role": "user" },
  "token": "..."
}
```

### 🔐 Login

```
POST /api/auth/login

Body:

{
  "email": "agustin@test.com",
  "password": "123456"
}

Respuesta: Token JWT + datos del usuario.
```

### 📬 Contacto

```
POST /api/contact

Body:

{
  "name": "Agustin",
  "email": "agustin@test.com",
  "message": "Hola, estoy probando el formulario de contacto."
}

Respuesta:

{ "message": "Mensaje enviado y guardado correctamente." }
```
---

## 🔵 Usuario logueado (con token)


### ➕ Agregar al carrito

```
POST /api/cart/7
Authorization: Bearer <TOKEN>


Body:

{ "productId": 1 }

Respuesta: Item agregado con quantity: 1, incluye datos del producto.
```

### 👀 Ver carrito

```
GET /api/cart/7
Authorization: Bearer <TOKEN>

Respuesta: Array de ítems con product, quantity, selected.
```

### 🔄 Actualizar cantidad

```
PUT /api/cart/7/item/34
Authorization: Bearer <TOKEN>

Body: 

{ "quantity": 1 }

Respuesta:

{ "message": "Cantidad actualizada correctamente" }
```

### ❌ Eliminar item

```
DELETE /api/cart/item/34
Authorization: Bearer <TOKEN>

Respuesta:

{ "message": "Item eliminado del carrito" }
```

### 🧾 Generar orden

```
POST /api/orders/7
Authorization: Bearer <TOKEN>

Respuesta:

{
  "id": 8,
  "total": 1009999,
  "status": "pendiente",
  "items": [ ... ]
}
```

### 📦 Detalle de orden

```
GET /api/orders/7
Authorization: Bearer <TOKEN>

Respuesta: Incluye items, status, payment, total.
```

### 👤 Ver perfil

```
GET /api/users/7
Authorization: Bearer <TOKEN>

Respuesta:

{ "id": 7, "name": "Agustin", "email": "agustin@test.com", "role": "user" }
```

### ✏️ Editar perfil

```
PUT /api/users/7  
Authorization: Bearer <USER_TOKEN>

Body:

{
  "name": "Agustin E.",
  "email": "agustin.e@test.com",
  "password": "NuevaClave123"
}

Respuesta:

{
  "message": "Usuario actualizado correctamente",
  "user": {
    "id": 7,
    "name": "Agustin E.",
    "email": "agustin.e@test.com",
    "role": "user"
  }
}
```
---

## 🔴 Admin


### 🔐 Login Admin

```
POST /api/auth/login

Body:

{
  "email": "admin@ecommerce.com",
  "password": "Admin1234"
}


Respuesta:

{ "user": { "id": 1, "role": "admin" }, "token": "..." }
```

### 🆑 Eliminar orden

```
DELETE /api/orders/12
Authorization: Bearer <ADMIN_TOKEN>

Respuesta:

{ "message": "Orden eliminada correctamente" }
```

### 🆕 Crear producto

```
POST /api/products  
Authorization: Bearer <ADMIN_TOKEN>

Body:

{
  "name": "Samsung Galaxy Tab S10 FE 10.9” 128GB Gray",
  "description": "Tablet de alto rendimiento con pantalla de 10.9 pulgadas, almacenamiento interno de 128 GB y diseño elegante en color gris. Ideal para productividad, entretenimiento y navegación fluida. Compatible con stylus y multitarea avanzada.",
  "price": 1399999,
  "categoryId": 6
}

Respuesta:

{
  "id": 19,
  "name": "Samsung Galaxy Tab S10 FE 10.9” 128GB Gray",
  "price": 1399999,
  "categoryId": 6,
  "createdAt": "2025-09-13T01:52:29.511Z"
}
```

### ✏️ Modificar producto

```
PUT /api/products/19  
Authorization: Bearer <ADMIN_TOKEN>

Body:

{
  "name": "Samsung Galaxy Tab S10 FE 10.9” 128GB Silver Edition",
  "description": "Versión especial en color plateado de la tablet Galaxy Tab S10 FE. Mantiene su pantalla de 10.9 pulgadas, 128 GB de almacenamiento y compatibilidad con stylus. Ideal para usuarios que buscan diseño premium y rendimiento fluido.",
  "price": 1449999,
  "categoryId": 6
}

Respuesta:


{
  "id": 19,
  "name": "Samsung Galaxy Tab S10 FE 10.9” 128GB Silver Edition",
  "price": 1449999,
  "categoryId": 6,
  "createdAt": "2025-09-13T01:52:29.511Z"
}
```

### 🗑️ Eliminar producto

```
DELETE /api/products/19
Authorization: Bearer <ADMIN_TOKEN>

Respuesta:

{ "message": "Producto eliminado correctamente ✅" }
```

### 👥 Listar usuarios

```
GET /api/users
Authorization: Bearer <ADMIN_TOKEN>


Respuesta:

[
  { "id": 1, "name": "Agustín Admin", "email": "admin@ecommerce.com", "role": "admin" },
  { "id": 2, "name": "Laura López", "email": "laura@example.com", "role": "user" },
  { "id": 3, "name": "Carlos Ruiz", "email": "carlos@example.com", "role": "user" },
  ...
]
```

### 🔄 Cambiar rol de usuario

```
PUT /api/users/7
Authorization: Bearer <ADMIN_TOKEN>

Body:

{ "role": "admin" }

Respuesta:

{
  "message": "Usuario actualizado correctamente",
  "user": {
    "id": 7,
    "name": "Agustin",
    "email": "agustin@test.com",
    "role": "admin"
  }
}
```

### 🗑️ Eliminar usuario

```
DELETE /api/users/8  
Authorization: Bearer <ADMIN_TOKEN>

Respuesta:

{ "message": "Usuario eliminado correctamente" }
```
