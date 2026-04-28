let lang = 'es';

/* Theme handling: apply, toggle and persist preference */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
}

function getStoredOrSystemTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyStoredTheme() {
    const theme = getStoredOrSystemTheme();
    applyTheme(theme);
}

// 1. Auto-detect the language from the URL when the page loads
let currentLang = window.location.pathname.includes('/en/') ? 'en' : 'es';
            localStorage.setItem('preferred-lang', currentLang);

// 2. The master function to change the language display
function setLanguage(lang) {
    currentLang = lang;
    console.log("Setting language to:", lang); // Debugging
    
    // 1. Hide EVERY language element first
    document.querySelectorAll('.lang-es, .lang-en').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
    });
    
    // 2. Show only the elements for the detected language
    // We use '' or 'block' to override the 'none'
    document.querySelectorAll('.lang-' + lang).forEach(el => {
        el.style.setProperty('display', 'inline-block', 'important');
    });
       
    // Update the active state of your header buttons
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');
    if (btnEs) {
        if (lang === 'es') btnEs.classList.add('active');
        else btnEs.classList.remove('active');
    }
    if (btnEn) {
        if (lang === 'en') btnEn.classList.add('active');
        else btnEn.classList.remove('active');
    }

}

function changeLanguage(lang_url) {
  let currentPath = window.location.pathname;
  let newPath = '';
/*
  // Si el idioma actual es el default (ej. /website/post.html)
  // le inyectamos el nuevo idioma después de /website/
  if (window.location.href.indexOf('/' + targetLang + '/') === -1) {
      // Reemplazamos /website/ por /website/en/
      newPath = currentPath.replace('/website/', '/website/' + targetLang + '/');
  } else {
      // Si ya tiene un idioma, lo intercambiamos (ej. /en/ por /es/)
      newPath = currentPath.replace('/' + activeLang + '/', '/' + targetLang + '/');
  }
*/
  lang = lang_url.split('/').filter(part => part.length > 0).pop(); // Extraemos el idioma del URL
  if (lang == 'en'){lang='en';} else {lang='es';} // Aseguramos que solo sea 'en' o 'es'    
    localStorage.setItem('preferred-lang', lang);
    window.location.href = lang_url //newPath.replace('//', '/');
}

/* function setLanguage(language) {
    lang = language;
    document.documentElement.lang = language;
    document.getElementById('btn-es').className = language === 'es' ? 'active' : '';
    document.getElementById('btn-en').className = language === 'en' ? 'active' : '';
    updateMenuLinks();
} */

function updateMenuLinks() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (lang === 'es') {
            if (link.getAttribute('href') === '#home') link.textContent = 'Inicio';
            if (link.getAttribute('href') === '#about') link.textContent = 'Nosotros';
            if (link.getAttribute('href') === '#services') link.textContent = 'Servicios';
            if (link.getAttribute('href') === '#portfolio') link.textContent = 'Portafolio';
            if (link.getAttribute('href') === '#blog') link.textContent = 'Blog';
            if (link.getAttribute('href') === '#courses') link.textContent = 'Cursos';
            if (link.getAttribute('href') === '#contact') link.textContent = 'Contacto';
        } else {
            if (link.getAttribute('href') === '#home') link.textContent = 'Home';
            if (link.getAttribute('href') === '#about') link.textContent = 'About Us';
            if (link.getAttribute('href') === '#services') link.textContent = 'Services';
            if (link.getAttribute('href') === '#portfolio') link.textContent = 'Portfolio';
            if (link.getAttribute('href') === '#blog') link.textContent = 'Blog';
            if (link.getAttribute('href') === '#courses') link.textContent = 'Courses';
            if (link.getAttribute('href') === '#contact') link.textContent = 'Contact';
        }
    });
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (!navLinks) return;
    navLinks.classList.toggle('active');
    if (hamburger) {
        const icon = hamburger.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}

(function attachNavLinkHandlers(){
    const navLinks = document.querySelectorAll('.nav-links a');
    const navContainer = document.querySelector('.nav-links');
    if (!navContainer) return;
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                const hamburgerIcon = document.querySelector('.hamburger i');
                if (hamburgerIcon) {
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars');
                }
            }
        });
    });
})();

window.addEventListener('resize', () => {
    const navContainer = document.querySelector('.nav-links');
    if (!navContainer) return;
    if (window.innerWidth > 768 && navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        const hamburgerIcon = document.querySelector('.hamburger i');
        if (hamburgerIcon) {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    }
});

function acceptCookies() {
    document.getElementById('cookieBanner').style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
}

function showPrivacyPolicy() {
    document.getElementById('privacyModal').style.display = 'block';
}

function closePrivacyPolicy() {
    document.getElementById('privacyModal').style.display = 'none';
}

function showTerms() {
    document.getElementById('termsModal').style.display = 'block';
}

function closeTerms() {
    document.getElementById('termsModal').style.display = 'none';
}

function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookieBanner').style.display = 'block';
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateMenuLinks();
    checkCookies();
    applyStoredTheme();
    const aboutTitle = document.querySelector('.about-section .section-title');
   const pagefooter = document.querySelector('.page__footer');
if (pagefooter) pagefooter.classList.remove('page__footer');
    if(aboutTitle) {
        aboutTitle.style.setProperty('color', 'var(--white)', 'important');
    }
  const savedLang = localStorage.getItem('preferred-lang') || 'es';
  setLanguage(savedLang);
});

window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY;
    const mainHeader = document.getElementById('mainHeader');
    const heroBg = document.querySelector('.hero-parallax-bg');

    if (!mainHeader) return;

    if (scrollPos > 20) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }

    let blurValue = Math.max(0, 8 - (scrollPos / 50));
    if (heroBg) {
        heroBg.style.filter = `blur(${blurValue}px)`;
    }
});

window.onload = function() {
    const widget = document.getElementById('wa-widget');
    const bubble = document.getElementById('wa-bubble');

    setTimeout(() => {
      widget.style.visibility = 'visible';
    }, 1000);

    setTimeout(() => {
      bubble.classList.add('show');
    }, 2500);

    setTimeout(() => {
      bubble.classList.remove('show');
    }, 5000);

    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 200);
};

function showBubble() {
    const bubble = document.getElementById('wa-bubble');
    if (bubble) bubble.classList.add('show');
}

function hideBubble() {
    const bubble = document.getElementById('wa-bubble');
    if (bubble) bubble.classList.remove('show');
}
