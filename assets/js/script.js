const typingText = document.querySelector(".typing-text");
const roles = [
    "Siswa XI TJKT 1 - SMKN 1 Blitar",
    "Network & Database Enthusiast",
    "Atlet Sepak Bola SSB Surya Muda"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".close-modal");

function openModal(imgSrc, title) {
    if (!modal) return;
    modal.style.display = "flex";
    modalImg.src = imgSrc;
    captionText.textContent = title;
}

if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-element");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".about-box, .project-card, .cert-card").forEach((el) => {
    el.classList.add("hidden-element");
    observer.observe(el);
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.12)";
    } else {
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    }
});

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeIcon) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            localStorage.setItem("theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});