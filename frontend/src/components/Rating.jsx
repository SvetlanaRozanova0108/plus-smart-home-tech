import UiIcon from './UiIcon.jsx';
import { reviewsLabel } from '../utils/format.js';

export default function Rating({ value = 0, count, variant = 'stars', showCount = true }) {
  const rating = Number(value) || 0;
  const label = `Оценка ${rating.toFixed(1)} из 5`;

  if (variant === 'compact') {
    return (
      <span className="rating rating--compact" aria-label={label}>
        <span className="rating__badge">
          <UiIcon name="star" size={11} />
        </span>
        <span className="rating__text">
          {rating.toFixed(1)}
          {showCount && count != null ? ` · ${reviewsLabel(count)}` : ''}
        </span>
      </span>
    );
  }

  return (
    <span className="rating rating--stars" aria-label={label}>
      {Array.from({ length: 5 }, (_, index) => (
        <UiIcon
          key={index}
          name="star"
          size={14}
          className={
            index < Math.round(rating) ? 'rating__star' : 'rating__star rating__star--muted'
          }
        />
      ))}
      {showCount && count != null && (
        <span className="rating__text">{reviewsLabel(count)}</span>
      )}
    </span>
  );
}
