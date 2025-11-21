document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const html = document.documentElement;

  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const heroImg = document.querySelector('.hero-img');

  const updateHeroImage = (isDark) => {
    if (heroImg) {
      // Add a small opacity transition to smooth the swap
      heroImg.style.opacity = '0.5';
      setTimeout(() => {
        heroImg.src = isDark ? '/hero-image-dark.png' : '/hero-image.png';
        heroImg.style.opacity = '1';
      }, 200);
    }
  };

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.classList.add('dark');
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
    updateHeroImage(true);
  } else {
    html.classList.remove('dark');
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
    updateHeroImage(false);
  }

  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateHeroImage(isDark);
    
    // Toggle Icons
    if (isDark) {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    } else {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    }
  });


  // --- Original Scripts ---
  
  // 1. Smooth Scroll
  document.querySelectorAll('.nav-link, .btn-scroll').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById(href.substring(1));
        if (target) {
          document.querySelector('.nav-links').classList.remove('mobile-active');
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
      }
    });
  });

  // 2. Fade-in Animation
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));

  // 3. Active Link Highlight
  window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
      if (pageYOffset >= (section.offsetTop - 150)) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
  });

  // 4. Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('mobile-active');
    });
  }

  // 5. Mock Form Submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        alert('Message sent! (Demo only)');
        form.reset();
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#10b981';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.backgroundColor = '';
        }, 3000);
      }, 1000);
    });
  }
});
