import { Link } from 'react-router-dom';
import { productImage } from '../assets';
import Icon from './Icon.jsx';
import UiIcon from './UiIcon.jsx';

export default function ScenarioCard({ scenario, large = false }) {
  return (
    <Link
      to={`/scenarios/${scenario.slug}`}
      className={`scenario-card ${large ? 'scenario-card--large' : ''}`}
    >
      <div className="scenario-card__media">
        <img src={productImage(scenario.image)} alt={scenario.title} loading="lazy" />
      </div>
      <div className="scenario-card__body">
        <div className="scenario-card__meta">
          <span className="scenario-card__icon">
            <Icon name={scenario.icon} size={20} />
          </span>
          <span className="chip">{scenario.count}</span>
        </div>
        <h3>{scenario.title}</h3>
        <p>{scenario.short}</p>
        <span className="scenario-card__link">
          Подробнее
          <UiIcon name="arrowRight" size={15} />
        </span>
      </div>
    </Link>
  );
}
