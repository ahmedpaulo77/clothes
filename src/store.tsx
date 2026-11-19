import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { products, sizes, type Product } from './catalog';
import { toast } from 'sonner';

export type CartItem = { productId: string; size: string; color: string; quantity: number };
type Store = {
  cart: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  setQuantity: (item: CartItem, quantity: number) => void;
  removeItem: (item: CartItem) => void;
};
const StoreContext = createContext<Store | null>(null);
const sameItem = (a: CartItem, b: CartItem) => a.productId === b.productId && a.size === b.size && a.color === b.color;

function readCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('forme-cart-v1') || '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter((item): item is CartItem => {
      if (!item || typeof item !== 'object') return false;
      const product = products.find(p => p.id === item.productId);
      return Boolean(product && sizes.includes(item.size) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 10 && (product.colors?.some(c => c.name === item.color) || product.color === item.color));
    });
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(readCart);
  useEffect(() => {
    try { localStorage.setItem('forme-cart-v1', JSON.stringify(cart)); } catch { /* The bag remains usable when browser storage is blocked. */ }
  }, [cart]);
  const addItem: Store['addItem'] = (product, size, color) => {
    const item = { productId: product.id, size, color, quantity: 1 };
    const existing = cart.find(line => sameItem(line, item));
    if (existing && existing.quantity >= 10) { toast.info('A maximum of 10 per size and colour in this demo.'); return; }
    setCart(current => {
      const match = current.find(line => sameItem(line, item));
      return match ? current.map(line => sameItem(line, item) ? { ...line, quantity: Math.min(10, line.quantity + 1) } : line) : [...current, item];
    });
    toast.success(`${product.name} added to your bag`);
  };
  const setQuantity: Store['setQuantity'] = (item, quantity) => setCart(current => current.map(line => sameItem(line, item) ? { ...line, quantity: Math.max(1, Math.min(10, quantity)) } : line));
  const removeItem: Store['removeItem'] = item => setCart(current => current.filter(line => !sameItem(line, item)));
  return <StoreContext.Provider value={{ cart, addItem, setQuantity, removeItem }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('StoreProvider is required');
  return store;
}
