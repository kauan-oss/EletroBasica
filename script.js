const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section[id]');
const topButton = document.createElement('button');

topButton.id = 'topButton';
topButton.type = 'button';
topButton.setAttribute('aria-label', 'Voltar ao topo');
topButton.textContent = '↑';
document.body.appendChild(topButton);

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateTopButton() {
  if (window.scrollY > 480) {
    topButton.classList.add('visible');
  } else {
    topButton.classList.remove('visible');
  }
}

function getLinkPathAndHash(link) {
  const linkUrl = new URL(link.getAttribute('href'), window.location.href);
  return {
    hash: linkUrl.hash,
    path: linkUrl.pathname.split('/').pop() || 'index.html',
  };
}

function updateActiveLink() {
  let currentSectionId = '';
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 110;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const { hash, path } = getLinkPathAndHash(link);
    const pointsToCurrentPage = path === currentPath;
    const isSectionLink = hash === `#${currentSectionId}`;
    const isPageLink = !hash && pointsToCurrentPage;

    link.classList.toggle('nav-active', pointsToCurrentPage && (isSectionLink || isPageLink));
  });
}

function handleScroll() {
  updateTopButton();
  updateActiveLink();
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
