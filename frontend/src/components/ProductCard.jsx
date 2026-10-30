import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { productImage } from '../assets';
import { formatPrice } from '../utils/format.js';
import Rating from './Rating.jsx';
import UiIcon from './UiIcon.jsx';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.quantityState === 'ENDED';

  const handleAdd = () => {
    if (isOutOfStock) return;
    add(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.productId}`}
        className="product-card__media"
        aria-label={product.productName}
      >
        {product.isNew && <span className="badge">Новинка</span>}
        {isOutOfStock && <span className="badge badge--dark">Нет в наличии</span>}
        {!isOutOfStock && product.quantityState === 'FEW' && (
          <span className="badge badge--soft">Осталось мало</span>
        )}
        <img src={productImage(product.imageSrc)} alt={product.productName} loading="lazy" />
      </Link>

      <div className="product-card__body">
        <Link to={`/product/${product.productId}`} className="product-card__title">
          {product.productName}
        </Link>

        <Rating value={product.rating} count={product.reviewCount} variant="compact" />

        <div className="product-card__prices">
          <strong className="product-card__price">{formatPrice(product.price)}</strong>
          {product.oldPrice > product.price && (
            <s className="product-card__old-price">{formatPrice(product.oldPrice)}</s>
          )}
        </div>

        <button
          type="button"
          className={`btn btn--primary btn--sm product-card__button ${added ? 'is-added' : ''}`}
          onClick={handleAdd}
          disabled={isOutOfStock}
        >
          {added ? (
            <>
              <UiIcon name="check" size={16} />
              Добавлено
            </>
          ) : (
            'В корзину'
          )}
        </button>
      </div>
    </article>
  );
}
