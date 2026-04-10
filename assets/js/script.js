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

function switchLang(currentLang) {
    // backward-compatible API: accept a lang code or toggle when passed 'toggle'
    if (currentLang === 'toggle') {
        var next = (document.documentElement.lang === 'en') ? 'es' : 'en';
        applyLang(next);
    } else {
        applyLang(currentLang);
    }
}

// applyLang and init - supports inline-provided translations in window.__UI_TEXT
function applyLang(lang) {
    try {
        document.documentElement.lang = (lang === 'en') ? 'en' : 'es';
        // toggle nav blocks annotated with data-lang
        document.querySelectorAll('[data-lang]').forEach(function(el){
            el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
        });
        // update UI text nodes with data-i18n keys
        document.querySelectorAll('[data-i18n]').forEach(function(el){
            var key = el.getAttribute('data-i18n');
            var txt = (window.__UI_TEXT && window.__UI_TEXT[lang] && window.__UI_TEXT[lang][key]) || el.textContent;
            el.textContent = txt;
        });
        // toggle active class on language buttons
        document.querySelectorAll('[data-lang-btn]').forEach(function(b){
            b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
        });
        localStorage.setItem('site-lang', lang);
    } catch(e) { console.error(e); }
}

// Initialize language switching on DOMContentLoaded if translations provided inline
function initLangSwitcherIfPresent(){
    var stored = localStorage.getItem('site-lang');
    var initial = stored || (document.documentElement.lang || 'es');
    // if translations provided inline as window.__UI_TEXT, apply initial language
    if (window.__UI_TEXT) {
        applyLang(initial);
    }
    // attach handlers for buttons (progressive enhancement)
    document.querySelectorAll('[data-lang-btn]').forEach(function(b){
        b.addEventListener('click', function(){
            var lang = b.getAttribute('data-lang-btn');
            // persist choice
            localStorage.setItem('site-lang', lang);
            // compute and navigate to corresponding page-level route
            try {
                var base = (window.__SITE && window.__SITE.baseurl) ? window.__SITE.baseurl : '';
                var p = window.location.pathname || '/';
                // strip base from path for mapping
                if (base && p.indexOf(base) === 0) p = p.slice(base.length) || '/';
                var target;
                if (lang === 'en') {
                    if (p === '/' || p === '') {
                        target = (base || '') + '/en/';
                    } else if (p.indexOf('/en/') === 0) {
                        target = (base || '') + p; // already en
                    } else {
                        target = (base || '') + '/en' + p;
                    }
                } else {
                    // spanish
                    if (p.indexOf('/en/') === 0) {
                        var without = p.replace(/^\/en/, '') || '/';
                        target = (base || '') + without;
                    } else {
                        target = (base || '') + p;
                    }
                }
                // normalize double slashes
                target = target.replace(/\/\/+/, '/');
                // If already at target, just apply UI changes without navigation
                var current = window.location.pathname;
                if (current !== target) {
                    window.location.href = window.location.origin + target;
                    return;
                }
            } catch (e) { console.error(e); }
            // fallback: just apply lang to UI
            applyLang(lang);
        });
    });
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
    updateMenuLinks();
    checkCookies();
    applyStoredTheme();
    const aboutTitle = document.querySelector('.about-section .section-title');
    const pagefooter= document.getElementsByClassName('page__footer');
    pagefooter.classList.remove('page__footer');
    if(aboutTitle) {
        aboutTitle.style.setProperty('color', 'var(--white)', 'important');
    }
    // language switcher initialization (if masthead provided inline translations)
    initLangSwitcherIfPresent();
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
