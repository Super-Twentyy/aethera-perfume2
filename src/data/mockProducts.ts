// =============================================
// Aethera Perfume — Mock Product Data
// Used as fallback when Sanity CMS is not configured
// =============================================

import type { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    _id: "prod-001",
    name: "Aethera Miroir",
    slug: { current: "aethera-miroir" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/miroir.jpg" },
        alt: "Aethera Miroir perfume bottle",
      },
    ],
    description:
      "Seperti pantulan cermin yang mengungkapkan sisi terdalam dirimu. Aethera Miroir memadukan keanggunan iris dan kesegaran yuzu dalam harmoni yang memikat. Setiap semprotan adalah refleksi dari kepribadian unikmu.",
    fragranceFamily: "Floral",
    notes: {
      top: "Yuzu, Bergamot, Pink Pepper",
      middle: "Iris, Jasmine, Rose Absolute",
      base: "White Musk, Sandalwood, Ambroxan",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 189000, weightGram: 100, stock: 25 },
      { _key: "v2", size: "50ml", price: 279000, weightGram: 150, stock: 18 },
      { _key: "v3", size: "100ml", price: 449000, weightGram: 250, stock: 10 },
    ],
  },
  {
    _id: "prod-002",
    name: "Aethera Nuit",
    slug: { current: "aethera-nuit" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/nuit.jpg" },
        alt: "Aethera Nuit perfume bottle",
      },
    ],
    description:
      "Terinspirasi dari keheningan malam berbintang. Aethera Nuit adalah komposisi oriental yang kaya dan misterius, sempurna untuk momen-momen tak terlupakan di bawah cahaya rembulan.",
    fragranceFamily: "Oriental",
    notes: {
      top: "Saffron, Cardamom, Bergamot",
      middle: "Oud, Rose de Mai, Incense",
      base: "Amber, Vanilla, Benzoin, Patchouli",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 219000, weightGram: 100, stock: 20 },
      { _key: "v2", size: "50ml", price: 329000, weightGram: 150, stock: 15 },
      { _key: "v3", size: "100ml", price: 519000, weightGram: 250, stock: 8 },
    ],
  },
  {
    _id: "prod-003",
    name: "Aethera Zéphyr",
    slug: { current: "aethera-zephyr" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/zephyr.jpg" },
        alt: "Aethera Zéphyr perfume bottle",
      },
    ],
    description:
      "Dinamis seperti angin barat yang membawa kesegaran musim semi. Aethera Zéphyr menangkap esensi kebebasan dengan sentuhan aquatic dan aromatic yang membangkitkan semangat.",
    fragranceFamily: "Fresh",
    notes: {
      top: "Sea Salt, Grapefruit, Lemon Zest",
      middle: "Lavender, Geranium, Marine Accord",
      base: "Cedarwood, White Musk, Driftwood",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 169000, weightGram: 100, stock: 30 },
      { _key: "v2", size: "50ml", price: 259000, weightGram: 150, stock: 22 },
      { _key: "v3", size: "100ml", price: 419000, weightGram: 250, stock: 12 },
    ],
  },
  {
    _id: "prod-004",
    name: "Aethera Boisé",
    slug: { current: "aethera-boise" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/boise.jpg" },
        alt: "Aethera Boisé perfume bottle",
      },
    ],
    description:
      "Kehangatan hutan di pagi hari yang tertangkap dalam botol. Aethera Boisé adalah perpaduan woody-aromatic yang maskulin namun tetap elegan, cocok untuk jiwa-jiwa petualang.",
    fragranceFamily: "Woody",
    notes: {
      top: "Black Pepper, Elemi, Ginger",
      middle: "Vetiver, Cypress, Violet Leaf",
      base: "Sandalwood, Cedarwood, Tonka Bean, Leather",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 199000, weightGram: 100, stock: 18 },
      { _key: "v2", size: "50ml", price: 299000, weightGram: 150, stock: 14 },
      { _key: "v3", size: "100ml", price: 479000, weightGram: 250, stock: 7 },
    ],
  },
  {
    _id: "prod-005",
    name: "Aethera Lumière",
    slug: { current: "aethera-lumiere" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/lumiere.jpg" },
        alt: "Aethera Lumière perfume bottle",
      },
    ],
    description:
      "Sinar matahari pertama yang menyentuh kelopak bunga. Aethera Lumière adalah ekspresi feminim yang bercahaya, memadukan white flowers dan musk yang lembut untuk kesan yang tak lekang oleh waktu.",
    fragranceFamily: "Floral",
    notes: {
      top: "Neroli, Mandarin, Pear",
      middle: "Tuberose, Ylang-Ylang, Peony",
      base: "Cashmere Musk, Ambergris, Vanilla",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 189000, weightGram: 100, stock: 28 },
      { _key: "v2", size: "50ml", price: 289000, weightGram: 150, stock: 20 },
      { _key: "v3", size: "100ml", price: 459000, weightGram: 250, stock: 11 },
    ],
  },
  {
    _id: "prod-006",
    name: "Aethera Onyx",
    slug: { current: "aethera-onyx" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/onyx.jpg" },
        alt: "Aethera Onyx perfume bottle",
      },
    ],
    description:
      "Kedalaman batu onyx hitam yang menyimpan misteri. Aethera Onyx adalah oriental-woody yang bold dan provocative, diciptakan untuk mereka yang tak takut menonjol di keramaian.",
    fragranceFamily: "Oriental",
    notes: {
      top: "Black Currant, Absinthe, Pink Pepper",
      middle: "Dark Rose, Oud, Labdanum",
      base: "Black Amber, Musk, Castoreum, Vetiver",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 239000, weightGram: 100, stock: 0 },
      { _key: "v2", size: "50ml", price: 359000, weightGram: 150, stock: 0 },
      { _key: "v3", size: "100ml", price: 559000, weightGram: 250, stock: 0 },
    ],
    isSoldOut: true,
  },
  {
    _id: "prod-007",
    name: "Aethera Soleil",
    slug: { current: "aethera-soleil" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/soleil.jpg" },
        alt: "Aethera Soleil perfume bottle",
      },
    ],
    description:
      "Kehangatan matahari mediterania yang memeluk kulitmu. Aethera Soleil adalah fresh-oriental yang vibrant, sempurna menemani hari-hari penuh energi dan tawa.",
    fragranceFamily: "Fresh",
    notes: {
      top: "Blood Orange, Lemon Verbena, Basil",
      middle: "Orange Blossom, Jasmine Sambac, Fig",
      base: "Coconut, Blonde Wood, Solar Musk",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 179000, weightGram: 100, stock: 35 },
      { _key: "v2", size: "50ml", price: 269000, weightGram: 150, stock: 25 },
      { _key: "v3", size: "100ml", price: 429000, weightGram: 250, stock: 15 },
    ],
  },
  {
    _id: "prod-008",
    name: "Aethera Velvet",
    slug: { current: "aethera-velvet" },
    images: [
      {
        _key: "img1",
        asset: { _ref: "", url: "/products/velvet.jpg" },
        alt: "Aethera Velvet perfume bottle",
      },
    ],
    description:
      "Kelembutan beludru yang mewah dan memanjakan indera. Aethera Velvet adalah gourmand-floral yang manis namun sophisticated, seperti pelukan hangat di malam yang tenang.",
    fragranceFamily: "Oriental",
    notes: {
      top: "Raspberry, Saffron, Bergamot",
      middle: "Turkish Rose, Praline, Orris",
      base: "Vanilla Absolute, Musk, Cashmeran, Cocoa",
    },
    variants: [
      { _key: "v1", size: "30ml", price: 209000, weightGram: 100, stock: 22 },
      { _key: "v2", size: "50ml", price: 319000, weightGram: 150, stock: 16 },
      { _key: "v3", size: "100ml", price: 499000, weightGram: 250, stock: 9 },
    ],
  },
];
