import { useState } from 'react';
import { promo } from '../data/content.js';
import UiIcon from './UiIcon.jsx';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Введите корректный email');
      setStatus('error');
      return;
    }
    setError('');
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__banner">
          <div className="newsletter__text">
            <h2>{promo.title}</h2>
            <p>{promo.text}</p>
          </div>

          <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
            <label className="sr-only" htmlFor="newsletter-email">
              Ваш email
            </label>
            <input
              id="newsletter-email"
              type="email"
              className={status === 'error' ? 'is-invalid' : ''}
              placeholder="Ваш email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === 'error') {
                  setStatus('idle');
                  setError('');
                }
              }}
              autoComplete="email"
            />
            <button type="submit" className="btn btn--light">
              Подписаться
            </button>
          </form>

          <div className="newsletter__note">
            {status === 'success' ? (
              <span className="newsletter__success">
                <UiIcon name="check" size={15} /> Спасибо! Промокод отправили на почту.
              </span>
            ) : status === 'error' ? (
              <span className="newsletter__error">{error}</span>
            ) : (
              promo.note
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
