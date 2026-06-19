/* ============================================================
   IOC WEBSITE — app.js
   Load config.json, render semua section, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     CONFIG — Default fallback jika config.json belum ada
     ============================================================ */
  var defaultConfig = {
    discord: 'https://discord.gg/ioc',
    websites: [
      {
        icon: '🚆',
        name: 'Overfreight Decal Indonesia (ODI)',
        desc: 'Galeri dan direktori decal ID KAI untuk game Roblox Overfreight. Temukan livery kereta Indonesia favoritmu.',
        url: '#',
        active: true
      },
      {
        icon: '🌐',
        name: 'Website IOC',
        desc: 'Halaman resmi Indonesia Overfreight Community. Informasi, tim, dan tautan resmi IOC.',
        url: '#',
        active: true
      }
    ],
    team: [
      { name: 'Gerald Jonathan William', role: 'Owner', avatar: './assets/LogoIOC.png' },
      { name: 'Irgan Arda Turan', role: 'Wakil', avatar: '👑' },
      { name: '-', role: 'Security 1', avatar: '⚒️' },
      { name: '-', role: 'Security 2', avatar: '⚒️' },
      { name: '-', role: 'Admin 1', avatar: '🛡️' },
      { name: '-', role: 'Admin 2', avatar: '🛡️' },
      { name: '-', role: 'Admin 3', avatar: '🛡️' },
      { name: '-', role: 'Admin 4', avatar: '🛡️' },
      { name: '-', role: 'Admin 5', avatar: '🛡️' }
    ],
    stats: {
      member: 0,
      rating: '0.0',
      platform: 'WhatsApp Group\nWhatsApp Channel\nDiscord (Coming Soon)'
    },
    links: [
      { icon: '💬', name: 'WhatsApp Group', url: '#' },
      { icon: '📢', name: 'WhatsApp Channel', url: '#' },
      { icon: '🔵', name: 'Discord IOC', url: '#' }
    ]
  };

  /* ============================================================
     HELPERS
     ============================================================ */
  function el(id) {
    return document.getElementById(id);
  }

  function make(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html !== undefined) d.innerHTML = html;
    return d;
  }

  function esc(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ============================================================
     RENDER WEBSITE BUATAN
     ============================================================ */
  function renderWebsites(websites) {
    var grid = el('website-grid');
    if (!grid || !websites) return;
    grid.innerHTML = '';

    websites.forEach(function (site, i) {
      var card = make('div', 'project-card reveal');
      card.style.transitionDelay = (i * 80) + 'ms';

      var linkHtml = site.active
        ? '<a class="project-link" href="' + esc(site.url) + '" target="_blank">Kunjungi →</a>'
        : '<span class="project-link project-link-disabled">Coming Soon</span>';

      card.innerHTML =
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
      card.style.transitionDelay = (i * 80) + 'ms';

      var avatarInner = member.avatar
        ? '<img src="' + esc(member.avatar) + '" alt="' + esc(member.name) + '" />'
        : '<span style="font-size:1.6rem;">👤</span>';

      card.innerHTML =
        '<div class="team-avatar">' + avatarInner + '</div>' +
        '<div class="team-name">' + esc(member.name) + '</div>' +
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
      {
        icon: '👥',
        value: stats.member,
        label: 'Member',
        type: 'number'
      },
      {
        icon: '⭐',
        value: stats.rating,
        label: 'Rating',
        type: 'number'
      },
      {
        icon: '📱',
        value: stats.platform,
        label: 'Platform',
        type: 'text'
      }
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
        '<span class="stat-icon">' + esc(item.icon) + '</span>' +
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
      card.href = link.url || '#';
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.style.transitionDelay = (i * 70) + 'ms';

      card.innerHTML =
        '<span class="link-icon">' + esc(link.icon) + '</span>' +
        '<div>' +
          '<div class="link-name">' + esc(link.name) + '</div>' +
          '<div class="link-url">' + esc(link.url) + '</div>' +
        '</div>' +
        '<span class="link-arrow">→</span>';

      grid.appendChild(card);
    });
  }

  /* ============================================================
     SET DISCORD BUTTON
     ============================================================ */
  function setDiscord(url) {
    var btn = el('discord-btn');
    if (btn) btn.href = url || '#';
  }

  /* ============================================================
     RENDER ALL DARI CONFIG
     ============================================================ */
  function renderAll(cfg) {
    renderWebsites(cfg.websites);
    renderTeam(cfg.team);
    renderStats(cfg.stats);
    renderLinks(cfg.links);
    setDiscord(cfg.discord);
    initReveal();
  }

  /* ============================================================
     LOAD config.json
     ============================================================ */
  function loadConfig() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './config.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var cfg = JSON.parse(xhr.responseText);
            renderAll(cfg);
          } catch (e) {
            console.warn('[IOC] Gagal parse config.json, pakai default.');
            renderAll(defaultConfig);
          }
        } else {
          console.warn('[IOC] config.json tidak ditemukan, pakai default.');
          renderAll(defaultConfig);
        }
      }
    };
    xhr.send();
  }

  /* ============================================================
     SCROLL REVEAL — IntersectionObserver
     Scroll bawah: fade in + slide up
     Scroll atas: fade out + slide down (hidden class)
     ============================================================ */
  var lastScrollY = window.pageYOffset || 0;

  function initReveal() {
    var elements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      // Fallback: tampilkan semua langsung
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      var currentScrollY = window.pageYOffset || 0;
      var scrollingDown = currentScrollY >= lastScrollY;
      lastScrollY = currentScrollY;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Masuk viewport — fade in + slide up
          entry.target.classList.remove('hidden');
          entry.target.classList.add('visible');
        } else {
          // Keluar viewport
          if (scrollingDown) {
            // Scroll bawah tapi elemen keluar atas — biarkan (udah visible)
          } else {
            // Scroll balik atas — fade out + slide down
            entry.target.classList.remove('visible');
            entry.target.classList.add('hidden');
          }
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px'
    });

    for (var j = 0; j < elements.length; j++) {
      observer.observe(elements[j]);
    }

    // Update lastScrollY on scroll
    window.addEventListener('scroll', function () {
      lastScrollY = window.pageYOffset || 0;
    }, { passive: true });
  }

  /* ============================================================
     BANNER PARALLAX SUBTLE
     ============================================================ */
  function initParallax() {
    var bgImg = document.querySelector('.banner-bg-img');
    if (!bgImg) return;

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset || 0;
      var offset = scrollY * 0.35;
      bgImg.style.transform = 'translateY(' + offset + 'px)';
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
