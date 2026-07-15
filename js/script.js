(function() {
  var lang = localStorage.getItem('leysan-lang') || 'ru';
  var toggle = document.getElementById('langToggle');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');

  function setLang(l) {
    lang = l;
    localStorage.setItem('leysan-lang', lang);
    document.documentElement.lang = lang;

    toggle.classList.remove('ru', 'en');
    toggle.classList.add(lang);

    var els = document.querySelectorAll('[data-' + lang + ']');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var text = el.getAttribute('data-' + lang);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    }
  }

  toggle.addEventListener('click', function() {
    setLang(lang === 'ru' ? 'en' : 'ru');
  });

  var diplomaCards = document.querySelectorAll('.diploma-card');
  diplomaCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var img = card.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox__close')) {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    }
  });

  setLang(lang);
})();
