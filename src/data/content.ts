/**
 * DEWY CO. — fictional millennial beauty brand for the
 * awesome-design-md repo test (Clay DESIGN.md applied to beauty).
 *
 * Single source of truth for all copywriting and product data.
 * Component files import only what they need from here.
 */

export type CardVariant = 'pink' | 'teal' | 'lavender' | 'peach' | 'ochre' | 'cream';

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  imageUrl: string;
  cardVariant: CardVariant;
};

export type Testimonial = {
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
};

export type Ingredient = {
  emoji: string;
  name: string;
  description: string;
  cardVariant: 'lavender' | 'peach' | 'ochre';
};

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

const UNSPLASH = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&fit=crop&q=80`;

const PRAVATAR = (n: number) => `https://i.pravatar.cc/200?img=${n}`;

export const BRAND = {
  name: 'DEWY CO.',
  tagline: 'Dewy skin, made fun.',
  subtagline:
    'Botanical-powered makeup that loves your skin back. Cruelty-free, vegan, made with intention.',
  ctaPrimary: 'Try your shade',
  ctaSecondary: 'Read the science',
  navLinks: [
    { label: 'Shop', href: '#products' },
    { label: 'Ritual', href: '#story' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Ingredients', href: '#ingredients' },
  ],
  promiseBadges: ['Cruelty-free', 'Vegan', 'Made with botanicals'],
  heroImageUrl: UNSPLASH('1522337660859-02fbefca4702', 1200),
};

/**
 * Color rotation enforced per Clay rule:
 * pink → teal → lavender → peach → ochre → cream (no adjacent repeats)
 */
export const PRODUCTS: Product[] = [
  {
    id: 'glow-drops',
    name: 'Glow Drops Serum',
    tagline: 'Luminous skincare hybrid with niacinamide + hyaluronic acid.',
    price: '$28',
    imageUrl: UNSPLASH('1556228453-efd6c1ff04f6'),
    cardVariant: 'pink',
  },
  {
    id: 'petal-tint',
    name: 'Petal Lip Tint',
    tagline: 'Buildable lip stain in five botanical shades.',
    price: '$18',
    imageUrl: UNSPLASH('1583241475880-083f84372725'),
    cardVariant: 'teal',
  },
  {
    id: 'cloud-blush',
    name: 'Cloud Cushion Blush',
    tagline: 'Whipped cream blush that melts into a soft flush.',
    price: '$22',
    imageUrl: UNSPLASH('1559056199-641a0ac8b55e'),
    cardVariant: 'lavender',
  },
  {
    id: 'halo-stick',
    name: 'Halo Highlight Stick',
    tagline: 'Multi-use illuminator for cheeks, eyes, and collarbones.',
    price: '$24',
    imageUrl: UNSPLASH('1631730486647-8be7e7b51ce4'),
    cardVariant: 'peach',
  },
  {
    id: 'velvet-brow',
    name: 'Velvet Brow Gel',
    tagline: 'Flexible-hold brow setter with feather-fine fibers.',
    price: '$20',
    imageUrl: UNSPLASH('1607779097040-26e80aa78e66'),
    cardVariant: 'ochre',
  },
  {
    id: 'dewy-mist',
    name: 'Dewy Mist Setting Spray',
    tagline: 'Botanical hydrating finish that locks in glow all day.',
    price: '$26',
    imageUrl: UNSPLASH('1605973029521-8154da591bd7'),
    cardVariant: 'cream',
  },
];

export const FEATURED_PRODUCT = {
  ...PRODUCTS[0],
  longDescription:
    'Our signature Glow Drops blend niacinamide with low-molecular hyaluronic acid and botanical squalane — a serum that wears beautifully under makeup or solo on bare skin.',
  ingredients: ['Niacinamide 5%', 'Hyaluronic Acid', 'Squalane', 'Centella Asiatica'],
  imageUrl: UNSPLASH('1535585209827-a15fcdbc4c2d', 1000),
};

export const BRAND_STORY = {
  eyebrow: 'Why we exist',
  headline: 'Makeup should love your skin back.',
  paragraphs: [
    'DEWY CO. started in a small Jakarta apartment with a simple frustration: every product on our vanity either looked good or felt good — almost never both. So we set out to make makeup that does both, with botanical actives that earn their place on your face.',
    'Three years and twenty-six formulations later, every DEWY product is built around skin-first ingredients. We test on humans, never animals, and we name the actives on the front of the box — not buried in a paragraph of fine print on the back.',
  ],
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Maya Anggraini',
    role: 'Editor at Bazaar Indonesia',
    avatarUrl: PRAVATAR(48),
    quote:
      'The Glow Drops have replaced three serums in my routine. My skin actually looks better at the end of a 12-hour shoot day.',
  },
  {
    name: 'Sasha Lim',
    role: 'Skincare creator',
    avatarUrl: PRAVATAR(44),
    quote:
      'I have rosacea and most blushes light up my cheeks for the wrong reason. The Cloud Cushion is the first one in years that just looks like a flush.',
  },
  {
    name: 'Priya Reddy',
    role: 'Makeup artist',
    avatarUrl: PRAVATAR(32),
    quote:
      'Petal Lip Tint is in my kit for every wedding now. It builds, it lasts, and brides actually want to keep it after.',
  },
  {
    name: 'Alia Fauzia',
    role: 'Long-time customer',
    avatarUrl: PRAVATAR(45),
    quote:
      'I bought DEWY for the look. I keep buying it because my skin is genuinely calmer now than it was a year ago.',
  },
];

export const INGREDIENTS: Ingredient[] = [
  {
    emoji: '💧',
    name: 'Hyaluronic Acid',
    description:
      'Low-molecular form that draws moisture deeper into the skin instead of just sitting on top.',
    cardVariant: 'lavender',
  },
  {
    emoji: '✨',
    name: 'Niacinamide 5%',
    description:
      'Vitamin B3 at the clinically meaningful concentration. Smooths texture, fades discoloration, and respects the barrier.',
    cardVariant: 'peach',
  },
  {
    emoji: '🍊',
    name: 'Vitamin C (THD Ascorbate)',
    description:
      'A stable, oil-soluble form of vitamin C that brightens without the sting of L-ascorbic acid.',
    cardVariant: 'ochre',
  },
];

export const EMAIL_CAPTURE = {
  eyebrow: 'Join the dew list',
  headline: 'First access. Quiet drops. Never spam.',
  body: 'Early-bird pricing on new launches and the occasional skincare deep-dive. Unsubscribe in one click.',
  placeholder: 'your@email.com',
  cta: 'Keep me posted',
};

export const FOOTER: { columns: FooterColumn[]; tagline: string } = {
  tagline: '© 2026 DEWY CO. — Made with intention in Jakarta.',
  columns: [
    {
      heading: 'Shop',
      links: [
        { label: 'All products', href: '#' },
        { label: 'Skincare', href: '#' },
        { label: 'Makeup', href: '#' },
        { label: 'Bundles', href: '#' },
      ],
    },
    {
      heading: 'Learn',
      links: [
        { label: 'The Ritual', href: '#' },
        { label: 'Ingredients', href: '#' },
        { label: 'Journal', href: '#' },
        { label: 'Quiz', href: '#' },
      ],
    },
    {
      heading: 'Care',
      links: [
        { label: 'Shipping', href: '#' },
        { label: 'Returns', href: '#' },
        { label: 'FAQ', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      heading: 'Brand',
      links: [
        { label: 'About', href: '#' },
        { label: 'Sustainability', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
  ],
};
