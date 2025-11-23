import { User } from '../types';

const USERS_KEY = 'js_master_users_v2';
const CURRENT_USER_KEY = 'js_master_current_user_v2';

// Simple event emitter for auth state changes
const listeners: ((user: User | null) => void)[] = [];

const notifyListeners = (user: User | null) => {
  listeners.forEach(l => l(user));
};

export const authService = {
  register: async (name: string, email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const usersStr = localStorage.getItem(USERS_KEY);
    const users: Record<string, any> = usersStr ? JSON.parse(usersStr) : {};

    if (users[email]) {
      throw new Error("User already exists with this email");
    }

    const newUser: User = {
      id: 'user_' + Math.random().toString(36).substring(2, 9),
      name,
      email,
      createdAt: Date.now()
    };

    // Save user credentials (simulated)
    users[email] = { ...newUser, password }; // In a real app, never store plain text passwords
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Auto login
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    notifyListeners(newUser);
    
    return newUser;
  },

  login: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const usersStr = localStorage.getItem(USERS_KEY);
    const users: Record<string, any> = usersStr ? JSON.parse(usersStr) : {};
    const user = users[email];

    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }

    const { password: _, ...safeUser } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    notifyListeners(safeUser);

    return safeUser;
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    localStorage.removeItem(CURRENT_USER_KEY);
    notifyListeners(null);
  },

  // Subscribe to auth state changes
  onAuthStateChange: (callback: (user: User | null) => void) => {
    listeners.push(callback);
    
    // Check initial state
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      try {
        callback(JSON.parse(stored));
      } catch (e) {
        callback(null);
      }
    } else {
      callback(null);
    }

    // Return unsubscribe function
    return () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
  }
};