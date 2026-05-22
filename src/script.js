document.addEventListener('DOMContentLoaded', () => {
  // Set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu
  const menuBtn = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if(menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      menuBtn.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>` 
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
      });
    });
  }

  // Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  
  reveals.forEach(el => observer.observe(el));

  // Form Mock
  const form = document.getElementById('contactForm');
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Request Sent!';
      btn.style.backgroundColor = 'var(--text-inverse)';
      btn.style.color = 'var(--text-primary)';
      form.reset();
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = 'transparent';
        btn.style.color = 'var(--text-inverse)';
      }, 3000);
    });
  }

  // Scroll Tracker
  const scrollTracker = document.getElementById('scrollTracker');
  if (scrollTracker) {
    const updateTracker = () => {
      // Get scroll progress from 0 to 1
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      // Map it to percent
      scrollTracker.style.top = `${scrolled * 100}%`;
    };
    window.addEventListener('scroll', updateTracker, { passive: true });
    // Initial call in case page is refreshed halfway down
    updateTracker();
  }

  // Custom Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  if(cursorDot && cursorOutline && window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      let distX = mouseX - outlineX;
      let distY = mouseY - outlineY;
      outlineX = outlineX + (distX * 0.15);
      outlineY = outlineY + (distY * 0.15);
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactables = document.querySelectorAll('a, button, input, textarea, select');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovered');
      });
    });

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.nav-btn, .btn, .link-btn, .contact-methods a');
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // Substantive Parallax (Images)
  const parallaxImages = document.querySelectorAll('.tour-image img, .hero-img-frame img, .about-image img');
  window.addEventListener('scroll', () => {
    if(window.innerWidth <= 768) return;
    const scrollY = window.scrollY;
    parallaxImages.forEach(img => {
      const parent = img.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      // Check if visible
      if(parentRect.top < window.innerHeight && parentRect.bottom > 0) {
        // Move image slightly based on scroll position relative to the element
        const yPos = (parentRect.top - window.innerHeight / 2) * 0.1;
        img.style.transform = `scale(1.1) translateY(${yPos}px)`;
      }
    });
  }, { passive: true });
});
