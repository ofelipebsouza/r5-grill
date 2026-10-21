import restaurantPrices from './restaurant-prices.json';
import uberCatalog from './uber.json';

export function selectionLine(name: string, quantity: number) {
  const restaurant = restaurantPrices.find(item => item.name === name && item.price);
  const uber = uberCatalog.find(item => item.name === name && item.price);
  const source = restaurant ? `referência restaurante: ${restaurant.price} € por unidade` : uber ? `referência Uber Eats: ${uber.price} € por unidade; preço direto a confirmar` : "preço sob consulta";
  return `${quantity} × ${name} (${source})`;
}

export function whatsappOrder(items: Iterable<[string, number]> = []) {
  const lines = [...items].map(([name, quantity]) => selectionLine(name, quantity));
  const message = lines.length
    ? `Olá, R5 Grill! Gostaria de fazer este pedido:\n\n${lines.join('\n')}\n\nPodem confirmar o preço, a disponibilidade e as opções de recolha ou entrega? Obrigado!`
    : 'Olá, R5 Grill! Gostaria de obter informações sobre um pedido.';
  return `https://wa.me/351968299852?text=${encodeURIComponent(message)}`;
}
export const waze = 'https://waze.com/ul?q=' + encodeURIComponent('Continente Loures, Quinta Casal da Pipa, EN 250, 2670-339 Loures, Portugal') + '&navigate=yes';

export const googleMapsDirections = 'https://www.google.com/maps/dir/?api=1&destination=R5+Grill+Continente+Loures+Quinta+Casal+da+Pipa';
