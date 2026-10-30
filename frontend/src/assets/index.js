const imageModules = import.meta.glob('./images/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const iconModules = import.meta.glob('./icons/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const byBaseName = (modules) =>
  Object.fromEntries(
    Object.entries(modules).map(([path, url]) => {
      const file = path.split('/').pop();
      return [file.replace(/\.(jpg|jpeg|png|webp|svg)$/i, ''), url];
    }),
  );

export const images = byBaseName(imageModules);
export const iconUrls = byBaseName(iconModules);

export function icon(name) {
  return iconUrls[name];
}

export function productImage(imageSrc) {
  if (!imageSrc) return images['product-hub'];
  if (/^https?:\/\//.test(imageSrc) || imageSrc.startsWith('/')) return imageSrc;
  const base = imageSrc.split('/').pop().replace(/\.[^.]+$/, '');
  return images[base] || images['product-hub'];
}
