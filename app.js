const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');
const dialog = document.querySelector('.invite-dialog');
const form = document.querySelector('#invite-form');

const query = new URLSearchParams(window.location.search);
const selectedVariant = ['1', '2', '3'].includes(query.get('variant'))
  ? query.get('variant')
  : '1';

document.body.classList.add(`variant-${selectedVariant}`);

const closeMenu = () => {
  nav.dataset.open = 'false';
  menuToggle.setAttribute('aria-expanded', 'false');
};

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const nextState = nav.dataset.open !== 'true';
  nav.dataset.open = String(nextState);
  menuToggle.setAttribute('aria-expanded', String(nextState));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (dialog.open) dialog.close();
  }
});

document.querySelectorAll('.js-open-form').forEach((button) => {
  button.addEventListener('click', () => {
    closeMenu();
    dialog.classList.remove('is-success');
    dialog.showModal();
  });
});

document.querySelector('.js-close-form').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
    && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  if (!inside) dialog.close();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  dialog.classList.add('is-success');
  form.reset();
});
