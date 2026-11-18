import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  LoaderCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { getProducts } from "../api/productApi";
import ProductCard from "../components/products/ProductCard";
import { useCart } from "../context/useCart";
import { useWishlist } from "../hooks/useWishlist";
import type { Product } from "../types/product";

const ALL_CATEGORIES = [
  { id: "all", name: "All Categories" },
  { id: "rice", name: "All Types of Rice" },
  { id: "nuts-seeds", name: "Nuts & Seeds" },
  { id: "gourds-melons", name: "Gourds & Melons" },
  { id: "leafy-greens", name: "Leafy Greens" },
  { id: "tubers-roots", name: "Tubers & Roots" },
  { id: "nightshades", name: "Nightshades" },
  { id: "pods-fruits", name: "Pods & Raw Fruits" },
  { id: "lentils-pulses", name: "Lentils & Pulses" },
  { id: "native-fruits", name: "Native Fruits" },
  { id: "spices-herbs", name: "Spices & Herbs" },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  rice: ["rice"],
  "nuts-seeds": ["nut", "seed", "almond", "peanut"],
  "gourds-melons": ["melon", "pumpkin", "gourd"],
  "leafy-greens": ["spinach", "lettuce", "cabbage"],
  "tubers-roots": ["potato", "carrot", "root", "beet"],
  nightshades: ["tomato", "pepper", "eggplant"],
  "pods-fruits": ["bean", "pea", "fruit", "cucumber"],
  "lentils-pulses": ["lentil", "pulse", "chickpea"],
  "native-fruits": ["apple", "banana", "mango", "orange"],
  "spices-herbs": ["spice", "herb", "ginger", "garlic"],
};

const ProductFilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const activeCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Load Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (activeCategory !== "all") {
      const keywords = CATEGORY_KEYWORDS[activeCategory] || [];

      result = result.filter((product) => {
        const searchableText =
          `${product.title} ${product.category}`.toLowerCase();

        return keywords.some((keyword) => searchableText.includes(keyword));
      });
    }

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((product) =>
        `${product.title} ${product.description}`.toLowerCase().includes(query),
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  // Category Change
  const handleCategoryChange = (id: string) => {
    const params = new URLSearchParams(searchParams);

    // Remove previous search when selecting a category
    params.delete("q");

    if (id === "all") {
      params.delete("category");
    } else {
      params.set("category", id);
    }

    setSearchParams(params);
    setIsCategoryOpen(false);
  };

  // Add to Cart
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
  };

  // Selected Category
  const selectedCategory =
    ALL_CATEGORIES.find((cat) => cat.id === activeCategory)?.name ||
    "All Categories";

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-7 sm:mb-8">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-green-600">
            Freshness Delivered
          </span>

          <h1 className="text-3xl font-medium text-gray-900 sm:text-4xl">
            Explore Our Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Discover fresh and natural products for your everyday needs.
          </p>
        </div>

        {/* Mobile Category Toggle */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
            aria-expanded={isCategoryOpen}
            aria-controls="product-category-sidebar"
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-black shadow-sm transition hover:border-green-300 hover:bg-green-50"
          >
            <span className="flex items-center gap-3">
              <SlidersHorizontal size={19} className="text-green-700" />

              <span className="text-sm font-bold">Categories</span>

              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                {selectedCategory}
              </span>
            </span>

            {isCategoryOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Category Sidebar */}
          <aside
            id="product-category-sidebar"
            className={`
              h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm
              ${isCategoryOpen ? "block" : "hidden"}
              lg:sticky lg:top-24 lg:block
              lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto
            `}
          >
            {/* Sidebar Header */}
            <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
              <SlidersHorizontal size={19} className="text-green-700" />

              <h2 className="font-bold text-black">Categories</h2>
            </div>

            {/* Category List */}
            <ul className="space-y-1">
              {ALL_CATEGORIES.map((category) => {
                const active = activeCategory === category.id;

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category.id)}
                      aria-pressed={active}
                      className={`w-full rounded-xl px-3 py-3 text-left text-sm transition-all duration-200 ${
                        active
                          ? "bg-green-50 font-bold text-black"
                          : "font-medium text-black hover:bg-gray-100"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        {category.name}

                        {active && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-green-600" />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Product Results */}
          <div className="min-w-0">
            {/* Results Header */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-100 bg-white px-4 py-4">
              <div>
                <p className="text-sm font-bold text-black sm:text-base">
                  {selectedCategory}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {filteredProducts.length} products found
                </p>
              </div>

              {activeCategory !== "all" || searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  className="text-xs font-bold text-green-700 transition hover:text-green-900 hover:underline"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white">
                <div className="text-center">
                  <LoaderCircle
                    size={38}
                    className="mx-auto animate-spin text-green-700"
                  />

                  <p className="mt-3 text-sm text-gray-500">
                    Loading fresh products...
                  </p>
                </div>
              </div>
            ) : error ? (
              /* Error State */
              <div className="rounded-2xl bg-white p-10 text-center">
                <p className="text-red-600">{error}</p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 font-semibold text-green-700 hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="rounded-2xl bg-white p-12 text-center">
                <h3 className="font-bold text-gray-800">No products found</h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another category or search term.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  className="mt-5 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  View All Products
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isWishlisted(product.id)}
                    onToggleWishlist={toggleWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilterPage;
