import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAllProducts, getFallbackProducts } from '../api/client.js';
import { images, productImage } from '../assets';
import { useCart } from '../context/CartContext.jsx';
import { scenarios } from '../data/catalog.js';
import { devicesLabel } from '../utils/format.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Icon from '../components/Icon.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import UiIcon from '../components/UiIcon.jsx';

export default function ScenarioPage() {
  const { slug } = useParams();
  const scenario = scenarios.find((item) => item.slug === slug);
  const [products, setProducts] = useState(getFallbackProducts);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    let active = true;
    fetchAllProducts()
      .then((list) => {
        if (active) setProducts(list);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const deviceProducts = useMemo(() => {
    if (!scenario) return [];
    return scenario.devices
      .map((device) =>
        products.find(
          (product) => product.productName.toLowerCase() === device.toLowerCase(),
        ),
      )
      .filter(Boolean);
  }, [scenario, products]);

  if (!scenario) {
    return <NotFoundPage />;
  }

  const handleAddAll = () => {
    deviceProducts.forEach((product) => add(product, 1));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <>
      <section className="scenario-hero">
        <img
          className="scenario-hero__image"
          src={productImage(scenario.image)}
          alt=""
          aria-hidden="true"
        />
        <span className="scenario-hero__scrim" aria-hidden="true" />
        <div className="container scenario-hero__content">
          <Breadcrumbs
            items={[
              { label: 'Главная', to: '/' },
              { label: 'Сценарии', to: '/scenarios' },
              { label: scenario.title },
            ]}
          />
          <span className="eyebrow">Готовый сценарий</span>
          <h1>{scenario.title}</h1>
          <p>{scenario.short}</p>
          <div className="scenario-hero__meta">
            <span className="chip chip--light">
              <Icon name={scenario.icon} size={16} />
              {devicesLabel(scenario.devices.length)}
            </span>
            <span className="chip chip--light">{scenario.count}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container scenario-detail">
          <div className="scenario-detail__text">
            <h2>Как работает сценарий</h2>
            <p>{scenario.text}</p>
            <p>
              Все устройства подключаются к приложению Plus и работают как единая система.
              Вы можете менять правила, добавлять новые устройства и управлять сценарием
              голосом.
            </p>

            <ul className="check-list">
              {scenario.devices.map((device) => (
                <li key={device}>
                  <span className="check-list__icon">
                    <UiIcon name="check" size={14} />
                  </span>
                  {device}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`btn btn--primary ${added ? 'is-added' : ''}`}
              onClick={handleAddAll}
              disabled={deviceProducts.length === 0}
            >
              {added ? (
                <>
                  <UiIcon name="check" size={18} />
                  Устройства в корзине
                </>
              ) : (
                <>
                  <Icon name="cart" size={18} />
                  Добавить все устройства
                </>
              )}
            </button>
            <Link to="/catalog" className="btn btn--ghost scenario-detail__link">
              Посмотреть другие устройства
              <UiIcon name="arrowRight" size={16} />
            </Link>
          </div>

          <aside className="scenario-detail__aside">
            <img src={images['scenario-home']} alt="" aria-hidden="true" />
            <h3>Нужна помощь?</h3>
            <p>
              Инженер Plus подберёт комплект под площадь дома и поможет с настройкой —
              бесплатно при заказе сценария.
            </p>
            <Link to="/contacts" className="btn btn--outline btn--sm">
              Связаться с нами
            </Link>
          </aside>
        </div>
      </section>

      {deviceProducts.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <div className="section-head">
              <div className="section-head__text">
                <h2>Устройства сценария</h2>
                <p>Всё, что нужно для запуска — можно добавить в корзину по отдельности.</p>
              </div>
            </div>
            <div className="product-grid">
              {deviceProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
