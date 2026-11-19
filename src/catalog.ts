export type Category = 'T-shirts' | 'Layers' | 'Bottoms';
export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  color: string;
  hex: string;
  tag?: string;
  description: string;
  fabric: string;
  fit: string;
  colors?: { name: string; hex: string; image: string }[];
};

export const products: Product[] = [
  { id: 'everyday-tee', name: 'The everyday tee', category: 'T-shirts', price: 48, image: '/images/product-01.jpg', color: 'Chalk', hex: '#dedbd1', tag: 'THE ESSENTIAL', description: 'The one you reach for, again and again. A simple crew-neck tee, an easy silhouette, and endless possibilities. Stock images illustrate the colour direction, not an exact manufactured product.', fabric: 'Concept specification: 100% cotton, 240 GSM.', fit: 'Concept fit: relaxed. Choose your usual size for an easy silhouette.', colors: [{ name: 'Chalk', hex: '#dedbd1', image: '/images/product-01.jpg' }, { name: 'Black', hex: '#252523', image: '/images/product-02.jpg' }] },
  { id: 'monochrome-edit', name: 'The monochrome edit', category: 'T-shirts', price: 92, image: '/images/product-02.jpg', color: 'Black', hex: '#252523', tag: 'THE ESSENTIALS SET', description: 'Three shapes, one quiet palette. A concept set of short- and long-sleeve crew-neck tops in everyday black. Stock styling reference shown.', fabric: 'Concept specification: cotton jersey.', fit: 'Concept fit: relaxed through the body with a clean crew neckline.' },
  { id: 'everyday-hoodie', name: 'The everyday hood', category: 'Layers', price: 112, image: '/images/product-03.jpg', color: 'Chalk', hex: '#e2e1da', tag: 'NEW ARRIVAL', description: 'For the space between seasons. A clean pullover hoodie with an easy silhouette and a generous hood. Jeans and other styling items are not included in this concept piece.', fabric: 'Concept specification: cotton loopback fleece.', fit: 'Concept fit: relaxed. Designed to layer over your everyday tee.' },
  { id: 'denim-layer', name: 'The denim layer', category: 'Layers', price: 108, image: '/images/product-04.jpg', color: 'Washed blue', hex: '#617e8c', description: 'A little character goes a long way. A distressed denim jacket imagined as your everyday extra layer. Stock styling reference shown; the hoodie is not included.', fabric: 'Concept specification: cotton denim.', fit: 'Concept fit: easy through the shoulders with room to layer.' },
  { id: 'relaxed-trouser', name: 'The relaxed trouser', category: 'Bottoms', price: 96, image: '/images/product-05.jpg', color: 'Dusty rose', hex: '#c89c8d', tag: 'NEW ARRIVAL', description: 'A softer way to move through the day. Easy trousers with an elasticated waist, cuffed ankles and practical pockets. Stock styling reference shown.', fabric: 'Concept specification: lightweight woven cotton blend.', fit: 'Concept fit: relaxed leg with gathered cuffs. See the sample size guide.' },
  { id: 'everyday-overshirt', name: 'The everyday overshirt', category: 'Layers', price: 128, image: '/images/product-06.jpg', color: 'Taupe', hex: '#827766', description: 'Somewhere between a shirt and a jacket. A softly utilitarian extra layer in warm taupe. This stock detail photograph illustrates the intended texture and colour.', fabric: 'Concept specification: heavyweight cotton twill.', fit: 'Concept fit: relaxed with room for a lightweight layer underneath.' },
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;
export const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export const imageCredits = [
  { name: 'Malicki M Beser', url: 'https://unsplash.com/photos/PKMvkg7vnUo', subject: 'Fashion editorial' },
  { name: 'Haryo Setyadi', url: 'https://unsplash.com/photos/acn5ERAeSb4', subject: 'White tee' },
  { name: 'Ryan Hoffman', url: 'https://unsplash.com/photos/Cs4GVbMqKGY', subject: 'Black essentials' },
  { name: 'Mediamodifier', url: 'https://unsplash.com/photos/kJXGTOY1wLQ', subject: 'White hoodie' },
  { name: 'Lara Muller', url: 'https://unsplash.com/photos/30Qy4X4JmNI', subject: 'Denim styling' },
  { name: 'engin akyurt', url: 'https://unsplash.com/photos/5raPrOhbKQo', subject: 'Rose trousers' },
  { name: 'Thanos Pal', url: 'https://unsplash.com/photos/TzOFHGBBKcU', subject: 'Overshirt detail' },
];
