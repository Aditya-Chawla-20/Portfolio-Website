class ProjectDescription extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const overview = this.getAttribute('overview');
        const details = this.getAttribute('details');
        const customClass = this.getAttribute('class') || '';

        this.innerHTML = `
            <div class="project-description ${customClass}">
                <h2>Project Overview</h2>
                <p>${overview}</p>
                ${details ? `<p>${details}</p>` : ''}
                ${this.innerHTML} <!-- Keep any additional content -->}
            </div>
        `;
    }

    static get observedAttributes() {
        return ['overview', 'details', 'class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.isConnected && oldValue !== newValue) {
            this.connectedCallback();
        }
    }
}

customElements.define('project-description', ProjectDescription); 