// Typing animation
const typed = new Typed(".typing", {
  strings: ["Frontend Developer", "Learner", "Coder"],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true,
});

// Contact form handling with Formspree
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formMsg = document.getElementById("form-msg");
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formMsg.textContent = "";
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        formMsg.textContent = "✅ Message sent successfully!";
        formMsg.style.color = "#38bdf8";
        form.reset();
      } else {
        formMsg.textContent = "❌ Oops! There was a problem. Please try again.";
        formMsg.style.color = "#f87171";
      }
    } catch (error) {
      formMsg.textContent = "❌ Network error. Please check your connection.";
      formMsg.style.color = "#f87171";
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = "Send";
    }
  });
}

// Skills section animation with Intersection Observer
const skills = document.querySelectorAll(".skill");
if (skills.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delay
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100);
        }
      });
    },
    { threshold: 0.2 }
  );

  skills.forEach((skill) => observer.observe(skill));
}

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.nav-wrap').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});
