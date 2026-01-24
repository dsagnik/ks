// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== TESTIMONIAL SLIDER =====
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    if (testimonialCards.length === 0) return;
    
    testimonialCards.forEach(card => card.classList.remove('active'));
    
    if (index >= testimonialCards.length) {
        currentTestimonial = 0;
    } else if (index < 0) {
        currentTestimonial = testimonialCards.length - 1;
    } else {
        currentTestimonial = index;
    }
    
    testimonialCards[currentTestimonial].classList.add('active');
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
}

// Auto-rotate testimonials
if (testimonialCards.length > 0) {
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
}

// ===== NEWSLETTER FORM =====
let newsletterSubmitted = false;

window.addEventListener('load', () => {
    const iframe = document.querySelector('iframe[name="hidden_iframe"]');
    if (!iframe) return;

    iframe.addEventListener('load', () => {
        if (newsletterSubmitted) {
            alert('Thank you for subscribing!');
            newsletterSubmitted = false;
        }
    });
});

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== GALLERY LIGHTBOX =====
let currentImageIndex = 0;
const galleryImages = [];

// Collect all gallery images
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const info = item.querySelector('.gallery-info');
    if (img && info) {
        galleryImages.push({
            src: img.src,
            title: info.querySelector('h3') ? info.querySelector('h3').textContent : '',
            description: info.querySelector('p') ? info.querySelector('p').textContent : ''
        });
    }
});

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && galleryImages[index]) {
        lightbox.style.display = 'block';
        lightboxImg.src = galleryImages[index].src;
        caption.textContent = `${galleryImages[index].title} - ${galleryImages[index].description}`;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    openLightbox(currentImageIndex);
}

// Close lightbox on click outside image
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ===== NOTICE TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
            if (content.id === targetTab) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// ===== CONTACT FORM (GOOGLE FORM SUBMISSION) =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      console.error('Contact form fields missing');
      return;
    }

    const formData = new FormData();

    formData.append('entry.201674251', firstName.value);
    formData.append('entry.325811459', lastName.value);
    formData.append('entry.823790987', email.value);
    formData.append('entry.207830177', phone.value);
    formData.append('entry.619526754', subject.value);
    formData.append('entry.278873878', message.value);

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSduNhkwcswOIBL4A0Wsg_gdB9HlTFS5N3EYMYm5Rt1ixIUKLQ/formResponse',
      {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      }
    );

    // 🔑 THIS is what restores layout spacing
    formMessage.textContent =
  'Thank you for your message! We will get back to you soon.';
    formMessage.className = 'form-message success';
    formMessage.style.display = 'block';
    formMessage.style.marginTop = '20px';
    formMessage.style.padding = '14px 18px';


    contactForm.reset();

    if (submitBtn) submitBtn.disabled = false;
  });
}

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .job-card, .batch-card, .about-card, .reason-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== LOGO FALLBACK =====
const logo = document.getElementById('site-logo');
if (logo) {
    logo.addEventListener('error', function() {
        this.style.display = 'none';
        const logoContainer = this.parentElement;
        logoContainer.innerHTML = '<h2 style="color: var(--primary-yellow); margin: 0;">Kanishk Services</h2>';
    });
}

// Make functions global for onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;

// Change Copyright Year Automatically
document.getElementById('currentYear').textContent = new Date().getFullYear();