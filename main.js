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
//блок боди во время открытой модалки 
function toggleBodyLock() {
  const modals = document.querySelectorAll('.modal-open');

  const isAnyOpen = Array.from(modals).some(modal =>
    !modal.classList.contains('hidden')
  );

  if (isAnyOpen) {
    document.body.classList.add('modal__body-active');
  } else {
    document.body.classList.remove('modal__body-active');
  }
}

//функция закрытия и открытия модалок 
const netModal = document.querySelector('.net__modal');
const netModalClose = document.querySelector('.net__close');
const netOver = document.querySelector('.net__overlay');
const thankModal = document.querySelector('.thankyou__modal');
const thankModalClose = document.querySelector('.thankyou__close');
const thankOver = document.querySelector('.thankyou__overlay');
const thankOk = document.querySelector('.thankyou__btn');
const fotoModal = document.querySelector('.foto__modal');
const fotoOver = document.querySelector('.foto__overlay');
const fotoClose = document.querySelector('.foto__close');
//закрыть модалки (не забыть передать аргумент модаль)
function closeModal(modal) {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
  toggleBodyLock();
}
//открыть модалки
function openModal(modal) {
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
  toggleBodyLock();
}
const thankModalBtn = document.querySelector('.btn--primary');
const netModalBtn = document.querySelector('.btn--secondary');
//тригерры на модалки, кнопки на открытие и закрытие
const thankTriggers = [thankModalClose, thankOver,thankOk];
const netTriggers = [netModalClose, netOver];
const fotoTriggers = [fotoClose, fotoOver];
const thankModalTriggers = [thankModalBtn];
const netModalTriggers = [netModalBtn];
//открытие модалки спасибо 
thankModalTriggers.forEach(el =>{
el.addEventListener('click',()=>{
  openModal(thankModal);
})
})
//открытие модалки для связи с соц сетями
netModalTriggers.forEach(el =>{
el.addEventListener('click',()=>{
  openModal(netModal);
})
})
//закрытие модалки с соц сетями 
netTriggers.forEach(el => {
  el.addEventListener('click', () => closeModal(netModal));
});
//закрытие модалки спасибо
thankTriggers.forEach(el => {
  el.addEventListener('click', () => closeModal(thankModal));
  
});
fotoTriggers.forEach(el => {
  el.addEventListener('click', () => closeModal(fotoModal));
});
//проверка заполнения формы перед отправкой 
const form = document.querySelector('.contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();    
  openModal(thankModal); 
  form.reset();
});

const formInput = document.querySelectorAll('.contact-form__input');
formInput.forEach(input=>{
  input.addEventListener('input',checkForm);
})
function checkForm() {
   let allValid = true;
    formInput.forEach(input => {
        if (!input.validity.valid) {
            allValid = false;
        }
    });
    if (allValid) {
        thankModalBtn.disabled = false;
        thankModalBtn.classList.remove('disabled');
    } else {
        thankModalBtn.disabled = true;
        thankModalBtn.classList.add('disabled');
    }
}
//модальное окно с соц сетями при нажатии появляется сообщение скопировано
    const urls = {
    twitter:"https://instagram.com/portfolio-demo",
    instagram:"https://twitter.com/portfolio-demo",
    facebook:"https://facebook.com/portfolio-demo"
    }
    const netCopied = document.querySelector('.net__copied');
    const netGroup = document.querySelector('.net__group');
    netGroup.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-type]');
        if (!btn) return;
    
        const type = btn.dataset.type;
    
        navigator.clipboard.writeText(urls[type]).then(() => {
            netCopied.classList.remove('hidden');
            netCopied.classList.add('show');
    
            setTimeout(() => {
                netCopied.classList.add('hidden');
                netCopied.classList.remove('show');
                closeModal(netModal);
            }, 1500);
        });
    });
    //модалка для фото увеличение 
const generateFotoModal =(item)=>{
   ` <div class="foto__modal-pic">
      <img class="modal__img" src="${item.img}" alt="${item.alt}">
    </div>`
}
const fotoWindow = document.querySelector('.foto__window');
const images = document.querySelectorAll('.portfolio__img');
images.forEach(img => {
  img.addEventListener('click', () => {
    const src = img.src;
    const alt = img.alt;

    fotoWindow.innerHTML = `
      <img src="${src}" alt="${alt}">
    `;

    openModal(fotoModal);
  });
});
//шкала отсчитывающая прогресс изучения
const skills = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skills__bar');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    skillBars.forEach(bar => {
      bar.classList.add('is-active');
    });

    skillsObserver.disconnect();
  });
}, { threshold: 0.4 });

skillsObserver.observe(skills);


