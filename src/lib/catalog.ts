export type ScentFamily = "Floral" | "Amber" | "Woody" | "Fresh";

export type Group = "Face" | "Body" | "Mists";

export type ProductCategory =
  | "Face Wash"
  | "Serum"
  | "Moisturiser"
  | "Lip Care"
  | "Body Lotion"
  | "Body Butter"
  | "Body Oil"
  | "Body Wash"
  | "Body Mist"
  | "Hair & Body Mist";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  group: Group;
  family: ScentFamily;
  price: number;
  volume: string;
  image: string;
  tag?: "New" | "Bestseller";
  description: string;
  story: string;
  details: {
    scent: string[];
    actives: string[];
    ritual: string;
  };
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const products: Product[] = [
  {
    id: "silk-bloom-face-wash",
    name: "Silk Bloom",
    category: "Face Wash",
    group: "Face",
    family: "Fresh",
    price: 385,
    volume: "150 ml",
    image: img("photo-1616750819456-5cdee9b85d22"),
    tag: "New",
    description: "A cloud-soft foaming wash with peony and green tea.",
    story:
      "A daylight cleanse — peony and cool linen, lifted into a light foam that rinses clean and leaves skin calm, never tight. Made for morning basins and late lunches in the Gardens.",
    details: {
      scent: ["Dewy peony", "Green mandarin", "White musk"],
      actives: ["Green tea leaf", "Aloe", "Glycerin"],
      ritual:
        "Massage a pea-sized amount into damp skin for 30 seconds, morning and evening. Rinse with lukewarm water.",
    },
  },
  {
    id: "velvet-orchid-body-lotion",
    name: "Velvet Orchid",
    category: "Body Lotion",
    group: "Body",
    family: "Amber",
    price: 450,
    volume: "250 ml",
    image: img("photo-1623143445418-40c192fa3d11"),
    tag: "Bestseller",
    description: "Lush orchid florals in a silk-soft, warm amber veil.",
    story:
      "The house orchid, made for skin. A light, fast-absorbing lotion that leaves a soft golden trace of amber long after the shower — humid, golden, and unhurried.",
    details: {
      scent: ["Neroli", "Orchid", "Vanilla bean"],
      actives: ["Shea butter", "Glycerin", "Sweet almond oil"],
      ritual:
        "Smooth over damp skin after bathing, from shoulders to ankles. One pump per limb is plenty.",
    },
  },
  {
    id: "iris-noir-hydrating-serum",
    name: "Iris Noir",
    category: "Serum",
    group: "Face",
    family: "Floral",
    price: 780,
    volume: "30 ml",
    image: img("photo-1576426863848-c21f53c60b19"),
    description: "Weightless hydration with a whisper of powdered iris.",
    story:
      "Powdered iris over a water-light base. A serum for evenings that begin in quiet rooms — plumping, cool, and softly scented.",
    details: {
      scent: ["Iris butter", "Violet leaf", "Soft musk"],
      actives: ["Hyaluronic acid", "Niacinamide", "Iris root extract"],
      ritual: "Press three to four drops into clean skin before moisturiser, morning and evening.",
    },
  },
  {
    id: "burgundy-rose-cream-cleanser",
    name: "Burgundy Rose",
    category: "Face Wash",
    group: "Face",
    family: "Floral",
    price: 420,
    volume: "120 ml",
    image: img("photo-1616750819574-7e38aa8046fa"),
    description: "A milky rose cleanser that melts away the day.",
    story:
      "Damask rose in a cushiony cream that lifts the day without stripping. Less bouquet, more fabric — a tailored rose for city evenings.",
    details: {
      scent: ["Damask rose", "Geranium", "Blackcurrant"],
      actives: ["Rosehip oil", "Oat lipids", "Glycerin"],
      ritual:
        "Warm between the palms, massage over dry or damp skin, then rinse or lift away with a warm cloth.",
    },
  },
  {
    id: "velvet-orchid-night-cream",
    name: "Velvet Orchid",
    category: "Moisturiser",
    group: "Face",
    family: "Amber",
    price: 720,
    volume: "50 ml",
    image: img("photo-1609097164502-59a1f0f9a66f"),
    description: "A velvet night cream with orchid and warm amber.",
    story:
      "Rich but breathable, this cream settles into skin as the evening quiets. Orchid extract and a trace of amber leave you with a soft, dewy morning face.",
    details: {
      scent: ["Orchid", "Jasmine sambac", "Amber"],
      actives: ["Shea butter", "Squalane", "Orchid extract"],
      ritual:
        "Warm a pea-sized amount and press over face and neck as the last step of your evening routine.",
    },
  },
  {
    id: "iris-noir-body-lotion",
    name: "Iris Noir",
    category: "Body Lotion",
    group: "Body",
    family: "Floral",
    price: 450,
    volume: "250 ml",
    image: img("photo-1597931752949-98c74b5b159f"),
    description: "The softness of iris, drawn across skin.",
    story:
      "Powdered iris over ink-dark woods, in a quiet everyday lotion. Lightly scented, quickly absorbed, and made to sit beside the Iris Noir serum.",
    details: {
      scent: ["Bergamot", "Iris butter", "Vetiver"],
      actives: ["Squalane", "Glycerin", "Iris root extract"],
      ritual: "Apply to damp skin after bathing, focusing on elbows, knees and shins.",
    },
  },
  {
    id: "midnight-musk-body-butter",
    name: "Midnight Musk",
    category: "Body Butter",
    group: "Body",
    family: "Woody",
    price: 520,
    volume: "200 ml",
    image: img("photo-1630398777649-cdfc7c5e8a24"),
    description: "A dense, warm butter with skin-close musk and sandalwood.",
    story:
      "Skin, smoke, and polished wood, whipped into a butter that reads as warmth rather than perfume — close, private, lasting.",
    details: {
      scent: ["Juniper", "Cashmere wood", "Sandalwood"],
      actives: ["Shea butter", "Cocoa butter", "Jojoba oil"],
      ritual:
        "Warm a small scoop between the palms and press into elbows, knees and hands, or the whole body on dry days.",
    },
  },
  {
    id: "amber-essence-body-oil",
    name: "Amber Essence",
    category: "Body Oil",
    group: "Body",
    family: "Amber",
    price: 560,
    volume: "100 ml",
    image: img("photo-1608571423902-eed4a5ad8108"),
    tag: "New",
    description: "A dry-touch oil with a resinous amber glow.",
    story:
      "Labdanum and sun-warmed resin in a featherlight oil. A slow, resinous trail that lingers on skin long after the shower.",
    details: {
      scent: ["Cardamom", "Labdanum", "Benzoin"],
      actives: ["Jojoba oil", "Sweet almond oil", "Vitamin E"],
      ritual:
        "Warm a few drops in the palms and smooth over damp skin, or add a drop to your lotion.",
    },
  },
  {
    id: "burgundy-rose-body-wash",
    name: "Burgundy Rose",
    category: "Body Wash",
    group: "Body",
    family: "Floral",
    price: 340,
    volume: "250 ml",
    image: img("photo-1619451427882-6aaaded0cc61"),
    description: "A silky rose wash with a wine-dark edge.",
    story:
      "Damask rose with a dry, wine-dark edge, in a creamy wash that cleanses gently and scents the whole bathroom.",
    details: {
      scent: ["Pink grapefruit", "Damask rose", "Patchouli"],
      actives: ["Rose water", "Glycerin", "Coconut-derived cleansers"],
      ritual: "Work into a lather over wet skin with a cloth or your hands, then rinse.",
    },
  },
  {
    id: "amber-essence-lip-balm",
    name: "Amber Essence",
    category: "Lip Care",
    group: "Face",
    family: "Amber",
    price: 195,
    volume: "10 g",
    image: img("photo-1583209814683-c023dd293cc6"),
    description: "Resinous, honeyed comfort for lips.",
    story:
      "Labdanum and sun-warmed resin folded into a cushiony balm. Keep it in your pocket for wind off the Atlantic and long, dry days.",
    details: {
      scent: ["Cardamom", "Benzoin", "Tonka"],
      actives: ["Beeswax", "Cocoa butter", "Vitamin E"],
      ritual: "Sweep over lips whenever they ask, and generously before bed.",
    },
  },
  {
    id: "silk-bloom-body-mist",
    name: "Silk Bloom",
    category: "Body Mist",
    group: "Mists",
    family: "Fresh",
    price: 340,
    volume: "100 ml",
    image: img("photo-1515377905703-c4788e51af15"),
    description: "A light peony mist for skin and linen.",
    story:
      "A daylight water — peony and cool linen. Mist over shoulders and forearms from morning markets to late lunches in the Gardens.",
    details: {
      scent: ["Peony", "Freesia", "White musk"],
      actives: ["Aloe water", "Glycerin", "Green tea"],
      ritual: "Spray from about 20 cm over skin and clothes, and reapply through the day.",
    },
  },
  {
    id: "midnight-musk-hair-body-mist",
    name: "Midnight Musk",
    category: "Hair & Body Mist",
    group: "Mists",
    family: "Woody",
    price: 380,
    volume: "100 ml",
    image: img("photo-1620916297397-a4a5402a3c6c"),
    description: "Warm musk, softly diffused.",
    story:
      "The Midnight Musk accord, lightened into a mist for hair and skin. Close, smoky, and quietly lasting.",
    details: {
      scent: ["Juniper", "Incense", "White musk"],
      actives: ["Aloe water", "Glycerin", "Pro-vitamin B5"],
      ritual: "Mist through hair and over skin from a short distance. Avoid the eyes.",
    },
  },
];

export const featuredIds = [
  "silk-bloom-face-wash",
  "velvet-orchid-body-lotion",
  "iris-noir-hydrating-serum",
] as const;

export const shopByGroup: ReadonlyArray<{
  group: Group;
  label: string;
  blurb: string;
  image: string;
}> = [
  {
    group: "Face",
    label: "Face",
    blurb: "Washes, serums, creams & lip care",
    image: img("photo-1616750819574-7e38aa8046fa", 900),
  },
  {
    group: "Body",
    label: "Body",
    blurb: "Scented lotions, butters, oils & washes",
    image: img("photo-1623143445418-40c192fa3d11", 900),
  },
  {
    group: "Mists",
    label: "Mists",
    blurb: "Light scent for skin, hair & linen",
    image: img("photo-1620916297397-a4a5402a3c6c", 900),
  },
];

export const ritual = [
  {
    step: "01",
    title: "Cleanse",
    body: "Begin with a soft foam that lifts the day without leaving skin tight.",
    productId: "silk-bloom-face-wash",
  },
  {
    step: "02",
    title: "Nourish",
    body: "Press in a water-light serum before the evening quiets.",
    productId: "iris-noir-hydrating-serum",
  },
  {
    step: "03",
    title: "Finish",
    body: "Close with a scented lotion that lingers softly on skin.",
    productId: "velvet-orchid-body-lotion",
  },
] as const;

export const lookbook = [
  {
    src: img("photo-1555820585-c5ae44394b79", 1400),
    alt: "Portrait of a woman with closed eyes seen through glass",
    caption: "Skin, softly",
  },
  {
    src: img("photo-1585945037805-5fd82c2e60b1", 1400),
    alt: "A swatch of white cream on a beige surface",
    caption: "Texture study",
  },
  {
    src: img("photo-1552046122-03184de85e08", 1400),
    alt: "A hand reaching toward a jar of cream, a serum bottle and a sheet mask",
    caption: "The evening ritual",
  },
  {
    src: img("photo-1631730486572-226d1f595b68", 1400),
    alt: "An assortment of cosmetics on a pink background",
    caption: "Pink hour",
  },
] as const;

export const houseIngredients = [
  "Rose",
  "Iris",
  "Shea butter",
  "Amber",
  "Aloe",
  "Jojoba",
  "Peony",
  "Vanilla",
  "Green tea",
  "Sandalwood",
  "Squalane",
  "Orchid",
];

export const heroImage = img("photo-1608571423902-eed4a5ad8108", 1800);
export const atelierImage = img("photo-1598440947619-2c35fc9aa908", 1800);
export const storyImages = [
  img("photo-1583209814683-c023dd293cc6", 800),
  img("photo-1620916297397-a4a5402a3c6c", 800),
] as const;

export function productTitle(p: Product) {
  return `${p.name} ${p.category}`;
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productsInGroup(group: Group): Product[] {
  return products.filter((p) => p.group === group);
}

export function relatedProducts(id: string, limit = 3): Product[] {
  const current = getProduct(id);
  const rest = products.filter((p) => p.id !== id);
  if (!current) return rest.slice(0, limit);
  // Same scent family first (a ritual that smells like itself), then
  // a different product type so pairings feel like a routine, not a repeat.
  const score = (p: Product) =>
    (p.family === current.family ? 2 : 0) + (p.category !== current.category ? 1 : 0);
  return [...rest].sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function formatZar(amount: number) {
  return `R ${amount.toLocaleString("en-ZA")}`;
}
