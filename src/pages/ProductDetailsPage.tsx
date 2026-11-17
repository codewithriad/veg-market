import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  LoaderCircle,
} from "lucide-react";

import { getProductById } from "../api/productApi";
import { useCart } from "../context/useCart";
import { useWishlist } from "../hooks/useWishlist";
import type { Product } from "../types/product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);

        if (!cancelled) {
          setProduct(data);
          setSelectedImage(data.thumbnail);
        }
      } catch {
        if (!cancelled) setProduct(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="animate-spin text-green-700" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-20 text-center">
        Product not found.
        <button
          onClick={() => navigate("/products")}
          className="mt-4 block mx-auto text-green-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const price = product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id),
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity,
    });

    navigate("/checkout");
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-7 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        <div className="grid gap-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:grid-cols-2 md:p-10">
          {/* Image Gallery */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={selectedImage}
                alt={product.title}
                className="aspect-square w-full object-contain"
              />
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto">
              {[...new Set([product.thumbnail, ...product.images])].map(
                (image) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(image)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${
                      selectedImage === image
                        ? "border-green-600"
                        : "border-gray-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-green-600">
              {product.category}
            </span>

            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <Star size={18} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-sm text-gray-400">
                | {product.stock} available (demo stock)
              </span>
            </div>

            <div className="my-6 border-y border-gray-100 py-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-green-700">
                  ${price.toFixed(2)}
                </span>

                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                      Save {Math.round(product.discountPercentage)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-sm leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <label className="mb-3 block text-sm font-bold text-gray-800">
                Quantity
              </label>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                >
                  <Minus size={18} />
                </button>

                <span className="min-w-12 text-center font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-4 font-bold text-white transition hover:bg-green-800 disabled:opacity-50"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="rounded-xl border border-gray-200 p-4 text-gray-600 transition hover:border-red-200 hover:text-red-500"
              >
                <Heart
                  size={21}
                  className={
                    isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""
                  }
                />
              </button>
            </div>

            <div className="mt-7 space-y-3 border-t border-gray-100 pt-6 text-sm text-gray-500">
              <p>✓ Quality information from demo product data</p>
              <p>✓ Secure shopping experience (checkout integration pending)</p>
              <p>✓ Product availability is illustrative</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
