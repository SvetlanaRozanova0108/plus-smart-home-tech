/* ===========================================================================
   Plus Smart Home — плагин правок
   Запуск: Plugins → Development → Plus Smart Home — Apply
   Каждый шаг независим: если один не удался, остальные всё равно применятся.
   В конце открывается окно с отчётом.
   =========================================================================== */

(async () => {
  const report = [];
  const DESKTOP = {};

  function step(label, fn) {
    try { const r = fn(); report.push('• ' + label + ': ' + (r || 'ок')); }
    catch (e) { report.push('• ' + label + ': ОШИБКА — ' + (e && e.message || e)); }
  }

  try {
    const MAP = {
      '#0F7BFF': '#A4836A', '#E7F1FF': '#EFE7DF', '#DCEBFF': '#E9E0D7',
      '#EEF3FB': '#F3EDE6', '#F5F7FA': '#F5F1EC', '#E4E7EC': '#E6DFD7',
      '#101828': '#3A352F', '#344054': '#5C564D', '#667085': '#7E786E',
      '#98A2B3': '#ABA59B', '#FFB020': '#C99A3F', '#12B76A': '#7E9B6E',
      '#E7F8F0': '#E6E7DE', '#F04438': '#B4654A', '#0B1220': '#2B2621',
      '#131C2E': '#3A342D', '#22304A': '#4A423A'
    };
    const BRAND = '#A4836A', SOFT = '#EFE7DF', INK700 = '#5C564D', WHITE = '#FFFFFF';
    const rgb = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
    const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
    const solid = h => [{ type: 'SOLID', color: rgb(h) }];

    await figma.loadAllPagesAsync();
    for (const w of ['Regular', 'Medium', 'Semi Bold', 'Bold', 'Light', 'Extra Light', 'Thin', 'Extra Bold', 'Black']) {
      try { await figma.loadFontAsync({ family: 'Inter', style: w }); } catch (e) {}
    }
    report.push('Файл: «' + figma.root.name + '»');
    report.push('Страницы: ' + figma.root.children.map(p => p.name).join(', '));

    const BASKET = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304"/><path d="M17 10l-2 -6"/><path d="M7 10l2 -6"/></svg>';
    const GRID = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"/><path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"/><path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"/><path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4"/></svg>';
    const MENU = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l16 0"/><path d="M4 12l16 0"/><path d="M4 18l16 0"/></svg>';
    const HOME = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l-2 0l9 -9l9 9l-2 0"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/></svg>';
    const TRUCK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"/></svg>';
    const SHIELD = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"/><path d="M9 12l2 2l4 -4"/></svg>';
    const FACTORY = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-14a1 1 0 0 0 -1.585 -.796l-5.415 5.796v-5a1 1 0 0 0 -1.585 -.796l-5.415 5.796v-5a1 1 0 0 0 -1.585 -.796l-3.415 3.796v10"/><path d="M7 16h1"/><path d="M12 16h1"/><path d="M17 16h1"/></svg>';
    const PHONE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"/></svg>';

    // ---- Бейджи: жёсткая привязка «слой иконки → подпись» -------------------
    const BADGE_SPECS = [
      {
        name: 'Icon/building-factory', label: 'Свое производство', svg: FACTORY,
        iconKw: /building[-_\s]?factory|factory|завод/i, textKw: /производ/i
      },
      {
        name: 'Icon/shield-check', label: 'Гарантия 2 года', svg: SHIELD,
        iconKw: /shield[-_\s]?check|shield/i, textKw: /гарант/i
      },
      {
        name: 'Icon/truck-delivery', label: 'Доставка по РФ', svg: TRUCK,
        iconKw: /truck[-_\s]?delivery|truck|delivery/i, textKw: /достав/i
      }
    ];
    const ICON_RANK = { INSTANCE: 0, COMPONENT: 1, FRAME: 2, GROUP: 3, VECTOR: 4 };

    // Захватываем реальные иконки ДО удаления блока «Components» — экспортом в SVG,
    // чтобы потом не зависеть от мастер-компонента, который удаляется.
    const ICON_SVG = {};
    {
      const all = figma.root.findAll(n => n && typeof n.name === 'string' && n.name);
      for (const sp of BADGE_SPECS) {
        const cands = all.filter(n => ICON_RANK[n.type] !== undefined && (n.name === sp.name || sp.iconKw.test(n.name)));
        if (!cands.length) continue;
        cands.sort((a, b) => (ICON_RANK[a.type] - ICON_RANK[b.type]) ||
          ((a.name === sp.name ? 0 : 1) - (b.name === sp.name ? 0 : 1)));
        try {
          const svg = await cands[0].exportAsync({ format: 'SVG' });
          if (svg && svg.length > 20) ICON_SVG[sp.name] = svg;
        } catch (e) {}
      }
    }

    function makeIcon(svg, color, size) {
      const src = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/currentColor/g, color);
      const nd = figma.createNodeFromSvg(src);
      nd.resize(size, size);
      nd.findAll(c => c.type === 'VECTOR').forEach(v => { if (v.strokes && v.strokes.length) v.strokes = solid(color); });
      return nd;
    }
    function text(ch, size, style, color) {
      const t = figma.createText();
      t.characters = ch; t.fontSize = size; t.fontName = { family: 'Inter', style }; t.fills = solid(color);
      return t;
    }
    function replace(oldN, newN) { const p = oldN.parent; const i = p.children.indexOf(oldN); oldN.remove(); p.insertChild(i, newN); }
    function grow(node, f) {
      try { node.rescale(f); }
      catch (e) { node.resize(Math.max(1, Math.round(node.width * f)), Math.round(node.height * f)); }
      return Math.round(node.width) + 'x' + Math.round(node.height);
    }

    function buildCart() {
      const f = figma.createFrame();
      f.name = 'CartButton';
      f.layoutMode = 'HORIZONTAL';
      f.primaryAxisSizingMode = 'AUTO';
      f.counterAxisSizingMode = 'AUTO';
      f.primaryAxisAlignItems = 'CENTER';
      f.counterAxisAlignItems = 'CENTER';
      f.itemSpacing = 8;
      f.paddingLeft = 16; f.paddingRight = 16; f.paddingTop = 11; f.paddingBottom = 11;
      f.cornerRadius = 10;
      f.fills = solid(BRAND);
      f.clipsContent = false;
      f.appendChild(makeIcon(BASKET, WHITE, 18));
      f.appendChild(text('Корзина', 14, 'Semi Bold', WHITE));
      return f;
    }
    function buildCatalog() {
      const f = figma.createFrame();
      f.name = 'CatalogButton';
      f.layoutMode = 'HORIZONTAL';
      f.primaryAxisSizingMode = 'AUTO';
      f.counterAxisSizingMode = 'AUTO';
      f.primaryAxisAlignItems = 'CENTER';
      f.counterAxisAlignItems = 'CENTER';
      f.itemSpacing = 10;
      f.paddingLeft = 28; f.paddingRight = 28; f.paddingTop = 20; f.paddingBottom = 20;
      f.cornerRadius = 12;
      f.fills = solid(BRAND);
      f.clipsContent = false;
      f.appendChild(makeIcon(GRID, WHITE, 24));
      f.appendChild(text('В каталог', 18, 'Semi Bold', WHITE));
      return f;
    }
    function buildSeeAll() {
      const f = figma.createFrame();
      f.name = 'SeeAllButton'; f.layoutMode = 'HORIZONTAL';
      f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO';
      f.paddingTop = 14; f.paddingBottom = 14; f.paddingLeft = 24; f.paddingRight = 24;
      f.cornerRadius = 10; f.fills = solid(BRAND);
      f.appendChild(text('Смотреть все', 15, 'Semi Bold', WHITE));
      return f;
    }
    function buildNavButton(label) {
      const f = figma.createFrame();
      f.name = 'NavButton';
      f.layoutMode = 'HORIZONTAL';
      f.primaryAxisSizingMode = 'AUTO';
      f.counterAxisSizingMode = 'AUTO';
      f.primaryAxisAlignItems = 'CENTER';
      f.counterAxisAlignItems = 'CENTER';
      f.paddingLeft = 16; f.paddingRight = 16; f.paddingTop = 12; f.paddingBottom = 12;
      f.cornerRadius = 12;
      f.fills = solid(BRAND);
      f.clipsContent = false;
      f.appendChild(text(String(label), 15, 'Semi Bold', WHITE));
      return f;
    }
    function fillReview(card, name, body) {
      const texts = card.findAll(n => n.type === 'TEXT');
      if (!texts.length) return false;
      const byY = texts.slice().sort((a, b) => (a.absoluteBoundingBox ? a.absoluteBoundingBox.y : 0) - (b.absoluteBoundingBox ? b.absoluteBoundingBox.y : 0));
      const byLen = texts.slice().sort((a, b) => b.characters.length - a.characters.length);
      const bodyNode = byLen[0];
      bodyNode.characters = body;
      const idx = byY.indexOf(bodyNode);
      let nameNode = null;
      for (let i = idx - 1; i >= 0; i--) {
        const t = byY[i];
        if (t.characters.length >= 2 && t.characters.length <= 40 && !/[0-9]/.test(t.characters)) { nameNode = t; break; }
      }
      if (!nameNode) {
        for (let i = idx + 1; i < byY.length; i++) {
          const t = byY[i];
          if (t.characters.length >= 2 && t.characters.length <= 40 && !/[0-9]/.test(t.characters)) { nameNode = t; break; }
        }
      }
      if (nameNode) nameNode.characters = name;
      return true;
    }
    function paramsReport(n) {
      return n.name + ' x=' + Math.round(n.x) + ' w=' + Math.round(n.width) +
        ' (layoutPositioning=' + n.layoutPositioning + ')';
    }
    function buildBurger() {
      const f = figma.createFrame();
      f.name = 'BurgerButton';
      f.layoutMode = 'HORIZONTAL';
      f.primaryAxisSizingMode = 'AUTO';
      f.counterAxisSizingMode = 'AUTO';
      f.primaryAxisAlignItems = 'CENTER';
      f.counterAxisAlignItems = 'CENTER';
      f.paddingLeft = 12; f.paddingRight = 12; f.paddingTop = 10; f.paddingBottom = 10;
      f.cornerRadius = 10;
      f.fills = solid(SOFT);
      f.clipsContent = false;
      f.appendChild(makeIcon(MENU, BRAND, 24));
      return f;
    }
    function buttonAncestor(t, stops) {
      let a = t;
      while (a.parent && stops.indexOf(a.parent.name) < 0) a = a.parent;
      if (stops.indexOf(a.name) >= 0) { let b = t; while (b.parent !== a) b = b.parent; a = b; }
      return a;
    }

    // Перекраска одного узла (и его потомков) в пастельную палитру
    function paintIcon(node) {
      let n = 0;
      node.findAll(c => {
        ['fills', 'strokes'].forEach(k => {
          const p = c[k]; if (!p || !p.length) return;
          const np = p.map(x => {
            if (x.type !== 'SOLID') return x;
            const h = hex(x.color);
            if (MAP[h]) { n++; return Object.assign({}, x, { color: rgb(MAP[h]) }); }
            if (h === '#FFFFFF') return x;
            return Object.assign({}, x, { color: rgb(BRAND) });
          });
          try { c[k] = np; } catch (e) {}
        });
        return true;
      });
      return n;
    }

    // Приводим иконку к единому размеру (масштабируем содержимое)
    function scaleIcon(icon, target) {
      const cur = Math.max(icon.width || 0, icon.height || 0);
      if (!cur || !target) return;
      const f = target / cur;
      if (Math.abs(f - 1) < 0.02) return;
      try {
        icon.rescale(f);
        if (Math.abs((icon.width || 0) - cur * f) > 2) throw new Error('rescale');
      } catch (e) {
        const kids = icon.children ? icon.children.slice() : [];
        kids.forEach(k => {
          try { k.rescale(f); }
          catch (e2) { try { k.resize(Math.max(1, Math.round(k.width * f)), Math.max(1, Math.round(k.height * f))); } catch (e3) {} }
        });
        try { icon.resize(Math.max(1, Math.round(cur * f)), Math.max(1, Math.round(cur * f))); } catch (e3) {}
      }
    }

    // Текст подписи с сохранением стиля найденного образца
    function makeLabel(ch, st) {
      const t = figma.createText();
      t.characters = ch;
      if (st) {
        try { if (st.name) t.fontName = st.name; } catch (e) {}
        try { if (st.size) t.fontSize = st.size; } catch (e) {}
        try { if (st.lineHeight) t.lineHeight = st.lineHeight; } catch (e) {}
        try { if (st.letterSpacing != null) t.letterSpacing = st.letterSpacing; } catch (e) {}
        try { if (st.align) t.textAlignHorizontal = st.align; } catch (e) {}
      } else {
        try { t.fontName = { family: 'Inter', style: 'Medium' }; t.fontSize = 15; } catch (e) {}
      }
      try { t.fills = solid(INK700); } catch (e) {}
      return t;
    }

    // Собирает секцию бейджей: у каждой иконки — свой блок BadgeIcon + своя подпись
    function arrangeBadges(root, vertical) {
      let sec = root.findOne(n => /Badges/i.test(n.name) && n.type !== 'TEXT' && n.children);
      const created = !sec;
      if (!sec) {
        sec = figma.createFrame();
        sec.name = 'Badges';
        const hero = root.findOne(n => /Hero/i.test(n.name)) || root;
        hero.appendChild(sec);
      }

      // образцы подписей (стиль) — до очистки секции
      const secTexts = sec.findAll(n => n.type === 'TEXT');
      const pageTexts = root.findAll(n => n.type === 'TEXT');
      const styles = {};
      BADGE_SPECS.forEach(sp => {
        const src = secTexts.filter(t => sp.textKw.test(t.characters))[0] ||
          pageTexts.filter(t => sp.textKw.test(t.characters))[0];
        if (src) styles[sp.name] = {
          name: src.fontName, size: src.fontSize, lineHeight: src.lineHeight,
          letterSpacing: src.letterSpacing, align: src.textAlignHorizontal
        };
      });

      // ориентация бейджа: иконка сверху (VERTICAL) или слева (HORIZONTAL)
      let badgeLayout = 'VERTICAL';
      sec.children.forEach(c => {
        if (c.type === 'TEXT' || !c.children) return;
        const hasIcon = c.findAll(n => /^Icon\//.test(n.name)).length > 0;
        const hasText = c.findAll(n => n.type === 'TEXT').length > 0;
        if (hasIcon && hasText && c.layoutMode && c.layoutMode !== 'NONE') badgeLayout = c.layoutMode;
      });

      // убираем старые бейджи (иконки и их подписи)
      const LABEL_KW = /производ|гарант|достав/i;
      sec.children.slice().forEach(c => {
        let drop = false;
        if (c.type === 'TEXT') drop = LABEL_KW.test(c.characters);
        else if (/^Icon\//.test(c.name)) drop = true;
        else {
          drop = c.findAll(n => n.type === 'TEXT').some(t => LABEL_KW.test(t.characters)) ||
            c.findAll(n => /^Icon\//.test(n.name)).length > 0;
        }
        if (drop) { try { c.remove(); } catch (e) {} }
      });

      // остатки-«призраки»: вложенные Badges и «голые» иконки прямо в секции
      sec.findAll(n => n.name === 'Badges').forEach(bad => { try { bad.remove(); } catch (e) {} });
      sec.children.slice().forEach(c => {
        if (/^Icon\//.test(c.name) || (c.type !== 'TEXT' && c.findAll && c.findAll(n => /^Icon\//.test(n.name)).length && !c.findAll(n => n.type === 'TEXT').length)) {
          try { c.remove(); } catch (e) {}
        }
      });

      // геометрия секции
      const PAD = vertical ? 40 : 120;
      const colW = Math.round(sec.width > 200 ? sec.width : Math.max(200, root.width - PAD));
      sec.layoutMode = vertical ? 'VERTICAL' : 'HORIZONTAL';
      sec.layoutWrap = 'NO_WRAP';
      sec.resize(colW, Math.max(1, sec.height));
      sec.primaryAxisSizingMode = vertical ? 'AUTO' : 'FIXED';
      sec.counterAxisSizingMode = vertical ? 'FIXED' : 'AUTO';
      sec.itemSpacing = vertical ? 16 : 24;
      sec.primaryAxisAlignItems = 'CENTER';
      sec.counterAxisAlignItems = 'CENTER';
      sec.fills = [];
      sec.clipsContent = false;

      // три блока: в каждом свой BadgeIcon + подпись
      const size = vertical ? 40 : 32;
      const lines = [];
      BADGE_SPECS.forEach(sp => {
        const badge = figma.createFrame();
        badge.name = 'Badge/' + sp.label;
        badge.layoutMode = badgeLayout;
        badge.primaryAxisSizingMode = 'AUTO';
        badge.counterAxisSizingMode = 'AUTO';
        badge.primaryAxisAlignItems = 'CENTER';
        badge.counterAxisAlignItems = 'CENTER';
        badge.itemSpacing = 10;
        badge.fills = [];
        badge.clipsContent = false;

        const box = figma.createFrame();
        box.name = 'BadgeIcon';
        box.layoutMode = 'HORIZONTAL';
        box.primaryAxisSizingMode = 'AUTO';
        box.counterAxisSizingMode = 'AUTO';
        box.primaryAxisAlignItems = 'CENTER';
        box.counterAxisAlignItems = 'CENTER';
        box.fills = [];
        box.clipsContent = false;

        let icon = null, src = 'запасная иконка';
        if (ICON_SVG[sp.name]) {
          try {
            icon = figma.createNodeFromSvg(ICON_SVG[sp.name]);
            paintIcon(icon);
            src = 'слой из файла';
          } catch (e) { icon = null; }
        }
        if (!icon) icon = makeIcon(sp.svg, BRAND, size);
        icon.name = sp.name;
        scaleIcon(icon, size);
        box.appendChild(icon);

        const label = makeLabel(sp.label, styles[sp.name]);
        label.name = 'BadgeText';

        badge.appendChild(box);
        badge.appendChild(label);
        sec.appendChild(badge);
        lines.push(sp.name + ' → ' + sp.label + ' (' + src + ')');
      });

      return (created ? 'секция создана; ' : '') + lines.join('; ');
    }

    // 1. Перекраска
    step('Перекраска в пастельные тона', () => {
      let n = 0;
      figma.root.findAll(() => true).forEach(node => {
        ['fills', 'strokes'].forEach(k => {
          const p = node[k]; if (!p || !p.length) return; let ch = false;
          const np = p.map(x => { if (x.type === 'SOLID') { const h = hex(x.color); if (MAP[h]) { ch = true; return Object.assign({}, x, { color: rgb(MAP[h]) }); } } return x; });
          if (ch) { try { node[k] = np; n++; } catch (e) {} }
        });
      });
      return n + ' слоёв';
    });

    // 1b. Удаление служебного блока Components
    step('Удаление блока «Components»', () => {
      let n = 0;
      figma.root.children.forEach(pg => {
        if (pg.type !== 'PAGE') return;
        pg.children.slice().forEach(c => {
          if (/^(Components|Icons\/Set)$/i.test(c.name) || /^Components$/i.test(c.name)) { c.remove(); n++; }
        });
      });
      return n + ' шт.';
    });

    // 2. Мусорный текст «Scripter»
    step('Удаление текста «Scripter»', () => {
      let n = 0;
      figma.root.children.forEach(pg => {
        if (pg.type !== 'PAGE') return;
        pg.children.slice().forEach(c => {
          if ((c.type === 'TEXT' && /scripter/i.test(n.characters)) || /^scripter$/i.test(c.name || '')) { c.remove(); n++; }
        });
      });
      return n + ' шт.';
    });

    // 2-4. Страницы
    for (const pn of ['Desktop', 'Tablet', 'Mobile']) {
      const pg = figma.root.children.find(c => c.name === pn);
      const root = pg && pg.children.find(c => /\/ Home$/.test(c.name));
      if (!root) { report.push('• ' + pn + ': страница/корень не найдены'); continue; }
      report.push('• ' + pn + ':');

      const header = root.children.find(c => c.name === 'Header');

      if (pn !== 'Desktop') step('  Аудит: кто вылезает за ширину', () => {
        const rw = root.width;
        const bad = [];
        root.children.forEach(sec => {
          const fr = sec.absoluteBoundingBox;
          if (!fr) return;
          if (fr.x < -1 || fr.x + sec.width > rw + 1) bad.push(sec.name + ' (' + Math.round(sec.width) + ')');
          sec.findAll(n => {
            const b = n.absoluteBoundingBox;
            if (!b) return;
            if (b.x + n.width > rw + 1) {
              const over = Math.round(b.x + n.width - rw);
              bad.push('    ' + n.name + ' вылезает на ' + over + 'px');
            }
          });
        });
        return bad.length ? '\n' + bad.slice(0, 25).join('\n') : 'всё в пределах ширины';
      });

      if (pn !== 'Desktop') step('  Адаптация: ширина', () => {
        const rw = root.width;
        const PAD = pn === 'Mobile' ? 20 : 48;
        const CW = rw - PAD * 2;
        let shrunk = 0, wrapped = 0, moved = 0;

        root.findAll(n => n.type === 'RECTANGLE' && (n.width > CW + 2 || n.height > 900)).forEach(r => {
          if (r.width <= CW + 2) return;
          const f = CW / r.width;
          try { const p = r.parent; r.rescale(f); shrunk++; }
          catch (e) { try { r.resize(CW, Math.round(r.height * f)); shrunk++; } catch (e2) {} }
        });

        root.findAll(n => n.layoutMode === 'HORIZONTAL' && n.layoutWrap === 'NO_WRAP').forEach(row => {
          if (!row.children.length) return;
          const inner = row.width - row.paddingLeft - row.paddingRight;
          const total = row.children.reduce((s, c) => s + c.width, 0) + row.itemSpacing * (row.children.length - 1);
          if (total > inner + 1) {
            try { row.layoutWrap = 'WRAP'; wrapped++; } catch (e) { moved++; }
          }
        });

        const fitRows = n => {
          if (n.layoutMode === 'HORIZONTAL' && n.layoutWrap === 'NO_WRAP' && n.children.length) {
            const inner = n.width - n.paddingLeft - n.paddingRight;
            const widest = Math.max.apply(null, n.children.map(c => c.width));
            if (widest > inner + 1 && n.counterAxisSizingMode === 'FIXED') {
              try { n.counterAxisSizingMode = 'AUTO'; shrunk++; } catch (e) {}
            }
          }
        };
        root.findAll(n => n.layoutMode === 'HORIZONTAL').forEach(fitRows);

        return 'сжато изображений: ' + shrunk + ', ряды в перенос: ' + (wrapped + moved);
      });

      if (header) {
        const logo = header.children.find(c => c.name === 'Logo');
        if (logo) step('  логотип', () => {
          const target = 110;
          if (logo.width >= target - 1) return 'уже ' + Math.round(logo.width) + 'px';
          grow(logo, target / logo.width);
          return Math.round(logo.width) + 'x' + Math.round(logo.height);
        });
        else report.push('  логотип: не найден');

        const phone = header.children.find(c => c.name === 'Phone');
        if (phone) step('  телефон', () => {
          if (pn === 'Mobile') return 'Mobile: размер не трогаем';
          const target = 216;
          if (phone.width >= target - 1) return 'уже ' + Math.round(phone.width) + 'px';
          grow(phone, target / phone.width);
          return Math.round(phone.width) + 'x' + Math.round(phone.height);
        });
        else report.push('  телефон: нет на этой странице');
      } else report.push('  Header не найден');

      step('  корзина', () => {
        if (!header) throw new Error('нет Header');
        const built = buildCart();
        const old = header.children.find(c => c.name === 'CartButton');
        if (old) {
          const i = header.children.indexOf(old); old.remove(); header.insertChild(i, built);
        } else {
          const t = header.findAll(n => n.type === 'TEXT' && /^Корзина/.test(n.characters))[0];
          if (t) { let a = t; while (a.parent && a.parent !== header) a = a.parent; replace(a, built); }
          else {
            const ib = header.children.filter(c => c.name === 'IconButton');
            if (!ib.length) throw new Error('кнопка корзины не найдена');
            replace(ib[ib.length - 1], built);
          }
        }
        if (header.layoutMode && header.layoutMode !== 'NONE') {
          header.paddingRight = Math.max(header.paddingRight || 0, 24);
        }
        const label = built.findOne(n => n.type === 'TEXT' && n.characters === 'Корзина');
        return 'иконка + ' + (label ? 'подпись «Корзина» OK' : 'ПОДПИСЬ НЕ СОЗДАНА') + ', без счётчика';
      });

      step('  каталог («В каталог»)', () => {
        const built = buildCatalog();
        const old = root.findOne(n => n.name === 'CatalogButton' && n.type !== 'COMPONENT');
        if (old) {
          const p = old.parent, i = p.children.indexOf(old); old.remove(); p.insertChild(i, built);
        } else {
          const t = root.findAll(n => n.type === 'TEXT' && n.characters === 'В каталог')[0];
          if (!t) throw new Error('текст «В каталог» не найден');
          const a = buttonAncestor(t, ['Actions', 'Hero/Content', 'Head']);
          replace(a, built);
        }
        const label = built.findOne(n => n.type === 'TEXT' && n.characters === 'В каталог');
        return 'иконка + ' + (label ? 'подпись «В каталог» OK' : 'ПОДПИСЬ НЕ СОЗДАНА');
      });

      if (pn === 'Mobile') step('  Mobile: меню → бургер', () => {
        if (!header) throw new Error('нет Header');
        if (header.children.find(c => c.name === 'BurgerButton')) return 'бургер уже есть';
        const burger = buildBurger();
        let target = header.children.find(c => c.name === 'Nav');
        if (!target) target = header.findOne(c => /Nav/i.test(c.name) && c.type !== 'TEXT');
        if (!target) {
          const links = header.findAll(n => /NavLink|Nav (Item|Link)/i.test(n.name));
          if (links.length) target = links[0].parent;
        }
        if (!target) target = header.children.filter(c => c.name === 'IconButton')[0];
        if (!target) throw new Error('ни Nav, ни IconButton не найдены — пришли имя блока меню');
        const i = header.children.indexOf(target);
        target.remove();
        if (i >= 0) header.insertChild(i, burger); else header.appendChild(burger);
        return 'меню заменено на бургер (' + burger.width + 'x' + burger.height + ')';
      });

      if (pn === 'Mobile') step('  Mobile: иконка дома в Logo', () => {
        if (!header) throw new Error('нет Header');
        const logo = header.children.find(c => c.name === 'Logo') ||
          header.findOne(c => /Logo/i.test(c.name) && c.type !== 'TEXT');
        if (!logo) throw new Error('Logo не найден');

        if (!DESKTOP.hIcon) {
          const dpg = figma.root.children.find(c => c.name === 'Desktop');
          const droot = dpg && dpg.children.find(c => /\/ Home$/.test(c.name));
          const dh = droot && droot.children.find(c => c.name === 'Header');
          const dl = dh && dh.children.find(c => c.name === 'Logo');
          if (dl) {
            const ic = dl.findAll(n => (n.type === 'INSTANCE' || n.type === 'FRAME' || n.type === 'VECTOR') && /icon|home|mark/i.test(n.name))[0];
            if (ic) DESKTOP.hIcon = ic;
          }
        }

        const oldIcon = logo.findOne(c => /icon|home|mark/i.test(c.name));
        if (oldIcon) { try { oldIcon.remove(); } catch (e) {} }

        let node;
        if (DESKTOP.hIcon) {
          node = DESKTOP.hIcon.clone();
          node.name = 'Icon/home';
        } else {
          node = makeIcon(HOME, BRAND, 40);
          node.name = 'Icon/home';
        }
        const holder = figma.createFrame();
        holder.name = 'LogoIcon';
        holder.layoutMode = 'HORIZONTAL';
        holder.primaryAxisSizingMode = 'AUTO';
        holder.counterAxisSizingMode = 'AUTO';
        holder.primaryAxisAlignItems = 'CENTER';
        holder.counterAxisAlignItems = 'CENTER';
        holder.fills = []; holder.clipsContent = false;
        holder.appendChild(node);
        logo.insertChild(0, holder);
        return 'иконка Icon/home ' + (DESKTOP.hIcon ? 'склонирована с Desktop ' : 'нарисована ') + Math.round(node.width) + 'px';
      });

      if (pn === 'Mobile') step('  Mobile: тексты Hero', () => {
        const HERO = 'Собственный магазин умных ламп, датчиков, контроллеров и готовых сценариев. Создайте умный дом с Plus — просто, надёжно и без переплат.';
        const set = (re, val) => {
          const t = root.findAll(n => n.type === 'TEXT' && re.test(n.characters))[0];
          if (t) { t.characters = val; return true; }
          return false;
        };
        const a = set(/Умн(ые|ой).*дом|для вашего дома/i, 'Умные устройства для вашего дома');
        const b = set(/Собственн|магазин умных|сценари/i, HERO);
        return 'заголовок: ' + (a ? 'ок' : 'не найден') + ', подзаголовок: ' + (b ? 'ок' : 'не найден');
      });

      step('  Badges: каждая иконка в своём блоке', () => {
        return arrangeBadges(root, pn === 'Mobile');
      });

      step('  Badges: проверка (иконка ↔ подпись)', () => {
        const sec = root.findOne(n => /Badges/i.test(n.name) && n.type !== 'TEXT' && n.children);
        if (!sec) throw new Error('секция Badges не найдена');
        const boxes = sec.findAll(n => n.name === 'BadgeIcon');
        if (!boxes.length) throw new Error('блоки BadgeIcon не найдены');
        return boxes.map(b => {
          const icons = b.findAll(n => /^Icon\//.test(n.name));
          const label = b.parent ? b.parent.findOne(n => n.type === 'TEXT') : null;
          return (icons.length === 1 ? 'OK' : '!!') + ' ' +
            (icons[0] ? icons[0].name : 'БЕЗ ИКОНКИ') + ' → ' +
            (label ? label.characters : 'БЕЗ ПОДПИСИ');
        }).join('\n');
      });

      if (pn === 'Mobile') step('  Mobile: один столбец', () => {
        const rw = root.width;
        const PAD = 20, CW = rw - PAD * 2;
        let stacked = 0, shrunk = 0;
        root.findAll(n => n.layoutMode === 'HORIZONTAL' && n.children.length > 1).forEach(row => {
          const inner = row.width - row.paddingLeft - row.paddingRight;
          const total = row.children.reduce((s, c) => s + c.width, 0) + row.itemSpacing * (row.children.length - 1);
          const nameIsHead = /Head|Hero\/Content|Actions|Top/i.test(row.name);
          if (total > inner + 1 && nameIsHead) {
            try {
              row.layoutMode = 'VERTICAL';
              row.counterAxisSizingMode = 'FIXED';
              row.primaryAxisSizingMode = 'AUTO';
              row.counterAxisAlignItems = 'MIN';
              stacked++;
            } catch (e) {}
          }
        });
        root.findAll(n => n.type === 'RECTANGLE' && n.width > CW + 2).forEach(r => {
          const f = CW / r.width;
          try { r.rescale(f); shrunk++; } catch (e) {}
        });
        return 'в столбец: ' + stacked + ', сжато картинок: ' + shrunk;
      });

      if (pn === 'Mobile') step('  Mobile: карточки товара на всю ширину', () => {
        const list = root.findOne(n => /Products\/List/i.test(n.name)) || root.findOne(n => /Products/i.test(n.name));
        if (!list) throw new Error('Products/List не найден');
        const CW = root.width - 40;
        let n = 0;
        list.children.forEach(card => {
          if (!/ProductCard/i.test(card.name)) return;
          try {
            card.primaryAxisSizingMode = 'AUTO';
            card.counterAxisSizingMode = 'FIXED';
            card.resize(CW, Math.max(1, card.height));
            card.counterAxisAlignItems = 'MIN';
          } catch (e) {}
          const img = card.findOne(x => x.name === 'Image');
          if (img) {
            try {
              if (img.layoutMode && img.layoutMode !== 'NONE') {
                img.counterAxisSizingMode = 'FIXED';
                img.resize(CW, Math.round(CW * 0.55));
              } else {
                img.resize(CW, Math.round(CW * 0.55));
                img.x = 0;
              }
              n++;
            } catch (e) {}
          }
          const body = card.findOne(x => x.name === 'Body');
          if (body) { try { body.resize(CW, Math.max(1, body.height)); body.x = 0; } catch (e) {} }
        });
        list.primaryAxisSizingMode = 'AUTO';
        list.counterAxisSizingMode = 'FIXED';
        list.resize(CW, Math.max(1, list.height));
        return 'карточек расширено: ' + n;
      });

      if (pn === 'Mobile') step('  Mobile: Footer/Contacts на место', () => {
        const f = root.children.find(c => /Footer/i.test(c.name));
        if (!f) throw new Error('Footer не найден');
        const contacts = f.findOne(c => /Contacts/i.test(c.name));
        if (!contacts) throw new Error('Footer/Contacts не найден');
        const p = contacts.parent;
        if (p && p.layoutMode && p.layoutMode !== 'NONE') {
          try { contacts.layoutPositioning = 'ABSOLUTE'; } catch (e) {}
        }
        contacts.x = 20;
        if (contacts.width !== 390) { try { contacts.resize(390, contacts.height); } catch (e) {} }
        return paramsReport(contacts);
      });

      if (pn === 'Mobile') step('  Mobile: Phone под корзиной', () => {
        if (!header) throw new Error('нет Header');
        const cart = header.children.find(c => c.name === 'CartButton');
        if (!cart) throw new Error('CartButton не найден');

        let phone = header.children.find(c => c.name === 'Phone');
        if (phone) phone.remove();
        phone = figma.createFrame();
        phone.name = 'Phone';
        phone.layoutMode = 'HORIZONTAL';
        phone.primaryAxisSizingMode = 'AUTO';
        phone.counterAxisSizingMode = 'AUTO';
        phone.primaryAxisAlignItems = 'CENTER';
        phone.counterAxisAlignItems = 'CENTER';
        phone.itemSpacing = 5;
        phone.fills = [];
        phone.clipsContent = false;
        try { phone.appendChild(makeIcon(PHONE, BRAND, 13)); } catch (e) {}
        phone.appendChild(text('8 800 555-35-35', 13, 'Medium', INK700));

        header.appendChild(phone);
        try { phone.layoutPositioning = 'ABSOLUTE'; } catch (e) {}

        const gap = 2;
        const autoRoot = root.layoutMode && root.layoutMode !== 'NONE';
        const needH = Math.ceil(cart.y + cart.height + gap + phone.height + 4);
        if (header.height < needH) {
          const delta = Math.ceil(needH - header.height);
          try { header.counterAxisSizingMode = 'FIXED'; } catch (e) {}
          header.resize(Math.round(header.width), needH);
          if (!autoRoot) {
            const idx = root.children.indexOf(header);
            root.children.slice(idx + 1).forEach(s => { try { s.y += delta; } catch (e) {} });
          }
        }
        phone.x = Math.max(0, cart.x + cart.width - phone.width);
        phone.y = cart.y + cart.height + gap;
        return paramsReport(phone) + ' под «Корзиной» (header ' + Math.round(header.width) + 'x' + Math.round(header.height) + ')';
      });

      step('  NavLink в Header', () => {
        if (pn === 'Mobile') return 'Mobile: пункты меню убраны (бургер)';
        if (!header) throw new Error('нет Header');
        const nav = header.children.find(c => c.name === 'Nav');
        if (!nav) throw new Error('блок Nav не найден');
        if (nav.layoutMode && nav.layoutMode !== 'NONE') nav.itemSpacing = 10;
        let n = 0;
        nav.children.slice().forEach(c => {
          if (c.name === 'NavButton') return;
          let label = null;
          const t = c.type === 'TEXT' ? c : c.findOne(x => x.type === 'TEXT');
          if (t) label = t.characters;
          if (!label) return;
          replace(c, buildNavButton(label.replace(/^\/+\s*/, '').trim()));
          n++;
        });
        const navNow = nav.children.filter(c => c.name === 'NavButton').length;
        return n ? 'переделано кнопок: ' + n : 'кнопок NavButton уже: ' + navNow;
      });

      step('  «Смотреть все»', () => {
        let n = 0;
        root.findAll(node => node.type === 'TEXT' && node.characters === 'Смотреть все').forEach(t => {
          const a = buttonAncestor(t, ['Head', 'Actions']);
          if (a.name !== 'SeeAllButton') { replace(a, buildSeeAll()); n++; }
        });
        return n ? 'прямоугольных кнопок: ' + n : 'уже прямоугольные / не найдено';
      });

      step('  Отзывы (+4)', () => {
        const sec = root.findOne(n => /Reviews|Отзыв/i.test(n.name) && n.type !== 'TEXT');
        if (!sec) throw new Error('блок Reviews не найден');
        const list = sec.findOne(n => /List/i.test(n.name) && n.layoutMode && n.layoutMode !== 'NONE') || sec;
        let tmpl = null, best = 0;
        list.children.forEach(c => {
          if (!c.findAll) return;
          const cnt = c.findAll(n => n.type === 'TEXT').length;
          if (cnt > best) { best = cnt; tmpl = c; }
        });
        if (!tmpl) throw new Error('карточка отзыва не найдена');
        if (sec.findOne(n => n.type === 'TEXT' && n.characters === 'Алексей К.')) return 'уже добавлены (пропуск)';
        const items = [
          ['Алексей К.', 'Светильник Plus L1 поставил в спальню: вечером тёплый свет, утром плавное пробуждение. Подключился к домашней сети меньше чем за минуту.'],
          ['Марина С.', 'Датчик температуры Plus T2 работает уже полгода, батарейка родная. В приложении удобный график — видно, как греется комната.'],
          ['Дмитрий П.', 'Контроллер Plus Hub собрал всё оборудование в один сценарий. Теперь «Возвращаюсь домой» сам включает свет, как только открываю дверь.'],
          ['Елена В.', 'Камера Plus C1 ночью чёткая, запись идёт на карту без подписки. Приложение понятное, панель управления интуитивная.']
        ];
        let added = 0;
        items.forEach(it => {
          const c = tmpl.clone();
          list.appendChild(c);
          try { if (fillReview(c, it[0], it[1])) added++; } catch (e) {}
        });
        try {
          if (list.layoutMode === 'HORIZONTAL') {
            list.layoutWrap = 'WRAP';
            list.primaryAxisSizingMode = 'FIXED';
            list.counterAxisSizingMode = 'AUTO';
          } else if (list.layoutMode === 'VERTICAL') {
            list.primaryAxisSizingMode = 'AUTO';
            list.counterAxisSizingMode = 'FIXED';
          }
        } catch (e) {}
        return 'добавлено отзывов: ' + added + ' (всего карточек: ' + list.children.length + ')';
      });

      step('  Разворачиваю блоки (невидимый контент)', () => {
        let n = 0;
        root.findAll(x => x.layoutMode && x.layoutMode !== 'NONE').forEach(f => {
          try {
            if (f.clipsContent === true) { f.clipsContent = false; n++; }
            const need = f.layoutMode === 'VERTICAL'
              ? f.paddingTop + f.paddingBottom + f.children.reduce((s, c) => s + c.height, 0) + f.itemSpacing * Math.max(0, f.children.length - 1)
              : 0;
            if (f.primaryAxisSizingMode === 'FIXED' && need && need > f.height + 1) { f.primaryAxisSizingMode = 'AUTO'; n++; }
            if (f.counterAxisSizingMode === 'FIXED' && f.layoutMode === 'VERTICAL' && f.width < 40) { f.counterAxisSizingMode = 'AUTO'; n++; }
          } catch (e) {}
        });
        return n ? 'исправлено контейнеров: ' + n : 'все блоки уже видны';
      });

      step('  Footer/Contacts: сдвигаю правее', () => {
        const f = root.children.find(c => /Footer/i.test(c.name));
        if (!f) throw new Error('Footer не найден');
        const contacts = f.findOne(c => /Contacts/i.test(c.name)) ||
          f.findAll(c => /Contacts/i.test(c.name))[0];
        if (!contacts) throw new Error('Footer/Contacts не найден');
        const p = contacts.parent;
        if (p && p.layoutMode && p.layoutMode !== 'NONE') {
          try { contacts.layoutPositioning = 'ABSOLUTE'; } catch (e) {}
        }
        contacts.x += 100;
        return paramsReport(contacts) + ', parent=' + (p ? p.name : '—');
      });

      step('  Footer: убираю Col', () => {
        const f = root.children.find(c => /Footer/i.test(c.name));
        if (!f) throw new Error('Footer не найден');
        const top = f.findOne(c => /Top/i.test(c.name)) || f;
        const cols = top.children.filter(c => /Col/i.test(c.name));
        let n = 0;
        cols.forEach(c => { try { c.remove(); n++; } catch (e) {} });
        return 'удалено Footer/Col в ' + top.name + ': ' + n;
      });

      step('  Reviews: оставляю только первый Grid', () => {
        const sec = root.findOne(n => /Reviews|Отзыв/i.test(n.name) && n.type !== 'TEXT');
        if (!sec) throw new Error('блок Reviews не найден');
        const grids = sec.children.filter(c => /Grid/i.test(c.name));
        if (grids.length <= 1) return 'Grid уже один: ' + grids.length;
        const keep = grids.slice().sort((a, b) => (a.y - b.y) || (a.x - b.x))[0];
        let n = 0;
        grids.forEach(g => { if (g !== keep) { try { g.remove(); n++; } catch (e) {} } });
        return 'оставлен 1 Grid, удалено: ' + n;
      });

      step('  Карточки отзывов: разворачиваю по высоте', () => {
        const sec = root.findOne(n => /Reviews|Отзыв/i.test(n.name) && n.type !== 'TEXT');
        if (!sec) throw new Error('блок Reviews не найден');
        const list = sec.findOne(n => /Grid/i.test(n.name) && n.layoutMode && n.layoutMode !== 'NONE') || sec;
        const byName = list.children.filter(c => /Card/i.test(c.name) && c.layoutMode && c.layoutMode !== 'NONE');
        let cards = byName.length ? byName.slice() : list.children.slice();
        cards.sort((a, b) => (a.absoluteBoundingBox ? a.absoluteBoundingBox.y : a.y) - (b.absoluteBoundingBox ? b.absoluteBoundingBox.y : b.y));
        let rowTol = 20, baseY = cards.length ? (cards[0].absoluteBoundingBox ? cards[0].absoluteBoundingBox.y : cards[0].y) : 0;
        const keep = cards.filter(c => Math.abs((c.absoluteBoundingBox ? c.absoluteBoundingBox.y : c.y) - baseY) <= rowTol);
        const drop = cards.filter(c => keep.indexOf(c) < 0);
        drop.forEach(c => { try { c.remove(); } catch (e) {} });
        let n = 0;
        keep.forEach(c => {
          try {
            if (c.layoutMode === 'VERTICAL') { if (c.primaryAxisSizingMode !== 'AUTO') { c.primaryAxisSizingMode = 'AUTO'; n++; } }
            else if (c.layoutMode === 'HORIZONTAL') { if (c.counterAxisSizingMode !== 'AUTO') { c.counterAxisSizingMode = 'AUTO'; n++; } }
            if (c.clipsContent === true) { c.clipsContent = false; n++; }
          } catch (e) {}
        });
        try {
          list.clipsContent = false;
          if (list.layoutMode === 'HORIZONTAL' && list.layoutWrap !== 'WRAP') list.layoutWrap = 'WRAP';
          if (list.layoutMode === 'HORIZONTAL') list.primaryAxisSizingMode = 'FIXED';
          list.counterAxisSizingMode = 'AUTO';
        } catch (e) {}
        return 'оставлено ' + keep.length + ', удалено ' + drop.length + ', правок: ' + n;
      });
    }

    // 5. Карточка товара: отступ под «В корзину»
    step('Карточка: отступ под «В корзину»', () => {
      const pc = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === 'ProductCard');
      if (!pc) throw new Error('компонент ProductCard не найден');
      let body = pc.findOne(n => n.name === 'Body');
      if (!body) {
        const bt = pc.findOne(n => n.type === 'TEXT' && n.characters === 'В корзину');
        if (bt) { let b = bt.parent; while (b && b.parent !== pc) b = b.parent; body = b; }
      }
      if (!body) throw new Error('Body не найдена');
      body.paddingBottom = Math.max(body.paddingBottom || 0, 28);
      return 'paddingBottom = ' + body.paddingBottom + ' (в ' + body.name + ')';
    });

    // 6. Удаление мусора «Scripter»
    step('Удаляю текст «Scripter»', () => {
      let n = 0;
      figma.root.children.forEach(pg => {
        if (pg.type !== 'PAGE') return;
        pg.children.slice().forEach(node => {
          const isScripter = (node.type === 'TEXT' && /scripter/i.test(node.characters)) || node.name === 'Scripter';
          if (isScripter) { node.remove(); n++; }
        });
      });
      return n;
    });

    // показать результат: перейти на Desktop и приблизить шапку
    try {
      const dp = figma.root.children.find(c => c.name === 'Desktop');
      if (dp) {
        await figma.setCurrentPageAsync(dp);
        const root = dp.children.find(c => /\/ Home$/.test(c.name));
        const h = root && root.children.find(c => c.name === 'Header');
        const target = h && (h.children.find(c => c.name === 'CartButton') ||
          root.findOne(n => n.name === 'CatalogButton'));
        if (target) { figma.viewport.scrollAndZoomIntoView([target]); report.push('Перешли к: ' + target.name); }
        else report.push('Куда перейти: цель не найдена');
      }
    } catch (e) { report.push('Переход не удался: ' + e.message); }

    figma.showUI(html('Готово ✓', report, '#12B76A'), { width: 420, height: 520 });
  } catch (e) {
    figma.showUI(html('Ошибка', report.concat(['КРИТИЧНО: ' + (e && e.message || e)]), '#F04438'), { width: 420, height: 400 });
  }

  function html(title, lines, color) {
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return '<div style="font:12px -apple-system,Segoe UI,Roboto,sans-serif;padding:14px;color:#222">' +
      '<div style="font-weight:700;font-size:15px;color:' + color + ';margin-bottom:8px">' + esc(title) + '</div>' +
      '<div style="white-space:pre-wrap;line-height:1.5;max-height:340px;overflow:auto">' + lines.map(esc).join('<br>') + '</div>' +
      '<div style="margin-top:14px"><button onclick="parent.postMessage({pluginMessage:{close:true}},\'*\')" style="padding:8px 16px;border-radius:8px;border:0;background:#A4836A;color:#fff;font-weight:600;cursor:pointer">Закрыть</button></div></div>';
  }
})();

figma.ui.onmessage = m => { if (m && m.close) figma.closePlugin(); };
