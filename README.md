# R5 Grill · Astro + Tailwind CSS

Site responsivo do R5 Grill de Loures. Ementa pesquisável, páginas de produtos, seleção local, contactos e identidade visual oficial.

## Desenvolvimento

- `npm ci`
- `npm run dev`
- `npm run build` gera `dist/` (61 páginas).
- `npm run preview`
- Vercel: preset Astro. Em ambientes de execução sem diretório de configuração, use `ASTRO_TELEMETRY_DISABLED=1 npm run build`.

## Páginas

- `/`: restaurante e catálogo de 57 artigos.
- `/pratos/[slug]/`: informações, quantidade e seleção por artigo.
- `/marca`: guia visual, paleta, aplicações e downloads oficiais.
- `/instagram`: avatar oficial e orientações para aplicação da identidade.
- `/fontes`: origem dos conteúdos e limites de validação.

## Identidade

Logo oficial fornecido pelo cliente e reconstruído em curvas SVG. Vermelho `#D5001F`, preto `#000000`, branco `#FFFFFF`, cinza de apoio `#E5E5E5`. Os assets estão em `public/brand/`, com kit ZIP, vetores, PNGs, PDF, guia e tokens. Favicons na raiz de `public/` são aplicados através de `BrandHead.astro`. O logótipo completo é usado por `Brand.astro`.

## Conteúdo e limites

O catálogo do Uber Eats contém 55 artigos consultados em 21/10/2026. Nomes e preços da plataforma foram preservados. A Salada Mista (8,00 € na referência) e o Peixe do Dia (sob consulta) foram adicionados separadamente, por pedido do cliente. Não foram equiparados ao Peixe do Uber Eats (12,00 €). As imagens ilustrativas recriadas com IA são identificadas; espécie e proteína incerta não são inferidas. Os dois novos artigos não têm um link Uber Eats inventado.

O número telefónico de diretório público é preservado; atendimento por WhatsApp não confirmado. A seleção fica no armazenamento de sessão do navegador e abre uma mensagem editável no WhatsApp. Nada é enviado automaticamente e não há pagamentos no site. Fotos ilustrativas mantêm a identificação. Artes de campanha da proposta visual anterior não são promovidas como materiais prontos para publicação.
