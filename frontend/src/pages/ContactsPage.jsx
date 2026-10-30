import { useState } from 'react';
import { contacts, socials } from '../data/content.js';
import PageHead from '../components/PageHead.jsx';
import Icon from '../components/Icon.jsx';
import UiIcon from '../components/UiIcon.jsx';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Укажите имя';
    if (form.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Укажите телефон';
    if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = 'Укажите корректный email';
    if (form.message.trim().length < 10) nextErrors.message = 'Опишите вопрос подробнее';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSent(true);
    setErrors({});
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <>
      <PageHead
        eyebrow="Контакты"
        title="Будем на связи"
        text="Поможем подобрать устройства, настроить сценарии и разобраться с заказом."
        breadcrumbs={[{ label: 'Главная', to: '/' }, { label: 'Контакты' }]}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <a className="contact-card" href={contacts.phoneHref}>
              <span className="contact-card__icon">
                <Icon name="phone" size={22} />
              </span>
              <span>Телефон поддержки</span>
              <strong>{contacts.phone}</strong>
              <small>Звонок по России бесплатный</small>
            </a>

            <a className="contact-card" href={contacts.emailHref}>
              <span className="contact-card__icon">
                <Icon name="mail" size={22} />
              </span>
              <span>Электронная почта</span>
              <strong>{contacts.email}</strong>
              <small>Ответим в течение рабочего дня</small>
            </a>

            <div className="contact-card">
              <span className="contact-card__icon">
                <UiIcon name="pin" size={22} />
              </span>
              <span>Шоурум</span>
              <strong>{contacts.address}</strong>
              <small>{contacts.hours}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container contact-layout">
          <div className="contact-form-wrap">
            <span className="eyebrow">Напишите нам</span>
            <h2>Остались вопросы?</h2>
            <p>
              Заполните форму — инженер Plus свяжется с вами, поможет подобрать комплект
              и рассчитает стоимость установки.
            </p>

            {sent ? (
              <div className="form-success">
                <span className="form-success__icon">
                  <UiIcon name="check" size={24} />
                </span>
                <h3>Сообщение отправлено</h3>
                <p>Спасибо! Мы ответим на вашу почту в течение рабочего дня.</p>
                <button type="button" className="btn btn--outline btn--sm" onClick={() => setSent(false)}>
                  Отправить ещё одно
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <label className="field">
                    <span>Имя</span>
                    <input
                      value={form.name}
                      onChange={update('name')}
                      className={errors.name ? 'is-invalid' : ''}
                      autoComplete="name"
                    />
                    {errors.name && <em>{errors.name}</em>}
                  </label>
                  <label className="field">
                    <span>Телефон</span>
                    <input
                      value={form.phone}
                      onChange={update('phone')}
                      className={errors.phone ? 'is-invalid' : ''}
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                    />
                    {errors.phone && <em>{errors.phone}</em>}
                  </label>
                </div>

                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className={errors.email ? 'is-invalid' : ''}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <em>{errors.email}</em>}
                </label>

                <label className="field">
                  <span>Вопрос</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className={errors.message ? 'is-invalid' : ''}
                    placeholder="Расскажите, что хотите подключить или настроить"
                  />
                  {errors.message && <em>{errors.message}</em>}
                </label>

                <button type="submit" className="btn btn--primary">
                  Отправить сообщение
                </button>
                <p className="contact-form__legal">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </form>
            )}
          </div>

          <aside className="contact-aside">
            <div className="contact-aside__card contact-aside__card--map">
              <span className="contact-aside__pin">
                <UiIcon name="pin" size={24} />
              </span>
              <div>
                <h3>{contacts.mapNote}</h3>
                <p>{contacts.address}</p>
                <span>{contacts.hours}</span>
              </div>
            </div>

            <div className="contact-aside__card">
              <h3>Мы в соцсетях</h3>
              <p>Новинки, сценарии и инструкции — каждый день.</p>
              <div className="footer__socials footer__socials--dark">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    className="footer__social"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-aside__card contact-aside__card--accent">
              <h3>Нужна установка?</h3>
              <p>
                Выездной инженер настроит устройства и соберёт сценарии под ваш дом.
                Бесплатно при заказе от 30 000 ₽.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
