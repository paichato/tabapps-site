'use strict';

/* ------------------------------------------------------------------ download */
// Releases live on the public site repo (like md-terminal). Buttons start on the release page and
// switch to the DMG itself once the GitHub API answers.
const REPO = 'paichato/tabapps-site';
const RELEASES = `https://github.com/${REPO}/releases/latest`;
let release = null;
document.querySelectorAll('a.download').forEach((a) => { a.href = RELEASES; });
fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
  .then((r) => (r.ok ? r.json() : null))
  .then((rel) => {
    const dmg = rel && (rel.assets || []).find((x) => x.name.endsWith('.dmg'));
    if (!dmg) return;
    release = { tag: rel.tag_name, mb: (dmg.size / 1048576).toFixed(1) };
    document.querySelectorAll('a.download').forEach((a) => { a.href = dmg.browser_download_url; });
    showRelease();
  })
  .catch(() => {});
function showRelease() {
  const el = document.getElementById('dl-status');
  if (!el || !release) return;
  const mb = lang === 'pt' ? release.mb.replace('.', ',') : release.mb;
  el.innerHTML = `${release.tag} · ${mb} MB · <a href="${RELEASES}">${t('final.notes')}</a>`;
}

/* ------------------------------------------------------------------ i18n */
const T = {
  en: {
    'nav.how': 'How it works', 'nav.features': 'Features', 'nav.keys': 'Shortcuts', 'nav.faq': 'FAQ',
    'cta.download': 'Download', 'cta.mac': 'Download for Mac', 'cta.watch': 'See it work',
    'hero.eyebrow': 'TabApps for Mac', 'hero.h1a': 'Every window.', 'hero.h1b': 'One tab bar.',
    'hero.sub': 'Drag any window onto the sphere and it becomes a tab. Add a browser, your editor, a terminal, anything. Then split, swap and switch with a keystroke.',
    'hero.fine': 'macOS 14 or later · Apple silicon & Intel · Signed and notarized by Apple',
    'demo.h2': "Five moves. That's the whole app.", 'demo.sub': 'This runs right here in your browser. Pick a chapter or let it play.',
    'feat.h2': 'Tabs for apps that never had them.',
    'f1.t': 'The anchor sphere', 'f1.d': 'A small sphere in the screen corner. Drop a window on it to anchor it; drop it again to set it free.',
    'f2.t': 'Any app, as tabs', 'f2.d': 'Mix windows from different apps in one tab bar. Click a tab, or drop more windows onto the bar.',
    'f3.t': 'Split four ways', 'f3.d': 'Hover a tab and split it left, right, top or bottom. A live preview shows where each window lands.',
    'f4.t': 'Tear off & merge', 'f4.d': 'Drag a tab out and the real window follows your cursor. Drop it on another bar to move it.',
    'f5.t': 'Keyboard first', 'f5.d': '⌥← ⌥→ to switch, ⌥1…9 to jump, ⌥⇧← ⌥⇧→ to reorder. Only while an anchored window is focused.',
    'f6.t': 'Springy, not sluggish', 'f6.d': 'Windows move on spring curves at 60 fps. Tune speed and bounce, or turn animations off.',
    'f7.t': 'Two looks', 'f7.d': "Glass, tinted with each anchor's colour, or System gray with iOS-style tabs that blend into the window.",
    'f8.t': 'Remembers your anchors', 'f8.d': 'Quit and reopen: your anchors, splits and tab order come back with the windows that are still open.',
    'f9.t': 'Configurable everywhere', 'f9.d': 'Sphere corner and size, bar style and height, hover delay, gaps, shortcuts, language. Over 40 settings.',
    'keys.h2': 'Fast on the keys.', 'keys.switch': 'Previous / next tab', 'keys.jump': 'Jump to a tab', 'keys.move': 'Move the active tab',
    'keys.note': 'Pick your own modifiers in Settings. Everywhere else, ⌥← still jumps a word.',
    'pr.h2': 'Built like a Mac app should be.',
    'pr1.t': 'Native', 'pr1.d': 'Swift, AppKit and SwiftUI. No Electron, no web views. A few megabytes.',
    'pr2.t': 'Quiet', 'pr2.d': 'Event-driven: it reacts to window moves instead of polling your screen.',
    'pr3.t': 'One permission', 'pr3.d': "Accessibility, to move and arrange windows. It never reads what's inside them.",
    'pr4.t': 'Private', 'pr4.d': 'Optional anonymous counts, like “tab split”. No titles, no app names, no files. Off with one switch.',
    'faq.h2': 'Questions',
    'q1': 'Why does TabApps need Accessibility access?', 'a1': "macOS only lets apps move, resize and focus other apps' windows through the Accessibility API. TabApps uses it for exactly that, and nothing inside your windows is read.",
    'q2': 'Does it work with every app?', 'a2': "Any app with normal windows that macOS lets you move: browsers, editors, terminals, Finder, design tools. Full-screen windows and fixed-size panels can't be anchored.",
    'q3': "Won't ⌥← stop jumping words?", 'a3': 'No. TabApps only takes the shortcut when the focused window belongs to an anchor. You can also pick different modifiers.',
    'q4': 'macOS tiles my window when I drop it in the corner.', 'a4': 'TabApps puts the window back, but you can avoid the jump by turning off “Drag windows to screen edges to tile” in System Settings › Desktop & Dock, or by moving the sphere to another corner.',
    'q5': 'What data is collected?', 'a5': 'If you leave statistics on: anonymous event counts (for example “anchor created”), the app version and the macOS version, through TelemetryDeck. Never window titles, app names, files or anything personal.',
    'q6': 'What do I need?', 'a6': 'A Mac with macOS 14 Sonoma or later, Apple silicon or Intel.',
    'q7': 'Is it safe to install?', 'a7': 'Yes. TabApps is signed with an Apple Developer ID and notarized by Apple, so macOS checks it before it opens. Drag it to Applications and open it.',
    'q8': 'How do updates work?', 'a8': 'TabApps checks for new versions in the background and offers to install them. You can turn that off or check by hand in Settings › General.',
    'final.h2': 'Tame your windows.', 'final.fine': 'Updates arrive inside the app.', 'final.notes': 'Release notes',
    'foot.tm': 'Mac and macOS are trademarks of Apple Inc.',
    // demo
    'ch.anchor': 'Anchor', 'ch.join': 'Add tabs', 'ch.split': 'Split', 'ch.tear': 'Tear off', 'ch.keys': 'Keys',
    'cap.anchor.t': 'Drop a window on the sphere.', 'cap.anchor.d': 'It springs back into place with a tab bar on top. That window is now an anchor.',
    'cap.join.t': 'Drop more windows on the bar.', 'cap.join.d': 'Each one becomes a tab, from any app. Click a tab to bring it forward.',
    'cap.split.t': 'Hover a tab to split it.', 'cap.split.d': 'Left, right, top or bottom, with a preview of where it lands. Detach and close live here too.',
    'cap.tear.t': 'Pull a tab out to set it free.', 'cap.tear.d': 'The real window follows your cursor. Drop it on the sphere to release it, or on another bar to move it.',
    'cap.keys.t': 'Switch without the mouse.', 'cap.keys.d': '⌥← and ⌥→ step through the tabs of the focused anchor. ⌥1…9 jumps straight to one.',
    'app.notes': 'Notes', 'app.browser': 'Browser', 'app.music': 'Music',
  },
  pt: {
    'nav.how': 'Como funciona', 'nav.features': 'Funcionalidades', 'nav.keys': 'Atalhos', 'nav.faq': 'Perguntas',
    'cta.download': 'Descarregar', 'cta.mac': 'Descarregar para Mac', 'cta.watch': 'Ver a funcionar',
    'hero.eyebrow': 'TabApps para Mac', 'hero.h1a': 'Todas as janelas.', 'hero.h1b': 'Uma barra de tabs.',
    'hero.sub': 'Arraste qualquer janela para a esfera e ela passa a ser uma tab. Junte o navegador, o editor, o terminal, o que quiser. Depois divida, troque e alterne com uma tecla.',
    'hero.fine': 'macOS 14 ou posterior · Apple silicon e Intel · Assinada e notarizada pela Apple',
    'demo.h2': 'Cinco gestos. A app é só isto.', 'demo.sub': 'Isto corre aqui mesmo no navegador. Escolha um capítulo ou deixe correr.',
    'feat.h2': 'Tabs para apps que nunca as tiveram.',
    'f1.t': 'A esfera-âncora', 'f1.d': 'Uma pequena esfera no canto do ecrã. Largue uma janela nela para a ancorar; largue de novo para a libertar.',
    'f2.t': 'Qualquer app, em tabs', 'f2.d': 'Misture janelas de apps diferentes numa barra de tabs. Clique numa tab, ou largue mais janelas na barra.',
    'f3.t': 'Divida em quatro direções', 'f3.d': 'Passe o rato sobre uma tab e divida à esquerda, direita, em cima ou em baixo. A pré-visualização mostra onde fica cada janela.',
    'f4.t': 'Destacar e juntar', 'f4.d': 'Arraste uma tab para fora e a janela real segue o cursor. Largue-a noutra barra para a mudar de âncora.',
    'f5.t': 'Teclado primeiro', 'f5.d': '⌥← ⌥→ para trocar, ⌥1…9 para saltar, ⌥⇧← ⌥⇧→ para reordenar. Só quando a janela em foco está ancorada.',
    'f6.t': 'Com mola, sem lentidão', 'f6.d': 'As janelas movem-se com curvas de mola a 60 fps. Ajuste a velocidade e a elasticidade, ou desligue as animações.',
    'f7.t': 'Dois visuais', 'f7.d': 'Vidro, com a cor de cada âncora, ou Cinza do sistema com tabs ao estilo iOS que se fundem com a janela.',
    'f8.t': 'Lembra-se das âncoras', 'f8.d': 'Feche e volte a abrir: âncoras, divisões e ordem das tabs voltam com as janelas que ainda estão abertas.',
    'f9.t': 'Tudo configurável', 'f9.d': 'Canto e tamanho da esfera, estilo e altura da barra, atraso do menu, espaços, atalhos, idioma. Mais de 40 opções.',
    'keys.h2': 'Rápido no teclado.', 'keys.switch': 'Tab anterior / seguinte', 'keys.jump': 'Saltar para uma tab', 'keys.move': 'Mover a tab ativa',
    'keys.note': 'Escolha os seus modificadores nas Definições. Noutras janelas, ⌥← continua a saltar palavras.',
    'pr.h2': 'Feita como uma app de Mac deve ser.',
    'pr1.t': 'Nativa', 'pr1.d': 'Swift, AppKit e SwiftUI. Sem Electron, sem web views. Poucos megabytes.',
    'pr2.t': 'Discreta', 'pr2.d': 'Orientada a eventos: reage quando as janelas se movem em vez de vigiar o ecrã.',
    'pr3.t': 'Uma permissão', 'pr3.d': 'Acessibilidade, para mover e organizar janelas. Nunca lê o que está dentro delas.',
    'pr4.t': 'Privada', 'pr4.d': 'Contagens anónimas opcionais, como “tab dividida”. Sem títulos, sem nomes de apps, sem ficheiros. Desliga-se com um botão.',
    'faq.h2': 'Perguntas',
    'q1': 'Porque é que o TabApps precisa de Acessibilidade?', 'a1': 'O macOS só deixa as apps mover, redimensionar e focar janelas de outras apps através da API de Acessibilidade. O TabApps usa-a só para isso, e nada dentro das suas janelas é lido.',
    'q2': 'Funciona com todas as apps?', 'a2': 'Com qualquer app de janelas normais que o macOS deixe mover: navegadores, editores, terminais, Finder, apps de design. Janelas em ecrã completo e painéis de tamanho fixo não podem ser ancorados.',
    'q3': '⌥← deixa de saltar palavras?', 'a3': 'Não. O TabApps só usa o atalho quando a janela em foco pertence a uma âncora. Também pode escolher outros modificadores.',
    'q4': 'O macOS ladrilha a janela quando a largo no canto.', 'a4': 'O TabApps repõe a janela, mas pode evitar o salto desligando “Arrastar janelas para as margens do ecrã para ladrilhar” em Definições do Sistema › Secretária e Dock, ou mudando a esfera para outro canto.',
    'q5': 'Que dados são recolhidos?', 'a5': 'Se deixar as estatísticas ligadas: contagens anónimas de eventos (por exemplo “âncora criada”), a versão da app e do macOS, através do TelemetryDeck. Nunca títulos de janelas, nomes de apps, ficheiros ou dados pessoais.',
    'q6': 'O que preciso?', 'a6': 'Um Mac com macOS 14 Sonoma ou posterior, Apple silicon ou Intel.',
    'q7': 'É seguro instalar?', 'a7': 'Sim. O TabApps é assinado com um Developer ID da Apple e notarizado pela Apple, por isso o macOS verifica-o antes de abrir. Arraste-o para Aplicações e abra-o.',
    'q8': 'Como funcionam as atualizações?', 'a8': 'O TabApps procura novas versões em segundo plano e propõe instalá-las. Pode desligar isso ou procurar à mão em Definições › Geral.',
    'final.h2': 'Arrume as suas janelas.', 'final.fine': 'As atualizações chegam dentro da app.', 'final.notes': 'Notas da versão',
    'foot.tm': 'Mac e macOS são marcas registadas da Apple Inc.',
    'ch.anchor': 'Ancorar', 'ch.join': 'Juntar', 'ch.split': 'Dividir', 'ch.tear': 'Destacar', 'ch.keys': 'Teclado',
    'cap.anchor.t': 'Largue uma janela na esfera.', 'cap.anchor.d': 'Ela volta ao lugar com uma barra de tabs por cima. Essa janela é agora uma âncora.',
    'cap.join.t': 'Largue mais janelas na barra.', 'cap.join.d': 'Cada uma passa a ser uma tab, de qualquer app. Clique numa tab para a trazer para a frente.',
    'cap.split.t': 'Passe o rato sobre uma tab para dividir.', 'cap.split.d': 'Esquerda, direita, cima ou baixo, com pré-visualização. Destacar e fechar também estão aqui.',
    'cap.tear.t': 'Puxe uma tab para fora para a libertar.', 'cap.tear.d': 'A janela real segue o cursor. Largue-a na esfera para a libertar, ou noutra barra para a mudar de âncora.',
    'cap.keys.t': 'Troque sem tocar no rato.', 'cap.keys.d': '⌥← e ⌥→ percorrem as tabs da âncora em foco. ⌥1…9 salta diretamente para uma.',
    'app.notes': 'Notas', 'app.browser': 'Navegador', 'app.music': 'Música',
  },
};

let lang = (() => {
  try { const saved = localStorage.getItem('tabapps.lang'); if (saved) return saved; } catch (_) {}
  return (navigator.language || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en';
})();
const t = (k) => (T[lang] && T[lang][k]) || T.en[k] || k;

function applyLang() {
  document.documentElement.lang = lang === 'pt' ? 'pt' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.getElementById('lang').textContent = lang === 'pt' ? 'EN' : 'PT';
  buildChapters();
  setCaption();
  showRelease();
  barKey = '';
}
document.getElementById('lang').addEventListener('click', () => {
  lang = lang === 'pt' ? 'en' : 'pt';
  try { localStorage.setItem('tabapps.lang', lang); } catch (_) {}
  applyLang();
});

/* ------------------------------------------------------------------ timeline helpers */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const P = (x, a, b) => (b <= a ? (x >= b ? 1 : 0) : clamp((x - a) / (b - a), 0, 1));
const E = (x, a, b) => { const k = P(x, a, b); return k * k * (3 - 2 * k); };
function spring(k, bounce = 0.32) {
  if (k >= 1) return 1; if (k <= 0) return 0;
  const z = Math.max(0.35, 1 - bounce), w = 11, wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * k) * (Math.cos(wd * k) + (z * w / wd) * Math.sin(wd * k));
}
const SP = (x, a, b) => spring(P(x, a, b));
const mix = (a, b, k) => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
const R = (x, y, w, h) => ({ x, y, w, h });
const lerpR = (a, b, k) => R(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, a.w + (b.w - a.w) * k, a.h + (b.h - a.h) * k);
const off = (r, dx, dy) => R(r.x + dx, r.y + dy, r.w, r.h);

/* ------------------------------------------------------------------ scenes (same scripts as the app's tour) */
const OY = 26;                 // menubar height inside the stage
const SPHERE = { x: 26, y: 26 + OY };
const CHIP = 78;
const barPoint = (a, i) => ({ x: a.x + 10 + 15 + i * (CHIP + 2) + CHIP / 2, y: a.y - 13 });
const prox = (c) => clamp((120 - Math.hypot(c.x - SPHERE.x, c.y - SPHERE.y)) / 60, 0, 1);
const OUT = { x: 540, y: 300 };

const SCENES = {
  anchor: { dur: 6, fn(tt) {
    const s = base(); const home = R(200, 96 + OY, 240, 150);
    const grab = { x: home.x + 70, y: home.y + 7 }, target = { x: 34, y: 34 + OY };
    let f = home, c = mix(OUT, grab, E(tt, 0, 0.9));
    if (tt >= 1) { c = mix(grab, target, E(tt, 1, 2.4)); f = off(home, c.x - grab.x, c.y - grab.y); }
    if (tt >= 2.6) { f = lerpR(off(home, target.x - grab.x, target.y - grab.y), home, SP(tt, 2.6, 3.4)); c = mix(target, { x: 470, y: 256 }, E(tt, 3.2, 4.2)); }
    s.wins = [{ app: 0, r: f, z: 1 }]; s.cursor = c; s.pressed = tt > 0.9 && tt < 2.6;
    s.prox = tt < 2.6 ? prox(c) : 0; if (tt >= 2.6 && tt < 3.4) s.ripple = P(tt, 2.6, 3.4);
    s.count = tt >= 2.6 ? 1 : 0; if (tt >= 3.1) s.bar = { win: 0, tabs: [[0]], active: 0, shown: E(tt, 3.1, 3.6) };
    return s;
  } },
  join: { dur: 6.5, fn(tt) {
    const s = base(); const a = R(80, 92 + OY, 250, 155), b0 = R(340, 120 + OY, 210, 135);
    const grab = { x: b0.x + 60, y: b0.y + 7 }, drop = barPoint(a, 1);
    let b = b0, c = mix(OUT, grab, E(tt, 0, 0.9));
    if (tt >= 1) { c = mix(grab, drop, E(tt, 1, 2.4)); b = off(b0, c.x - grab.x, c.y - grab.y); }
    let tabs = [[0]], active = 0, slot = null, zA = 1, zB = 2;
    if (tt >= 1.9 && tt < 2.6) slot = 1;
    if (tt >= 2.6) { b = lerpR(off(b0, drop.x - grab.x, drop.y - grab.y), a, SP(tt, 2.6, 3.3)); tabs = [[0], [1]]; active = 1; c = mix(drop, barPoint(a, 0), E(tt, 3.6, 4.3)); }
    if (tt >= 4.5) { active = 0; zA = 3; }
    s.wins = [{ app: 0, r: a, z: zA }, { app: 1, r: b, z: zB }]; s.cursor = c;
    s.pressed = (tt > 0.9 && tt < 2.6) || (tt > 4.4 && tt < 4.6); s.count = 1;
    s.bar = { win: 0, tabs, active, shown: 1, slot }; return s;
  } },
  split: { dur: 7, fn(tt) {
    const s = base(); const a = R(120, 88 + OY, 340, 165); const t1 = barPoint(a, 1);
    const ma = { x: t1.x, y: t1.y + 13 }, icon = { x: ma.x - 70 + 6 + 3.5 * 20, y: ma.y + 12 };
    let c = mix(OUT, t1, E(tt, 0, 1)); if (tt >= 1.7) c = mix(t1, icon, E(tt, 1.7, 2.3));
    const half = (a.w - 6) / 2, left = R(a.x, a.y, half, a.h), right = R(a.x + half + 6, a.y, half, a.h);
    let w0 = a, w1 = a, tabs = [[0], [1]];
    if (tt >= 3.1) { const k = SP(tt, 3.1, 3.8); w0 = lerpR(a, left, k); w1 = lerpR(a, right, k); tabs = [[0, 1]]; c = mix(icon, OUT, E(tt, 3.5, 4.4)); }
    s.wins = [{ app: 0, r: w0, z: 2 }, { app: 1, r: w1, z: 1 }]; s.cursor = c; s.pressed = tt > 3 && tt < 3.15; s.count = 1;
    s.bar = { win: 0, tabs, active: 0, shown: 1 };
    if (tt >= 1.3 && tt < 3.1) s.menu = { at: ma, hovered: tt >= 2.3 ? 3 : -1, shown: E(tt, 1.3, 1.5) * (1 - E(tt, 3, 3.1)) };
    if (tt >= 2.35 && tt < 3.1) s.preview = right; return s;
  } },
  tear: { dur: 7, fn(tt) {
    const s = base(); const a = R(150, 100 + OY, 290, 160); const t1 = barPoint(a, 1);
    const tearAt = { x: t1.x + 10, y: t1.y + 70 }, target = { x: 36, y: 36 + OY };
    let c = mix(OUT, t1, E(tt, 0, 0.9)), w1 = a, tabs = [[0], [1]], active = 1, z1 = 2;
    if (tt >= 1.1) c = mix(t1, tearAt, E(tt, 1.1, 1.7));
    if (tt >= 1.7) c = mix(tearAt, target, E(tt, 1.8, 3.1));
    const torn = tt >= 1.45 && tt < 3.3;
    if (tt >= 1.45) { tabs = [[0]]; active = 0; w1 = off(a, c.x - t1.x, c.y - t1.y); z1 = 3; }
    if (tt >= 3.3) { w1 = lerpR(off(a, target.x - t1.x, target.y - t1.y), off(a, 40, 40), SP(tt, 3.3, 4.1)); c = mix(target, OUT, E(tt, 3.9, 4.8)); }
    s.wins = [{ app: 0, r: a, z: 1 }, { app: 1, r: w1, z: z1 }]; s.cursor = c; s.pressed = tt > 0.9 && tt < 3.3;
    s.mode = 'release'; s.prox = torn ? prox(c) : 0; if (tt >= 3.3 && tt < 4.1) s.ripple = P(tt, 3.3, 4.1);
    s.count = 1; s.bar = { win: 0, tabs, active, shown: 1 }; return s;
  } },
  keys: { dur: 6, fn(tt) {
    const s = base(); const a = R(150, 70 + OY, 290, 150); const presses = [1, 2.4, 3.8];
    const active = presses.filter((x) => tt >= x).length % 3;
    s.wins = [0, 1, 2].map((i) => ({ app: i, r: a, z: i === active ? 3 : i }));
    s.bar = { win: 0, tabs: [[0], [1], [2]], active, shown: 1 }; s.count = 1; s.keys = true;
    s.keyDown = presses.some((x) => tt >= x - 0.12 && tt < x + 0.12); s.cursor = null; return s;
  } },
};
function base() { return { wins: [], cursor: null, pressed: false, prox: 0, mode: 'anchor', ripple: null, count: 0, bar: null, menu: null, preview: null, keys: false, keyDown: false }; }

/* ------------------------------------------------------------------ renderer */
const APPS = () => [
  { name: t('app.notes'), color: 'linear-gradient(135deg,#ffb04a,#ff7a2e)', glyph: '✎', accent: '#f6a04d' },
  { name: t('app.browser'), color: 'linear-gradient(135deg,#5ab0ff,#2f6bff)', glyph: '◍', accent: '#4c8dff' },
  { name: t('app.music'), color: 'linear-gradient(135deg,#ff7aa8,#ff3d6e)', glyph: '♪', accent: '#ff5a86' },
];
const stage = document.getElementById('stage');
const el = (cls, parent = stage, tag = 'div') => { const e = document.createElement(tag); if (cls) e.className = cls; parent.appendChild(e); return e; };
const icon = (a) => `<span class="app-ico" style="background:${a.color}">${a.glyph}</span>`;

const field = el('field'); const ripple = el('ripple'); const sphere = el('sphere');
sphere.appendChild(field);
const countEl = el('', sphere, 'span');
const wins = [0, 1, 2].map(() => el('win'));
const preview = el('preview');
const bar = el('bar');
const menu = el('menu');
const keycaps = el('keycaps');
keycaps.innerHTML = '<span>⌥</span><span>→</span>';
const cursor = el('cursor', stage, 'div');
cursor.innerHTML = '<svg viewBox="0 0 12 18" width="12" height="18"><path d="M0 0v15.5l3.6-3.3 2.6 5.4 2.2-1-2.5-5.2 4.9-.2z" fill="#111" stroke="#fff" stroke-width="1.1"/></svg>';
menu.innerHTML = ['▌', '▀', '▄', '▐'].map((g) => `<span>${g}</span>`).join('') + '<i class="sep"></i><span>↗</span><span>✕</span>';

function paintWindows() {
  const apps = APPS();
  wins.forEach((w, i) => {
    const a = apps[i];
    w.innerHTML = `<div class="tb"><i></i><i></i><i></i></div><div class="body"><div class="head">${icon(a)}<div class="line" style="width:34%;background:${a.accent};height:6px"></div></div>` +
      [80, 62, 72, 50, 66].map((p) => `<div class="line" style="width:${p}%"></div>`).join('') + '</div>';
  });
}

let barKey = '';
function render(s) {
  const modeColor = s.mode === 'release' ? '#ff9f0a' : '#4c8dff';
  // sphere
  sphere.style.left = `${SPHERE.x - 9}px`; sphere.style.top = `${SPHERE.y - 9}px`;
  sphere.style.background = `radial-gradient(circle at 32% 28%, #fff, ${modeColor} 55%, ${modeColor}cc)`;
  sphere.style.boxShadow = `0 0 ${4 + 12 * s.prox}px ${modeColor}`;
  sphere.style.transform = `scale(${1 + 0.7 * s.prox})`;
  countEl.textContent = s.count || '';
  field.style.opacity = s.prox; field.style.borderColor = modeColor;
  if (s.ripple != null) {
    const sc = s.mode === 'anchor' ? 4 - 3.2 * s.ripple : 1 + 4 * s.ripple;
    Object.assign(ripple.style, { display: 'block', left: `${SPHERE.x - 9}px`, top: `${SPHERE.y - 9}px`, borderColor: modeColor, opacity: 1 - s.ripple, transform: `scale(${sc})` });
  } else ripple.style.display = 'none';

  // windows
  wins.forEach((w, i) => {
    const d = s.wins.find((x) => x.app === i);
    if (!d) { w.style.display = 'none'; return; }
    Object.assign(w.style, { display: 'block', width: `${d.r.w}px`, height: `${d.r.h}px`, zIndex: 10 + d.z, transform: `translate(${d.r.x}px, ${d.r.y}px)`, left: 0, top: 0 });
  });

  // bar
  if (s.bar) {
    const host = s.wins.find((x) => x.app === s.bar.win).r;
    const key = JSON.stringify([s.bar.tabs, s.bar.active, s.bar.slot ?? null, lang]);
    if (key !== barKey) {
      barKey = key;
      const apps = APPS();
      let html = '<span class="grip"></span>';
      s.bar.tabs.forEach((tab, i) => {
        if (s.bar.slot === i) html += '<span class="slot">+</span>';
        const names = tab.map((j) => apps[j].name).join(' · ');
        html += `<span class="chip${i === s.bar.active ? ' on' : ''}${tab.length > 1 ? ' wide' : ''}"><span class="icons">${tab.map((j) => icon(apps[j])).join('')}</span>${names}</span>`;
      });
      if (s.bar.slot != null && s.bar.slot >= s.bar.tabs.length) html += '<span class="slot">+</span>';
      bar.innerHTML = html;
      bar.classList.toggle('hl', s.bar.slot != null);
    }
    Object.assign(bar.style, { display: 'flex', zIndex: 25, left: `${host.x + 10}px`, top: `${host.y - 24 + (1 - s.bar.shown) * 10}px`, opacity: s.bar.shown });
  } else bar.style.display = 'none';

  // hover menu + preview
  if (s.menu) {
    Object.assign(menu.style, { display: 'flex', zIndex: 33, left: `${s.menu.at.x - 70}px`, top: `${s.menu.at.y}px`, opacity: s.menu.shown, transform: `scale(${0.85 + 0.15 * s.menu.shown})` });
    [...menu.querySelectorAll('span')].forEach((sp, i) => sp.classList.toggle('on', i === s.menu.hovered));
  } else menu.style.display = 'none';
  if (s.preview) Object.assign(preview.style, { display: 'block', zIndex: 24, left: `${s.preview.x}px`, top: `${s.preview.y}px`, width: `${s.preview.w}px`, height: `${s.preview.h}px` });
  else preview.style.display = 'none';

  keycaps.style.display = s.keys ? 'flex' : 'none';
  keycaps.classList.toggle('down', s.keyDown);

  if (s.cursor) Object.assign(cursor.style, { display: 'block', left: `${s.cursor.x}px`, top: `${s.cursor.y}px`, transform: `scale(${s.pressed ? 0.88 : 1})` });
  else cursor.style.display = 'none';
}

/* ------------------------------------------------------------------ chapters / playback */
const ORDER = ['anchor', 'join', 'split', 'tear', 'keys'];
let current = 0, startedAt = performance.now(), visible = true;
const chaptersEl = document.getElementById('chapters');

function buildChapters() {
  chaptersEl.innerHTML = '';
  ORDER.forEach((k, i) => {
    const b = el('chapter' + (i === current ? ' on' : ''), chaptersEl, 'button');
    b.innerHTML = `<span>${i + 1}. ${t('ch.' + k)}</span><i class="prog"></i>`;
    b.addEventListener('click', () => go(i));
  });
}
function setCaption() {
  const k = ORDER[current];
  document.getElementById('cap-title').textContent = t(`cap.${k}.t`);
  document.getElementById('cap-body').textContent = t(`cap.${k}.d`);
}
function go(i) {
  current = (i + ORDER.length) % ORDER.length;
  startedAt = performance.now();
  [...chaptersEl.children].forEach((c, j) => c.classList.toggle('on', j === current));
  barKey = '';
  setCaption();
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function frame(now) {
  if (visible) {
    const sc = SCENES[ORDER[current]];
    let tt = (now - startedAt) / 1000;
    if (tt >= sc.dur) { if (!reduced) { go(current + 1); tt = 0; } else tt = sc.dur - 0.01; }
    render(sc.fn(reduced ? sc.dur * 0.75 : tt));
    const prog = chaptersEl.children[current]?.querySelector('.prog');
    if (prog) prog.style.width = `${clamp(tt / sc.dur, 0, 1) * 100}%`;
  }
  requestAnimationFrame(frame);
}

function fit() {
  const holder = stage.parentElement;
  stage.style.transform = `scale(${holder.clientWidth / 580})`;
}
window.addEventListener('resize', fit);
new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0.05 }).observe(stage);

/* ------------------------------------------------------------------ misc */
function tick() {
  const d = new Date();
  document.getElementById('clock').textContent = d.toLocaleTimeString(lang === 'pt' ? 'pt-PT' : 'en-US', { hour: '2-digit', minute: '2-digit' });
}
document.getElementById('year').textContent = new Date().getFullYear();

const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll('.features .card, .principles .pr-grid > div, .key-row, details, .final').forEach((n, i) => {
  n.classList.add('reveal'); n.style.transitionDelay = `${(i % 3) * 70}ms`; io.observe(n);
});

paintWindows();
applyLang();
fit();
tick(); setInterval(tick, 15000);
requestAnimationFrame(frame);
// Language changes repaint window labels too.
document.getElementById('lang').addEventListener('click', paintWindows);
