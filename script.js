// Initialize AOS
AOS.init({
    duration: 1000,
    offset: 100,
    once: true
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project Details Modal Functionality
const detailsBtns = document.querySelectorAll('.details-btn');
const closeButtons = document.querySelectorAll('.close-modal');
const projectDetails = document.querySelectorAll('.project-details');

// Only set up modal functionality if elements exist
if (detailsBtns.length > 0 && projectDetails.length > 0) {
    // Open modal when clicking "View Details"
    detailsBtns.forEach((btn, index) => {
        if (projectDetails[index]) {
            btn.addEventListener('click', () => {
                projectDetails[index].classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        }
    });

    // Close modal when clicking the close button
    if (closeButtons.length > 0) {
        closeButtons.forEach((btn, index) => {
            if (projectDetails[index]) {
                btn.addEventListener('click', () => {
                    projectDetails[index].classList.remove('active');
                    document.body.style.overflow = 'auto'; // Restore scrolling
                });
            }
        });
    }

    // Close modal when clicking outside the content
    projectDetails.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        projectDetails.forEach(modal => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Function to set theme
    const setTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Initialize theme based on localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(prefersDark);
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark-mode');
        setTheme(isDark);

        // Update the background animation
        if (typeof updateScene === 'function') {
            updateScene();
        }
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Create form data for future use
        // const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }

        try {
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

            // Success message
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.style.backgroundColor = '#10B981';
            }
            contactForm.reset();

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }
            }, 3000);
        } catch (error) {
            // Error message
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send';
                submitBtn.style.backgroundColor = '#EF4444';

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        }
    });
}

// GSAP Animations
gsap.from('.hero-text h1', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.hero-text .title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.8
});

gsap.from('.hero-text .subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 1.1
});

gsap.from('.hero-cta', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 1.4
});

gsap.from('.profile-container', {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === entry.target.id) {
                    item.classList.add('active');
                }
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// Skill Bars Animation
const skillBars = document.querySelectorAll('.progress');

const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.parentElement.dataset.progress;
            observer.unobserve(entry.target);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Background Animation
const initBackground = () => {
    const canvas = document.getElementById('bg-animation');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    camera.position.z = 30;

    // Create particles for dark mode
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create material for dark mode
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    // Create mesh for dark mode
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

    // Create geometries for light mode
    const circles = [];
    const circleCount = 15;
    for(let i = 0; i < circleCount; i++) {
        const geometry = new THREE.RingGeometry(
            Math.random() * 3 + 1,
            Math.random() * 3 + 2,
            32
        );
        const material = new THREE.MeshBasicMaterial({
            color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const circle = new THREE.Mesh(geometry, material);
        circle.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        circle.rotation.x = Math.random() * Math.PI;
        circle.rotation.y = Math.random() * Math.PI;
        circles.push({
            mesh: circle,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: (Math.random() - 0.5) * 0.05
        });
    }

    // Function to update scene based on theme
    const updateScene = () => {
        while(scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }

        if(document.body.classList.contains('dark-mode')) {
            scene.add(particlesMesh);
        } else {
            circles.forEach(circle => scene.add(circle.mesh));
        }
    };

    // Initial scene setup
    updateScene();

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);

        if(document.body.classList.contains('dark-mode')) {
            particlesMesh.rotation.x += 0.0008;
            particlesMesh.rotation.y += 0.0008;
        } else {
            circles.forEach(circle => {
                circle.mesh.rotation.x += circle.rotationSpeed.x;
                circle.mesh.rotation.y += circle.rotationSpeed.y;
                circle.mesh.rotation.z += circle.rotationSpeed.z;
                circle.mesh.position.y += circle.floatSpeed;

                if(Math.abs(circle.mesh.position.y) > 25) {
                    circle.floatSpeed = -circle.floatSpeed;
                }
            });
        }

        renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);

    // Handle theme changes
    const updateColors = () => {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        particlesMaterial.color.setStyle(color);
        circles.forEach(circle => {
            circle.mesh.material.color.setStyle(color);
        });
        updateScene();
    };

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateColors();
            }
        });
    });

    observer.observe(document.body, { attributes: true });

    // Initial resize
    handleResize();
    // Start animation
    animate();
};

// Initialize background after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBackground();

    // Existing initialization code
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Scroll to top
    const scrollToTop = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Loading Screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loader"></div>';
document.body.appendChild(loadingScreen);

window.addEventListener('load', () => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
        loadingScreen.remove();
    }, 500);
});

// Custom Cursor with pointer-events: none
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.pointerEvents = 'none'; // Ensure cursor doesn't block clicks
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Reading Progress Bar
const createReadingProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progress);

    const progressBar = progress.querySelector('.reading-progress-bar');

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.scrollY / fullHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createReadingProgress();

// Progressive Image Loading
const progressiveImages = document.querySelectorAll('.project-image img');
progressiveImages.forEach(img => {
    // Store current src as backup if needed
    // const lowQualitySrc = img.src;
    const highQualitySrc = img.dataset.src;

    if (highQualitySrc) {
        const highQualityImg = new Image();
        highQualityImg.src = highQualitySrc;
        highQualityImg.onload = () => {
            img.src = highQualitySrc;
            img.classList.add('loaded');
        };
    }
});

// Project Search and Filter
const projectSearch = document.createElement('input');
projectSearch.type = 'text';
projectSearch.placeholder = 'Search projects...';
projectSearch.className = 'project-search';
document.querySelector('.project-filters').prepend(projectSearch);

projectSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        const title = project.querySelector('h3').textContent.toLowerCase();
        const description = project.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(project.querySelectorAll('.tech-stack span'))
            .map(tag => tag.textContent.toLowerCase());

        const matches = title.includes(searchTerm) ||
                       description.includes(searchTerm) ||
                       tags.some(tag => tag.includes(searchTerm));

        project.style.display = matches ? 'block' : 'none';
    });
});

// Typing Animation for Hero Section
const createTypingAnimation = () => {
    const subtitle = document.querySelector('.hero-text .subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';

    let i = 0;
    const type = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    };

    type();
};

// Initialize typing animation after page load
window.addEventListener('load', createTypingAnimation);

// High Contrast Mode Toggle
const createHighContrastToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'high-contrast-toggle';
    toggle.innerHTML = '<i class="fas fa-adjust"></i>';
    toggle.setAttribute('aria-label', 'Toggle high contrast mode');
    document.querySelector('.nav-controls').appendChild(toggle);

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    });

    // Apply saved preference
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
};

createHighContrastToggle();

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add ARIA labels and roles
const addAccessibility = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.setAttribute('role', 'menuitem');
        link.setAttribute('aria-label', link.textContent + ' section');
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.setAttribute('role', 'article');
        const title = card.querySelector('h3').textContent;
        card.setAttribute('aria-label', 'Project: ' + title);
    });
};

addAccessibility();

// Analytics Tracking (using a simple implementation)
const trackEvent = (category, action, label) => {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked - Category: ${category}, Action: ${action}, Label: ${label}`);
};

// Track page views and interactions
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', () => {
        const label = element.textContent || element.getAttribute('aria-label');
        trackEvent('Interaction', 'click', label);
    });
});

// Project Card Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // View Code button
        const viewCodeBtn = card.querySelector('a[href*="github.com"]');
        if (viewCodeBtn) {
            viewCodeBtn.addEventListener('click', (e) => {
                const githubUrl = viewCodeBtn.getAttribute('href');
                if (githubUrl === '#' || !githubUrl.includes('github.com')) {
                    e.preventDefault();
                    alert('GitHub repository will be available soon!');
                }
            });
        }

        // Live Demo button
        const liveDemoBtn = card.querySelector('a[href*="external-link"]').parentElement;
        if (liveDemoBtn) {
            liveDemoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = card.querySelector('h3').textContent;
                alert(`Live demo for ${projectTitle} will be available soon!`);
            });
        }

        // View Details button
        const viewDetailsBtn = card.querySelector('a[href*="projects/"]');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectTitle = card.querySelector('h3').textContent;
                const projectDesc = card.querySelector('p').textContent;
                const techStack = Array.from(card.querySelectorAll('.tech-stack span'))
                    .map(span => span.textContent)
                    .join(', ');

                showProjectDetails(projectTitle, projectDesc, techStack);
            });
        }
    });
});

// Project Details Modal
function showProjectDetails(title, description, techStack) {
    let modal = document.querySelector('.project-details');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'project-details';
        modal.innerHTML = `
            <div class="details-content">
                <button class="close-modal">&times;</button>
                <div class="project-image">
                    <img src="" alt="Project Preview" class="project-preview">
                </div>
                <h3></h3>
                <p class="project-description"></p>
                <div class="tech-section">
                    <h4>Technologies Used</h4>
                    <p class="tech-stack-list"></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close button functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Get the project image
    const projectCard = document.querySelector(`.project-card h3[textContent="${title}"]`).closest('.project-card');
    const projectImage = projectCard.querySelector('.project-image img').src;

    // Update modal content
    modal.querySelector('.project-preview').src = projectImage;
    modal.querySelector('h3').textContent = title;
    modal.querySelector('.project-description').textContent = description;
    modal.querySelector('.tech-stack-list').textContent = techStack;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Footer Links Functionality
document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('.footer-links a');

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Social Links Functionality
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-links a');

    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || !href.startsWith('http')) {
                e.preventDefault();
                alert('Social media profile link will be available soon!');
            }
        });
    });
});

// Download Resume Button
document.addEventListener('DOMContentLoaded', () => {
    const resumeBtn = document.querySelector('a[href*="resume"][download]');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            if (!resumeBtn.getAttribute('href').includes('.pdf')) {
                e.preventDefault();
                alert('Resume will be available for download soon!');
            }
        });
    }
});

// Contact Form Submit with Feedback
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success feedback
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#10B981';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);

            } catch (error) {
                // Error feedback
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send';
                submitBtn.style.backgroundColor = '#EF4444';

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
});