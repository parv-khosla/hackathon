const sideButtons = document.querySelectorAll(".feature-sidebar button");
const screenSections = document.querySelectorAll(".screen-section");

sideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.target)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      sideButtons.forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.target === entry.target.id
        );
      });
    });
  },
  { rootMargin: "-110px 0px -55% 0px", threshold: 0.1 }
);

screenSections.forEach((section) => observer.observe(section));

document.querySelectorAll(".place-info button").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.textContent.trim() === "♥";
    button.textContent = saved ? "♡" : "♥";
    button.setAttribute("aria-pressed", String(!saved));
  });
});

const planButton = document.querySelector("#plan-button");
const plannerResult = document.querySelector("#planner-result");

planButton?.addEventListener("click", () => {
  const activity = document.querySelector("#activity-select").value.toLowerCase();
  const time = document.querySelector("#time-input").value;
  const displayTime = time
    ? new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "10:30 AM";

  plannerResult.textContent = `${displayTime} looks ideal for ${activity === "easy walk" ? "an" : "a"} ${activity}.`;
});
