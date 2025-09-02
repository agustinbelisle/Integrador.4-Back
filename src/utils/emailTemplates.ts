export const registrationEmailTemplate = (name: string) => `
  <h1>Bienvenido a Mi Tienda, ${name}!</h1>
  <p>Gracias por registrarte. Estamos felices de tenerte con nosotros.</p>
`;

interface OrderItem {
  product: { name: string };
  quantity: number;
  price: number;
}

export const orderEmailTemplate = (
  orderId: number,
  total: number,
  items: OrderItem[]
) => {
  const itemsHtml = items
    .map(
      (item) => `
        <li>
          ${item.product.name} - Cantidad: ${item.quantity} - Subtotal: $${(
        item.price * item.quantity
      ).toFixed(2)}
        </li>
      `
    )
    .join('');

  return `
    <h1>Gracias por tu compra!</h1>
    <p>Tu pedido con ID <strong>${orderId}</strong> ha sido recibido.</p>
    <p>Total: $${total.toFixed(2)}</p>
    <h3>Productos:</h3>
    <ul>
      ${itemsHtml}
    </ul>
    <p>Pronto te enviaremos más detalles.</p>
  `;
};
