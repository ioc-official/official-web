/* ============================================================
   IOC WEBSITE — app.js
   WC 2026 Edition | Data murni dari config.json
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     DATA WC 2026
     ============================================================ */
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

  var WC_STARS = [
    '🐐 Lionel Messi',
    '🔴 Cristiano Ronaldo',
    '⚡ Kylian Mbappé',
    '🔵 Erling Haaland',
    '🇧🇷 Neymar Jr.',
    '✨ Lamine Yamal'
  ];

  var WC_END_DATE = new Date('2026-07-22T00:00:00');
  var WC_FINAL_DATE = new Date('2026-07-19T00:00:00');

  /* ============================================================
     HELPERS
     ============================================================ */
  function el(id) { return document.getElementById(id); }
  function make(tag, cls) { var d = document.createElement(tag); if (cls) d.className = cls; return d; }
  function esc(str) { var d = document.createElement('div'); d.appendChild(document.createTextNode(String(str))); return d.innerHTML; }

  function isWcActive() {
    return new Date() < WC_END_DATE;
  }

  /* ============================================================
     ADS SYSTEM
     ============================================================ */
  function initAds(ads) {
    var bar = el('ads-bar');
    var textEl = el('ads-text');
    var linkEl = el('ads-link');
    var closeBtn = el('ads-close');
    if (!bar) return;
    if (!ads || !ads.length) { bar.classList.add('ads-hidden'); return; }
    var activeAd = null;
    for (var i = 0; i < ads.length; i++) { if (ads[i].active) { activeAd = ads[i]; break; } }
    if (!activeAd) { bar.classList.add('ads-hidden'); return; }
    var closedKey = 'ioc_ads_closed_' + (activeAd.id || 'default');
    try { if (localStorage.getItem(closedKey) === '1') { bar.classList.add('ads-hidden'); return; } } catch (e) {}
    if (textEl) textEl.textContent = activeAd.text || '';
    if (linkEl) { linkEl.href = activeAd.url || '#'; linkEl.style.display = (activeAd.url && activeAd.url !== '#') ? '' : 'none'; }
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

    // Ribbon
    var ribbon = el('wc-ribbon');
    if (ribbon) ribbon.classList.add('wc-active');

    // Watermark
    var wm = document.querySelector('.banner-wc-watermark');
    if (wm) wm.classList.add('wc-active');

    // Badge
    var badge = el('wc-badge');
    if (badge) badge.classList.add('wc-active');

    // Footer
    var footerWc = el('footer-wc');
    if (footerWc) footerWc.classList.add('wc-active');

    // Floating ball
    var ball = el('floating-ball');
    if (ball) {
      ball.classList.add('wc-active');
      ball.addEventListener('click', function () { triggerEasterEgg(); });
    }

    // Logo 3x click
    var logo = el('banner-logo');
    if (logo) {
      var clickCount = 0;
      var clickTimer = null;
      logo.addEventListener('click', function () {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () { clickCount = 0; }, 1200);
        if (clickCount >= 3) {
          clickCount = 0;
          clearTimeout(clickTimer);
          triggerEasterEgg();
        }
      });
    }
  }

  /* ============================================================
     COUNTDOWN TIMER
     ============================================================ */
  function startCountdown(cardEl) {
    function update() {
      var now = new Date();
      var diff = WC_FINAL_DATE - now;
      if (diff <= 0) {
        cardEl.querySelector('.stat-countdown').textContent = 'Sudah berlangsung!';
        return;
      }
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      cardEl.querySelector('.stat-countdown').textContent = days + 'h ' + hours + 'j ' + mins + 'm';
    }
    update();
    setInterval(update, 60000);
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
      { icon: '&#128101;', value: stats.member, label: 'Member', type: 'number' },
      { icon: '&#11088;',  value: stats.rating,  label: 'Rating',  type: 'number' },
      { icon: '&#128241;', value: stats.platform, label: 'Platform', type: 'text' }
    ];
    items.forEach(function (item, i) {
      var card = make('div', 'stat-card reveal');
      card.style.transitionDelay = (i * 100) + 'ms';
      var valueHtml;
      if (item.type === 'text') {
        var lines = String(item.value).split('\n');
        valueHtml = '<div class="stat-text-val">' + lines.map(function (l) { return esc(l); }).join('<br/>') + '</div>';
      } else {
        valueHtml = '<div class="stat-value">' + esc(String(item.value)) + '</div>';
      }
      card.innerHTML = '<span class="stat-icon">' + item.icon + '</span>' + valueHtml + '<div class="stat-label">' + esc(item.label) + '</div>';
      grid.appendChild(card);
    });

    // WC countdown card
    if (isWcActive()) {
      var wcCard = make('div', 'stat-card reveal');
      wcCard.style.transitionDelay = (items.length * 100) + 'ms';
      wcCard.innerHTML =
        '<span class="stat-icon">&#9201;</span>' +
        '<div class="stat-countdown">--</div>' +
        '<div class="stat-label">Menuju Final WC</div>';
      grid.appendChild(wcCard);
      startCountdown(wcCard);
    }
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
      card.href = link.url || '#';
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.style.transitionDelay = (i * 70) + 'ms';
      card.innerHTML =
        '<span class="link-icon">' + esc(link.icon) + '</span>' +
        '<div><div class="link-name">' + esc(link.name) + '</div><div class="link-url">' + esc(link.url) + '</div></div>' +
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
     EASTER EGG — 30 detik
     ============================================================ */
  var eeRunning = false;
  var eeTimers = [];

  function clearEeTimers() {
    for (var i = 0; i < eeTimers.length; i++) clearTimeout(eeTimers[i]);
    eeTimers = [];
  }

  function eeTimeout(fn, ms) {
    var t = setTimeout(fn, ms);
    eeTimers.push(t);
    return t;
  }

  function showStage(id) {
    var stages = document.querySelectorAll('.ee-stage');
    for (var i = 0; i < stages.length; i++) stages[i].classList.remove('ee-stage-visible');
    var s = el(id);
    if (s) s.classList.add('ee-stage-visible');
  }

  function hideAllStages() {
    var stages = document.querySelectorAll('.ee-stage');
    for (var i = 0; i < stages.length; i++) stages[i].classList.remove('ee-stage-visible');
  }

  function spawnConfetti() {
    var container = el('ee-confetti');
    if (!container) return;
    container.innerHTML = '';
    var colors = ['#ffffff','#cccccc','#aaaaaa','#eeeeee','#888888'];
    for (var i = 0; i < 80; i++) {
      (function () {
        var piece = make('div', 'confetti-piece');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-20px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        piece.style.animationDuration = (2 + Math.random() * 3) + 's';
        piece.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(piece);
      })();
    }
  }

  function startYoutube() {
    var wrap = el('ee-youtube');
    if (!wrap) return;
    wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/6Ue_5iEnj4U?autoplay=1&start=0&controls=0" allow="autoplay" frameborder="0"></iframe>';
  }

  function stopYoutube() {
    var wrap = el('ee-youtube');
    if (wrap) wrap.innerHTML = '';
  }

  function buildCountries() {
    var container = el('ee-countries');
    if (!container) return;
    container.innerHTML = '';
    for (var i = 0; i < WC_COUNTRIES.length; i++) {
      var span = make('span', 'ee-country');
      span.textContent = WC_COUNTRIES[i];
      container.appendChild(span);
    }
  }

  function buildStars() {
    var container = el('ee-stars');
    if (!container) return;
    container.innerHTML = '';
    for (var i = 0; i < WC_STARS.length; i++) {
      var div = make('div', 'ee-star-item');
      div.setAttribute('data-idx', i);
      div.textContent = WC_STARS[i];
      container.appendChild(div);
    }
  }

  function popStarsSequence() {
    var items = document.querySelectorAll('.ee-star-item');
    for (var i = 0; i < items.length; i++) {
      (function (item, delay) {
        eeTimeout(function () { item.classList.add('pop'); }, delay);
      })(items[i], i * 900);
    }
  }

  function triggerEasterEgg() {
    if (eeRunning || !isWcActive()) return;
    eeRunning = true;

    var overlay = el('ee-overlay');
    var skipBtn = el('ee-skip');
    if (!overlay) return;

    buildCountries();
    buildStars();

    // Reset semua stage
    hideAllStages();
    var introText = document.querySelector('.ee-intro-text');
    var introYear = document.querySelector('.ee-intro-year');
    var hosts = document.querySelectorAll('.ee-host-item');
    var finalCard = document.querySelector('.ee-final-card');
    var climaxText = document.querySelector('.ee-climax-text');
    var stars = document.querySelectorAll('.ee-star-item');
    var i;

    if (introText) introText.classList.remove('pop');
    if (introYear) { introYear.classList.remove('pop'); introYear.classList.remove('glitch'); }
    for (i = 0; i < hosts.length; i++) hosts[i].classList.remove('pop');
    for (i = 0; i < stars.length; i++) stars[i].classList.remove('pop');
    if (finalCard) finalCard.classList.remove('pop');
    if (climaxText) climaxText.classList.remove('pop');

    // Aktifkan overlay
    overlay.classList.add('ee-active');
    if (skipBtn) {
      eeTimeout(function () { skipBtn.classList.add('visible'); }, 1000);
    }

    // 0-1s: gelap
    // 1-3s: intro text
    eeTimeout(function () {
      showStage('ee-stage-1');
      if (introText) eeTimeout(function () { introText.classList.add('pop'); }, 200);
    }, 1000);

    // 3-5s: tahun + glitch
    eeTimeout(function () {
      if (introYear) {
        introYear.classList.add('pop');
        eeTimeout(function () { introYear.classList.add('glitch'); }, 400);
      }
    }, 3000);

    // 5-7s: lagu + confetti + countries
    eeTimeout(function () {
      startYoutube();
      spawnConfetti();
      showStage('ee-stage-2');
    }, 5000);

    // 10-13s: tuan rumah
    eeTimeout(function () {
      showStage('ee-stage-3');
      var h1 = el('ee-host-1'), h2 = el('ee-host-2'), h3 = el('ee-host-3');
      eeTimeout(function () { if (h1) h1.classList.add('pop'); }, 200);
      eeTimeout(function () { if (h2) h2.classList.add('pop'); }, 800);
      eeTimeout(function () { if (h3) h3.classList.add('pop'); }, 1400);
    }, 10000);

    // 13-20s: bintang satu-satu
    eeTimeout(function () {
      showStage('ee-stage-4');
      popStarsSequence();
    }, 13000);

    // 20-24s: final card
    eeTimeout(function () {
      spawnConfetti();
      showStage('ee-stage-5');
      eeTimeout(function () { if (finalCard) finalCard.classList.add('pop'); }, 300);
    }, 20000);

    // 24-28s: climax
    eeTimeout(function () {
      spawnConfetti();
      showStage('ee-stage-6');
      eeTimeout(function () { if (climaxText) climaxText.classList.add('pop'); }, 200);
    }, 24000);

    // 28-30s: fade out
    eeTimeout(function () {
      overlay.style.transition = 'background 1.8s ease';
      overlay.style.background = 'rgba(0,0,0,0)';
      eeTimeout(function () { closeEasterEgg(overlay, skipBtn); }, 1800);
    }, 28000);
  }

  function closeEasterEgg(overlay, skipBtn) {
    if (!overlay) overlay = el('ee-overlay');
    if (!skipBtn) skipBtn = el('ee-skip');
    clearEeTimers();
    stopYoutube();
    hideAllStages();
    if (overlay) {
      overlay.classList.remove('ee-active');
      overlay.style.transition = '';
      overlay.style.background = '';
    }
    if (skipBtn) skipBtn.classList.remove('visible');
    var confetti = el('ee-confetti');
    if (confetti) confetti.innerHTML = '';
    eeRunning = false;
  }

  // Skip button
  document.addEventListener('DOMContentLoaded', function () {
    var skipBtn = el('ee-skip');
    if (skipBtn) {
      skipBtn.addEventListener('click', function () {
        closeEasterEgg(el('ee-overlay'), skipBtn);
      });
    }
  });

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
     ============================================================ */
  var lastScrollY = window.pageYOffset || 0;

  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < elements.length; i++) elements[i].classList.add('visible');
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      var currentScrollY = window.pageYOffset || 0;
      var scrollingDown = currentScrollY >= lastScrollY;
      lastScrollY = currentScrollY;
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
    for (var j = 0; j < elements.length; j++) observer.observe(elements[j]);
    window.addEventListener('scroll', function () { lastScrollY = window.pageYOffset || 0; }, { passive: true });
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
