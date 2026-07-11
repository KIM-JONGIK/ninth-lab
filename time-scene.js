(() => {
  const DAY_START_HOUR = 6;
  const NIGHT_START_HOUR = 18;
  const ROOT_URL = new URL(".", document.currentScript?.src || window.location.href);
  const SOURCES = {
    day: new URL("assets/stadium-day.png", ROOT_URL).href,
    night: new URL("assets/stadium-night.png", ROOT_URL).href,
  };

  function sceneOverride() {
    const value = new URLSearchParams(window.location.search).get("scene");
    return value === "day" || value === "night" ? value : "";
  }

  function resolveScene(date = new Date()) {
    const override = sceneOverride();
    if (override) return override;
    const hour = date.getHours();
    return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? "day" : "night";
  }

  function assetForScene(scene) {
    return SOURCES[scene] || SOURCES.night;
  }

  function syncImages(scene) {
    const source = assetForScene(scene);
    document.querySelectorAll("[data-time-stadium-image]").forEach((image) => {
      if (image.getAttribute("src") !== source) image.setAttribute("src", source);
    });
  }

  function preload(source) {
    if (document.querySelector(`link[data-time-scene-preload="${source}"]`)) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = source;
    link.dataset.timeScenePreload = source;
    document.head.append(link);
  }

  function apply() {
    const scene = resolveScene();
    const previous = document.documentElement.dataset.timeScene;
    const source = assetForScene(scene);
    document.documentElement.dataset.timeScene = scene;
    preload(source);
    syncImages(scene);
    if (previous && previous !== scene) {
      window.dispatchEvent(new CustomEvent("ninthlab:timescenechange", { detail: { scene, source } }));
    }
    return scene;
  }

  window.NINTH_LAB_TIME_SCENE = {
    apply,
    assetForScene,
    current: () => document.documentElement.dataset.timeScene || resolveScene(),
    resolveScene,
  };

  apply();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  }
  window.setInterval(apply, 60_000);
})();
