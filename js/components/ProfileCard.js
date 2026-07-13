class ProfileCard extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || '';
    const role = this.getAttribute('role') || '';
    const photo = this.getAttribute('photo') ? `/assets/img/people/${this.getAttribute('photo')}` : '/assets/img/placeholder.png';
    const website = this.getAttribute('website');

    let websiteHTML = '';
    if (website) {
      const display = website
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '');
      websiteHTML = `<a href="${website}" class="small fw-medium link-dark link-opacity-100 link-opacity-75-hover" target="_blank" rel="noopener">${display}</a>`;
    }

    this.innerHTML = `
      <div class="d-flex flex-column align-items-center text-center gap-3">
        <img src="${photo}" alt="Photo of ${name}"
          class="rounded-circle border border-2 border-light-subtle object-fit-cover"
          style="width: 128px; height: 128px;">
        <div>
          <p class="fw-medium mb-0">${name}</p>
          <p class="text-secondary small mb-0">${role}</p>
          ${websiteHTML}
        </div>
      </div>
    `;
  }
}

customElements.define('profile-card', ProfileCard);