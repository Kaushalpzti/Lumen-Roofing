// Initialize Icons
        lucide.createIcons();

        document.addEventListener('DOMContentLoaded', () => {
            const footerYear = document.getElementById('footer-year');
            if (footerYear) footerYear.textContent = new Date().getFullYear();

            // Lead form -> backend API
            const leadForm = document.getElementById('lead-form');
            if (leadForm) {
                leadForm.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const button = leadForm.querySelector('button[type=submit]');
                    const originalText = button ? button.innerHTML : '';
                    const payload = Object.fromEntries(new FormData(leadForm).entries());
                    if (button) { button.disabled = true; button.innerHTML = 'Sending...'; }
                    try {
                        const response = await fetch('/api/inspection', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        const result = await response.json();
                        if (!response.ok) throw new Error(result.message || 'Unable to submit request.');
                        leadForm.reset();
                        alert(result.message || 'Thanks! Your inspection request has been received.');
                    } catch (error) {
                        alert(error.message || 'Something went wrong. Please call (469) 407-5005.');
                    } finally {
                        if (button) { button.disabled = false; button.innerHTML = originalText; lucide.createIcons(); }
                    }
                });
            }


            
            const logoHome = document.querySelector('[onclick=\"window.scrollTo(0,0)\"]');
            if (logoHome) {
                logoHome.removeAttribute('onclick');
                logoHome.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            }

            // Mobile Menu Toggle
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');
            const menuIcon = btn.querySelector('i');

            function toggleMenu() {
                menu.classList.toggle('hidden');
                if (menu.classList.contains('hidden')) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                } else {
                    menuIcon.setAttribute('data-lucide', 'x');
                }
                lucide.createIcons();
            }

            btn.addEventListener('click', toggleMenu);
            
            mobileLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });

            // Sticky Navbar & Blur Effect
            const navbar = document.getElementById('navbar');
            const navContainer = document.getElementById('nav-container');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    navbar.classList.add('glass-nav');
                    navContainer.classList.remove('h-20', 'md:h-24');
                    navContainer.classList.add('h-16', 'md:h-20');
                } else {
                    navbar.classList.remove('glass-nav');
                    navContainer.classList.add('h-20', 'md:h-24');
                    navContainer.classList.remove('h-16', 'md:h-20');
                }
            });

            // FAQ Accordion Logic
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const button = item.querySelector('.faq-button');
                const content = item.querySelector('.faq-content');
                const icon = item.querySelector('.icon');

                button.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');
                    
                    // Close all other items (optional: remove if you want multiple open)
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = null;
                        otherItem.querySelector('.icon').style.transform = 'rotate(0deg)';
                    });

                    if (!isOpen) {
                        item.classList.add('active');
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon.style.transform = 'rotate(45deg)';
                    }
                });
            });

            // Scroll Reveal Animations (Intersection Observer)
            const fadeUpElements = document.querySelectorAll('.fade-up');
            
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Only animate once
                    }
                });
            }, observerOptions);

            fadeUpElements.forEach(el => {
                observer.observe(el);
            });

            // Modal Logic
            const privacyBtn = document.getElementById('open-privacy');
            const tosBtn = document.getElementById('open-tos');
            const privacyModal = document.getElementById('privacy-modal');
            const tosModal = document.getElementById('tos-modal');
            const closeBtns = document.querySelectorAll('.close-modal');

            // Set current date in modals
            const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            if(document.getElementById('current-date')) document.getElementById('current-date').textContent = dateStr;
            if(document.getElementById('current-date-tos')) document.getElementById('current-date-tos').textContent = dateStr;

            function openModal(modal) {
                modal.classList.remove('pointer-events-none');
                // Small delay to allow display block to render before opacity transition
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    modal.querySelector('.modal-content').classList.remove('scale-95');
                    modal.querySelector('.modal-content').classList.add('scale-100');
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }

            function closeModal(modal) {
                modal.classList.add('opacity-0');
                modal.querySelector('.modal-content').classList.remove('scale-100');
                modal.querySelector('.modal-content').classList.add('scale-95');
                
                setTimeout(() => {
                    modal.classList.add('pointer-events-none');
                    document.body.style.overflow = '';
                }, 300);
            }

            if(privacyBtn) privacyBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(privacyModal); });
            if(tosBtn) tosBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(tosModal); });

            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    closeModal(privacyModal);
                    closeModal(tosModal);
                });
            });

            // Close modal on outside click
            [privacyModal, tosModal].forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal(modal);
                    }
                });
            });
        });
