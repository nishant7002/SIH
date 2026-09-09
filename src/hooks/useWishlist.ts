import { useState, useEffect, useCallback } from 'react';
import { wishlistService } from '../services/wishlistService';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial sync
    setWishlist(wishlistService.getWishlist());
    setIsLoaded(true);

    // Subscribe to updates
    const unsubscribe = wishlistService.subscribe(() => {
      setWishlist(wishlistService.getWishlist());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    return wishlistService.toggleWishlist(productId);
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.includes(productId);
    },
    [wishlist]
  );

  return {
    wishlist,
    count: wishlist.length,
    isLoaded,
    toggleWishlist,
    isInWishlist,
    addToWishlist: wishlistService.addToWishlist,
    removeFromWishlist: wishlistService.removeFromWishlist,
    clearWishlist: wishlistService.clearWishlist
  };
}
