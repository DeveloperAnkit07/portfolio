/* ===============================
   INTRO ANIMATION CONTROL
================================ */
window.addEventListener("load", () => {
  // Body scroll lock remove after intro
  setTimeout(() => {
    document.body.classList.remove("intro-active");

    const intro = document.querySelector(".intro-overlay");
    if (intro) {
      intro.remove();
    }
  }, 3600);
});


/* ===============================
   TYPING TEXT (Typed.js)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const typingEl = document.querySelector(".typing");

  if (typingEl) {
    new Typed(".typing", {
      strings: ["Frontend Developer", "Learner", "Coder"],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1200,
      loop: true,
    });
  }
});


/* ===============================
   SKILLS FADE-IN ON SCROLL
================================ */
const skills = document.querySelectorAll(".skill");

if (skills.length > 0) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  skills.forEach((skill) => skillObserver.observe(skill));
}


/* ===============================
   CONTACT FORM (DEMO HANDLER)
================================ */
const contactForm = document.querySelector(".contact form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Message sent successfully 🚀");

    contactForm.reset();
  });
}
