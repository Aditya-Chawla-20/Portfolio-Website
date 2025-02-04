class TechDetails extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const sections = JSON.parse(this.getAttribute('sections') || '[]');

        this.innerHTML = `
            <div class="technical-details">
                <h2>Technical Implementation</h2>
                ${sections.map(section => `
                    <div class="tech-section">
                        <h3>${section.title}</h3>
                        <ul>
                            ${section.items.map(item => `
                                <li>${item}</li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

customElements.define('tech-details', TechDetails); 