import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/catalog.js';
import { contacts } from '../data/content.js';
import { useCart } from '../context/CartContext.jsx';
import Icon from './Icon.jsx';
import UiIcon from './UiIcon.jsx';

export default function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.classList.toggle('is-menu-open', menuOpen);
    return () => document.body.classList.remove('is-menu-open');
  }, [menuOpen]);

  const currentParams = new URLSearchParams(location.search);

  const isLinkActive = (to) => {
    const [path, query = ''] = to.split('?');

    if (location.pathname !== path) {
      return path !== '/' && location.pathname.startsWith(`${path}/`);
    }

    if (!query) {
      if (path === '/catalog') {
        return !currentParams.get('category') && !currentParams.get('sort');
      }
      return true;
    }

    const linkParams = new URLSearchParams(query);
    for (const [key, value] of linkParams) {
      if (currentParams.get(key) !== value) return false;
    }
    return true;
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo" aria-label="Plus Smart Home Tech — на главную">
          <span className="logo__mark">
            <Icon name="home" size={18} />
          </span>
          <span className="logo__text">Plus</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Основная навигация">
          {navLinks.map((link) => {
            const active = isLinkActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav__link ${active ? 'is-active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <a className="nav__phone" href={contacts.phoneHref}>
            <Icon name="phone" size={18} />
            {contacts.phone}
          </a>
        </nav>

        <div className="header__spacer" />

        <a className="header__phone" href={contacts.phoneHref}>
          <Icon name="phone" size={18} />
          {contacts.phone}
        </a>

        <Link className="cart-button" to="/cart" aria-label={`Корзина, товаров: ${count}`}>
          <Icon name="cart" size={18} />
          <span>Корзина</span>
          {count > 0 && <span className="cart-button__count">{count}</span>}
        </Link>

        <button
          type="button"
          className="burger"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <UiIcon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>
      </div>
    </header>
  );
}
