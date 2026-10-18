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

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

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
if (siteShell) {
  siteShell.inert = true;
}

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

if (bootScreen && siteShell && bootLog && bootProgress && skipBoot) {
  if (prefersReducedMotion) {
    // Visitors who prefer less motion skip the boot entirely.
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

      bootLog.textContent =
        bootMessages[Math.min(bootStep, bootMessages.length - 1)];

      bootProgress.style.width =
        `${Math.min((bootStep + 1) * 25, 100)}%`;

      bootStep++;

      if (bootStep >= bootMessages.length) {
        clearInterval(bootInterval);
        setTimeout(finishBoot, 450);
      }
    }, 420);
  }
}

if (skipBoot) {
  skipBoot.addEventListener("click", skipIntro);
}

if (bootScreen) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") skipIntro();
  });
}

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

if (soundToggle && soundState) {
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
}

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


// Secret interaction: click the wordmark five times, each within 2.5 seconds.
let logoClicks = 0;
let logoClickTimer;

const wordmark = document.getElementById("wordmark");

if (wordmark) {
  wordmark.addEventListener("click", (event) => {
    // The first four clicks keep normal navigation.
    logoClicks++;
    clearTimeout(logoClickTimer);

    logoClickTimer = setTimeout(() => {
      logoClicks = 0;
    }, 2500);

    if (logoClicks >= 5) {
      event.preventDefault();
      document.body.classList.toggle("secret-mode");
      logoClicks = 0;

      const active = document.body.classList.contains("secret-mode");

      showToast(
        active
          ? "NIGHT SHIFT MODE // UNLOCKED"
          : "NIGHT SHIFT MODE // DISABLED"
      );

      playTone(active ? 880 : 440, 0.12, "triangle");
    }
  });
}

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




/* =========================================
   SECRET ARCHIVE // HIDDEN MENU
   ========================================= */

(() => {
  const trigger = document.getElementById("secret-trigger");
  const socialSection = document.getElementById("social-link-main");
  const secretPage = document.getElementById("secret-page");
  const returnButton = document.getElementById("secret-return");

  if (!trigger || !socialSection || !secretPage || !returnButton) {
    return;
  }

  let clicks = 0;
  let resetTimer;
  let unlocked = false;

  function showSection(section) {
    section.hidden = false;
    section.setAttribute("tabindex", "-1");
    section.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "auto" : "smooth",
      block: "start"
    });
    section.focus({ preventScroll: true });
  }

  trigger.addEventListener("click", () => {
    if (unlocked) {
      socialSection.hidden = true;
      showSection(secretPage);

      if (typeof showToast === "function") {
        showToast("UNLISTED MEMORY // OPENED");
      }
      if (typeof playTone === "function") {
        playTone(740, 0.1, "triangle");
      }
      return;
    }

    clicks++;
    clearTimeout(resetTimer);

    resetTimer = setTimeout(() => {
      clicks = 0;
    }, 2500);

    if (clicks >= 5) {
      clicks = 0;
      clearTimeout(resetTimer);
      unlocked = true;

      trigger.innerHTML =
        'UNLISTED MEMORY <span aria-hidden="true">↗</span>';
      trigger.classList.remove("secret-trigger");
      trigger.classList.add("social-link-button");
      trigger.setAttribute("aria-label", "Open unlisted memory");
      trigger.setAttribute("title", "Open unlisted memory");

      if (typeof showToast === "function") {
        showToast("UNLISTED RECORD DETECTED");
      }
      if (typeof playTone === "function") {
        playTone(880, 0.12, "triangle");
      }
    }
  });

  returnButton.addEventListener("click", () => {
    secretPage.hidden = true;
    showSection(socialSection);

    if (typeof showToast === "function") {
      showToast("RETURNING TO PERSONAL ARCHIVE");
    }
    if (typeof playTone === "function") {
      playTone(520, 0.08, "sine");
    }
  });
})();




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



/* =========================================
   SOCIAL LINK ARCHIVE // THE STAR ARCANA
   ========================================= */

(() => {
  const nextButton = document.getElementById("social-link-next");
  const previousButton = document.getElementById("social-link-previous");
  const rankLabel = document.getElementById("social-link-rank");
  const title = document.getElementById("social-link-title");
  const reflection = document.getElementById("social-link-reflection");
  const progressFill = document.getElementById("social-link-progress-fill");
  const progressLabel = document.getElementById("social-link-progress-label");
  const jumpSelector = document.getElementById("social-link-jump");

  // Stop safely if the Social Link section isn't on this page.
  if (
    !nextButton ||
    !previousButton ||
    !rankLabel ||
    !title ||
    !reflection ||
    !progressFill ||
    !progressLabel ||
    !jumpSelector
  ) {
    return;
  }

  const reflections = [
    {
      title: "A Connection Without a Deadline.",
      text: "Some people catch your attention without trying to.\n\nI don't know what a connection will become, and I don't need to decide that now. I'd rather take the time to understand people, appreciate the moments we share, and let things develop naturally.\n\nFor now, this is simply a reminder to be genuine, patient, and present."
    },
    {
      title: "The Value of Patience.",
      text: "Not everything meaningful has to happen quickly.\n\nI've been learning that patience isn't about waiting around for a particular outcome. It's about giving people room to be themselves while continuing to live my own life.\n\nI can care about a possibility without trying to control it."
    },
    {
      title: "Small Moments Matter.",
      text: "Sometimes, a person leaves an impression in the simplest ways.\n\nA passing conversation, a familiar presence, or a moment that seems ordinary can stay with me longer than I expect. I may not always understand why, and perhaps I don't need to.\n\nFor now, I'll appreciate these little moments for what they are, without asking them to become something more. Some memories are meaningful even while their stories remain unwritten."
    },
    {
      title: "Be Curious, Not Certain.",
      text: "It's easy to build a story in my head when I don't have all the answers.\n\nBut assumptions aren't the same as understanding. I'd rather stay curious, listen carefully, and let people show me who they are over time.\n\nI don't need to solve every uncertainty today."
    },
    {
      title: "Keep My Own Rhythm.",
      text: "A connection should leave room for the rest of life, too.\n\nI still have projects to build, skills to learn, friends to spend time with, and goals worth pursuing.\n\nI can make space for people without losing sight of the person I'm becoming."
    },
    {
      title: "Honesty Without Pressure.",
      text: "I want to be genuine about what I feel while respecting what other people may feel—or may not feel.\n\nHonesty doesn't require demanding an answer, and kindness shouldn't come with hidden expectations.\n\nI can express myself respectfully and accept that everyone gets to choose their own pace."
    },
    {
      title: "Let People Be Themselves.",
      text: "It's easy to focus on the version of someone I imagine.\n\nBut real connection means getting to know the actual person, including their boundaries, priorities, and differences from me.\n\nUnderstanding someone matters more than fitting them into a story."
    },
    {
      title: "Make Peace With Uncertainty.",
      text: "I won't always know where things are heading.\n\nThat doesn't mean I need to rush toward a conclusion or treat every unanswered question as a problem.\n\nI can appreciate what is real in the present while accepting that the future is still unwritten."
    },
    {
      title: "Choose Mutual Effort.",
      text: "Healthy connections leave room for both people to participate willingly.\n\nI want to notice mutual effort, communicate clearly, and respect the times when someone is busy or needs space.\n\nI don't have to carry a connection alone to prove that it matters."
    },
    {
      title: "Hope, With Both Feet on the Ground.",
      text: "Hope can be meaningful without becoming a promise about the future.\n\nI can stay open to good things while keeping my expectations realistic, respecting other people's choices, and continuing to grow in my own direction.\n\nWhatever happens next, I want to look back knowing that I acted with sincerity, patience, and respect."
    }
  ];

  let currentIndex = 0;

  rankLabel.addEventListener("animationend", () => {
  rankLabel.classList.remove("rank-up");
  });

  
function renderReflection(index) {
  if (index < 0 || index >= reflections.length) {
    return;
  }

  const entry = reflections[index];
  const rank = index + 1;
  const progress = (rank / reflections.length) * 100;

  rankLabel.textContent =
    `SOCIAL LINK // RANK ${String(rank).padStart(2, "0")}`;

  title.textContent = entry.title;
  reflection.textContent = entry.text;
  reflection.style.whiteSpace = "pre-line";
  reflection.style.display = "block";

  progressFill.style.width = `${progress}%`;

  progressLabel.textContent =
    `REFLECTION ${String(rank).padStart(2, "0")} / ${reflections.length}`;

  const isFirstReflection = index === 0;
  const isLastReflection = index === reflections.length - 1;

  previousButton.disabled = isFirstReflection;
  nextButton.disabled = isLastReflection;

  nextButton.innerHTML = isLastReflection
    ? 'ARCHIVE COMPLETE <span aria-hidden="true">✓</span>'
    : 'REVEAL NEXT REFLECTION <span aria-hidden="true">→</span>';

  jumpSelector.value = String(index);

  if (isLastReflection && typeof showToast === "function") {
    showToast("STAR ARCANA // ARCHIVE COMPLETE");
  }
}
  
  
  // Subtle transition when changing reflections.
  let reflectionTransitionTimer;

  function animateReflectionChange(index) {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    clearTimeout(reflectionTransitionTimer);

    if (reducedMotion) {
      title.classList.remove("reflection-changing");
      reflection.classList.remove("reflection-changing");
      renderReflection(index);
      return;
    }

    rankLabel.classList.remove("rank-up");
    void rankLabel.offsetWidth;
    rankLabel.classList.add("rank-up");

    title.classList.remove("reflection-changing");
    reflection.classList.remove("reflection-changing");

    // Allow the visible state to register before fading out.
    void title.offsetWidth;

    title.classList.add("reflection-changing");
    reflection.classList.add("reflection-changing");

    reflectionTransitionTimer = setTimeout(() => {
      renderReflection(index);

      requestAnimationFrame(() => {
        title.classList.remove("reflection-changing");
        reflection.classList.remove("reflection-changing");
      });
    }, 160);
  }





  // Move forward through the archive.
  nextButton.addEventListener("click", () => {
    if (currentIndex >= reflections.length - 1) return;

    currentIndex++;
    animateReflectionChange(currentIndex);
  });

  // Move backward through the archive.
  previousButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;

    currentIndex--;
    animateReflectionChange(currentIndex);
  });


  // Jump directly to a selected reflection.
  jumpSelector.addEventListener("change", () => {
    const selectedIndex = Number(jumpSelector.value);

    if (
      Number.isInteger(selectedIndex) &&
      selectedIndex >= 0 &&
      selectedIndex < reflections.length
    ) {
      currentIndex = selectedIndex;
      animateReflectionChange(currentIndex);
    }
  });

  
  // Keyboard navigation for the Social Link Archive.
  document.addEventListener("keydown", (event) => {
    // Don't intercept keys while the visitor is typing or using a control.
    const target = event.target;
    const isInteractiveElement = target instanceof Element &&
      target.closest(
        "input, textarea, select, button, a, [contenteditable='true']"
      );

    if (isInteractiveElement) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    switch (event.key) {
      case "ArrowLeft":
        if (currentIndex > 0) {
          currentIndex--;
          animateReflectionChange(currentIndex);
          event.preventDefault();
        }
        break;

      case "ArrowRight":
        if (currentIndex < reflections.length - 1) {
          currentIndex++;
          animateReflectionChange(currentIndex);
          event.preventDefault();
        }
        break;

      case "Home":
        currentIndex = 0;
        animateReflectionChange(currentIndex);
        event.preventDefault();
        break;

      case "End":
        currentIndex = reflections.length - 1;
        animateReflectionChange(currentIndex);
        event.preventDefault();
        break;
    }
  });


  // Initialize reflection 01 and its button states.
  renderReflection(currentIndex);
})();


