import { useEffect, useState } from "react";

const STORAGE_KEY = "veg-market-wishlist";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: number) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  };

  const isWishlisted = (id: number) => wishlist.includes(id);

  return {
    wishlist,
    toggleWishlist,
    isWishlisted,
  };
};
