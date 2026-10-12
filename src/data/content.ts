export const image = (name: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/${name}.jpg`;

export type Shade = { name: string; color: string };
export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'Skin' | 'Lips' | 'Face' | 'Brows';
  image: string;
  detail: string;
  shades: Shade[];
  ritual: string;
};

export const BRAND = {
  name: 'DEWY CO.',
  tagline: 'A little ritual. A natural glow.',
  subtagline: 'Skin-first makeup. Botanical ingredients. A little more you.',
  navLinks: [
    { label: 'The collection', href: '#products' },
    { label: 'Our philosophy', href: '#story' },
    { label: 'The journal', href: '#journal' },
  ],
  promiseBadges: ['Skin-first formulas', 'Botanical ingredients', 'Vegan & cruelty-free'],
};

export const CAMPAIGNS = [
  { label: 'Natural glow', image: 'hero', alt: 'Beauty campaign: a close-up portrait with luminous skin in warm light', productId: 'glow-drops' },
  { label: 'Everyday ritual', image: 'ritual', alt: 'Beauty campaign: a quiet moment in a personal skincare ritual', productId: 'dewy-mist' },
  { label: 'Soft colour', image: 'blush', alt: 'Beauty campaign: softly blended cheek colour in a studio portrait', productId: 'cloud-blush' },
];

export const PRODUCTS: Product[] = [
  { id: 'glow-drops', name: 'Glow Drops Serum', tagline: 'Your skin, in its best light.', description: 'A luminous skincare hybrid with niacinamide, hyaluronic acid and botanical squalane. Wear alone or as the first step in your makeup ritual.', price: 28, category: 'Skin', image: 'serum', detail: 'Niacinamide · Hyaluronic acid', shades: [], ritual: 'Smooth a few drops onto clean skin before makeup.' },
  { id: 'petal-tint', name: 'Petal Lip Tint', tagline: 'A whisper of colour.', description: 'A buildable botanical lip tint. One layer for a hint of colour; another for a little more expression. Five shades to make your own.', price: 18, category: 'Lips', image: 'lips', detail: 'Sheer colour · Buildable finish', shades: [{name:'Petal',color:'petal'},{name:'Rose',color:'rose'},{name:'Fig',color:'fig'},{name:'Nude',color:'nude'},{name:'Poppy',color:'poppy'}], ritual: 'Tap onto the centre of your lips and blend outward.' },
  { id: 'cloud-blush', name: 'Cloud Cushion Blush', tagline: 'The art of a soft flush.', description: 'Whipped cream blush that melts into a soft flush. A skin-first approach to a little colour, with a texture made for fingertips.', price: 22, category: 'Face', image: 'blush', detail: 'Whipped cream · Soft flush', shades: [{name:'Petal',color:'petal'},{name:'Rose',color:'rose'},{name:'Fig',color:'fig'}], ritual: 'Press a small amount onto cheeks and blend with your fingertips.' },
  { id: 'halo-stick', name: 'Halo Highlight Stick', tagline: 'Catch the light. Keep it.', description: 'A multi-use illuminator for cheeks, eyes and collarbones. The finishing touch for a light-catching, luminous look.', price: 24, category: 'Face', image: 'highlight', detail: 'Multi-use · Luminous finish', shades: [{name:'Pearl',color:'pearl'},{name:'Golden',color:'golden'}], ritual: 'Glide across the high points of your face and gently blend.' },
  { id: 'velvet-brow', name: 'Velvet Brow Gel', tagline: 'A little shape. Still you.', description: 'A flexible-hold brow setter with feather-fine fibres. Brush into your own shape, without losing the softness.', price: 20, category: 'Brows', image: 'brow', detail: 'Flexible hold · Feather-fine fibres', shades: [{name:'Soft brown',color:'brown'},{name:'Deep brown',color:'deep'}], ritual: 'Brush upward from the inner brow, then shape toward the tail.' },
  { id: 'dewy-mist', name: 'Dewy Mist Setting Spray', tagline: 'One last moment of dew.', description: 'A botanical hydrating mist to finish your makeup ritual. A light finishing step when your skin wants a little refresh.', price: 26, category: 'Skin', image: 'mist', detail: 'Botanical mist · Hydrating finish', shades: [], ritual: 'Close your eyes and mist lightly over your finished look.' },
];

export const BRAND_STORY = {
  headline: 'Makeup should love your skin back.',
  paragraphs: [
    'Our story began in a small Jakarta apartment, with a simple thought: why choose between makeup that looks good and makeup that feels good?',
    'We make skin-first essentials with botanical ingredients and everyday rituals in mind. Less covering up. More coming into your own. This is beauty, on your terms.',
  ],
};
export const INGREDIENTS = [
  { name: 'Hyaluronic acid', benefit: 'A little drink for your skin.', description: 'A moisture-binding ingredient in Glow Drops. Think of it as the hydrating step at the beginning of your ritual, not a replacement for your full skincare routine.' },
  { name: 'Niacinamide', benefit: 'The thoughtful everyday essential.', description: 'Also known as vitamin B3, niacinamide is part of our skin-first Glow Drops formula. Explore the ingredients behind the finish; individual experiences vary.' },
  { name: 'Botanical squalane', benefit: 'Softness, from the first drop.', description: 'An emollient in Glow Drops that brings a soft, comfortable feel to your ritual. Botanical ingredients are a formulation choice, not a promise that every skin will respond the same way.' },
];
export const JOURNAL = [
  {title:'The beauty of doing less.',description:'Meet your three-step morning ritual: prepare, bring a little colour, and finish in your own light.',image:'journal-skin',productId:'glow-drops'},
  {title:'Find your everyday flush.',description:'Fingertips, a little cream blush, and a moment in the mirror. Make soft colour your own.',image:'story',productId:'cloud-blush'},
  {title:'A lip look that feels like you.',description:'One sheer layer or a little more? Discover the small ritual behind a buildable botanical tint.',image:'journal-lips',productId:'petal-tint'},
];
export const money = (value: number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
