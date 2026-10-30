import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice, orderNumber } from '../utils/format.js';
import UiIcon from './UiIcon.jsx';

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  city: 'Москва',
  street: '',
  house: '',
  flat: '',
  delivery: 'courier',
  payment: 'card',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'Укажите имя';
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Укажите телефон';
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Укажите корректный email';
  if (!form.city.trim()) errors.city = 'Укажите город';
  if (!form.street.trim()) errors.street = 'Укажите улицу';
  if (!form.house.trim()) errors.house = 'Укажите дом';
  return errors;
}

function formatOrderId(value) {
  if (!value) return orderNumber();
  return `PSH-${String(value).replace(/-/g, '').slice(0, 6).toUpperCase()}`;
}

export default function CheckoutModal({ open, onClose, total }) {
  const { items, clear } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form');
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (!open) return null;

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: '' }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    const address = {
      country: 'Россия',
      city: form.city.trim(),
      street: form.street.trim(),
      house: form.house.trim(),
      flat: form.flat.trim(),
    };

    try {
      const created = await createOrder({ items, address });
      setOrder({ orderId: formatOrderId(created?.orderId), demo: false });
    } catch {
      setOrder({ orderId: orderNumber(), demo: true });
    } finally {
      setSubmitting(false);
      setStep('success');
    }
  };

  function handleClose() {
    if (order) {
      clear();
      setForm(EMPTY_FORM);
    }
    setStep('form');
    setOrder(null);
    setErrors({});
    onClose();
  }

  return (
    <div
      className="modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-label="Оформление заказа">
        <button type="button" className="modal__close" onClick={handleClose} aria-label="Закрыть">
          <UiIcon name="close" size={20} />
        </button>

        {step === 'form' ? (
          <form className="checkout" onSubmit={handleSubmit} noValidate>
            <div className="checkout__head">
              <span className="eyebrow">Оформление заказа</span>
              <h2>Доставка и оплата</h2>
              <p>
                Заполните контакты и адрес — мы свяжемся с вами для подтверждения.
                Сумма заказа: <strong>{formatPrice(total)}</strong>.
              </p>
            </div>

            <div className="checkout__grid">
              <label className="field">
                <span>Имя и фамилия</span>
                <input
                  value={form.name}
                  onChange={updateField('name')}
                  className={errors.name ? 'is-invalid' : ''}
                  autoComplete="name"
                  autoFocus
                />
                {errors.name && <em>{errors.name}</em>}
              </label>

              <label className="field">
                <span>Телефон</span>
                <input
                  value={form.phone}
                  onChange={updateField('phone')}
                  className={errors.phone ? 'is-invalid' : ''}
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                />
                {errors.phone && <em>{errors.phone}</em>}
              </label>

              <label className="field field--wide">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={updateField('email')}
                  className={errors.email ? 'is-invalid' : ''}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {errors.email && <em>{errors.email}</em>}
              </label>

              <label className="field">
                <span>Город</span>
                <input
                  value={form.city}
                  onChange={updateField('city')}
                  className={errors.city ? 'is-invalid' : ''}
                  autoComplete="address-level2"
                />
                {errors.city && <em>{errors.city}</em>}
              </label>

              <label className="field">
                <span>Улица</span>
                <input
                  value={form.street}
                  onChange={updateField('street')}
                  className={errors.street ? 'is-invalid' : ''}
                  autoComplete="address-line1"
                />
                {errors.street && <em>{errors.street}</em>}
              </label>

              <div className="checkout__row">
                <label className="field">
                  <span>Дом</span>
                  <input
                    value={form.house}
                    onChange={updateField('house')}
                    className={errors.house ? 'is-invalid' : ''}
                    autoComplete="address-line2"
                  />
                  {errors.house && <em>{errors.house}</em>}
                </label>

                <label className="field">
                  <span>Квартира</span>
                  <input
                    value={form.flat}
                    onChange={updateField('flat')}
                    autoComplete="address-line3"
                  />
                </label>
              </div>

              <fieldset className="checkout__options field--wide">
                <legend>Способ доставки</legend>
                <label className="radio-card">
                  <input
                    type="radio"
                    name="delivery"
                    value="courier"
                    checked={form.delivery === 'courier'}
                    onChange={updateField('delivery')}
                  />
                  <span>
                    <strong>Курьером</strong>
                    <small>1–2 дня · бесплатно от 5 000 ₽</small>
                  </span>
                </label>
                <label className="radio-card">
                  <input
                    type="radio"
                    name="delivery"
                    value="point"
                    checked={form.delivery === 'point'}
                    onChange={updateField('delivery')}
                  />
                  <span>
                    <strong>Пункт выдачи</strong>
                    <small>2–5 дней · 290 ₽</small>
                  </span>
                </label>
              </fieldset>

              <fieldset className="checkout__options field--wide">
                <legend>Способ оплаты</legend>
                <label className="radio-card">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === 'card'}
                    onChange={updateField('payment')}
                  />
                  <span>
                    <strong>Картой онлайн</strong>
                    <small>МИР, Visa, Mastercard</small>
                  </span>
                </label>
                <label className="radio-card">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={form.payment === 'cash'}
                    onChange={updateField('payment')}
                  />
                  <span>
                    <strong>При получении</strong>
                    <small>Наличными или картой курьеру</small>
                  </span>
                </label>
              </fieldset>
            </div>

            <button type="submit" className="btn btn--primary checkout__submit" disabled={submitting}>
              {submitting ? 'Оформляем…' : `Подтвердить заказ · ${formatPrice(total)}`}
            </button>
            <p className="checkout__legal">
              Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
            </p>
          </form>
        ) : (
          <div className="checkout-success">
            <span className="checkout-success__icon">
              <UiIcon name="check" size={28} />
            </span>
            <h2>Заказ оформлен</h2>
            <p>
              Номер заказа <strong>{order?.orderId}</strong>. Мы отправили письмо с деталями
              на <strong>{form.email || 'указанную почту'}</strong> и скоро позвоним для
              подтверждения.
            </p>
            {order?.demo && (
              <p className="checkout-success__demo">
                Бэкенд недоступен, поэтому заказ сохранён в демо-режиме. Запустите gateway
                и сервисы, чтобы оформление шло через API.
              </p>
            )}
            <div className="checkout-success__actions">
              <Link to="/" className="btn btn--primary" onClick={handleClose}>
                На главную
              </Link>
              <button type="button" className="btn btn--outline" onClick={handleClose}>
                Продолжить покупки
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
