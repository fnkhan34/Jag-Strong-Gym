// Jagstrong shared behavior: mobile menu, nav scroll state, scroll reveals
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

  // Nav scrolled state
  var nav = document.querySelector('nav');
  function onScroll(){
    if(window.scrollY > 40){ nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  if(nav){
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // Scroll reveals
  var items = document.querySelectorAll('.reveal');
  if(reduced || !('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  items.forEach(function(el){ io.observe(el); });
})();
