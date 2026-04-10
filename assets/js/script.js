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
        // toggle nav blocks annotated with data-lang using CSS class for consistency
        document.querySelectorAll('[data-lang]').forEach(function(el){
            var isMatch = (el.getAttribute('data-lang') === lang);
            el.classList.toggle('hidden', !isMatch);
            el.setAttribute('aria-hidden', (!isMatch).toString());
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
    // determine language from URL path first (respect baseurl)
    var base = (window.__SITE && window.__SITE.baseurl) ? window.__SITE.baseurl : '';
    var p = window.location.pathname || '/';
    if (base && p.indexOf(base) === 0) p = p.slice(base.length) || '/';
    var pathLang = (p.indexOf('/en/') === 0 || p === '/en' || p.indexOf('/en') === 0) ? 'en' : null;
    var initial = stored || pathLang || (document.documentElement.lang || 'es');
    // apply initial language for UI regardless of inline translations
    applyLang(initial);
    // attach handlers for buttons (progressive enhancement)
    document.querySelectorAll('[data-lang-btn]').forEach(function(b){
        b.addEventListener('click', async function(){
            var lang = b.getAttribute('data-lang-btn');
            // persist choice
            localStorage.setItem('site-lang', lang);
            // compute corresponding page-level route
            try {
                var base = (window.__SITE && window.__SITE.baseurl) ? window.__SITE.baseurl : '';
                var p = window.location.pathname || '/';
                // strip base from path for mapping
                if (base && p.indexOf(base) === 0) p = p.slice(base.length) || '/';
                var targetPath;
                if (lang === 'en') {
                    if (p === '/' || p === '') {
                        targetPath = '/en/';
                    } else if (p.indexOf('/en/') === 0) {
                        targetPath = p; // already en
                    } else {
                        targetPath = '/en' + p;
                    }
                } else {
                    // spanish
                    if (p.indexOf('/en/') === 0) {
                        targetPath = p.replace(/^\/en/, '') || '/';
                    } else {
                        targetPath = p;
                    }
                }
                // prepend base if present
                var target = (base || '') + targetPath;
                // normalize double slashes
                target = target.replace(/\/\/+/g, '/');
                // If already at target, just apply UI changes without navigation
                var current = window.location.pathname;
                if (current === target) { applyLang(lang); return; }

                // Navigate directly to the computed target URL (avoid HEAD/CORS issues on GitHub Pages)
                var origin = window.location.origin;
                var goto = origin + target;
                window.location.href = goto;
                return;
            } catch (e) { console.error(e); applyLang(lang); }
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
