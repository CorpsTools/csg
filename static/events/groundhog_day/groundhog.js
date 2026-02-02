(() => {
  const STYLE_ID = "csg-groundhog-style";
  const ROOT_ID = "csg-groundhog";
  const BASE_PATH = (() => {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return "";
    const url = new URL(src, window.location.href);
    return url.pathname.replace(/\/events\/groundhog_day\/groundhog\.js$/, "");
  })();
  const IMG_SRC = `${BASE_PATH}/events/groundhog_day/groundhog.png`;

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${ROOT_ID} {
        position: fixed;
        right: 200px;
        bottom: -50px;
        width: 240px;
        height: auto;
        z-index: 1000;
        transform: translate(220px, 220px) scaleX(-1);
        transform-origin: bottom right;
        animation: csg-groundhog-peek 6s ease-in-out 1s forwards;
        transition: transform 0.6s ease;
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
      }

      #${ROOT_ID}.hidden {
        transform: translate(220px, 220px) scaleX(-1);
      }

      #${ROOT_ID}.visible {
        transform: translate(0, 0) scaleX(-1);
      }

      @keyframes csg-groundhog-peek {
        0% { transform: translate(220px, 220px) scaleX(-1); }
        100% { transform: translate(0, 0) scaleX(-1); }
      }

    `;
    document.head.appendChild(style);
  }

  function init() {
    if (document.getElementById(ROOT_ID)) return;
    ensureStyle();
    const img = document.createElement("img");
    img.id = ROOT_ID;
    img.src = IMG_SRC;
    img.alt = "Groundhog";
    let isHovered = false;
    let reappearTimer = null;
    let unhideTimer = null;
    img.addEventListener("mouseenter", () => {
      isHovered = true;
      if (reappearTimer) {
        clearTimeout(reappearTimer);
        reappearTimer = null;
      }
      if (unhideTimer) {
        clearTimeout(unhideTimer);
        unhideTimer = null;
      }
      img.classList.remove("visible");
      img.classList.add("hidden");
      unhideTimer = setTimeout(() => {
        if (isHovered) return;
        img.classList.remove("hidden");
        img.classList.add("visible");
      }, 3000);
    });
    img.addEventListener("mouseleave", () => {
      isHovered = false;
      if (reappearTimer) clearTimeout(reappearTimer);
      reappearTimer = setTimeout(() => {
        if (isHovered) return;
        img.classList.remove("hidden");
        img.classList.add("visible");
      }, 2000);
    });
    img.addEventListener("mousemove", () => {
      if (isHovered) {
        img.classList.remove("visible");
        img.classList.add("hidden");
      }
    });
    img.addEventListener("click", () => {
      window.open("https://en.wikipedia.org/wiki/Groundhog_Day", "_blank", "noopener");
    });
    img.addEventListener("animationend", (event) => {
      if (event.animationName === "csg-groundhog-peek") {
        img.style.animation = "none";
        img.classList.remove("hidden");
        img.classList.add("visible");
      }
    });
    document.body.appendChild(img);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
