// ── Existing hamburger code remains here ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    hamburger.classList.toggle('active');
    
    if (hamburger.classList.contains('active')) {
      hamburger.innerHTML = `
        <span style="transform: rotate(45deg) translate(6px, 6px)"></span>
        <span style="opacity: 0"></span>
        <span style="transform: rotate(-45deg) translate(7px, -7px)"></span>
      `;
    } else {
      hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;
    }
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;
      hamburger.classList.remove('active');
    });
  });
}

// ── Contact Form (client-side simulation) ──
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would normally send data to backend
    // For demo we just show success message
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name && email && message) {
      formMessage.textContent = "Thank you! Your message has been sent. We'll get back to you soon.";
      formMessage.className = 'form-status success';
      
      // Reset form
      contactForm.reset();
      
      // In real project → send via fetch() to your backend or Formspree/Netlify/etc
      // Example:
      /*
      fetch('https://formspree.io/f/your-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      }).then(() => { ... })
      */
    } else {
      formMessage.textContent = "Please fill in all fields.";
      formMessage.className = 'form-status error';
    }
    
    // Clear message after 6 seconds
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-status';
    }, 6000);
  });
}