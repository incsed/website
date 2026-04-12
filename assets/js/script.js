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
/*
function setLanguage(language) {
    lang = language;
    document.documentElement.lang = language;
    document.getElementById('btn-es').className = language === 'es' ? 'active' : '';
    document.getElementById('btn-en').className = language === 'en' ? 'active' : '';
    updateMenuLinks();
}

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
}*/

/**
 * Sets the website language and updates the UI accordingly.
 * @param {string} lang - The language code ('es' or 'en')
 */
function setLanguage(language) {
    lang = language;
  const html = document.documentElement;
  
  // 1. Update the HTML lang attribute
  html.setAttribute('lang', lang);
  
  // 2. Update the visual state of the language buttons
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    // Check if the button's text matches the selected language
    if (btn.textContent.trim().toLowerCase() === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 3. Save the preference for future visits
  localStorage.setItem('preferred-lang', lang);
}

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.classList.toggle('active');
        console.log("Menu toggled. Active status:", nav.classList.contains('active'));
    }
}
/*
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggleBtn = document.querySelector('.greedy-nav__toggle');
    
    // Toggle the menu visibility
    navLinks.classList.toggle('active');
    
    // If you want the button to stay visible or change look when active:
    toggleBtn.classList.toggle('is-open'); 
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
*/

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

function switchLang(currentLang) {
    setLanguage(currentLang === 'es' ? 'en' : 'es');
    return false;
}

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
   /* updateMenuLinks();*/
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

  // Ensure the handler is attached
    const toggleBtn = document.querySelector('.greedy-nav__toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMenu);
    }
});

window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY;
    const header = document.querySelector('header');
    const topHeader = document.getElementById('top-header');
    const heroBg = document.querySelector('.hero-parallax-bg');

    if (scrollPos > 80) {
        header.classList.add('scrolled');
        document.body.classList.add('scrolled-past'); 
        document.body.classList.add('headers-visible');
    } else {
        header.classList.remove('scrolled');
        document.body.classList.remove('scrolled-past');
        document.body.classList.remove('headers-visible');
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