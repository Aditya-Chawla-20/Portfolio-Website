class FeatureGrid extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const features = JSON.parse(this.getAttribute('features') || '[]');

        this.innerHTML = `
            <div class="project-features">
                <h2>Key Features</h2>
                <div class="features-grid">
                    ${features.map(feature => `
                        <div class="feature-card">
                            <i class="fas ${feature.icon}"></i>
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('feature-grid', FeatureGrid); 