import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/useCart";

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Fresh Red Tomatoes",
    price: 45,
    unit: "500g",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=85",
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Fresh Broccoli",
    price: 80,
    unit: "500g",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=85",
    badge: "Popular",
  },
  {
    id: "3",
    name: "Fresh Carrots",
    price: 50,
    unit: "500g",
    image:
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "4",
    name: "Green Vegetables",
    price: 65,
    unit: "500g",
    image:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=85",
  },
];

const TopSellingProducts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-green-600">
              Customer Favorites
            </span>

            <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
              Top Selling Products
            </h2>

            <p className="mt-3 max-w-lg text-sm text-gray-500 sm:text-base">
              Discover our most popular fresh vegetables, handpicked for your
              everyday needs.
            </p>
          </div>

          <a
            href="/products"
            className="neon-button group hidden items-center gap-2 rounded-full border border-green-400/70 bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_12px_rgba(34,197,94,0.6)] transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.9)] sm:inline-flex"
          >
            View All Products
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {product.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-[10px] font-semibold text-white sm:text-xs">
                    {product.badge}
                  </span>
                )}

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                  className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-700"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-4">
                <h3 className="line-clamp-1 text-sm font-semibold text-gray-800 transition-colors group-hover:text-green-700 sm:text-base">
                  {product.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-base font-bold text-green-700 sm:text-lg">
                    ৳{product.price}
                  </span>

                  <span className="text-xs text-gray-400">
                    / {product.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <a href="/products" className="text-sm font-semibold text-green-600">
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProducts;
