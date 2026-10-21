import catalog from './uber.json';
export const products=catalog.map((p,i)=>({...p,i}));
export const menu=products.map(p=>[p.name,p.category,p.price,p.description]);
export const slugify=(name:string)=>products.find(p=>p.name===name)?.slug || name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const eats="https://www.ubereats.com/pt/store/r5-grill-st-antonio-cavaleiros/4ebZsXLmS3SEjUKn45eU6Q";
