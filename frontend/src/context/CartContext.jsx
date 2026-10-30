import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CART_STORAGE_KEY = 'plus.cart.v1';

const CartContext = createContext(null);

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => item && item.productId) : [];
  } catch {
    return [];
  }
}

function toSnapshot(product, quantity) {
  return {
    productId: product.productId,
    productName: product.productName,
    description: product.description,
    imageSrc: product.imageSrc,
    price: Number(product.price) || 0,
    oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
    rating: Number(product.rating) || 0,
    productCategory: product.productCategory,
    quantityState: product.quantityState,
    quantity: Math.max(1, Number(quantity) || 1),
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* localStorage может быть недоступен — корзина продолжит работать в памяти */
    }
  }, [items]);

  const add = useCallback((product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.productId);
      if (existing) {
        return current.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, toSnapshot(product, quantity)];
    });
  }, []);

  const remove = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId, quantity) => {
    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(99, Math.max(1, quantity)) }
          : item,
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const oldTotal = items.reduce(
      (sum, item) => sum + (item.oldPrice || item.price) * item.quantity,
      0,
    );

    return {
      items,
      count,
      total,
      oldTotal,
      discount: Math.max(0, oldTotal - total),
      add,
      remove,
      setQuantity,
      clear,
    };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
}
