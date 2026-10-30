import { extraProducts, fallbackProducts } from '../data/catalog.js';

const API_BASE = (import.meta.env.VITE_API_BASE || '/api').replace(/\/+$/, '');
const REQUEST_TIMEOUT = 6000;
const USER_STORAGE_KEY = 'plus.username.v1';

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  const { headers, ...rest } = options;

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } finally {
    window.clearTimeout(timer);
  }
}

export function getUsername() {
  try {
    const stored = window.localStorage.getItem(USER_STORAGE_KEY);
    if (stored) return stored;
    const username = `guest-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(USER_STORAGE_KEY, username);
    return username;
  } catch {
    return 'guest';
  }
}

export function getFallbackProduct(productId) {
  return (
    [...fallbackProducts, ...extraProducts]
      .map(normalizeProduct)
      .find((product) => product.productId === productId) || null
  );
}

const PRODUCT_META = new Map(
  [...fallbackProducts, ...extraProducts].map((product) => [product.productId, product]),
);

function normalizeProduct(product) {
  const meta = PRODUCT_META.get(product.productId) || {};
  return {
    ...meta,
    ...product,
    productName: product.productName || meta.productName || 'Товар Plus',
    description: product.description || meta.description || '',
    imageSrc: product.imageSrc || meta.imageSrc,
    price: Number(product.price ?? meta.price ?? 0),
    oldPrice: product.oldPrice ?? meta.oldPrice,
    rating: Number(product.rating ?? meta.rating ?? 5),
    reviewCount: Number(product.reviewCount ?? meta.reviewCount ?? 0),
    isNew: Boolean(product.isNew ?? meta.isNew),
  };
}

function dedupe(products) {
  return [...new Map(products.map((product) => [product.productId, product])).values()];
}

export function getFallbackProducts() {
  return dedupe([...fallbackProducts, ...extraProducts].map(normalizeProduct));
}

const CATEGORIES = ['LIGHTING', 'SENSORS', 'CONTROL'];

export async function fetchAllProducts() {
  const responses = await Promise.allSettled(
    CATEGORIES.map((category) =>
      request(`/shopping-store?productCategory=${category}&page=0&size=100`),
    ),
  );

  const hasFailure = responses.some((response) => response.status === 'rejected');
  const products = responses
    .filter((response) => response.status === 'fulfilled' && Array.isArray(response.value))
    .flatMap((response) => response.value);

  if (hasFailure || products.length === 0) {
    return getFallbackProducts();
  }

  return dedupe(products.map(normalizeProduct));
}

export async function fetchProduct(productId) {
  try {
    const product = await request(`/shopping-store/${productId}`);
    return normalizeProduct(product);
  } catch (error) {
    const fallback = getFallbackProduct(productId);
    if (fallback) return fallback;
    throw error;
  }
}

export async function fetchCart(username = getUsername()) {
  return request(`/shopping-cart?username=${encodeURIComponent(username)}`);
}

export async function replaceCart(productsMap, username = getUsername()) {
  await request(`/shopping-cart?username=${encodeURIComponent(username)}`, {
    method: 'DELETE',
  }).catch(() => null);

  return request(`/shopping-cart?username=${encodeURIComponent(username)}`, {
    method: 'PUT',
    body: JSON.stringify(productsMap),
  });
}

export async function bookCart(username = getUsername()) {
  return request(`/shopping-cart/booking?username=${encodeURIComponent(username)}`, {
    method: 'POST',
  });
}

export async function createOrder({ items, address }) {
  const username = getUsername();
  const productsMap = Object.fromEntries(
    items.map((item) => [item.productId, item.quantity]),
  );

  const cart = await replaceCart(productsMap, username);
  await bookCart(username);

  const shoppingCart = {
    shoppingCartId: cart?.shoppingCartId || null,
    products: cart?.products || productsMap,
  };

  return request('/order', {
    method: 'PUT',
    body: JSON.stringify({ shoppingCart, deliveryAddress: address }),
  });
}
