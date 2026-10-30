import { Link } from 'react-router-dom';
import UiIcon from './UiIcon.jsx';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span className="breadcrumbs__item" key={`${item.label}-${index}`}>
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
            )}
            {!isLast && <UiIcon name="chevronRight" size={13} />}
          </span>
        );
      })}
    </nav>
  );
}
