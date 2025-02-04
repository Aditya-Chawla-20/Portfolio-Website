class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <a href="${this.getAttribute('home-url') || '../index.html'}" class="nav-brand">AC</a>
                <div class="nav-controls">
                    <button class="theme-toggle" aria-label="Toggle theme">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </nav>
        `;

        this.initializeThemeToggle();
    }

    initializeThemeToggle() {
        const themeToggle = this.querySelector('.theme-toggle');
        const icon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            
            // Save theme preference
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Apply saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }
}

customElements.define('app-navbar', Navbar); 