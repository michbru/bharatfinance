// Cookie Consent Banner
(function() {
    if (localStorage.getItem('cookie_consent')) return;

    var banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9000;background:rgba(255,255,255,0.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid rgba(0,0,0,0.08);padding:1.5rem 2rem;font-family:Inter,sans-serif;';

    banner.innerHTML =
        '<div style="max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:2rem;flex-wrap:wrap;">' +
            '<p style="margin:0;font-size:0.8rem;color:#525252;line-height:1.6;max-width:720px;">' +
                'This website uses only technically necessary cookies to ensure basic functionality. No tracking or advertising cookies are used. ' +
                '<a href="privacy.html" style="color:#D4872C;text-decoration:none;font-weight:500;">Privacy Policy</a>' +
            '</p>' +
            '<button id="cookieAccept" style="flex-shrink:0;padding:0.65rem 2rem;background:#1B4D3E;color:#fff;border:none;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;transition:background 0.3s ease;font-family:Inter,sans-serif;">' +
                'Understood' +
            '</button>' +
        '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function() {
        localStorage.setItem('cookie_consent', 'accepted');
        banner.style.display = 'none';
    });
})();
