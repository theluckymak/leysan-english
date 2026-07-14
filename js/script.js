(function() {
  var lang = localStorage.getItem('leysan-lang') || 'ru';
  var paletteId = parseInt(localStorage.getItem('leysan-palette') || '1');
  var toggle = document.getElementById('langToggle');
  var root = document.documentElement;
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');

  var palettes = [
    {
      id: 1,
      name: 'Pastel',
      colors: ['cdb4db','ffc8dd','ffafcc','bde0fe','a2d2ff']
    },
    {
      id: 2,
      name: 'Ocean',
      colors: ['219ebc','ffb703','fb8500','8ecae6','023047']
    },
    {
      id: 3,
      name: 'Rose',
      colors: ['da627d','ffa5ab','f9dbbd','f9dbbd','a53860']
    },
    {
      id: 4,
      name: 'Berry',
      colors: ['dd2d4a','f26a8d','f49cbb','cbeef3','880d1e']
    }
  ];

  function hexToRgb(hex) {
    var r = parseInt(hex.slice(0,2), 16);
    var g = parseInt(hex.slice(2,4), 16);
    var b = parseInt(hex.slice(4,6), 16);
    return r + ', ' + g + ', ' + b;
  }

  function applyPalette(id) {
    paletteId = id;
    localStorage.setItem('leysan-palette', paletteId);
    var p = palettes[id - 1];
    for (var i = 0; i < 5; i++) {
      root.style.setProperty('--c' + (i+1), '#' + p.colors[i]);
      root.style.setProperty('--c' + (i+1) + '-rgb', hexToRgb(p.colors[i]));
    }
    var dots = document.querySelectorAll('.palette-dot');
    dots.forEach(function(d, idx) {
      d.classList.toggle('active', idx + 1 === id);
    });
  }

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

  document.getElementById('paletteSwitcher').addEventListener('click', function(e) {
    var dot = e.target.closest('.palette-dot');
    if (dot) {
      applyPalette(parseInt(dot.getAttribute('data-palette')));
    }
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
  applyPalette(paletteId);
})();
