(() => {
    const STYLE_ID = "csg-valentines-style";
    const BASE_PATH = (() => {
        // Current script source
        const src = document.currentScript && document.currentScript.src;
        if (!src) return "";
        const url = new URL(src, window.location.href);
        // Remove the script path to get the base path
        return url.pathname.replace(/\/events\/valentines\/valentines\.js$/, "");
    })();
    const LOGO_SRC = `${BASE_PATH}/events/valentines/loversheet_generator.svg`;

    function ensureStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
      body {
        background-image: url('${BASE_PATH}/events/valentines/background.jpg');
        background-repeat: repeat;
        background-attachment: fixed;
        background-size: 25%;
        background-position-y: 10px;
      }
      .btn-warning {
        filter: hue-rotate(232deg) !important;
      }
      .logo {
        background: rgba(255, 228, 217, 1);
      }
      #linksSection {
            background: rgba(255, 228, 217, 1);
      }
    `;
        document.head.appendChild(style);
    }

    function init() {
        ensureStyle();
        // Use a slight delay or MutationObserver if the logo isn't rendered yet by Svelte
        // But since events.js is usually at the bottom of body, it might be fine.
        const logo = document.querySelector(".logo");
        if (logo) {
            logo.src = LOGO_SRC;
        } else {
            // Fallback: poll or use observer if needed, but let's try direct first
            const observer = new MutationObserver((mutations, obs) => {
                const logo = document.querySelector(".logo");
                if (logo) {
                    logo.src = LOGO_SRC;
                    obs.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
