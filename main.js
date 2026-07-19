// Jagstrong shared behavior: mobile menu, nav scroll state, scroll reveals
(function(){
  var reduced = true;

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

})();
