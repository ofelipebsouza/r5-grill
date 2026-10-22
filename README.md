# R5 Grill · Astro + Tailwind CSS

Site responsivo do R5 Grill de Loures. Ementa pesquisável, páginas de produtos, seleção local, contactos e identidade visual oficial.

## Desenvolvimento

- `npm ci`
- `npm run dev`
- `npm test` valida correspondências, proveniência, preservação do catálogo e seleção/WhatsApp (sem enviar mensagens).
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

O catálogo mantém os 55 artigos importados do Uber Eats e os 2 pedidos pelo cliente. `src/data/uber.json` preserva integralmente os dados originais da plataforma. `src/data/restaurant-prices.json` contém 16 correspondências presenciais: 15 conferidas no preçário fornecido em 22/10/2026 e o Bife da Vazia grelhado a 10,50 € da ementa fornecida em 21/10/2026. Data, descrição e fonte são guardadas por artigo; data de fornecimento não é data de vigência. A fotografia nova é uma fonte privada de conferência e não é publicada no site; a imagem anterior da ementa permanece inalterada.

As seis novas correspondências são Maminha sem alho 8,00 €, Picanha ao Alho 9,00 €, Doce da Casa 2,00 €, Serradura (nome do catálogo: Serra Dura) 2,00 €, Gelatina 2,00 € e Água sem gás 33 cl 1,00 €. Os nove preços anteriores encontrados na foto nova foram reconferidos sem alterar os valores. Os outros 40 artigos com fonte Uber mantêm “Uber Eats · referência”. Peixe do Dia continua sob consulta. Rótulos e ressalvas aparecem nos relacionados, detalhes, seleção e mensagem WhatsApp. Não houve expansão do catálogo, descontos ou equivalências por aproximação.

Não se equiparam bifes ao molho a grelhados, frango com bacon ao espetinho genérico, nem menus de bebida aos menus com cerveja. Os refrigerantes da nova foto não têm volume legível/indicado; não substituem automaticamente as referências de 33 cl ou 1,5 L. A água de 33 cl é inequívoca. Os peixes específicos estão sob consulta; o Peixe genérico do Uber mantém-se separado. O rodapé visível do preçário novo indica bebida em copo nos pratos, mas está cortado abaixo: não confirma café. As sobremesas e a água avulsa não recebem inclusões de menu. As fotografias existentes e os avisos de ilustração foram preservados.

O número telefónico de diretório público é preservado; atendimento por WhatsApp não confirmado. A seleção fica no armazenamento de sessão do navegador e abre uma mensagem editável no WhatsApp. Nada é enviado automaticamente e não há pagamentos no site. Fotos ilustrativas mantêm a identificação. Artes de campanha da proposta visual anterior não são promovidas como materiais prontos para publicação.

## Rodapé e serviços de mapas

`Footer.astro` partilha navegação, ementa, marca e informações em todas as 61 páginas. Ícones Maps/Waze mantêm os bytes originais obtidos de páginas públicas oficiais; proveniência e hashes em `public/brand/services/provenance.json`. O uso é referencial nos links existentes, sem alegar parceria ou aprovação específica.
