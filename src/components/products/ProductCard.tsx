import { Heart, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <article
      onClick={() => navigate(`/products/${product.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-green transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Toggle wishlist"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <Heart
            size={19}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>

        {/* Cart */}
        <button
          type="button"
          aria-label="Add to cart"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-white shadow-lg transition hover:scale-110 hover:bg-green-800"
        >
          <ShoppingCart size={19} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">
          {product.category}
        </span>

        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-gray-800 transition-colors group-hover:text-green-700 sm:text-base">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-gray-600">
            {product.rating}
          </span>
          <span className="text-xs text-gray-400">
            ({product.stock} in stock)
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <p className="font-bold text-green-700">
              ${discountedPrice.toFixed(2)}
            </p>

            {product.discountPercentage > 0 && (
              <p className="text-xs text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>

          <span className="text-xs font-medium text-green-700">
            View Details →
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
