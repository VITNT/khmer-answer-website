document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle (mobile)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      // Drop the focus ring after a tap so the X has no lingering outline
      // (keyboard users still get focus-visible when tabbing to it).
      navToggle.blur();
    });
  }

  // Sidebar toggle (mobile on grade pages)
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  // Backdrop that closes the sidebar when tapping outside it (mobile/tablet)
  let sidebarOverlay = null;
  if (sidebar) {
    sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);
  }

  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('open');
  };
  const openSidebar = () => {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('open');
  };

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Subject cards and PDF viewer
  const subjectCards = document.querySelectorAll('.subject-card[data-pdf]');
  const pdfViewer = document.getElementById('pdfViewer');
  const emptyState = document.getElementById('emptyState');

  if (subjectCards.length && pdfViewer) {
    subjectCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active class from all cards
        subjectCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
        // Load PDF
        pdfViewer.src = card.dataset.pdf;
        pdfViewer.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';
        // Close sidebar on mobile
        if (sidebar && window.innerWidth <= 1024) {
          closeSidebar();
        }
      });
    });
  }

  // Navbar scroll effect
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animation on scroll for grade cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
});