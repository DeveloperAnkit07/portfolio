// // Typing animation
// const typed = new Typed(".typing", {
//   strings: ["Frontend Developer", "Learner", "Coder"],
//   typeSpeed: 80,
//   backSpeed: 40,
//   loop: true,
// });


// // Simple contact form
// const form = document.getElementById("contact-form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   document.getElementById("form-msg").textContent = "Message sent successfully!";
//   form.reset();
// });

// Typing animation
const typed = new Typed(".typing", {
  strings: ["Frontend Developer", "Learner", "Coder"],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true,
});

// Simple contact form
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("form-msg").textContent = "Message sent successfully!";
    form.reset();
  });
}

// Skills section animation
const skills = document.querySelectorAll(".skill");
if (skills.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  skills.forEach((skill) => observer.observe(skill));
}
  <!-- INTRO JS -->
  <script>
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      const intro = document.querySelector('.intro-overlay');
      if (intro) intro.remove();
    }, 3600);
  </script>

