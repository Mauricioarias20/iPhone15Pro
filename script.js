let selectedColor = {
  img: "img/iphone_natural.png",
  name: "Natural Titanium"
};

const phone = document.querySelector(".phone");
const hero = document.querySelector(".hero-apple");
const heroTitle = hero?.querySelector("h1");
const originalHeroSrc = phone?.src;
const isMobile = window.innerWidth <= 768;

if (hero && phone && !isMobile) {
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  
  function animate() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    
    const rotateX = -currentY * 20;
    const rotateY = currentX * 20;
    const scale = 1 + Math.abs(currentX) * 0.02 + Math.abs(currentY) * 0.02;
    
    phone.style.transform = `
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      rotateZ(${currentX * 2}deg)
      scale(${Math.min(scale, 1.08)})
      translateZ(${Math.abs(currentX) * 10 + Math.abs(currentY) * 10}px)
    `;
    
    requestAnimationFrame(animate);
  }
  animate();
  
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    targetX = (e.clientX - centerX) / (rect.width / 2);
    targetY = (e.clientY - centerY) / (rect.height / 2);
    
    phone.style.animation = "none";
    phone.style.transition = "filter 0.3s ease";
    phone.style.filter = "drop-shadow(0 40px 100px rgba(0, 0, 0, 0.7))";
  });

  hero.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
    phone.style.animation = "float 8s ease-in-out infinite";
    phone.style.filter = "drop-shadow(0 30px 80px rgba(0, 0, 0, 0.6))";
  });
}

const colores = document.querySelectorAll(".color");
const phoneImage = document.querySelector(".phone");

colores.forEach((color) => {
  color.addEventListener("click", () => {
    colores.forEach((el) => el.classList.remove("activo"));
    color.classList.add("activo");
    const imgSrc = color.getAttribute("data-img");
    const colorName = color.getAttribute("title") || "Natural Titanium";

    selectedColor = {
      img: imgSrc,
      name: colorName
    };

    if (phoneImage) {
      phoneImage.style.transition = "transform 0.6s ease, opacity 0.4s ease";
      phoneImage.style.transform = isMobile ? "scale(0.95)" : "rotateY(90deg) scale(0.8)";
      phoneImage.style.opacity = "0";

      setTimeout(() => {
        phoneImage.src = imgSrc;
        phoneImage.style.transform = "scale(1)";
        phoneImage.style.opacity = "1";
      }, 300);
    }
  });
});

if (heroTitle && phoneImage && originalHeroSrc) {
  heroTitle.addEventListener("click", () => {
    colores.forEach((el) => el.classList.remove("activo"));
    const firstColor = document.querySelector(".color-natural");
    if (firstColor) firstColor.classList.add("activo");
    
    phoneImage.style.transition = "opacity 0.4s ease";
    phoneImage.style.opacity = "0";
    setTimeout(() => {
      phoneImage.src = originalHeroSrc;
      phoneImage.style.opacity = "1";
    }, 200);
  });
}

const botonPrimary = document.querySelector(".boton-primary");

if (botonPrimary) {
  botonPrimary.addEventListener("click", () => {
    const detallesSection = document.querySelector("#detalles");
    if (detallesSection) {
      detallesSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: isMobile ? 0.1 : 0.15,
    rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px"
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = isMobile ? 80 : 60;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    }
  });
});

const navbar = document.querySelector(".navbar");
let lastScroll = 0;
const body = document.body;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  if (navbar && !body.classList.contains("clear-mode")) {
    if (currentScroll > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.8)";
    }
  } else if (navbar && body.classList.contains("clear-mode")) {
    if (currentScroll > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.8)";
    }
  }
  
  lastScroll = currentScroll;
});

const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close");
const contactModal = document.querySelector("#contact-modal");
const closeContactModal = document.querySelector("#contact-close");
const colorModal = document.querySelector("#color-modal");
const closeColorModal = document.querySelector("#color-close");

if (closeModal && modal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("activo");
  });
}

if (closeContactModal && contactModal) {
  closeContactModal.addEventListener("click", () => {
    contactModal.classList.remove("activo");
  });
}

if (closeColorModal && colorModal) {
  closeColorModal.addEventListener("click", () => {
    colorModal.classList.remove("activo");
  });
}

[modal, contactModal, colorModal].forEach((m) => {
  if (m) {
    m.addEventListener("click", (e) => {
      if (e.target === m) {
        m.classList.remove("activo");
      }
    });
  }
});

const interactiveCards = document.querySelectorAll(".spec-item, .modelo-card");

if (!isMobile) {
  interactiveCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });
  });
}

let ticking = false;

function updateOnScroll() {
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

const toggleModeBtn = document.getElementById("toggleMode");

function updateToggleButton() {
  if (!toggleModeBtn) return;
  const toggleText = toggleModeBtn.querySelector(".toggle-text");
  if (toggleText) {
    if (body.classList.contains("clear-mode")) {
      toggleText.textContent = isMobile ? "🌙" : "Dark Mode";
    } else {
      toggleText.textContent = isMobile ? "☀️" : "Clear Mode";
    }
  }
}

const savedMode = localStorage.getItem("clearMode");
if (savedMode === "true") {
  body.classList.add("clear-mode");
}

if (toggleModeBtn) {
  toggleModeBtn.addEventListener("click", () => {
    body.classList.toggle("clear-mode");
    const isClearMode = body.classList.contains("clear-mode");
    localStorage.setItem("clearMode", isClearMode);
    updateToggleButton();
    
    if (navbar) {
      if (isClearMode) {
        navbar.style.background = "rgba(255, 255, 255, 0.8)";
        navbar.style.borderBottom = "0.5px solid rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.background = "rgba(0, 0, 0, 0.8)";
        navbar.style.borderBottom = "0.5px solid rgba(255, 255, 255, 0.1)";
      }
    }
  });
}

// ORDER MODAL FUNCTIONALITY
const orderBtn = document.querySelector(".order-btn");
const orderModal = document.getElementById("order-modal");
const closeOrderModal = document.querySelector("#order-close");
const orderColors = document.querySelectorAll(".order-color");
const orderPhoneImg = document.getElementById("order-phone-img");
const colorInput = document.getElementById("color");

if (orderColors.length > 0) {
  orderColors.forEach((color) => {
    color.addEventListener("click", () => {
      orderColors.forEach((c) => c.classList.remove("active"));
      color.classList.add("active");
      
      const imgSrc = color.getAttribute("data-img");
      const colorName = color.getAttribute("data-name");
      
      selectedColor = {
        img: imgSrc,
        name: colorName
      };
      
      if (orderPhoneImg && imgSrc) {
        orderPhoneImg.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        orderPhoneImg.style.opacity = "0";
        orderPhoneImg.style.transform = "scale(0.9)";
        
        setTimeout(() => {
          orderPhoneImg.src = imgSrc;
          orderPhoneImg.alt = colorName;
          orderPhoneImg.style.opacity = "1";
          orderPhoneImg.style.transform = "scale(1)";
        }, 200);
      }
      
      if (colorInput) {
        colorInput.value = colorName;
      }
    });
  });
}

if (orderBtn) {
  orderBtn.addEventListener("click", () => {
    if (orderModal) {
      orderModal.classList.add("activo");
      
      setTimeout(() => {
        const activeOrderColor = document.querySelector(".order-color.active");
        if (activeOrderColor) {
          const imgSrc = activeOrderColor.getAttribute("data-img");
          const colorName = activeOrderColor.getAttribute("data-name");
          
          if (orderPhoneImg && imgSrc) {
            orderPhoneImg.src = imgSrc;
            orderPhoneImg.alt = colorName;
          }
          
          if (colorInput) {
            colorInput.value = colorName;
          }
        }
      }, 100);
    }
  });
}

if (closeOrderModal) {
  closeOrderModal.addEventListener("click", () => {
    if (orderModal) {
      orderModal.classList.remove("activo");
    }
  });
}

if (orderModal) {
  orderModal.addEventListener("click", (e) => {
    if (e.target === orderModal) {
      orderModal.classList.remove("activo");
    }
  });
}

const orderForm = document.getElementById("order-form");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your order! This is a practice project.");
    orderForm.reset();
    if (orderModal) {
      orderModal.classList.remove("activo");
    }
  });
}

// Detectar cambios de tamaño de pantalla
window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth <= 768;
  if (newIsMobile !== isMobile) {
    location.reload();
  }
});

window.addEventListener("load", () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add("visible");
    }
  });
  
  document.body.classList.add("loaded");
  
  if (toggleModeBtn) {
    updateToggleButton();
  }
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 3000);
});
