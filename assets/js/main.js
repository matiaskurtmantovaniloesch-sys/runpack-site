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
    }, { threshold: 0.15 });
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

  // Faixa de estatísticas do hero: arrastável para cima/baixo sobre o vídeo
  var statStrip = document.getElementById('statStrip');
  var statHandle = statStrip ? statStrip.querySelector('.stat-strip-handle') : null;
  var heroSection = statStrip ? statStrip.closest('.hero') : null;
  if (statStrip && statHandle && heroSection) {
    var dragging = false;
    var startY = 0;
    var startOffset = 0;
    var offset = 0;

    var clampOffset = function (value) {
      var maxUp = Math.max(0, heroSection.offsetHeight - statStrip.offsetHeight - 40);
      if (value < -maxUp) return -maxUp;
      if (value > 0) return 0;
      return value;
    };

    var onPointerMove = function (e) {
      if (!dragging) return;
      offset = clampOffset(startOffset + (e.clientY - startY));
      statStrip.style.transform = 'translateY(' + offset + 'px)';
    };

    var onPointerUp = function (e) {
      if (!dragging) return;
      dragging = false;
      statStrip.classList.remove('dragging');
      try { statHandle.releasePointerCapture(e.pointerId); } catch (err) {}
    };

    statHandle.addEventListener('pointerdown', function (e) {
      dragging = true;
      startY = e.clientY;
      startOffset = offset;
      statStrip.classList.add('dragging');
      statHandle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    statHandle.addEventListener('pointermove', onPointerMove);
    statHandle.addEventListener('pointerup', onPointerUp);
    statHandle.addEventListener('pointercancel', onPointerUp);

    window.addEventListener('resize', function () {
      offset = clampOffset(offset);
      statStrip.style.transform = 'translateY(' + offset + 'px)';
    });
  }
});
