document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle (mobile)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // Sidebar toggle (mobile on grade pages)
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
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
          sidebar.classList.remove('open');
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