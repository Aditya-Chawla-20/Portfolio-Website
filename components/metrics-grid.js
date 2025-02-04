class MetricsGrid extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const metrics = JSON.parse(this.getAttribute('metrics') || '[]');

        this.innerHTML = `
            <div class="project-metrics">
                <h2>Project Impact</h2>
                <div class="metrics-grid">
                    ${metrics.map(metric => `
                        <div class="metric-card">
                            <span class="metric-value">${metric.value}</span>
                            <span class="metric-label">${metric.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('metrics-grid', MetricsGrid); 