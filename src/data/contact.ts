export function whatsappOrder(items: Iterable<[string, number]> = []) {
  const lines = [...items].map(([name, quantity]) => `${quantity} × ${name}${name === "Peixe do Dia" ? " (preço sob consulta)" : ""}`);
  const message = lines.length
    ? `Olá, R5 Grill! Gostaria de fazer este pedido:\n\n${lines.join('\n')}\n\nPodem confirmar o preço, a disponibilidade e as opções de recolha ou entrega? Obrigado!`
    : 'Olá, R5 Grill! Gostaria de obter informações sobre um pedido.';
  return `https://wa.me/351968299852?text=${encodeURIComponent(message)}`;
}
export const waze = 'https://waze.com/ul?q=' + encodeURIComponent('Continente Loures, Quinta Casal da Pipa, EN 250, 2670-339 Loures, Portugal') + '&navigate=yes';
