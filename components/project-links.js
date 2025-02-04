class ProjectLinks extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const githubUrl = this.getAttribute('github-url');
        const demoUrl = this.getAttribute('demo-url');

        this.innerHTML = `
            <div class="project-links">
                ${githubUrl ? `
                    <a href="${githubUrl}" class="cta-button" target="_blank">
                        <i class="fab fa-github"></i> View Source Code
                    </a>
                ` : ''}
                ${demoUrl ? `
                    <a href="${demoUrl}" class="cta-button secondary" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                ` : ''}
            </div>
        `;
    }
}

customElements.define('project-links', ProjectLinks); 