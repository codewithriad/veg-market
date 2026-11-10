import React from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ShoppingBag } from "lucide-react";
import { useCart } from "../context/useCart";

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

export const SearchFilterPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";

  // Category filter
  const handleCategoryChange = (catId: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (catId === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", catId);
    }

    setSearchParams(newParams);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchParams({});
  };

  const { addToCart } = useCart();

  const handleAddToCart = (id: number) => {
    addToCart({
      id: String(id),
      name: `Product ${id}`,
      price: 120,
      image: "/placeholder.png",
      quantity: 1,
    });
  };

  const selectedCategory =
    ALL_CATEGORIES.find((cat) => cat.id === activeCategory)?.name ||
    "All Categories";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Title */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Explore Products</h1>

          <p className="mt-1 text-sm text-gray-500">
            Find fresh natural foods & vegetables from across Bangladesh
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Categories Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3 font-bold text-gray-900">
              <SlidersHorizontal className="h-4 w-4 text-emerald-700" />
              <span>Categories</span>
            </div>

            <ul className="space-y-1.5">
              {ALL_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;

                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      aria-pressed={isActive}
                      className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-emerald-50 font-semibold text-emerald-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Product Results */}
          <section className="space-y-4 lg:col-span-3">
            {/* Active Filters */}
            <div className="flex flex-col gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-medium">Active Category: </span>

                <strong>{selectedCategory}</strong>

                {searchQuery && (
                  <span className="ml-1">
                    | Search results for{" "}
                    <strong>&quot;{searchQuery}&quot;</strong>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="w-fit text-xs font-semibold text-emerald-700 hover:underline"
              >
                Clear Filters
              </button>
            </div>

            {/* Product Grid - Replace with API data */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <article
                  key={item}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 h-40 w-full overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
                      alt="Fresh natural food"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-600">
                    {activeCategory !== "all"
                      ? selectedCategory
                      : "Natural Food"}
                  </span>

                  <h3 className="mt-2 text-sm font-semibold text-gray-900">
                    Fresh Deshi Organic Item #{item}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Origin: Bogra / Dinajpur
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-700">
                      ৳ 120 / kg
                    </span>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                    >
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterPage;
