import { defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const config = useRuntimeConfig();
  const LINKEDIN_ID = config.public.linkedinPixelId;
  const META_PIXEL_ID = config.public.metaPixelId;
  const TWITTER_PIXEL_ID = config.public.twitterPixelId;
  const GOOGLE_ADS_ID = config.public.googleAdsId;
  let pixelsLoaded = false;

  const loadMarketingPixels = () => {
    if (pixelsLoaded) {
      console.log('🔹 Los píxeles de marketing ya están cargados.');
      return;
    }

    // ✅ Google Ads (Google Tag Manager)
    if (GOOGLE_ADS_ID) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GOOGLE_ADS_ID}');
      `;
      document.head.appendChild(script);
      console.log('✅ Google Ads cargado');
    }

    // ✅ Meta Pixel (Facebook/Instagram)
    if (META_PIXEL_ID) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
      console.log('✅ Meta Pixel cargado');
    }

    // ✅ LinkedIn Pixel
    if (LINKEDIN_ID) {
      const script = document.createElement('script');
      script.innerHTML = `
        _linkedin_partner_id = "${LINKEDIN_ID}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        (function(){var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})();
      `;
      document.head.appendChild(script);
      console.log('✅ LinkedIn Pixel cargado');
    }

    // ✅ Twitter/X Pixel
    if (TWITTER_PIXEL_ID) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,
        u.src='https://static.ads-twitter.com/uwt.js',
        a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
        twq('init','${TWITTER_PIXEL_ID}');
        twq('track','PageView');
      `;
      document.head.appendChild(script);
      console.log('✅ Twitter/X Pixel cargado');
    }

    pixelsLoaded = true;
  };

  const disableMarketingPixels = () => {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if (
        script.innerHTML.includes('fbq') ||
        script.innerHTML.includes('_linkedin_partner_id') ||
        script.innerHTML.includes('twq') ||
        script.innerHTML.includes('gtm.js')
      ) {
        script.remove();
      }
    });

    console.log('❌ Píxeles de marketing eliminados.');
    pixelsLoaded = false;
  };

  nuxtApp.provide('loadMarketingPixels', loadMarketingPixels);
  nuxtApp.provide('disableMarketingPixels', disableMarketingPixels);
});