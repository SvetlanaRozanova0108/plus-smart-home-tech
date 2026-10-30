import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productImage } from '../assets';
import { useCart } from '../context/CartContext.jsx';
import { categoryLabels } from '../data/catalog.js';
import { formatPrice, itemsLabel } from '../utils/format.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import CheckoutModal from '../components/CheckoutModal.jsx';
import QuantityStepper from '../components/QuantityStepper.jsx';
import UiIcon from '../components/UiIcon.jsx';

const FREE_DELIVERY_FROM = 5000;
const DELIVERY_PRICE = 490;

export default function CartPage() {
  const { items, count, total, oldTotal, discount, setQuantity, remove, clear } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const promoDiscount = promoApplied ? Math.round(total * 0.1) : 0;
  const delivery = total >= FREE_DELIVERY_FROM || total === 0 ? 0 : DELIVERY_PRICE;
  const grandTotal = Math.max(0, total - promoDiscount + delivery);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PLUS10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoApplied(false);
      setPromoError('Промокод не найден. Попробуйте PLUS10');
    }
  };

  if (items.length === 0) {
    return (
      <>
        <section className="page-head">
          <div className="container">
            <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]} />
            <h1>Корзина</h1>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="empty-state empty-state--large">
              <span className="empty-state__icon">
                <UiIcon name="box" size={30} />
              </span>
              <h2>Корзина пока пуста</h2>
              <p>
                Добавьте устройства из каталога или начните с готового сценария — мы
                проверим совместимость.
              </p>
              <div className="empty-state__actions">
                <Link to="/catalog" className="btn btn--primary">
                  Перейти в каталог
                </Link>
                <Link to="/scenarios" className="btn btn--outline">
                  Готовые сценарии
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]} />
          <div className="page-head__row">
            <div className="page-head__text">
              <h1>Корзина</h1>
              <p>{itemsLabel(count)} готовы к оформлению</p>
            </div>
           {confirmClear ? (
              <div className="cart-clear">
                <span>Очистить корзину?</span>
                <button type="button" className="btn btn--danger btn--sm" onClick={clear}>
                  Да, очистить
                </button>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => setConfirmClear(false)}
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setConfirmClear(true)}
              >
                <UiIcon name="trash" size={16} />
                Очистить корзину
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section cart">
        <div className="container cart__layout">
          <div className="cart__items">
            {items.map((item) => (
              <article className="cart-item" key={item.productId}>
                <Link to={`/product/${item.productId}`} className="cart-item__media">
                  <img src={productImage(item.imageSrc)} alt={item.productName} loading="lazy" />
                </Link>

                <div className="cart-item__info">
                  <span className="cart-item__category">
                    {categoryLabels[item.productCategory] || 'Устройства Plus'}
                  </span>
                  <Link to={`/product/${item.productId}`} className="cart-item__title">
                    {item.productName}
                  </Link>
                  <span className="cart-item__unit">{formatPrice(item.price)} / шт.</span>

                  <div className="cart-item__controls">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(value) => setQuantity(item.productId, value)}
                      size="sm"
                    />
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => remove(item.productId)}
                    >
                      <UiIcon name="trash" size={15} />
                      Удалить
                    </button>
                  </div>
                </div>

                <div className="cart-item__sum">
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  {item.oldPrice > item.price && (
                    <s>{formatPrice(item.oldPrice * item.quantity)}</s>
                  )}
                </div>
              </article>
            ))}

            <div className="cart__note">
              <UiIcon name="info" size={18} />
              <p>
                Бесплатная доставка при заказе от {formatPrice(FREE_DELIVERY_FROM)}.
                Осталось добавить {formatPrice(Math.max(0, FREE_DELIVERY_FROM - total))}.
              </p>
            </div>
          </div>

          <aside className="cart-summary">
            <h2>Ваш заказ</h2>

            <dl className="cart-summary__list">
              <div>
                <dt>{itemsLabel(count)}</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
              {discount > 0 && (
                <div className="is-accent">
                  <dt>Скидка</dt>
                  <dd>−{formatPrice(discount)}</dd>
                </div>
              )}
              {promoApplied && (
                <div className="is-accent">
                  <dt>Промокод PLUS10</dt>
                  <dd>−{formatPrice(promoDiscount)}</dd>
                </div>
              )}
              <div>
                <dt>Доставка</dt>
                <dd>{delivery === 0 ? 'Бесплатно' : formatPrice(delivery)}</dd>
              </div>
              <div className="cart-summary__total">
                <dt>Итого</dt>
                <dd>{formatPrice(grandTotal)}</dd>
              </div>
            </dl>

            {oldTotal > total && (
              <p className="cart-summary__save">
                Вы экономите {formatPrice(oldTotal - total + promoDiscount)}
              </p>
            )}

            <div className="cart-summary__promo">
              <label htmlFor="promo">Промокод</label>
              <div className="cart-summary__promo-row">
                <input
                  id="promo"
                  value={promoCode}
                  onChange={(event) => {
                    setPromoCode(event.target.value);
                    setPromoError('');
                  }}
                  placeholder="PLUS10"
                  disabled={promoApplied}
                />
                <button
                  type="button"
                  className="btn btn--outline btn--sm"
                  onClick={applyPromo}
                  disabled={promoApplied || !promoCode.trim()}
                >
                  {promoApplied ? 'Применён' : 'Применить'}
                </button>
              </div>
              {promoError && <span className="cart-summary__promo-error">{promoError}</span>}
            </div>

            <button
              type="button"
              className="btn btn--primary cart-summary__checkout"
              onClick={() => setCheckoutOpen(true)}
            >
              Оформить заказ
              <UiIcon name="arrowRight" size={17} />
            </button>

            <p className="cart-summary__legal">
              <UiIcon name="shieldCheck" size={16} />
              Безопасная оплата картой, СБП или при получении
            </p>

            <div className="cart-summary__payments">
              <span>МИР</span>
              <span>Visa</span>
              <span>Mastercard</span>
              <span>СБП</span>
            </div>
          </aside>
        </div>
      </section>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={grandTotal}
      />
    </>
  );
}
