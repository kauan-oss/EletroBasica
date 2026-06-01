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

function updateActiveLink() {
  let currentSectionId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 110;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === `#${currentSectionId}`;
    link.classList.toggle('nav-active', isActive);
  });
}

function handleScroll() {
  updateTopButton();
  updateActiveLink();
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
