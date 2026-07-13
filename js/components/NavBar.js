class NavBar extends HTMLElement {
  connectedCallback() {
    const currentPage = this.getAttribute('page') || 'home';

    const links = [
      { page: 'home', label: 'Home' },
      { page: 'people', label: 'People' },
      { page: 'publications', label: 'Publications' },
      { page: 'teaching', label: 'Teaching' },
    ];

    const getHref = (page) => page ? `/${page}/` : '/';

    this.innerHTML = `
      <nav id="navbar" class="navbar navbar-expand-sm fixed-top bg-blur">
        <div class="container-sm d-flex flex-row justify-content-between">
          <a href="/" id="title" class="navbar-brand px-2 d-flex flex-row align-items-center gap-2 ms-md-2">
            <img src="/assets/img/learn-lab-logo.png" alt="LEARN Lab logo" class="learnlab-logo my-1 w-auto">
          </a>
          <button id="navbar-toggler" class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false"
            aria-label="Navigation toggler">
            <div class="navbar-toggler-icon-wrapper">
              <span class="navbar-toggler-bread top">
                <span class="navbar-toggler-bread-crust top"></span>
              </span>
              <span class="navbar-toggler-bread bottom">
                <span class="navbar-toggler-bread-crust bottom"></span>
              </span>
            </div>
          </button>
          <div id="navbar-content" class="collapse navbar-collapse flex-grow-0">
            <ul class="navbar-nav navbar-nav-scroll me-auto mb-2 mb-sm-0">
              ${links.map(({ page, label }) => {
                const isActive = currentPage === page;
                const href = getHref(page === 'home' ? '' : page);
                return `
                  <li class="nav-item mx-md-1">
                    <a href="${href}" class="nav-link py-1 link-dark ${isActive ? 'active link-opacity-100 link-opacity-75-hover' : 'link-opacity-75 link-opacity-50-hover'}"
                      ${isActive ? 'aria-current="page"' : ''}>
                      ${label}
                    </a>
                  </li>
                `;
              }).join('')}
            </ul>
            <div id="filler"></div>
          </div>
        </div>
      </nav>
    `;

    const navbar = this.querySelector('#navbar');
    const navbarContent = this.querySelector('#navbar-content');
    const title = this.querySelector('#title');

    navbarContent.addEventListener('show.bs.collapse', () => {
      document.body.style.overflow = 'hidden';
      title.style.pointerEvents = 'none';
      title.style.animation = 'fade_out 0.25s ease-in-out both';
      navbarContent.classList.remove('collapsing-out');
      navbarContent.classList.add('collapsing-in');
      navbar.classList.add('nav-open');
    });

    navbarContent.addEventListener('hide.bs.collapse', () => {
      document.body.style.overflow = 'auto';
      title.style.pointerEvents = 'auto';
      title.style.animation = 'fade_in 0.25s 0.25s ease-in-out both';
      navbarContent.classList.remove('collapsing-in');
      navbarContent.classList.add('collapsing-out');
      navbar.classList.remove('nav-open');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 576) {
        const bsCollapse = new bootstrap.Collapse(navbarContent, { toggle: false });
        bsCollapse.hide();
      }
    });
  }
}

customElements.define('nav-bar', NavBar);