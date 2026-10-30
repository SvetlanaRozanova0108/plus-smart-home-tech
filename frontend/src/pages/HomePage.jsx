import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts, getFallbackProducts } from '../api/client.js';
import { images, productImage } from '../assets';
import { useCart } from '../context/CartContext.jsx';
import {
  benefits,
  categories,
  reviews,
  scenarios,
} from '../data/catalog.js';
import { heroFeatures } from '../data/content.js';
import { devicesLabel, formatPrice, reviewsLabel } from '../utils/format.js';
import Icon from '../components/Icon.jsx';
import Newsletter from '../components/Newsletter.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Rating from '../components/Rating.jsx';
import SectionHead from '../components/SectionHead.jsx';
import UiIcon from '../components/UiIcon.jsx';
import ScenarioCard from '../components/ScenarioCard.jsx';

function catalogUrl(filter) {
  const params = new URLSearchParams(filter);
  return `/catalog?${params.toString()}`;
}

export default function HomePage() {
  const [products, setProducts] = useState(() => getFallbackProducts().slice(0, 4));
  const { count } = useCart();

  useEffect(() => {
    let active = true;
    fetchAllProducts()
      .then((list) => {
        if (active && list.length > 0) setProducts(list.slice(0, 4));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <img className="hero__image" src={images.hero} alt="" aria-hidden="true" />
        <span className="hero__scrim" aria-hidden="true" />
        <div className="container hero__content">
          <span className="eyebrow">Умный дом нового поколения</span>
          <h1>Умные устройства для вашего дома</h1>
          <p>
            Собственный магазин умных ламп, датчиков, контроллеров и готовых сценариев.
            Создайте умный дом с Plus — просто, надёжно и без переплат.
          </p>
          <div className="hero__actions">
            <Link to="/catalog" className="btn btn--primary btn--lg">
              <UiIcon name="grid" size={18} />
              В каталог
            </Link>
            <Link to="/scenarios" className="btn btn--ghost">
              Готовые сценарии
              <UiIcon name="arrowRight" size={16} />
            </Link>
          </div>

          <ul className="hero__features">
            {heroFeatures.map((feature) => (
              <li key={feature.title}>
                <span className="hero__feature-icon">
                  <Icon name={feature.icon} size={20} />
                </span>
                <span className="hero__feature-text">
                  <strong>{feature.title}</strong>
                  <small>{feature.text}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/cart" className="hero__cart-hint" aria-label={`Перейти в корзину, товаров: ${count}`}>
          <Icon name="cart" size={16} />
          <span>{count > 0 ? `В корзине ${count}` : 'Корзина пуста'}</span>
        </Link>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            title="Каталог по категориям"
            text="Подберите устройства под задачи дома — от освещения до безопасности."
          />
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={catalogUrl(category.filter)}
                className="category-card"
              >
                <span className="category-card__icon">
                  <Icon name={category.icon} size={22} />
                </span>
                <strong>{category.title}</strong>
                <span>{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            title="Хиты продаж"
            text="Устройства, которые чаще всего выбирают для первого умного дома."
            action="Смотреть все"
            to="/catalog"
          />
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            title="Готовые сценарии"
            text="Соберите комплект под свой ритм жизни — мы уже продумали совместимость."
            action="Смотреть все"
            to="/scenarios"
          />
          <div className="scenario-grid">
            {scenarios.map((scenario) => (
              <ScenarioCard key={scenario.slug} scenario={scenario} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            title="Почему выбирают Plus"
            text="Разрабатываем, производим и поддерживаем устройства сами."
          />
          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.title}>
                <span className="benefit-card__icon">
                  <Icon name={benefit.icon} size={22} />
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            title="Отзывы покупателей"
            text={`${reviews.length} реальных истории о том, как Plus меняет дом к лучшему.`}
          />
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <Rating value={5} showCount={false} />
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
        </div>
      </section>

      <Newsletter />
    </>
  );
}
