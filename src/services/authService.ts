export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'artisan';
  artisanId?: string;
  avatar?: string;
}

const STORAGE_KEY = 'meridian_session';

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (err) {
      console.error('Auth listener error:', err);
    }
  });
}

function readStorage(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read meridian_session from localStorage:', err);
    return null;
  }
}

function writeStorage(session: UserSession | null) {
  if (typeof window === 'undefined') return;
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    notifyListeners();
  } catch (err) {
    console.error('Failed to update meridian_session in localStorage:', err);
  }
}

export const authService = {
  /**
   * Get current authenticated user session.
   */
  getCurrentUser(): UserSession | null {
    return readStorage();
  },

  /**
   * Check if user is currently authenticated.
   */
  isAuthenticated(): boolean {
    return readStorage() !== null;
  },

  /**
   * Get active user role.
   */
  getUserRole(): 'buyer' | 'artisan' | null {
    const user = readStorage();
    return user ? user.role : null;
  },

  /**
   * Sign in with email and password.
   * Handles pre-configured demo credentials or existing sessions.
   */
  async signIn(email: string, role?: 'buyer' | 'artisan'): Promise<UserSession> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const e = email.toLowerCase().trim();
    let session: UserSession;

    if (e.includes('artisan') || e.includes('pabiben') || role === 'artisan') {
      session = {
        id: 'usr-art-1',
        name: 'Pabiben Rabari',
        email: e || 'pabiben.crafts@meridian.in',
        role: 'artisan',
        artisanId: 'art-1',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
      };
    } else {
      session = {
        id: 'usr-buyer-1',
        name: 'Ananya Sharma',
        email: e || 'buyer@meridian.demo',
        role: 'buyer'
      };
    }

    writeStorage(session);
    return session;
  },

  /**
   * Sign up new user with account type (BUYER vs ARTISAN).
   */
  async signUp(name: string, email: string, role: 'buyer' | 'artisan'): Promise<UserSession> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const session: UserSession = {
      id: `usr-${Date.now()}`,
      name: name || (role === 'artisan' ? 'Master Karigar' : 'Valued Buyer'),
      email: email.toLowerCase().trim(),
      role,
      artisanId: role === 'artisan' ? 'art-1' : undefined
    };

    writeStorage(session);
    return session;
  },

  /**
   * Sign out current user and clear local session.
   */
  signOut(): void {
    writeStorage(null);
  },

  /**
   * Subscribe to auth session changes across components.
   */
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }
};
