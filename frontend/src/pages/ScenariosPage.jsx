import { Link } from 'react-router-dom';
import { scenarios } from '../data/catalog.js';
import { catalogPromo } from '../data/content.js';
import PageHead from '../components/PageHead.jsx';
import ScenarioCard from '../components/ScenarioCard.jsx';
import UiIcon from '../components/UiIcon.jsx';

export default function ScenariosPage() {
  return (
    <>
      <PageHead
        eyebrow="Готовые решения"
        title="Сценарии умного дома"
        text="Комплекты устройств, которые работают вместе с первого дня. Выберите сценарий — мы поможем собрать и настроить его под ваш дом."
        breadcrumbs={[{ label: 'Главная', to: '/' }, { label: 'Сценарии' }]}
      />

      <section className="section">
        <div className="container">
          <div className="scenario-grid scenario-grid--page">
            {scenarios.map((scenario) => (
              <ScenarioCard key={scenario.slug} scenario={scenario} large />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="steps">
            <div className="steps__head">
              <span className="eyebrow">Как это работает</span>
              <h2>От идеи до первого сценария — четыре шага</h2>
            </div>
            <ol className="steps__list">
              <li>
                <span>01</span>
                <strong>Выберите сценарий</strong>
                <p>Освещение, климат, безопасность или управление всем домом.</p>
              </li>
              <li>
                <span>02</span>
                <strong>Соберите комплект</strong>
                <p>Добавьте устройства в корзину — мы проверим совместимость.</p>
              </li>
              <li>
                <span>03</span>
                <strong>Подключите Plus Hub</strong>
                <p>Он объединит устройства и откроет доступ к автоматизациям.</p>
              </li>
              <li>
                <span>04</span>
                <strong>Настройте сценарии</strong>
                <p>Готовые шаблоны в приложении Plus или собственные правила.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>{catalogPromo.title}</h2>
              <p>{catalogPromo.text}</p>
            </div>
            <Link to="/catalog" className="btn btn--light">
              Перейти в каталог
              <UiIcon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
