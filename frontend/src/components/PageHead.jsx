import Breadcrumbs from './Breadcrumbs.jsx';

export default function PageHead({ eyebrow, title, text, breadcrumbs, children, tone = 'light' }) {
  return (
    <section className={`page-head page-head--${tone}`}>
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="page-head__row">
          <div className="page-head__text">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {text && <p>{text}</p>}
          </div>
          {children && <div className="page-head__aside">{children}</div>}
        </div>
      </div>
    </section>
  );
}
