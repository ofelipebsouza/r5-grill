import catalog from './uber.json';
// Customer-requested item is kept separate from the verified Uber Eats catalogue.
const requestedItems=[
  {id:'salada-mista-requested',name:'Salada Mista',category:'Saladas',price:'8,00',description:'Ingredientes e disponibilidade a confirmar com o restaurante.',slug:'salada-mista',image:'/images/catalogo/salada-mista-referencia.webp',url:'',rating:'',imageKind:'reference',imageNote:'Imagem ilustrativa recriada com IA a partir do cardápio. A apresentação pode variar.',sourceName:'Referência fornecida pelo cliente',volumeNote:'',sourceKind:'reference'},
  {id:'peixe-do-dia-requested',name:'Peixe do Dia',category:'Peixe',price:'',description:'Espécie, preço e disponibilidade a confirmar com o restaurante.',slug:'peixe-do-dia',image:'/images/catalogo/peixe-dia-referencia.webp',url:'',rating:'',imageKind:'reference',imageNote:'Imagem ilustrativa recriada com IA a partir do cardápio. A apresentação pode variar.',sourceName:'Referência fornecida pelo cliente',volumeNote:'',sourceKind:'reference'}
];
export const products=[...catalog.map(p=>({...p,sourceKind:"uber"})),...requestedItems.filter(item=>!catalog.some(p=>p.slug===item.slug||p.name.toLocaleLowerCase('pt')===item.name.toLocaleLowerCase('pt')))].map((p,i)=>({...p,i}));
export const menu=products.map(p=>[p.name,p.category,p.price,p.description]);
export const slugify=(name:string)=>products.find(p=>p.name===name)?.slug || name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const eats="https://www.ubereats.com/pt/store/r5-grill-st-antonio-cavaleiros/4ebZsXLmS3SEjUKn45eU6Q";
