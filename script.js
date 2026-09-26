document.addEventListener('DOMContentLoaded', () => {

    // 1. Footer Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Responsive Navigation Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('fa-xmark');
        });

        // Close navigation menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-xmark');
            });
        });
    }

    // 3. Highlight Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Project Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Interactive Project Details Modal
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const openModalBtns = document.querySelectorAll('.open-modal');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            
            document.getElementById('modal-title').textContent = card.getAttribute('data-title');
            document.getElementById('modal-desc').textContent = card.getAttribute('data-desc');
            document.getElementById('modal-demo').href = card.getAttribute('data-demo');
            document.getElementById('modal-code').href = card.getAttribute('data-code');

            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';
            const tags = card.getAttribute('data-tags').split(',');
            tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag.trim();
                tagsContainer.appendChild(span);
            });

            modal.style.display = 'flex';
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 6. Contact Form Submission Feedback
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Display success notification
            toast.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        });
    }
});