export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "All Types of Rice",
    slug: "rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Nuts & Seeds",
    slug: "nuts-seeds",
    image:
      "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Gourds & Melons",
    slug: "gourds-melons",
    image:
      "https://framerusercontent.com/images/HzEbaMjpqV2c9cHT34IFI24X2GU.jpg?height=1080&width=1920",
  },
  {
    id: "4",
    name: "Leafy Greens",
    slug: "leafy-greens",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    name: "Tubers & Roots",
    slug: "tubers-roots",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    name: "Nightshades",
    slug: "nightshades",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "7",
    name: "Pods & Raw Fruits",
    slug: "pods-fruits",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "8",
    name: "Lentils & Pulses",
    slug: "lentils-pulses",
    image:
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "9",
    name: "Native Fruits",
    slug: "native-fruits",
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "10",
    name: "Spices & Herbs",
    slug: "spices-herbs",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80",
  },
];

export const ALL_CATEGORIES = [
  { id: "all", name: "All Categories" },
  ...CATEGORIES.map(({ slug, name }) => ({
    id: slug,
    name,
  })),
];
