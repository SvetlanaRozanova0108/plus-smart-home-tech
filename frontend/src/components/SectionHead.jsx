import { Link } from 'react-router-dom';
import UiIcon from './UiIcon.jsx';

export default function SectionHead({ title, text, action, to }) {
  return (
    <div className="section-head">
      <div className="section-head__text">
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action && to && (
        <Link className="btn btn--primary btn--sm section-head__action" to={to}>
          {action}
          <UiIcon name="arrowRight" size={16} />
        </Link>
      )}
    </div>
  );
}
