/*
  KENSHI // PERSONAL ARCHIVE
  Beginner notes:
  - Sound is off by default. Browsers require a click before audio can play.
  - Secret: click the KENSHI wordmark five times, with no more than about 2.5 seconds between clicks.
  - Easter egg: type Y, O, R, U in order anywhere on the page.
  - Without JavaScript, the page shows all content and skips the boot screen.
  - Update log entries and side quests use <details> elements, so they expand without JavaScript.
  - The now-playing panel is visual only. Its controls stay disabled until licensed audio is added.
*/

// Switch the page from "no-js" to "js". CSS only hides content behind the boot screen
// once this runs, so visitors without JavaScript still see everything.
document.documentElement.classList.replace("no-js", "js");

const bootScreen = document.getElementById("bootScreen");
const bootLog = document.getElementById("bootLog");
const bootProgress = document.getElementById("bootProgress");
const skipBoot = document.getElementById("skipBoot");
const siteShell = document.getElementById("siteShell");
const soundToggle = document.getElementById("soundToggle");
const soundState = document.getElementById("soundState");
const toast = document.getElementById("toast");
const yoruVisual = document.querySelector(".yoru-visual");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("year").textContent = new Date().getFullYear();

// Local clock in the top bar. It updates every 30 seconds, which is enough for minute-level time.
const localTime = document.getElementById("localTime");
function updateClock() {
  if (!localTime) return;
  const now = new Date();
  localTime.textContent = "LOCAL " + now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}
updateClock();
setInterval(updateClock, 30000);

let soundEnabled = false;
let audioContext = null;
let toastTimer;
let yoruTimer;
let bootFinished = false;
let bootInterval = null;

const bootMessages = [
  "CHECKING LOCAL ARCHIVE...",
  "LOADING PERSONAL PROJECTS...",
  "CALIBRATING INTERFACE...",
  "WELCOME, VISITOR."
];

// Keep the page hidden from keyboard and screen readers until the boot screen is gone.
siteShell.inert = true;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function finishBoot() {
  if (bootFinished) return;
  bootFinished = true;
  // If keyboard focus was on the skip button, move it into the page so it is not lost.
  const focusWasInBoot = bootScreen.contains(document.activeElement);
  bootProgress.style.width = "100%";
  bootLog.textContent = "WELCOME, VISITOR.";
  bootScreen.classList.add("done");
  siteShell.inert = false;
  siteShell.classList.add("ready");
  if (focusWasInBoot) siteShell.focus({ preventScroll: true });
}

function skipIntro() {
  clearInterval(bootInterval);
  finishBoot();
}

if (prefersReducedMotion) {
  // Visitors who prefer less motion skip the boot entirely. Hiding the screen before it
  // renders also means its GIF is never downloaded.
  bootScreen.hidden = true;
  finishBoot();
} else {
  skipBoot.focus({ preventScroll: true });
  let bootStep = 0;
  bootInterval = setInterval(() => {
    if (bootFinished) {
      clearInterval(bootInterval);
      return;
    }
    bootLog.textContent = bootMessages[Math.min(bootStep, bootMessages.length - 1)];
    bootProgress.style.width = `${Math.min((bootStep + 1) * 25, 100)}%`;
    bootStep++;
    if (bootStep >= bootMessages.length) {
      clearInterval(bootInterval);
      setTimeout(finishBoot, 450);
    }
  }, 420);
}

skipBoot.addEventListener("click", skipIntro);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") skipIntro();
});

function playTone(frequency = 620, duration = 0.045, type = "sine") {
  if (!soundEnabled) return;
  try {
    audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    // Audio is an enhancement, not a requirement for using the site.
  }
}

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundState.textContent = soundEnabled ? "ON" : "OFF";
  if (soundEnabled) {
    playTone(740, 0.09, "triangle");
    showToast("INTERFACE SOUND ENABLED");
  } else {
    showToast("INTERFACE SOUND MUTED");
  }
});


document.querySelectorAll("[data-sound]").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    playTone(620, 0.045, "sine");
  });

  element.addEventListener("focus", () => {
    playTone(620, 0.045, "sine");
  });

  element.addEventListener("click", () => {
    playTone(520, 0.04);
  });
});


// Secret interaction: click the wordmark five times, each within 2.5 seconds of the last.
let logoClicks = 0;
let logoClickTimer;
document.getElementById("wordmark").addEventListener("click", (event) => {
  // The first four clicks keep normal navigation (back to the top of the page).
  logoClicks++;
  clearTimeout(logoClickTimer);
  logoClickTimer = setTimeout(() => { logoClicks = 0; }, 2500);
  if (logoClicks >= 5) {
    event.preventDefault();
    document.body.classList.toggle("secret-mode");
    logoClicks = 0;
    const active = document.body.classList.contains("secret-mode");
    showToast(active ? "NIGHT SHIFT MODE // UNLOCKED" : "NIGHT SHIFT MODE // DISABLED");
    playTone(active ? 880 : 440, 0.12, "triangle");
  }
});

// Keyboard easter egg: type Y, O, R, U in order.
const secretSequence = ["y", "o", "r", "u"];
let keySequence = [];
function flashYoruCard() {
  if (!yoruVisual) return;
  // Remove and re-add the class so the animation restarts if the code is typed again.
  yoruVisual.classList.remove("yoru-flash");
  void yoruVisual.offsetWidth;
  yoruVisual.classList.add("yoru-flash");
  clearTimeout(yoruTimer);
  yoruTimer = setTimeout(() => yoruVisual.classList.remove("yoru-flash"), 1600);
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.altKey || event.metaKey || event.repeat) return;
  keySequence.push(event.key.toLowerCase());
  keySequence = keySequence.slice(-secretSequence.length);
  if (secretSequence.every((key, index) => keySequence[index] === key)) {
    showToast("YORU PROTOCOL RECOGNIZED // KEEP LEARNING");
    flashYoruCard();
    playTone(660, 0.1, "triangle");
    keySequence = [];
  }
});

// Highlight the menu destination as the visitor scrolls.
const sectionLinks = [...document.querySelectorAll(".menu-item")];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-25% 0px -55% 0px" });
  observedSections.forEach((section) => observer.observe(section));
}


/* NOW PLAYING — optional music player, independent of interface sounds. */
(() => {
  const audio = document.getElementById("portfolioAudio");
  const playButton = document.getElementById("npPlay");
  const volumeSlider = document.getElementById("npVolume");
  const progressBar = document.getElementById("npProgress");
  const statusText = document.getElementById("npStatus");
  const visualizer = document.getElementById("npBars");

  // Leave the rest of the website working if the player HTML is absent.
  if (!audio || !playButton || !volumeSlider ||
      !progressBar || !statusText) return;

  audio.volume = Number(volumeSlider.value);

  function updatePlayButton(playing) {
    playButton.textContent = playing ? "Ⅱ" : "▶";
    playButton.setAttribute(
      "aria-label",
      playing ? "Pause audio" : "Play audio"
    );
  }

  function stopVisualizer() {
    visualizer?.classList.remove("is-playing");
  }

  playButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        statusText.textContent =
          "Playback failed. Check the audio URL and file permissions.";
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    updatePlayButton(true);
    visualizer?.classList.add("is-playing");
    statusText.textContent = "Audio is playing.";
  });

  audio.addEventListener("pause", () => {
    updatePlayButton(false);
    stopVisualizer();

    if (!audio.ended) {
      statusText.textContent = "Audio is paused.";
    }
  });

  audio.addEventListener("ended", () => {
    updatePlayButton(false);
    stopVisualizer();
    progressBar.style.width = "0%";
    statusText.textContent = "Track finished.";
  });

  audio.addEventListener("timeupdate", () => {
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });

  audio.addEventListener("error", () => {
    updatePlayButton(false);
    stopVisualizer();
    statusText.textContent =
      "Audio unavailable. Check the source URL and format.";
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = Number(volumeSlider.value);
    audio.muted = audio.volume === 0;
  });
})();


/* NOW PLAYING — decorative equalizer toggle */
(() => {
  const visualizer = document.querySelector(".spotify-layout .np-bars");

  if (!visualizer) return;

  visualizer.setAttribute("role", "button");
  visualizer.setAttribute("tabindex", "0");
  visualizer.setAttribute("aria-label", "Toggle equalizer animation");
  visualizer.setAttribute("aria-pressed", "false");

  function toggleVisualizer() {
    const isPlaying = visualizer.classList.toggle("is-playing");
    visualizer.setAttribute("aria-pressed", String(isPlaying));
  }

  visualizer.addEventListener("click", toggleVisualizer);

  visualizer.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleVisualizer();
    }
  });
})();



/* SCROLL REVEALS — PERSONAL ARCHIVE */
(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const targets = document.querySelectorAll(
    ".section-block, .contact-panel, .project-card"
  );

  if (reducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  targets.forEach((target) => {
    target.classList.add("reveal-on-scroll");
    observer.observe(target);
  });
})();
