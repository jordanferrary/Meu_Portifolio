/* ==========================================================
   JORDAN FERRARY — PAGE INTERACTIONS
   Update project data and MUSIC_FILE in this configuration.
   ========================================================== */

"use strict";

const SITE_CONFIG = {
  // Example: "assets/music/ambient.mp3"
  musicFile: "",

  projects: [
    {
      label: "FEATURED CREATION",
      title: "Worlds Beyond Reality",
      description: "A journey through form, atmosphere and imagination.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=90",
      url: "projects/project-one.html"
    },
    {
      label: "DIGITAL WORLDBUILDING",
      title: "Dreams in Dimensions",
      description: "Exploring new worlds through light, shape and visual storytelling.",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=90",
      url: "projects/project-two.html"
    },
    {
      label: "A STUDY IN ATMOSPHERE",
      title: "Made of Wonder",
      description: "Turning a spark of curiosity into something tangible.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1800&q=90",
      url: "projects/project-three.html"
    }
  ],

  slideInterval: 6500,
  transitionDelay: 200
};

document.addEventListener("DOMContentLoaded", () => {
  initializeYear();
  initializeCarousel();
  initializeMusicPlayer();
});

function initializeYear() {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function initializeCarousel() {
  const hero = document.getElementById("hero");
  const artworkLink = document.getElementById("artwork-link");
  const label = document.getElementById("hero-label");
  const title = document.getElementById("hero-title");
  const description = document.getElementById("hero-description");
  const slideNumber = document.getElementById("slide-number");
  const dotsContainer = document.getElementById("dots");
  const previousButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (
    !hero || !artworkLink || !label || !title || !description ||
    !slideNumber || !dotsContainer || !previousButton || !nextButton ||
    SITE_CONFIG.projects.length === 0
  ) {
    return;
  }

  const dots = Array.from(dotsContainer.querySelectorAll("[data-slide]"));
  let activeIndex = 0;
  let intervalId = null;
  let paused = false;
  let renderToken = 0;
  let transitionTimeout = null;

  function renderProject(requestedIndex) {
    activeIndex = (requestedIndex + SITE_CONFIG.projects.length) % SITE_CONFIG.projects.length;

    const project = SITE_CONFIG.projects[activeIndex];
    const token = ++renderToken;

    hero.classList.add("changing");

    if (transitionTimeout !== null) {
      window.clearTimeout(transitionTimeout);
    }

    transitionTimeout = window.setTimeout(() => {
      if (token !== renderToken) return;

      label.textContent = project.label;
      title.textContent = project.title;
      description.textContent = project.description;
      hero.style.setProperty("--art", `url("${project.image}")`);
      artworkLink.href = project.url;
      artworkLink.setAttribute("aria-label", `Open project: ${project.title}`);

      slideNumber.textContent =
        `${String(activeIndex + 1).padStart(2, "0")} / ` +
        `${String(SITE_CONFIG.projects.length).padStart(2, "0")}`;

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
        dot.setAttribute("aria-label", `Show project ${index + 1}`);
      });

      hero.classList.remove("changing");
      transitionTimeout = null;
    }, reduceMotion.matches ? 0 : SITE_CONFIG.transitionDelay);
  }

  function stopAutoplay() {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    if (paused || reduceMotion.matches || document.hidden || SITE_CONFIG.projects.length < 2) {
      return;
    }

    intervalId = window.setInterval(() => {
      renderProject(activeIndex + 1);
    }, SITE_CONFIG.slideInterval);
  }

  hero.addEventListener("mouseenter", () => {
    paused = true;
    stopAutoplay();
  });

  hero.addEventListener("mouseleave", () => {
    paused = false;
    startAutoplay();
  });

  hero.addEventListener("focusin", () => {
    paused = true;
    stopAutoplay();
  });

  hero.addEventListener("focusout", event => {
    if (!hero.contains(event.relatedTarget)) {
      paused = false;
      startAutoplay();
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      renderProject(index);
      startAutoplay();
    });
  });

  previousButton.addEventListener("click", () => {
    renderProject(activeIndex - 1);
    startAutoplay();
  });

  nextButton.addEventListener("click", () => {
    renderProject(activeIndex + 1);
    startAutoplay();
  });

  document.addEventListener("visibilitychange", startAutoplay);

  if (typeof reduceMotion.addEventListener === "function") {
    reduceMotion.addEventListener("change", startAutoplay);
  } else if (typeof reduceMotion.addListener === "function") {
    // Compatibility fallback for older browsers.
    reduceMotion.addListener(startAutoplay);
  }

  renderProject(0);
  startAutoplay();
}

function initializeMusicPlayer() {
  const audio = document.getElementById("audio");
  const player = document.getElementById("music-player");
  const toggle = document.getElementById("music-toggle");
  const state = document.getElementById("music-state");
  const volume = document.getElementById("music-volume");

  if (!audio || !player || !toggle || !state || !volume) {
    return;
  }

  audio.volume = Number(volume.value);

  if (SITE_CONFIG.musicFile.trim()) {
    audio.src = SITE_CONFIG.musicFile.trim();
  }

  function updateMusicState() {
    const isPlaying = !audio.paused;

    toggle.textContent = isPlaying ? "Ⅱ" : "▶";
    toggle.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
    toggle.setAttribute("aria-pressed", String(isPlaying));
    state.textContent = isPlaying ? "Now playing" : "Soundtrack paused";
  }

  toggle.addEventListener("click", async () => {
    if (!SITE_CONFIG.musicFile.trim()) {
      player.classList.add("expanded");
      state.textContent = "Add your music file in main.js";
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }

      updateMusicState();
    } catch (error) {
      state.textContent = "Unable to play audio";
    }
  });

  audio.addEventListener("play", updateMusicState);
  audio.addEventListener("pause", updateMusicState);
  audio.addEventListener("ended", updateMusicState);
  audio.addEventListener("error", () => {
    state.textContent = "Check your audio file";
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });

  // On touch devices, tap to expand the compact player.
  player.addEventListener("pointerdown", event => {
    if (event.pointerType !== "touch" || player.classList.contains("expanded")) {
      return;
    }

    event.preventDefault();
    player.classList.add("expanded");
  });

  document.addEventListener("pointerdown", event => {
    if (!player.contains(event.target)) {
      player.classList.remove("expanded");
    }
  });

  player.addEventListener("focusout", event => {
    if (!player.contains(event.relatedTarget)) {
      player.classList.remove("expanded");
    }
  });
}
