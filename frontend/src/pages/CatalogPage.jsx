import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts, getFallbackProducts } from '../api/client.js';
import { categoryLabels } from '../data/catalog.js';
import { itemsLabel } from '../utils/format.js';
import PageHead from '../components/PageHead.jsx';
import ProductCard from '../components/ProductCard.jsx';
import UiIcon from '../components/UiIcon.jsx';

const SORTS = [
  { value: 'popular', label: 'Сначала популярные' },
  { value: 'new', label: 'Сначала новинки' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'rating', label: 'По рейтингу' },
];

const PAGE_SIZE = 12;

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'popular';

  const [products, setProducts] = useState(getFallbackProducts);
  const [query, setQuery] = useState(search);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let active = true;
    fetchAllProducts()
      .then((list) => {
        if (active) setProducts(list);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setQuery(search);
  }, [search]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category, search, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    const result = products.filter((product) => {
      if (category && product.productCategory !== category) return false;
      if (!normalizedQuery) return true;
      return `${product.productName} ${product.description}`
        .toLowerCase()
        .includes(normalizedQuery);
    });

    const sorted = [...result];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'new':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.reviewCount - a.reviewCount);
        break;
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating);
    }
    return sorted;
  }, [products, category, search, sort]);

  const shown = filtered.slice(0, visible);

  const resetFilters = () => {
    setQuery('');
    setSearchParams({}, { replace: true });
  };

  return (
    <>
      <PageHead
        eyebrow="Магазин Plus"
        title="Каталог устройств"
        text="Умные лампы, датчики, контроллеры и аксессуары. Всё совместимо между собой и работает в приложении Plus."
        breadcrumbs={[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]}
      />

      <section className="section catalog">
        <div className="container">
          <div className="catalog__toolbar">
            <form
              className="catalog-search"
              onSubmit={(event) => {
                event.preventDefault();
                setParam('q', query.trim());
              }}
            >
              <UiIcon name="search" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Найти лампу, датчик или контроллер"
                aria-label="Поиск по каталогу"
              />
              {query && (
                <button
                  type="button"
                  className="catalog-search__clear"
                  onClick={() => {
                    setQuery('');
                    setParam('q', '');
                  }}
                  aria-label="Очистить поиск"
                >
                  <UiIcon name="close" size={15} />
                </button>
              )}
              <button type="submit" className="btn btn--primary btn--sm">
                Найти
              </button>
            </form>

            <label className="select">
              <UiIcon name="filter" size={17} />
              <span className="sr-only">Сортировка</span>
              <select value={sort} onChange={(event) => setParam('sort', event.target.value)}>
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <UiIcon name="chevronDown" size={15} />
            </label>
          </div>

          <div className="catalog__filters">
            <button
              type="button"
              className={`filter-chip ${!category ? 'is-active' : ''}`}
              onClick={() => setParam('category', '')}
            >
              Все устройства
            </button>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`filter-chip ${category === value ? 'is-active' : ''}`}
                onClick={() => setParam('category', value)}
              >
                {label}
              </button>
            ))}

            {search && (
              <button type="button" className="filter-chip filter-chip--query" onClick={() => setParam('q', '')}>
                «{search}»
                <UiIcon name="close" size={13} />
              </button>
            )}
          </div>

          <div className="catalog__meta">
            <span>{itemsLabel(filtered.length)}</span>
            <span className="catalog__hint">
              <UiIcon name="truck" size={16} /> Бесплатная доставка от 5 000 ₽
            </span>
          </div>

          {shown.length > 0 ? (
            <>
              <div className="product-grid">
                {shown.map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))}
              </div>

              {visible < filtered.length && (
                <div className="catalog__more">
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setVisible((value) => value + PAGE_SIZE)}
                  >
                    Показать ещё {Math.min(PAGE_SIZE, filtered.length - visible)}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setVisible(filtered.length)}
                  >
                    Показать все
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon">
                <UiIcon name="search" size={26} />
              </span>
              <h2>Ничего не найдено</h2>
              <p>Попробуйте изменить запрос или выбрать другую категорию.</p>
              <button type="button" className="btn btn--primary btn--sm" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
