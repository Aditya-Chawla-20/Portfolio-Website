class ProjectGallery extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const mainImage = this.getAttribute('main-image');
        
        this.innerHTML = `
            <div class="project-image-gallery">
                <img src="${mainImage}" alt="Project Screenshot" class="main-image">
            </div>
        `;
    }

    static get observedAttributes() {
        return ['main-image'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.isConnected && oldValue !== newValue) {
            this.connectedCallback();
        }
    }
}

customElements.define('project-gallery', ProjectGallery); 