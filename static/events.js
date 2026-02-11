(() => {
  const BASE_PATH = (() => {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return "";
    const url = new URL(src, window.location.href);
    return url.pathname.replace(/\/events\.js$/, "");
  })();

  const EVENT_DEFS = [
    {
      id: "groundhog_day",
      month: 2,
      day: 2,
      script: `${BASE_PATH}/events/groundhog_day/groundhog.js`
    },
    {
      id: "valentines",
      month: 2,
      day: 14,
      script: `${BASE_PATH}/events/valentines/valentines.js`
    }
  ];

  function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }

  function pickEventByDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return EVENT_DEFS.find((event) => event.month === month && event.day === day);
  }

  function init() {
    const event = pickEventByDate(new Date());
    if (!event) return;
    loadScript(event.script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
