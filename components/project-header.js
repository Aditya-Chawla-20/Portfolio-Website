class ProjectHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title');
        const tags = JSON.parse(this.getAttribute('tags') || '[]');

        this.innerHTML = `
            <div class="back-to-projects">
                <a href="../index.html#projects">
                    <i class="fas fa-arrow-left"></i> Back to Projects
                </a>
            </div>

            <header class="project-header">
                <h1>${title}</h1>
                <div class="project-tags">
                    ${tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </header>
        `;
    }
}

customElements.define('project-header', ProjectHeader); 