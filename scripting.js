document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.nav_bar');
    const navLinks = document.querySelector('.nav_link');
    const subjects = document.querySelector('.subjects');
    const buttons = document.querySelectorAll('.buttonBox');
    const iframe = document.getElementById("pdfViewer");

    if (navBar && navLinks) {
        navBar.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    if (subjects) {
        subjects.addEventListener('click', (e) => {
            if (!e.target.closest('.buttonBox')) {
                subjects.classList.toggle('open');
            }
        });
    }
    
    if (buttons && iframe) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                iframe.src = button.dataset.pdf;
                if (subjects) subjects.classList.remove('open');
            });
        });
    }
});