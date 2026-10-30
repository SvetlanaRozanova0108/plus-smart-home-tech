import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faq, deliveryOptions, deliverySteps, paymentMethods } from '../data/content.js';
import PageHead from '../components/PageHead.jsx';
import Icon from '../components/Icon.jsx';
import UiIcon from '../components/UiIcon.jsx';

export default function DeliveryPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <PageHead
        eyebrow="Доставка и оплата"
        title="Привезём быстро и аккуратно"
        text="Доставляем по Москве от 1 дня и по всей России от 3 дней. Каждое устройство проверяем перед отправкой."
        breadcrumbs={[{ label: 'Главная', to: '/' }, { label: 'Доставка и оплата' }]}
      />

      <section className="section">
        <div className="container">
          <div className="delivery-grid">
            {deliveryOptions.map((option) => (
              <article className="delivery-card" key={option.title}>
                <span className="delivery-card__icon">
                  <Icon name={option.icon} size={22} />
                </span>
                <div className="delivery-card__head">
                  <h3>{option.title}</h3>
                  <span>{option.time}</span>
                </div>
                <strong>{option.price}</strong>
                <p>{option.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <h2>Как проходит доставка</h2>
              <p>От оформления заказа до первого сценария — обычно меньше недели.</p>
            </div>
          </div>
          <ol className="steps__list steps__list--numbered">
            {deliverySteps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <h2>Способы оплаты</h2>
              <p>Выберите удобный вариант при оформлении заказа.</p>
            </div>
          </div>
          <div className="payment-grid">
            {paymentMethods.map((method) => (
              <article className="payment-card" key={method.title}>
                <span className="payment-card__icon">
                  <UiIcon name="card" size={22} />
                </span>
                <h3>{method.title}</h3>
                <p>{method.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="faq">
        <div className="container">
          <div className="faq">
            <div className="faq__head">
              <span className="eyebrow">Частые вопросы</span>
              <h2>Всё, что важно знать</h2>
              <p>
                Не нашли ответ? Напишите нам — поддержка отвечает ежедневно с 9:00 до 21:00.
              </p>
              <Link to="/contacts" className="btn btn--outline btn--sm">
                Задать вопрос
              </Link>
            </div>

            <div className="faq__list">
              {faq.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    >
                      {item.question}
                      <UiIcon name="chevronDown" size={18} />
                    </button>
                    {isOpen && <p>{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
