import { icon } from '../assets';

/**
 * Иконка из набора Figma. Исходные SVG белые, поэтому красим их
 * через CSS-маску — цвет задаётся свойством color у контейнера.
 */
export default function Icon({ name, size = 20, className = '', alt = '' }) {
  const src = icon(name);
  if (!src) return null;

  return (
    <span
      className={`icon ${className}`.trim()}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : 'true'}
      style={{
        width: size,
        height: size,
        minWidth: size,
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}
