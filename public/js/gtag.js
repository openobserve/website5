function initializeAnalytics(trackingId, scriptSrc) {
  window.dataLayer = window.dataLayer || [];
  
  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', trackingId);

  if (scriptSrc) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = scriptSrc;
    document.head.appendChild(script);
  }
}
initializeAnalytics('G-3383ZJ2HH7', 'https://www.googletagmanager.com/gtag/js?id=G-3383ZJ2HH7');