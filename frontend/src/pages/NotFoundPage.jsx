import { Link } from 'react-router-dom';
import UiIcon from '../components/UiIcon.jsx';

export default function NotFoundPage() {
  return (
    <section className="section not-found">
      <div className="container">
        <div className="not-found__inner">
          <span className="not-found__code">404</span>
          <h1>Страница не найдена</h1>
          <p>
            Возможно, ссылка устарела или страница была перемещена. Начните с главной или
            загляните в каталог.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn--primary">
              На главную
            </Link>
            <Link to="/catalog" className="btn btn--outline">
              В каталог
              <UiIcon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
