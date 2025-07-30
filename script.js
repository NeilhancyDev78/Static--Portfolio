

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const topButton = document.getElementById('topButton');
const digitalRain = document.getElementById('digitalRain');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
    });
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        topButton.classList.add('visible');
        topButton.style.opacity = '1';
    } else {
        topButton.classList.remove('visible');
        topButton.style.opacity = '0';
    }
});

topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typewriter Effect
function typewriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Typewriter on Load
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    const text = "Crafting codes, bringing ideas to life - One project at a time.";
    
    setTimeout(() => {
        typewriter(typewriterElement, text, 80);
    }, 1000);
});

// Particle Trail Effect
const PARTICLE_LIFETIME = 1300;
const MAX_PARTICLES = 40;
const particles = [];
const canvas = document.getElementById('cyberTrail');
const ctx = canvas.getContext('2d');

// Make canvas fill screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Spawn new particles on pointer move
document.addEventListener('pointermove', e => {
  for (let i = 0; i < 2; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 16;
    particles.push({
      x: e.clientX + Math.cos(angle) * radius,
      y: e.clientY + Math.sin(angle) * radius,
      size: 10 + Math.random() * 6,
      created: performance.now(),
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
    });
  }
  // Limit total particles for performance
  if (particles.length > MAX_PARTICLES * 3) {
    particles.splice(0, particles.length - MAX_PARTICLES * 3);
  }
});

// Draw gradient "101" text
function drawGradientText(x, y, text, fontSize, alpha) {
  ctx.save();
  ctx.font = `bold ${fontSize}px 'Fira Mono', 'Consolas', 'monospace'`;
  const grad = ctx.createLinearGradient(x, y, x + fontSize * 2, y - fontSize * 2);
  grad.addColorStop(0.2, "#87429cff");
  grad.addColorStop(0.2, "#742DCC");
  grad.addColorStop(0.2, "#3b79caff");
  ctx.globalAlpha = alpha;
  ctx.fillStyle = grad;
  ctx.globalCompositeOperation = "lighter";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = performance.now();
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    const age = now - p.created;
    if (age > PARTICLE_LIFETIME) {
      particles.splice(i, 1);
      continue;
    }
    // Animate
    p.x += p.vx;
    p.y += p.vy;
    const lifeT = age / PARTICLE_LIFETIME;
    const size = p.size * (1 - lifeT * 0.5);
    const alpha = 0.9 * (1 - lifeT) + 0.05;
    drawGradientText(p.x, p.y, "101", size, alpha);
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.1';
    
    digitalRain.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#8b5cf6';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize Matrix Effect
createMatrixRain();

// Initialize energy spheres
function initEnergySpheres() {
    const spheres = document.querySelectorAll('.energy-sphere');
    spheres.forEach((sphere, index) => {
        sphere.style.animationDelay = `${index * 2}s`;
    });
}

// Initialize sphere animations
initEnergySpheres();

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.dataset.width;
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
            }
            
            // Animate milestone cards
            if (entry.target.classList.contains('milestone-card')) {
                entry.target.style.animationDelay = Math.random() * 0.5 + 's';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.cyber-card, .skill-item, .milestone-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Project Card Interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.cyber-project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-img');
        const preview = card.querySelector('.project-preview');
        const description = card.querySelector('.project-desc');
        const tag = card.querySelector('.project-tag');
        
        const gif = card.querySelector('.project-gif');

        card.addEventListener('mouseenter', () => {
        if (image && gif) {
            image.classList.add('hidden');
            gif.classList.remove('hidden');
        }
        });

        card.addEventListener('mouseleave', () => {
        if (image && gif) {
            gif.classList.add('hidden');
            image.classList.remove('hidden');
        }
        });


        card.addEventListener('mouseenter', () => {
            // Show video preview
            if (image && preview) {
                image.style.display = 'none';
                preview.classList.remove('hidden');
            }
            
            // Show detailed description
            if (description && tag) {
                tag.style.display = 'none';
                description.classList.remove('hidden');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Show image
            if (image && preview) {
                image.style.display = 'block';
                preview.classList.add('hidden');
            }
            
            // Show tagline
            if (description && tag) {
                tag.style.display = 'block';
                description.classList.add('hidden');
            }
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#connect form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Animate energy spheres on scroll (avatar is NOT animated by JS here)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const spheres = document.querySelectorAll('.energy-sphere');
    spheres.forEach((sphere, index) => {
        const speed = 0.1 + (index * 0.05);
        sphere.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Glitch effect on hover for project cards
document.addEventListener('DOMContentLoaded', () => {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        });
    });
});

// Terminal cursor blink effect
document.addEventListener('DOMContentLoaded', () => {
    const cursors = document.querySelectorAll('.blinking-cursor');
    
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
});

// Smooth reveal animations for sections
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.cyber-card:not(.fade-in-up)');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
});

// Intersection Observer for skills progress bars
const expertiseSection = document.querySelector('#expertise');
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillItems.forEach(item => {
                const progressBar = item.querySelector('.skill-progress');
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.2s cubic-bezier(.74,-0.04,.26,1.09)';
                    progressBar.style.width = progressBar.dataset.width + '%';
                }, 100);
            });
        } else {
            skillItems.forEach(item => {
                const progressBar = item.querySelector('.skill-progress');
                progressBar.style.transition = 'width 0.35s cubic-bezier(.74,-0.04,.26,1.09)';
                progressBar.style.width = '0';
            });
        }
    });
}, { threshold: 0.3 });

skillObserver.observe(expertiseSection);

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('#home h1, #home p, #home .cyber-button');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in-up');
        }, index * 200);
    });
});

//Timeline Section
var items = document.querySelectorAll("#timeline li");

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
  for (var i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      }
    } else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    }
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

document.addEventListener('DOMContentLoaded', function() {
  // Select the timeline section
  const timeline = document.querySelector('#timeline');
  if (timeline) {
    // Create a style element for the animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatUpDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .timeline {
        animation: floatUpDown 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  }
});

// Console Easter Egg
console.log(`
╔═══════════════════════════════════════╗
║       🚀 CYBER DEV PORTFOLIO 🚀       ║
║                                       ║
║     Built with cyberpunk aesthetics   ║
║     and futuristic design principles  ║
║                                       ║
║     Crafting code, shaping futures    ║
║     — one project at a time.          ║
╚═══════════════════════════════════════╝

Thanks for checking out the source! 
If you're interested in collaborating, 
feel free to reach out through the contact form.
`);