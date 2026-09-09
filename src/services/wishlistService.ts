/**
 * Wishlist Service & State Manager for Meridian.
 * Centralized, reactive state store with localStorage persistence.
 * Ready for future backend API integration (POST /api/v1/wishlist).
 */

const STORAGE_KEY = 'meridian_wishlist';

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (err) {
      console.error('Wishlist listener error:', err);
    }
  });
}

function readStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === 'string');
    }
    return [];
  } catch (err) {
    console.error('Failed to read meridian_wishlist from localStorage:', err);
    return [];
  }
}

function writeStorage(items: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    notifyListeners();
  } catch (err) {
    console.error('Failed to save meridian_wishlist to localStorage:', err);
  }
}

export const wishlistService = {
  /**
   * Get all saved product IDs in the wishlist.
   */
  getWishlist(): string[] {
    return readStorage();
  },

  /**
   * Get total count of saved wishlist items.
   */
  getWishlistCount(): number {
    return readStorage().length;
  },

  /**
   * Check if a product ID is currently saved.
   */
  isInWishlist(productId: string): boolean {
    if (!productId) return false;
    return readStorage().includes(productId);
  },

  /**
   * Add a product ID to the wishlist.
   */
  addToWishlist(productId: string): void {
    if (!productId) return;
    const current = readStorage();
    if (!current.includes(productId)) {
      writeStorage([...current, productId]);
    }
  },

  /**
   * Remove a product ID from the wishlist.
   */
  removeFromWishlist(productId: string): void {
    if (!productId) return;
    const current = readStorage();
    if (current.includes(productId)) {
      writeStorage(current.filter((id) => id !== productId));
    }
  },

  /**
   * Toggle a product ID in the wishlist.
   * Returns true if added, false if removed.
   */
  toggleWishlist(productId: string): boolean {
    if (!productId) return false;
    const current = readStorage();
    if (current.includes(productId)) {
      writeStorage(current.filter((id) => id !== productId));
      return false;
    } else {
      writeStorage([...current, productId]);
      return true;
    }
  },

  /**
   * Clear all wishlist items.
   */
  clearWishlist(): void {
    writeStorage([]);
  },

  /**
   * Subscribe to wishlist state changes across components.
   * Returns an unsubscribe function.
   */
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};
