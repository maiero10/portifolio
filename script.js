const header = document.querySelector('.header');
const progress = document.querySelector('.progress');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
});

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    projects.forEach(project => {
      project.classList.toggle('hidden', category !== 'all' && project.dataset.category !== category);
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
