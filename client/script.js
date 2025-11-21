document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth Scroll for Navigation
  const navLinks = document.querySelectorAll('.nav-link, .btn-scroll');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Check if it's an anchor link
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Close mobile menu if open
          const navLinksContainer = document.querySelector('.nav-links');
          if (navLinksContainer.classList.contains('mobile-active')) {
            navLinksContainer.classList.remove('mobile-active');
          }

          // Scroll to section
          window.scrollTo({
            top: targetSection.offsetTop - 80, // Offset for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 2. Fade-in Animation on Scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
  });

  // 3. Active Navigation Highlighting
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  });

  // 4. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-active');
    });
  }

  // 5. Form Handling (Mock)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate network request
      setTimeout(() => {
        alert('Thanks for your message! This is a demo form, but I would love to hear from you via email.');
        contactForm.reset();
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#10b981'; // Success green
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }
});
