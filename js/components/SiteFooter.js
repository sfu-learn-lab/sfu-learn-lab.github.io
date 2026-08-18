class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-black text-white py-3 mt-5">
        <div class="container d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-4">
          <img src="/assets/img/learn-lab-logo-white.png" alt="LEARN Lab logo" class="learnlab-logo ms-md-2">
          <div class="d-flex flex-column align-items-center align-items-md-end text-center text-md-end" style="font-size: 0.7rem;">
            <p class="mb-0">Simon Fraser University, 8888 University Dr E, Burnaby, BC V5A 1S6, Canada</p>
            <a href="mailto:pchilana@sfu.ca" class="link-light link-opacity-75-hover">pchilana@sfu.ca</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);