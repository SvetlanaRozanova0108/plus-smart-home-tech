import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  fetchAllProducts,
  fetchProduct,
  getFallbackProduct,
  getFallbackProducts,
} from '../api/client.js';
import { productImage } from '../assets';
import { useCart } from '../context/CartContext.jsx';
import { categoryLabels, reviews } from '../data/catalog.js';
import { productHighlights } from '../data/content.js';
import { discountPercent, formatPrice, reviewsLabel } from '../utils/format.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Icon from '../components/Icon.jsx';
import ProductCard from '../components/ProductCard.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import Rating from '../components/Rating.jsx';
import UiIcon from '../components/UiIcon.jsx';

const AVAILABILITY = {
  MANY: { label: 'В наличии', tone: 'success' },
  ENOUGH: { label: 'В наличии', tone: 'success' },
  FEW: { label: 'Осталось мало', tone: 'warning' },
  ENDED: { label: 'Нет в наличии', tone: 'danger' },
};

const TABS = [
  { id: 'description', label: 'Описание' },
  { id: 'specs', label: 'Характеристики' },
  { id: 'reviews', label: 'Отзывы' },
];

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();

  const fallback = useMemo(() => getFallbackProduct(productId), [productId]);
  const [product, setProduct] = useState(fallback);
  const [status, setStatus] = useState(fallback ? 'ready' : 'loading');
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [allProducts, setAllProducts] = useState(getFallbackProducts);
  const [reviewsList, setReviewsList] = useState(reviews);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: '5', text: '' });
  const [reviewError, setReviewError] = useState('');
  const [reviewSent, setReviewSent] = useState(false);

  useEffect(() => {
    let active = true;
    setStatus(fallback ? 'ready' : 'loading');
    setQuantity(1);
    setTab('description');

    fetchProduct(productId)
      .then((loaded) => {
        if (!active) return;
        setProduct(loaded);
        setStatus('ready');
      })
      .catch(() => {
        if (active) setStatus(fallback ? 'ready' : 'notfound');
      });

    return () => {
      active = false;
    };
  }, [productId, fallback]);

  useEffect(() => {
    let active = true;
    fetchAllProducts()
      .then((list) => {
        if (active) setAllProducts(list);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <section className="section">
        <div className="container product-skeleton">
          <div className="skeleton product-skeleton__media" />
          <div className="product-skeleton__info">
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line skeleton--short" />
          </div>
        </div>
      </section>
    );
  }

  if (status === 'notfound' || !product) {
    return (
      <section className="section">
        <div className="container empty-state">
          <span className="empty-state__icon">
            <UiIcon name="box" size={26} />
          </span>
          <h1>Товар не найден</h1>
          <p>Возможно, он был снят с продажи или ссылка устарела.</p>
          <Link to="/catalog" className="btn btn--primary btn--sm">
            Вернуться в каталог
          </Link>
        </div>
      </section>
    );
  }

  const availability = AVAILABILITY[product.quantityState] || AVAILABILITY.MANY;
  const discount = discountPercent(product.price, product.oldPrice);
  const categoryLabel = categoryLabels[product.productCategory] || 'Устройства Plus';
  const related = allProducts
    .filter(
      (item) =>
        item.productId !== product.productId &&
        item.productCategory === product.productCategory,
    )
    .slice(0, 4);

  const handleAdd = () => {
    add(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    add(product, quantity);
    navigate('/cart');
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (reviewForm.name.trim().length < 2 || reviewForm.text.trim().length < 10) {
      setReviewError('Укажите имя и напишите отзыв не короче 10 символов');
      return;
    }
    setReviewError('');
    setReviewsList((current) => [
      {
        name: reviewForm.name.trim(),
        city: 'Покупатель Plus',
        initial: reviewForm.name.trim().slice(0, 1).toUpperCase(),
        text: `«${reviewForm.text.trim()}»`,
        rating: Number(reviewForm.rating),
      },
      ...current,
    ]);
    setReviewForm({ name: '', rating: '5', text: '' });
    setReviewSent(true);
  };

  return (
    <>
      <section className="section product-page">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', to: '/' },
              { label: 'Каталог', to: '/catalog' },
              { label: categoryLabel, to: `/catalog?category=${product.productCategory}` },
              { label: product.productName },
            ]}
          />

          <div className="product">
            <div className="product__gallery">
              {product.isNew && <span className="badge">Новинка</span>}
              {discount > 0 && <span className="badge badge--dark">−{discount}%</span>}
              <img src={productImage(product.imageSrc)} alt={product.productName} />
            </div>

            <div className="product__info">
              <span className="chip">{categoryLabel}</span>
              <h1>{product.productName}</h1>

              <div className="product__meta">
                <Rating value={product.rating} count={product.reviewCount} />
                <span className="product__sku">
                  Артикул: {product.productId.slice(0, 8).toUpperCase()}
                </span>
              </div>

              <div className="product__prices">
                <strong>{formatPrice(product.price)}</strong>
                {product.oldPrice > product.price && (
                  <s>{formatPrice(product.oldPrice)}</s>
                )}
                {discount > 0 && <span className="product__save">Выгода {discount}%</span>}
              </div>

              <p className="product__description">{product.description}</p>

              <div className="product__stock">
                <span className={`stock stock--${availability.tone}`}>{availability.label}</span>
                <span className="product__delivery">
                  <UiIcon name="truck" size={16} /> Доставка от 1 дня
                </span>
              </div>

              <div className="product__buy">
                <QuantityStepper value={quantity} onChange={setQuantity} />
                <button
                  type="button"
                  className={`btn btn--primary product__add ${added ? 'is-added' : ''}`}
                  onClick={handleAdd}
                  disabled={product.quantityState === 'ENDED'}
                >
                  {added ? (
                    <>
                      <UiIcon name="check" size={18} />
                      Добавлено
                    </>
                  ) : (
                    <>
                      <Icon name="cart" size={18} />
                      В корзину
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn--outline product__buy-now"
                  onClick={handleBuyNow}
                  disabled={product.quantityState === 'ENDED'}
                >
                  Купить сейчас
                </button>
              </div>

              <ul className="product__highlights">
                {productHighlights.map((highlight) => (
                  <li key={highlight.title}>
                    <span className="product__highlight-icon">
                      <Icon name={highlight.icon} size={18} />
                    </span>
                    <span>
                      <strong>{highlight.title}</strong>
                      <small>{highlight.text}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tabs">
            <div className="tabs__nav" role="tablist" aria-label="Информация о товаре">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  className={tab === item.id ? 'is-active' : ''}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                  {item.id === 'reviews' && <span>{reviewsList.length}</span>}
                </button>
              ))}
            </div>

            <div className="tabs__panel" role="tabpanel">
              {tab === 'description' && (
                <div className="product-description">
                  <p>{product.description}</p>
                  <p>
                    Устройство Plus подключается к приложению за пару минут. Управляйте им
                    со смартфона, голосом или кнопкой, объединяйте с другими устройствами
                    в сценарии и следите за состоянием дома из любой точки.
                  </p>
                  <ul className="check-list">
                    <li>
                      <span className="check-list__icon">
                        <UiIcon name="check" size={14} />
                      </span>
                      Работает с Яндекс Алисой, Apple Home и Google Home
                    </li>
                    <li>
                      <span className="check-list__icon">
                        <UiIcon name="check" size={14} />
                      </span>
                      Поддержка Matter и локальных сценариев
                    </li>
                    <li>
                      <span className="check-list__icon">
                        <UiIcon name="check" size={14} />
                      </span>
                      Обновления прошивки и поддержка в приложении Plus
                    </li>
                  </ul>
                </div>
              )}

              {tab === 'specs' && (
                <dl className="specs">
                  <div>
                    <dt>Категория</dt>
                    <dd>{categoryLabel}</dd>
                  </div>
                  <div>
                    <dt>Артикул</dt>
                    <dd>{product.productId.slice(0, 8).toUpperCase()}</dd>
                  </div>
                  <div>
                    <dt>Наличие</dt>
                    <dd>{availability.label}</dd>
                  </div>
                  <div>
                    <dt>Рейтинг</dt>
                    <dd>{Number(product.rating).toFixed(1)} из 5</dd>
                  </div>
                  <div>
                    <dt>Гарантия</dt>
                    <dd>2 года</dd>
                  </div>
                  <div>
                    <dt>Производитель</dt>
                    <dd>Plus Smart Home Tech</dd>
                  </div>
                  <div>
                    <dt>Страна производства</dt>
                    <dd>Россия</dd>
                  </div>
                  <div>
                    <dt>Совместимость</dt>
                    <dd>Matter, Яндекс Алиса, Apple Home, Google Home</dd>
                  </div>
                </dl>
              )}

              {tab === 'reviews' && (
                <div className="reviews-block">
                  <div className="reviews-block__summary">
                    <div>
                      <strong>{Number(product.rating).toFixed(1)}</strong>
                      <Rating value={product.rating} showCount={false} />
                      <span>{reviewsLabel(product.reviewCount)}</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => {
                        setReviewSent(false);
                        document.getElementById('review-form')?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                      }}
                    >
                      Оставить отзыв
                    </button>
                  </div>

                  <div className="reviews-block__list">
                    {reviewsList.map((review, index) => (
                      <article className="review-card review-card--wide" key={`${review.name}-${index}`}>
                        <Rating value={review.rating || 5} showCount={false} />
                        <p>{review.text}</p>
                        <div className="review-card__author">
                          <span className="avatar">{review.initial}</span>
                          <span>
                            <strong>{review.name}</strong>
                            <small>{review.city}</small>
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>

                  <form id="review-form" className="review-form" onSubmit={handleReviewSubmit}>
                    <h3>Поделитесь впечатлением</h3>
                    {reviewSent && (
                      <p className="review-form__success">
                        <UiIcon name="check" size={15} /> Спасибо! Отзыв опубликован.
                      </p>
                    )}
                    <div className="review-form__row">
                      <label className="field">
                        <span>Ваше имя</span>
                        <input
                          value={reviewForm.name}
                          onChange={(event) =>
                            setReviewForm((current) => ({ ...current, name: event.target.value }))
                          }
                        />
                      </label>
                      <label className="field field--rating">
                        <span>Оценка</span>
                        <select
                          value={reviewForm.rating}
                          onChange={(event) =>
                            setReviewForm((current) => ({ ...current, rating: event.target.value }))
                          }
                        >
                          <option value="5">5 — отлично</option>
                          <option value="4">4 — хорошо</option>
                          <option value="3">3 — нормально</option>
                          <option value="2">2 — так себе</option>
                          <option value="1">1 — плохо</option>
                        </select>
                      </label>
                    </div>
                    <label className="field">
                      <span>Отзыв</span>
                      <textarea
                        rows={4}
                        value={reviewForm.text}
                        onChange={(event) =>
                          setReviewForm((current) => ({ ...current, text: event.target.value }))
                        }
                        placeholder="Расскажите, как устройство работает у вас дома"
                      />
                    </label>
                    {reviewError && <p className="review-form__error">{reviewError}</p>}
                    <button type="submit" className="btn btn--primary btn--sm">
                      Отправить отзыв
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <div className="section-head">
              <div className="section-head__text">
                <h2>Похожие устройства</h2>
                <p>Дополнят сценарий и отлично работают вместе.</p>
              </div>
              <Link to={`/catalog?category=${product.productCategory}`} className="btn btn--primary btn--sm">
                Смотреть все
                <UiIcon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.productId} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
