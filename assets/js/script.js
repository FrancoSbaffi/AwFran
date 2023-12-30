

// LOADING SCREEN

const svg = document.getElementById("svg");
const tl = gsap.timeline();
const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
const loaderMessage = document.getElementById("loader-message");

const messagesIndex = [
  "Bienvenido", 
  "Welcome",
  "欢迎",
  "Willkommen",
  "환영합니다",
  "Ciao",
  "いらっしゃいませ",
  "Bienvenue",
  "ยินดีต้อนรับ",
  "Velkommen",
  "Bem-vindo",
];

const messagesAbout = [
  "About me",
  "Sobre mí",
  "关于我",
  "À propos de moi",
  "나에 대하여",
  "Su di me",
  "เกี่ยวกับฉัน",
  "Über mich",
  "Om meg",
  "Sobre mim",
  "私のこと",
];

const messagesContact = [
  "Writings",
  "作品",
  "Écrits",
  "글",
  "Scritti",
  "บรรณาธิการ",
  "Escritos",
  "Schriften",
  "Skriftlige arbeider",
  "Escritos",
  "著作物",
];

let messages = [];

if (window.location.pathname.includes("about.html")) {
  messages = messagesAbout; 
} else if (window.location.pathname.includes("writings.html")) {
  messages = messagesContact; 
} else {
  messages = messagesIndex; 
}

let currentIndex = 0;

function changeMessage() {
  loaderMessage.innerText = messages[currentIndex];
  currentIndex = (currentIndex + 1) % messages.length; 
}

setInterval(changeMessage, 180);

tl.from(".loader-wrap-heading h1", {
  delay: 0.1,
  y: 200,
  skewY: 10,
}).to(".loader-wrap-heading h1", {
  delay: 2.2,
  y: -200,
  skewY: 10,
});
tl.to(svg, {
  duration: 0.5,
  attr: { d: curve },
  ease: "power2.easeIn",
}).to(svg, {
  duration: 0.5,
  attr: { d: flat },
  ease: "power2.easeOut",
});
tl.to(".loader-wrap", {
  y: -1500,
});
tl.to(".loader-wrap", {
  zIndex: -1,
  display: "none",
});
tl.from(
  ".container h1",
  {
    y: 100,
    opacity: 0,
  },
  "-=1.5"
);

// CURSOR

const cursor = document.querySelector('.cursor');
const image1 = document.querySelector('.img-cover_1');
const image2 = document.querySelector('.img2');
const image3 = document.querySelector('.img3');

function handleImageHover(imageElement) {
  imageElement.addEventListener('mouseenter', () => {
      cursor.classList.add("expand");
  });

  imageElement.addEventListener('mouseleave', () => {
      cursor.classList.remove("expand");
  });

  cursor.addEventListener('mouseenter', () => {
      cursor.classList.add("expand");
  });

  cursor.addEventListener('mouseleave', () => {
      cursor.classList.remove("expand");
  });
}

handleImageHover(image1);
handleImageHover(image2);
handleImageHover(image3);

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})

// MENU

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".nav");
    const navItems = document.querySelector(".nav-items");
    const navHome = document.querySelector(".nav-home");
    const navTop = document.querySelector(".nav-top");
    const icon = document.querySelector(".hamburguer i");

    let isOpen = false;

    gsap.set(nav, { height: "60px" });
    gsap.set(navTop, { opacity: 0, scale: 0.9, display: "none" });
    gsap.set(navItems, { opacity: 1, display: "flex" });
    gsap.set(navHome, { flexGrow: 0 });

    navHome.addEventListener("click", function () {
      if (!isOpen) {
        gsap.to(nav, {
          height: "370px",
          duration: 0.75,
          ease: "power4.inOut",
          immediateRender: false,
        });

        gsap.to(navTop, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          onStart: function () {
            gsap.set(navTop, { display: "block" });
          },
          delay: 0.5,
          immediateRender: false,
        });

        gsap.to(navItems, {
          opacity: 0,
          duration: 0.1,
          onComplete: function () {
            gsap.set(navItems, { display: "none" });
          },
          immediateRender: false,
        });

        gsap.to(navHome, {
          flexGrow: 1,
          duration: 0.2,
          ease: "power4.inOut",
          delay: 0,
          immediateRender: false,
          onComplete: function () {
            icon.className = "ph-light ph-x";
          },
        });
      } else {
        gsap.to(nav, {
          height: "60px",
          duration: 0.75,
          ease: "power4.inOut",
          delay: 0.2,
          immediateRender: false,
        });

        gsap.to(navTop, {
          opacity: 0,
          scale: 0.9,
          duration: 0.2,
          onComplete: function () {
            gsap.set(navTop, { display: "none" });
          },
          immediateRender: false,
        });

        gsap.to(navHome, {
          flexGrow: 0,
          duration: 0.2,
          ease: "power4.inOut",
          immediateRender: false,
          onComplete: function () {
            icon.className = "ph-light ph-list";
          },
        });

        gsap.to(navItems, {
          opacity: 1,
          duration: 0.2,
          onStart: function () {
            gsap.set(navItems, { display: "flex" });
          },
          delay: 0.5,
          immediateRender: false,
        });
      }
      isOpen = !isOpen;
    });
  });

// NAME

const el = document.querySelector(".title");

let elWidth = el.offsetWidth;
let windowWidth = window.innerWidth;

let mouseX = 0;
let prevMouseX = 0;

let skewTarget = 0;
let translateTarget = 0;

let skewWithEasing = 0;
let translateWithEasing = 0;

let skewEasingFactor = 0.1;
let translateEasingFactor = 0.05;

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", handleResize); // Corregido el nombre de la función

function handleMouseMove(e) {
    mouseX = e.pageX;
}

function handleResize(e) { // Corregido el nombre de la función
    elWidth = el.offsetWidth;
    windowWidth = window.innerWidth;
}

function lerp(start, end, factor) {
    return (1 - factor) * start + factor * end;
}

function animateMe() {
    skewTarget = mouseX - prevMouseX;
    prevMouseX = mouseX;

    translateTarget = (elWidth - windowWidth) / windowWidth * mouseX * -1;
    skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);
    skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -75), 75);

    translateWithEasing = lerp(
        translateWithEasing,
        translateTarget,
        translateEasingFactor
    );

    el.style.transform = `translateX(${translateWithEasing}px) skew(${skewWithEasing}deg)`; 
    window.requestAnimationFrame(animateMe);
}

window.requestAnimationFrame(animateMe);


