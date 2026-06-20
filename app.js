/* ============================================================
   IOC WEBSITE — app.js
   WC 2026 Edition | Data murni dari config.json
   ============================================================ */

(function () {
  'use strict';

  var WC_COUNTRIES = [
    '🇦🇷 Argentina','🇦🇺 Australia','🇦🇹 Austria','🇧🇭 Bahrain','🇧🇪 Belgia',
    '🇧🇴 Bolivia','🇧🇷 Brasil','🇨🇦 Kanada','🇨🇱 Chile','🇨🇴 Kolombia',
    '🇭🇷 Kroasia','🇨🇿 Ceko','🇩🇰 Denmark','🇪🇨 Ekuador','🇪🇬 Mesir',
    '🇫🇷 Prancis','🇩🇪 Jerman','🇬🇭 Ghana','🇬🇷 Yunani','🇬🇹 Guatemala',
    '🇭🇳 Honduras','🇭🇺 Hungaria','🇮🇷 Iran','🇯🇲 Jamaika','🇯🇵 Jepang',
    '🇯🇴 Yordania','🇰🇷 Korea Selatan','🇲🇽 Meksiko','🇲🇦 Maroko','🇳🇱 Belanda',
    '🇳🇿 Selandia Baru','🇳🇬 Nigeria','🇵🇦 Panama','🇵🇾 Paraguay','🇵🇪 Peru',
    '🇵🇹 Portugal','🇷🇴 Rumania','🇸🇦 Arab Saudi','🇸🇳 Senegal','🇸🇮 Slovenia',
    '🇿🇦 Afrika Selatan','🇪🇸 Spanyol','🇨🇭 Swiss','🇹🇿 Tanzania',
    '🇺🇸 Amerika Serikat','🇺🇾 Uruguay','🇻🇪 Venezuela','🇿🇼 Zimbabwe'
  ];

  var WC_END_DATE   = new Date('2026-07-22T00:00:00');
  var WC_FINAL_DATE = new Date('2026-07-19T00:00:00');

  /* ============================================================
     HELPERS
     ============================================================ */
  function el(id) { return document.getElementById(id); }

  function make(tag, cls) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    return d;
  }

  function esc(str) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(String(str)));
    return d.innerHTML;
  }

  function isWcActive() {
    return new Date() < WC_END_DATE;
  }

  /* ============================================================
     ADS SYSTEM
     ============================================================ */
  function initAds(ads) {
    var bar     = el('ads-bar');
    var textEl  = el('ads-text');
    var linkEl  = el('ads-link');
    var closeBtn = el('ads-close');

    if (!bar) return;
    if (!ads || !ads.length) { bar.classList.add('ads-hidden'); return; }

    var activeAd = null;
    for (var i = 0; i < ads.length; i++) {
      if (ads[i].active) { activeAd = ads[i]; break; }
    }
    if (!activeAd) { bar.classList.add('ads-hidden'); return; }

    var closedKey = 'ioc_ads_closed_' + (activeAd.id || 'default');
    try {
      if (localStorage.getItem(closedKey) === '1') { bar.classList.add('ads-hidden'); return; }
    } catch (e) {}

    if (textEl) textEl.textContent = activeAd.text || '';
    if (linkEl) {
      linkEl.href = activeAd.url || '#';
      linkEl.style.display = (activeAd.url && activeAd.url !== '#') ? '' : 'none';
    }

    document.body.classList.add('ads-active');

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        bar.classList.add('ads-hidden');
        document.body.classList.remove('ads-active');
        try { localStorage.setItem(closedKey, '1'); } catch (e) {}
      });
    }
  }

  /* ============================================================
     WC EDITION UI
     ============================================================ */
  function initWcEdition() {
    if (!isWcActive()) return;

    // Aktifkan semua elemen wc-only
    var wcEls = document.querySelectorAll('.wc-only');
    for (var i = 0; i < wcEls.length; i++) {
      wcEls[i].classList.add('wc-active');
    }

    // Watermark
    var wm = document.querySelector('.banner-wc-watermark');
    if (wm) wm.classList.add('wc-active');

    // Footer wc text
    var footerWc = el('footer-wc');
    if (footerWc) footerWc.classList.add('wc-active');

    // Build countries grid
    buildCountries();

    // Countdown
    startCountdown();
  }

  /* ============================================================
     BUILD COUNTRIES
     ============================================================ */
  function buildCountries() {
    var grid = el('wc-countries-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (var i = 0; i < WC_COUNTRIES.length; i++) {
      var pill = make('span', 'wc-country-pill');
      pill.textContent = WC_COUNTRIES[i];
      grid.appendChild(pill);
    }
  }

  /* ============================================================
     COUNTDOWN
     ============================================================ */
  function startCountdown() {
    var countdownEl = el('wc-countdown');
    if (!countdownEl) return;

    function update() {
      var now  = new Date();
      var diff = WC_FINAL_DATE - now;
      if (diff <= 0) {
        countdownEl.textContent = 'Sudah berlangsung!';
        return;
      }
      var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      countdownEl.textContent = days + ' hari ' + hours + 'j ' + mins + 'm';
    }

    update();
    setInterval(update, 30000);
  }

  /* ============================================================
     RENDER WEBSITES
     ============================================================ */
  function renderWebsites(websites) {
    var grid = el('website-grid');
    if (!grid || !websites) return;
    grid.innerHTML = '';

    websites.forEach(function (site, i) {
      var card = make('div', 'project-card reveal');
      card.style.transitionDelay = (i * 80) + 'ms';

      var linkHtml = site.active
        ? '<a class="project-link" href="' + esc(site.url) + '" target="_blank" rel="noopener noreferrer">Kunjungi &rarr;</a>'
        : '<span class="project-link project-link-disabled">Coming Soon</span>';

      card.innerHTML =
        '<div class="project-title-tag">Website IOC</div>' +
        '<div class="project-icon">' + esc(site.icon) + '</div>' +
        '<div class="project-name">' + esc(site.name) + '</div>' +
        '<div class="project-desc">' + esc(site.desc) + '</div>' +
        linkHtml;

      grid.appendChild(card);
    });
  }

  /* ============================================================
     RENDER TEAM
     ============================================================ */
  function renderTeam(team) {
    var grid = el('team-grid');
    if (!grid || !team) return;
    grid.innerHTML = '';

    team.forEach(function (member, i) {
      var card = make('div', 'team-card reveal');
      card.style.transitionDelay = (i * 70) + 'ms';

      var avatarInner = member.avatar
        ? '<img src="' + esc(member.avatar) + '" alt="' + esc(member.name) + '" />'
        : '<span style="font-size:1.6rem;">&#128100;</span>';

      var displayName = (member.name && member.name !== '-')
        ? esc(member.name)
        : '<span style="color:rgba(255,255,255,0.3);font-style:italic;">Kosong</span>';

      card.innerHTML =
        '<div class="team-avatar">' + avatarInner + '</div>' +
        '<div class="team-name">' + displayName + '</div>' +
        '<div class="team-role">' + esc(member.role) + '</div>';

      grid.appendChild(card);
    });
  }

  /* ============================================================
     RENDER STATS
     ============================================================ */
  function renderStats(stats) {
    var grid = el('stats-grid');
    if (!grid || !stats) return;
    grid.innerHTML = '';

    var items = [
      { icon: '&#128101;', value: stats.member,   label: 'Member',   type: 'number' },
      { icon: '&#11088;',  value: stats.rating,   label: 'Rating',   type: 'number' },
      { icon: '&#128241;', value: stats.platform, label: 'Platform', type: 'text'   }
    ];

    items.forEach(function (item, i) {
      var card = make('div', 'stat-card reveal');
      card.style.transitionDelay = (i * 100) + 'ms';

      var valueHtml;
      if (item.type === 'text') {
        var lines = String(item.value).split('\n');
        valueHtml = '<div class="stat-text-val">' +
          lines.map(function (l) { return esc(l); }).join('<br/>') +
          '</div>';
      } else {
        valueHtml = '<div class="stat-value">' + esc(String(item.value)) + '</div>';
      }

      card.innerHTML =
        '<span class="stat-icon">' + item.icon + '</span>' +
        valueHtml +
        '<div class="stat-label">' + esc(item.label) + '</div>';

      grid.appendChild(card);
    });
  }

  /* ============================================================
     RENDER LINKS
     ============================================================ */
  function renderLinks(links) {
    var grid = el('links-grid');
    if (!grid || !links) return;
    grid.innerHTML = '';

    links.forEach(function (link, i) {
      var card = make('a', 'link-card reveal');
      card.href   = link.url || '#';
      card.target = '_blank';
      card.rel    = 'noopener noreferrer';
      card.style.transitionDelay = (i * 70) + 'ms';

      card.innerHTML =
        '<span class="link-icon">' + esc(link.icon) + '</span>' +
        '<div>' +
          '<div class="link-name">' + esc(link.name) + '</div>' +
          '<div class="link-url">'  + esc(link.url)  + '</div>' +
        '</div>' +
        '<span class="link-arrow">&rarr;</span>';

      grid.appendChild(card);
    });
  }

  /* ============================================================
     SET DISCORD
     ============================================================ */
  function setDiscord(url) {
    var btn = el('discord-btn');
    if (btn && url) btn.href = url;
  }

  /* ============================================================
     RENDER ALL
     ============================================================ */
  function renderAll(cfg) {
    initAds(cfg.ads || []);
    renderWebsites(cfg.websites || []);
    renderTeam(cfg.team || []);
    renderStats(cfg.stats || {});
    renderLinks(cfg.links || []);
    setDiscord(cfg.discord || '#');
    initWcEdition();
    initReveal();
  }

  /* ============================================================
     LOAD config.json
     ============================================================ */
  function loadConfig() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './config.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        try { renderAll(JSON.parse(xhr.responseText)); }
        catch (e) { console.error('[IOC] Gagal parse config.json:', e); }
      } else {
        console.error('[IOC] config.json tidak ditemukan (status ' + xhr.status + ')');
      }
    };
    xhr.send();
  }

  /* ============================================================
     SCROLL REVEAL
     Scroll bawah → fade in + slide up
     Scroll atas  → fade out + slide down
     ============================================================ */
  var lastScrollY = window.pageYOffset || 0;

  function initReveal() {
    var elements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      var currentScrollY  = window.pageYOffset || 0;
      var scrollingDown   = currentScrollY >= lastScrollY;
      lastScrollY         = currentScrollY;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('hidden');
          entry.target.classList.add('visible');
        } else if (!scrollingDown) {
          entry.target.classList.remove('visible');
          entry.target.classList.add('hidden');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }

    window.addEventListener('scroll', function () {
      lastScrollY = window.pageYOffset || 0;
    }, { passive: true });
  }

  /* ============================================================
     BANNER PARALLAX
     ============================================================ */
  function initParallax() {
    var bgImg = document.querySelector('.banner-bg-img');
    if (!bgImg) return;
    window.addEventListener('scroll', function () {
      bgImg.style.transform = 'translateY(' + ((window.pageYOffset || 0) * 0.35) + 'px)';
    }, { passive: true });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    loadConfig();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
