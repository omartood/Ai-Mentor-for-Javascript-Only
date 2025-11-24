
import { supabase } from '../supabaseClient';
import { User } from '../types';

// Fallback Constants
const STORAGE_USERS_KEY = 'js_master_users';
const STORAGE_SESSION_KEY = 'js_master_session';

// Helper to map Supabase user to our App's User type
const mapUser = (sbUser: any): User | null => {
  if (!sbUser) return null;
  return {
    id: sbUser.id,
    email: sbUser.email || '',
    name: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || 'User',
    createdAt: new Date(sbUser.created_at).getTime()
  };
};

export const authService = {
  register: async (name: string, email: string, password: string): Promise<User> => {
    // --- Fallback Mode ---
    if (!supabase) {
      const usersStr = localStorage.getItem(STORAGE_USERS_KEY);
      const users: any[] = usersStr ? JSON.parse(usersStr) : [];
      
      if (users.find((u: any) => u.email === email)) {
        throw new Error("User already exists (Local Mode)");
      }

      const newUser = {
        id: 'local-' + Date.now(),
        name,
        email,
        password, // Note: Insecure for real apps, acceptable for local fallback
        createdAt: Date.now()
      };
      
      users.push(newUser);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
      
      // Auto login
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newUser));
      return { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt };
    }

    // --- Supabase Mode ---
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Registration failed");

    return mapUser(data.user)!;
  },

  login: async (email: string, password: string): Promise<User> => {
    // --- Fallback Mode ---
    if (!supabase) {
      const usersStr = localStorage.getItem(STORAGE_USERS_KEY);
      const users: any[] = usersStr ? JSON.parse(usersStr) : [];
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (!user) throw new Error("Invalid credentials (Local Mode)");
      
      const userObj = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(userObj));
      return userObj;
    }

    // --- Supabase Mode ---
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Login failed");

    return mapUser(data.user)!;
  },

  logout: async () => {
    // --- Fallback Mode ---
    if (!supabase) {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      return;
    }

    // --- Supabase Mode ---
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Subscribe to auth state changes
  onAuthStateChange: (callback: (user: User | null) => void) => {
    // --- Fallback Mode ---
    if (!supabase) {
      const sessionStr = localStorage.getItem(STORAGE_SESSION_KEY);
      if (sessionStr) {
        callback(JSON.parse(sessionStr));
      } else {
        callback(null);
      }
      // No real-time subscription for local storage in this simple implementation
      return () => {};
    }

    // --- Supabase Mode ---
    supabase.auth.getSession().then(({ data: { session } }) => {
      callback(session ? mapUser(session.user) : null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session ? mapUser(session.user) : null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }
};
