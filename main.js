// Jagstrong shared behavior: mobile menu, nav scroll state, progress bar, scroll reveals
(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile menu toggle
  var btn = document.querySelector('.menu-btn');
  if(btn){
    btn.addEventListener('click', function(){
      var open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.mobile-menu a').forEach(function(a){
      a.addEventListener('click', function(){
        document.body.classList.remove('menu-open');
        btn.setAttribute('aria-expanded','false');
      });
    });
  }

  // Scroll progress bar
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  // Nav scrolled state + progress fill
  var nav = document.querySelector('nav');
  function onScroll(){
    if(nav){
      if(window.scrollY > 40){ nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    }
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});

  if(reduced || !('IntersectionObserver' in window)) return;

  // Staggered scroll reveals
  var selectors = [
    '.section-head', '.card', '.plan', '.feature-row', '.member',
    '.contact-info .block', '.map-ph', '.view-all-wrap',
    '.about > div:not(.ghost)', '.band > *',
    '.pt-table-wrap', '.special-band', '.nutrition-note',
    '.foot-grid > div', '.train-hard'
  ];
  var groups = new Map();
  document.querySelectorAll(selectors.join(',')).forEach(function(el){
    if(el.closest('.hero, .page-hero')) return;
    var key = el.parentElement;
    var i = groups.get(key) || 0;
    groups.set(key, i + 1);
    el.classList.add('rv');
    el.style.setProperty('--d', (i * 90) + 'ms');
  });

  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      revealObserver.unobserve(el);
      el.classList.add('in');
      var delay = parseInt(el.style.getPropertyValue('--d'), 10) || 0;
      setTimeout(function(){
        el.classList.remove('rv', 'in');
        el.style.removeProperty('--d');
      }, delay + 800);
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});

  document.querySelectorAll('.rv').forEach(function(el){ revealObserver.observe(el); });

  // Animated blue line on section entry
  var lineObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      entry.target.classList.add('line-in');
      lineObserver.unobserve(entry.target);
    });
  }, {threshold: 0.1});
  document.querySelectorAll('section').forEach(function(s){ lineObserver.observe(s); });

})();
