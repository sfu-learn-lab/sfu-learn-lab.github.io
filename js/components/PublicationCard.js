class PublicationCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || '';
    const url = this.getAttribute('url');
    const authors = this.getAttribute('authors') || '';
    const year = this.getAttribute('year') || '';
    const venue = this.getAttribute('venue') || '';
    const image = this.getAttribute('image') || '/assets/img/gray.jpeg';
    const notes = this.getAttribute('notes') || '';

    const toAppear = notes === 'to appear'
      ? ' <span>[to appear]</span>'
      : '';

    const titleHTML = url
      ? `<a href="${url}" class="fw-medium link-dark link-opacity-100 link-opacity-75-hover" target="_blank" rel="noopener">${title}</a>`
      : `<p class="fw-medium mb-0">${title}</p>`;

    this.innerHTML = `
      <div class="col-md-6 col-lg-4 w-100">
        <div class="d-flex flex-row flex-shrink-0 align-items-top p-1 gap-3">
          <div class="flex-shrink-0 border border-1 rounded overflow-hidden" style="width: 64px; height: 64px;">
            <img src="${image}" alt="Publication thumbnail" class="w-100 h-100 object-fit-cover">
          </div>
          <div class="d-flex flex-column">
            ${titleHTML}
            <p class="text-secondary small mb-0">${authors}${year ? ` (${year})` : ''}</p>
            <p class="text-muted small fst-italic mb-0">${venue}${toAppear}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('publication-card', PublicationCard);