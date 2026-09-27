// BRASPACK — comportamento base do site
document.addEventListener('DOMContentLoaded', function () {

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // Revelação suave no scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Hero: respeita prefers-reduced-motion e conexão lenta
  var heroVideo = document.querySelector('.hero-media video');
  if (heroVideo) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var slowConn = navigator.connection && (navigator.connection.saveData ||
      /2g/.test(navigator.connection.effectiveType || ''));
    if (prefersReduced || slowConn) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
      heroVideo.style.display = 'none';
    }
  }

  // Como Funciona: abas + barra de progresso
  var tabsList = document.querySelector('.tabs-list');
  var progressFill = document.querySelector('.progress-fill');
  var flowSteps = document.querySelectorAll('.flow-step');
  if (tabsList && flowSteps.length) {
    var tabLinks = tabsList.querySelectorAll('a');

    var setActiveTab = function (id) {
      tabLinks.forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('href') === '#' + id);
      });
    };

    if ('IntersectionObserver' in window) {
      var stepObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      }, { threshold: 0.4 });
      flowSteps.forEach(function (s) { stepObserver.observe(s); });
    }

    window.addEventListener('scroll', function () {
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (progressFill) progressFill.style.width = scrolled + '%';
    }, { passive: true });
  }

  // Feature panel: clique na lista troca o item ativo e a mídia do painel
  var featureItems = document.querySelectorAll('.feature-item');
  var featureMediaImg = document.getElementById('featureMediaImg');
  if (featureItems.length) {
    featureItems.forEach(function (item) {
      item.addEventListener('click', function () {
        if (item.classList.contains('is-active')) return;
        featureItems.forEach(function (i) { i.classList.remove('is-active'); });
        item.classList.add('is-active');
        if (!featureMediaImg) return;
        var src = item.getAttribute('data-media');
        var alt = item.getAttribute('data-alt') || '';
        featureMediaImg.classList.add('is-fading');
        setTimeout(function () {
          featureMediaImg.src = src;
          featureMediaImg.alt = alt;
          featureMediaImg.classList.remove('is-fading');
        }, 200);
      });
    });
  }

  // Lightbox: expandir fotos ao clicar, com X para fechar
  var lightboxCandidates = Array.prototype.filter.call(
    document.querySelectorAll('main img:not([aria-hidden="true"])'),
    function (img) { return !img.closest('.logo-marquee'); }
  );
  if (lightboxCandidates.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Imagem ampliada');
    overlay.innerHTML = '<button type="button" class="lightbox-close" aria-label="Fechar imagem">&times;</button><img alt="">';
    document.body.appendChild(overlay);

    var overlayImg = overlay.querySelector('img');
    var closeBtn = overlay.querySelector('.lightbox-close');
    var lastFocused = null;

    var openLightbox = function (img) {
      lastFocused = document.activeElement;
      overlayImg.src = img.currentSrc || img.src;
      overlayImg.alt = img.alt || '';
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };
    var closeLightbox = function () {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    lightboxCandidates.forEach(function (img) {
      img.addEventListener('click', function () { openLightbox(img); });
    });
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
    });
  }
});
