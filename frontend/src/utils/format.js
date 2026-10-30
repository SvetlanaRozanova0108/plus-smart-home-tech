const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  return priceFormatter.format(Number(value) || 0);
}

export function plural(count, one, few, many) {
  const value = Math.abs(Number(count)) % 100;
  const tail = value % 10;
  if (value > 10 && value < 20) return many;
  if (tail > 1 && tail < 5) return few;
  if (tail === 1) return one;
  return many;
}

export function reviewsLabel(count) {
  return `${count} ${plural(count, 'отзыв', 'отзыва', 'отзывов')}`;
}

export function itemsLabel(count) {
  return `${count} ${plural(count, 'товар', 'товара', 'товаров')}`;
}

export function devicesLabel(count) {
  return `${count} ${plural(count, 'устройство', 'устройства', 'устройств')}`;
}

export function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

export function orderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `PSH-${random}`;
}
