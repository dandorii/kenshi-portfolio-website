
/* =========================================
   SOCIAL LINK ARCHIVE // THE STAR ARCANA
   ========================================= */

(() => {
  "use strict";

  const nextButton = document.getElementById("social-link-next");
  const previousButton = document.getElementById("social-link-previous");
  const rankLabel = document.getElementById("social-link-rank");
  const title = document.getElementById("social-link-title");
  const reflection = document.getElementById("social-link-reflection");
  const progressFill = document.getElementById("social-link-progress-fill");
  const progressLabel = document.getElementById("social-link-progress-label");
  const jumpSelector = document.getElementById("social-link-jump");

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
      text: "Some people catch your attention without trying to.\n\nI don't know what this connection will become, and I don't need to decide that now. I'd rather take the time to understand people, appreciate the moments we share, and let things develop naturally.\n\nFor now, this is simply a reminder to be genuine, patient, and present."
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
  let transitionTimer = null;
  let transitionVersion = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function renderReflection(index) {
    const entry = reflections[index];

    if (!entry) return;

    const rank = index + 1;
    const isFirst = index === 0;
    const isLast = index === reflections.length - 1;

    rankLabel.textContent =
      `SOCIAL LINK // RANK ${String(rank).padStart(2, "0")}`;

    title.textContent = entry.title;
    reflection.textContent = entry.text;
    reflection.style.whiteSpace = "pre-line";

    progressFill.style.width =
      `${(rank / reflections.length) * 100}%`;

    progressLabel.textContent =
      `REFLECTION ${String(rank).padStart(2, "0")} / ${reflections.length}`;

    previousButton.disabled = isFirst;
    nextButton.disabled = isLast;

    nextButton.innerHTML = isLast
      ? 'ARCHIVE COMPLETE <span aria-hidden="true">✓</span>'
      : 'REVEAL NEXT REFLECTION <span aria-hidden="true">→</span>';

    jumpSelector.value = String(index);
  }

  function changeReflection(index) {
    if (index < 0 || index >= reflections.length) return;

    currentIndex = index;
    const version = ++transitionVersion;

    clearTimeout(transitionTimer);

    title.classList.remove("reflection-changing");
    reflection.classList.remove("reflection-changing");

    if (reducedMotion.matches) {
      renderReflection(currentIndex);
      return;
    }

    rankLabel.classList.remove("rank-up");
    void rankLabel.offsetWidth;
    rankLabel.classList.add("rank-up");

    title.classList.add("reflection-changing");
    reflection.classList.add("reflection-changing");

    
    transitionTimer = setTimeout(() => {
    if (version !== transitionVersion) return;

    renderReflection(currentIndex);

    title.classList.remove("reflection-changing");
    reflection.classList.remove("reflection-changing");
    }, 160);

  }

  nextButton.addEventListener("click", () => {
    if (currentIndex < reflections.length - 1) {
      changeReflection(currentIndex + 1);
    }
  });

  previousButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      changeReflection(currentIndex - 1);
    }
  });

  jumpSelector.addEventListener("change", () => {
    const index = Number(jumpSelector.value);

    if (Number.isInteger(index)) {
      changeReflection(index);
    }
  });

  renderReflection(currentIndex);
})();
