class ProfileBio extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || '';
    const role = this.getAttribute('role') || '';
    const photo = this.getAttribute('photo') || '/assets/img/gray.jpeg';
    const website = this.getAttribute('website');
    const bio = this.getAttribute('bio') || 'No biography available.';

    let websiteHTML = '';
    if (website) {
      const display = website.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
      websiteHTML = `<a href="${website}" class="link-dark link-opacity-100 link-opacity-75-hover align-self-center align-self-md-start mt-1" target="_blank" rel="noopener">${display}</a>`;
    }

    this.innerHTML = `
      <div class="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
        <img src="${photo}" alt="Photo of ${name}"
          class="rounded-circle border border-2 border-light-subtle flex-shrink-0"
          style="width: 128px; height: 128px; object-fit: cover; object-position: center;">
        <div class="d-flex flex-column text-center text-md-start">
          <p class="fs-5 fw-semibold mb-0">${name}</p>
          <p class="text-secondary small mb-0">${role}</p>
          ${websiteHTML}
          <p class="mt-2">${bio}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('profile-bio', ProfileBio);