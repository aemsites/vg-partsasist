// eslint-disable-next-line import/no-cycle
import { loadScript } from './aem.js';

// add more delayed functionality here

//  Load Google Tag Manager
const fireGTM = (w, d, s, l, i) => {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const f = d.getElementsByTagName(s)[0];
  const j = d.createElement(s);
  const dl = l !== 'dataLayer' ? `&l=${l}` : '';
  j.async = true;
  j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
  f.parentNode.insertBefore(j, f);
};

// OneTrust Cookies Consent Notice start
if (window.location.host.includes('partsasist.com')) {
  // on localhost/hlx.page/hlx.live the consent notice is displayed every time the page opens,
  // because the cookie is not persistent. To avoid this annoyance, disable unless on the
  // production page.
  loadScript('https://cdn.cookielaw.org/scripttemplates/otSDKStub.js', {
    type: 'text/javascript',
    charset: 'UTF-8',
    'data-domain-script': '078b3e5b-9ab3-4e0f-99e4-1d0b7ff41e53',
  });
}

fireGTM(window, document, 'script', 'dataLayer', 'GTM-NRP6TBV');
window.OptanonWrapper = () => {};
// OneTrust Cookies Consent Notice end

// Contact form campaign Start

// Check for Campaign & Business Unit IDs in metadata & Pardot form block on the page
// then add the IDs to the script that will be injected.
const campaignMeta = document.querySelector('meta[name="campaign-id"]');
const businessUnitMeta = document.querySelector('meta[name="business-unit-id"]');
const pardotFormBlock = document.querySelector('.pardot-form.block');
const pardotSubmitBtn = pardotFormBlock && pardotFormBlock.querySelector('button[type="submit"]');
const pardotForm = document.querySelector('.pardot-form.block');

if (campaignMeta && businessUnitMeta && pardotForm) {
  const campaignId = campaignMeta.getAttribute('content');
  const businessUnitId = businessUnitMeta.getAttribute('content');
  /** @type {string | null} */
  const pardotUrlRaw = pardotSubmitBtn && pardotSubmitBtn.formAction;
  const pardotUrl = pardotUrlRaw && new URL(pardotUrlRaw).hostname;
  const pardotUrlDefault = 'go.pardot.com';
  const hostname = pardotUrl || pardotUrlDefault;
  const host = hostname.split('.').slice(1).join('.');
  // Inject Pardot script into the page
  const pardotScript = document.createRange().createContextualFragment(`
    <script type="text/javascript">
      piAId = '${businessUnitId}';
      piCId = '${campaignId}';
      goHostname = '${hostname}';
      (function() {
        function async_load(){
          var s = document.createElement('script'); s.type = 'text/javascript';
          s.src = ('https:' == document.location.protocol ? 'https://go' : 'http://cdn') + '.${host}/pd.js';
          var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c);
        }
        if(window.attachEvent) { window.attachEvent('onload', async_load); }
        else { window.addEventListener('load', async_load, false); }
      })();
    </script>
  `);
  document.head.appendChild(pardotScript);
}
// Contact form campaign End
