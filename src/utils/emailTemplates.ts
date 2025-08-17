export const registrationEmailTemplate = (name: string) => `
  <h1>Bienvenido a Mi Tienda, ${name}!</h1>
  <p>Gracias por registrarte. Estamos felices de tenerte con nosotros.</p>
`;

export const orderEmailTemplate = (orderId: number, total: number) => `
  <h1>Gracias por tu compra!</h1>
  <p>Tu pedido con ID <strong>${orderId}</strong> ha sido recibido.</p>
  <p>Total: $${total.toFixed(2)}</p>
  <p>Pronto te enviaremos más detalles.</p>
`;
