import { Link } from 'react-router-dom';
import { contacts, footerNav, socials } from '../data/content.js';
import Icon from './Icon.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="logo logo--light" aria-label="Plus Smart Home Tech — на главную">
              <span className="logo__mark">
                <Icon name="home" size={18} />
              </span>
              <span className="logo__text">Plus</span>
            </Link>
            <p>
              Умные лампы, датчики и контроллеры, которые работают вместе. Создайте дом,
              который понимает вас.
            </p>
            <div className="footer__socials">
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

          <div className="footer__columns">
            {footerNav.map((group) => (
              <div className="footer__column" key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="footer__column footer__column--contacts">
              <h3>Контакты</h3>
              <a href={contacts.phoneHref}>{contacts.phone}</a>
              <a href={contacts.emailHref}>{contacts.email}</a>
              <span>{contacts.address}</span>
              <span>{contacts.hours}</span>
            </div>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <span>© 2026 Plus Smart Home Tech. Все права защищены.</span>
          <div className="footer__legal">
            <Link to="/delivery#faq">Политика конфиденциальности</Link>
            <Link to="/delivery#faq">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
