//плавный скролл к актинвной секции 
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
//расчет активной секции
const observerOptions = {
  root: null,        // viewport
  threshold: 0.6     // секция активна, когда видно 60%
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.id;

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${id}`
      );
    });
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));
//плавный скролл по кнопке мышки к секции о авторе 
const scrollIcon = document.querySelector('.hero__scroll-btn');
const aboutSection = document.getElementById('about');

scrollIcon.addEventListener('click',(e)=>{
    e.preventDefault();
    aboutSection.scrollIntoView({ behavior: 'smooth',
        block:'start'
     });
})
//счетчики визуальная логика 
const statsSection = document.querySelector('.stats');
const counters = document.querySelectorAll('.stat__count');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

counters.forEach(counter => {
  const target = +counter.textContent;
  let current = 0;
  counter.textContent = 0;
  const duration = 1000; 
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = Math.max(1, Math.floor(target / steps));

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      counter.textContent = target;
      clearInterval(timer);
    } else {
      counter.textContent = current;
    }
  }, stepTime);
});

  });
}, { threshold: 0.6 });

obs.observe(statsSection);

