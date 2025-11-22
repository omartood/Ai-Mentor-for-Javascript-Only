import { User } from '../types';

// Simulating a database table for users
const USERS_STORAGE_KEY = 'js-master-users';
const SESSION_KEY = 'js-master-session';

interface StoredUser extends User {
  password: string; // In a real app, this would be a hash!
}

const getUsers = (): StoredUser[] => {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const authService = {
  register: async (name: string, email: string, password: string): Promise<User> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser: StoredUser = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      email,
      password, // simple storage for demo only
      createdAt: Date.now()
    };

    users.push(newUser);
    saveUsers(users);
    
    // Auto login
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  },

  login: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    const { password, ...user } = JSON.parse(data);
    return user;
  }
};
