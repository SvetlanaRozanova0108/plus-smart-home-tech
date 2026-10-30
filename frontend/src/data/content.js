export const heroFeatures = [
  {
    icon: 'factory',
    title: 'Собственное производство',
    text: 'Свои линии в России',
  },
  {
    icon: 'shield-check',
    title: 'Гарантия 2 года',
    text: 'Бесплатный сервис',
  },
  {
    icon: 'package',
    title: 'Доставка по РФ',
    text: 'От 1 дня',
  },
];

export const promo = {
  title: 'Скидка 10% на первый заказ',
  text: 'Подпишитесь на рассылку новинок и акций — без спама, только полезное.',
  note: 'Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности.',
};

export const contacts = {
  phone: '8 800 555-35-35',
  phoneHref: 'tel:88005553535',
  email: 'hello@plus-home.ru',
  emailHref: 'mailto:hello@plus-home.ru',
  address: 'Москва, ул. Складочная, 1, стр. 18',
  hours: 'Ежедневно с 9:00 до 21:00',
  mapNote: 'Шоурум и пункт самовывоза',
};

export const socials = [
  { icon: 'telegram', label: 'Telegram', href: 'https://t.me/' },
  { icon: 'vk', label: 'VK', href: 'https://vk.com/' },
  { icon: 'youtube', label: 'YouTube', href: 'https://youtube.com/' },
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/' },
];

export const footerNav = [
  {
    title: 'Магазин',
    links: [
      { label: 'Все товары', to: '/catalog' },
      { label: 'Освещение', to: '/catalog?category=LIGHTING' },
      { label: 'Датчики', to: '/catalog?category=SENSORS' },
      { label: 'Контроль', to: '/catalog?category=CONTROL' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'Готовые сценарии', to: '/scenarios' },
      { label: 'Доставка и оплата', to: '/delivery' },
      { label: 'Контакты', to: '/contacts' },
    ],
  },
  {
    title: 'Помощь',
    links: [
      { label: 'Гарантия и возврат', to: '/delivery#faq' },
      { label: 'Политика конфиденциальности', to: '/delivery#faq' },
      { label: 'Публичная оферта', to: '/delivery#faq' },
    ],
  },
];

export const productHighlights = [
  {
    icon: 'package',
    title: 'Доставка от 1 дня',
    text: 'По Москве и всей России',
  },
  {
    icon: 'shield-check',
    title: 'Гарантия 2 года',
    text: 'Официальная поддержка Plus',
  },
  {
    icon: 'settings',
    title: 'Поможем с настройкой',
    text: 'Инструкции и поддержка 24/7',
  },
];

export const deliveryOptions = [
  {
    icon: 'package',
    title: 'Курьером по Москве',
    time: '1–2 дня',
    price: '490 ₽',
    note: 'Бесплатно при заказе от 5 000 ₽',
  },
  {
    icon: 'antenna',
    title: 'Курьером по России',
    time: '3–7 дней',
    price: 'от 690 ₽',
    note: 'Доставка более чем в 300 городов',
  },
  {
    icon: 'home',
    title: 'Пункт выдачи',
    time: '2–5 дней',
    price: '290 ₽',
    note: 'Свыше 1 200 точек по стране',
  },
  {
    icon: 'bolt',
    title: 'Самовывоз',
    time: 'Сегодня',
    price: 'Бесплатно',
    note: 'Шоурум на Складочной, 1',
  },
];

export const deliverySteps = [
  {
    title: 'Оформление',
    text: 'Выберите устройства и оформите заказ на сайте. Мы подтвердим его по телефону.',
  },
  {
    title: 'Сборка',
    text: 'Проверим каждое устройство, обновим прошивку и аккуратно упакуем.',
  },
  {
    title: 'Доставка',
    text: 'Передадим заказ курьеру или в пункт выдачи и пришлём трек-номер.',
  },
  {
    title: 'Настройка',
    text: 'Поможем подключить устройства к приложению Plus и собрать первые сценарии.',
  },
];

export const paymentMethods = [
  { title: 'Банковской картой', text: 'МИР, Visa, Mastercard — на сайте или при получении.' },
  { title: 'СБП', text: 'Оплата по QR-коду из приложения вашего банка.' },
  { title: 'Рассрочка 0%', text: 'На 6 месяцев без переплаты для заказов от 10 000 ₽.' },
];

export const faq = [
  {
    question: 'Сколько стоит доставка?',
    answer:
      'По Москве — 490 ₽, бесплатно при заказе от 5 000 ₽. По России — от 690 ₽ в зависимости от региона. Точную стоимость покажем при оформлении.',
  },
  {
    question: 'Можно ли вернуть устройство?',
    answer:
      'Да. В течение 14 дней с момента получения вы можете вернуть товар в заводской упаковке без следов использования. Обратная доставка — за наш счёт.',
  },
  {
    question: 'Нужен ли отдельный хаб?',
    answer:
      'Для большинства датчиков и ламп достаточно Plus Hub. Он объединяет устройства и поддерживает Matter, Яндекс Алису, Apple Home и Google Home.',
  },
  {
    question: 'Поможете с установкой и настройкой?',
    answer:
      'Да. В Москве и области работает выездной монтаж. По всей России поможем удалённо: подскажем, как подключить устройства и настроить сценарии.',
  },
  {
    question: 'Работает ли Plus без интернета?',
    answer:
      'Базовые сценарии продолжают работать локально через хаб. Удалённое управление и уведомления требуют подключения к сети.',
  },
];

export const catalogPromo = {
  title: 'Соберите умный дом по частям',
  text: 'Начните с одной лампы или датчика — остальные устройства добавите позже. Все они работают в одном приложении Plus.',
};
