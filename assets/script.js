document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered animations for sections
    const animatedSections = document.querySelectorAll('.animated-section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible to trigger animation
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Highlight active navigation link on scroll
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
    const header = document.querySelector('header'); // Get header for offset calculation

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            // Adjust sectionTop to account for sticky header height
            const sectionTop = section.offsetTop - header.clientHeight - 10; // -10px for buffer
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('nav ul li a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) { // Only handle internal links
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Calculate offset for sticky header
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Hamburger Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navList.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when a link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            navList.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- Typewriter Effect for Hero Heading ---
    const typewriterTextElement = document.getElementById('typewriter-text');
    const cursorElement = document.querySelector('.blinking-cursor'); // Get the cursor element
    const textToType = "Hi, I'm Masresha";
    let charIndex = 0;
    const typingSpeed = 200; // Adjust as desired

    function typeWriter() {
        if (charIndex < textToType.length) {
            typewriterTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Once typing is finished, add a class to hide the cursor
            if (cursorElement) {
                cursorElement.classList.add('hide-cursor'); // Add this line
            }
        }
    }

    // Start the typewriter effect when the page loads
    typeWriter();
});