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

O catálogo mantém os 55 artigos importados do Uber Eats e os 2 pedidos pelo cliente. `src/data/uber.json` preserva os dados originais da plataforma, mas os seus preços não são apresentados como preços presenciais. `src/data/restaurant-prices.json` contém as 10 correspondências inequívocas com preços na ementa do restaurante fornecida em 21/10/2026. Nos outros 46 artigos com fonte Uber, o preço original da plataforma é apresentado com rótulo explícito “Uber Eats · referência”, sem o confundir com preço presencial. Apenas Peixe do Dia permanece sob consulta. Os rótulos e ressalvas também aparecem nos relacionados, detalhes, seleção e mensagem WhatsApp. Não foi aplicado desconto percentual nem inferida equivalência entre pratos distintos.

A foto indica bebida em copo e café nos pratos, não confirma três acompanhamentos à escolha. Não se equiparou o espetinho com bacon ao produto sem essa composição explícita, nem menus de bebida aos menus com cerveja. Salada Mista permanece a 8,00 €; Peixe do Dia, sob consulta. As imagens recriadas com IA continuam identificadas.

O número telefónico de diretório público é preservado; atendimento por WhatsApp não confirmado. A seleção fica no armazenamento de sessão do navegador e abre uma mensagem editável no WhatsApp. Nada é enviado automaticamente e não há pagamentos no site. Fotos ilustrativas mantêm a identificação. Artes de campanha da proposta visual anterior não são promovidas como materiais prontos para publicação.

## Rodapé e serviços de mapas

`Footer.astro` partilha navegação, ementa, marca e informações em todas as 61 páginas. Ícones Maps/Waze mantêm os bytes originais obtidos de páginas públicas oficiais; proveniência e hashes em `public/brand/services/provenance.json`. O uso é referencial nos links existentes, sem alegar parceria ou aprovação específica.
