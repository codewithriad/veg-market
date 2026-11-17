import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, LoaderCircle } from "lucide-react";

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

const ProductFilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      const categoryKeywords: Record<string, string[]> = {
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

      const keywords = categoryKeywords[activeCategory] || [];

      result = result.filter((product) =>
        keywords.some((keyword) =>
          `${product.title} ${product.category}`
            .toLowerCase()
            .includes(keyword),
        ),
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((product) =>
        `${product.title} ${product.description}`.toLowerCase().includes(query),
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  const handleCategoryChange = (id: string) => {
    const params = new URLSearchParams(searchParams);

    if (id === "all") {
      params.delete("category");
    } else {
      params.set("category", id);
    }

    setSearchParams(params);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
  };

  const selectedCategory =
    ALL_CATEGORIES.find((cat) => cat.id === activeCategory)?.name ||
    "All Categories";

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-widest text-green-600">
            Freshness Delivered
          </span>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Our Products
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Discover fresh and natural products for your everyday needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Category Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
              <SlidersHorizontal size={19} className="text-green-700" />
              <h2 className="font-bold text-gray-900">Categories</h2>
            </div>

            <ul className="space-y-1">
              {ALL_CATEGORIES.map((category) => {
                const active = activeCategory === category.id;

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category.id)}
                      aria-pressed={active}
                      className={`w-full rounded-xl px-3 py-3 text-left text-sm transition ${
                        active
                          ? "bg-green-50 font-bold text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Product Results */}
          <div className="lg:col-span-3">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-100 bg-white px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">
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
                  className="text-xs font-bold text-green-700 hover:underline"
                >
                  Clear Filters
                </button>
              ) : null}
            </div>

            {loading ? (
              <div className="flex min-h-80 items-center justify-center">
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
              <div className="rounded-2xl bg-white p-10 text-center">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 font-semibold text-green-700"
                >
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center">
                <h3 className="font-bold text-gray-800">No products found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try another category or search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
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
