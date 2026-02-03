const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const card = document.querySelector(".card");
const yesScreen = document.getElementById("yesScreen");

let curtainOpened = false;

function openCurtains() {
    if (!curtainOpened) {
        const curtainOverlay = document.getElementById("curtainOverlay");
        const curtainLeft = document.querySelector(".curtain-left");
        const curtainRight = document.querySelector(".curtain-right");
        curtainOverlay.classList.add("open");
        curtainLeft.classList.add("open");
        curtainRight.classList.add("open");
        curtainOpened = true;
    }
}

// Make curtain overlay clickable
document.getElementById("curtainOverlay").addEventListener("click", openCurtains);

const overlayImages = [
    "overlay1.jpg",
    "overlay2.jpg",
    "overlay3.jpg",
];

function getRandomOverlay() {
    return overlayImages[Math.floor(Math.random() * overlayImages.length)];
}


const noMessages = [
    "Are you sure?",
    "Please reconsider…",
    "Why not 🥺",
    "I'll ask again!!!",
    "Are you pressing this just to see what happens?",
    "I'm gonna bite you"
];

let noCount = 0;
let yesScale = 1;
let yesBaseRect = null;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

yesBtn.addEventListener("click", () => {
    openCurtains();
    const overlays = document.querySelectorAll(".overlay-image");
    overlays.forEach(overlay => overlay.remove());
    card.classList.add("is-hidden");
    yesScreen.classList.remove("is-hidden");
});

noBtn.addEventListener("click", () => {
    openCurtains();
    if (!yesBaseRect) {
        yesBaseRect = yesBtn.getBoundingClientRect();
    }

    noCount += 1;
    message.textContent = pickRandom(noMessages);
    noBtn.classList.add("flee");
    yesBtn.classList.add("grow");

    const cardImage = document.querySelector(".card-image");
    cardImage.src = "overlay1.jpg";

    if (noCount > 1) {
        const newOverlay = document.createElement("img");
        newOverlay.src = getRandomOverlay();
        newOverlay.alt = "Overlay image";
        newOverlay.className = "overlay-image";

        const overlayMaxX = Math.max(0, window.innerWidth - 250);
        const overlayMaxY = Math.max(0, window.innerHeight - 200);
        const randomX = Math.floor(Math.random() * overlayMaxX);
        const randomY = Math.floor(Math.random() * overlayMaxY);

        newOverlay.style.left = `${randomX}px`;
        newOverlay.style.top = `${randomY}px`;

        document.body.appendChild(newOverlay);
    }

    const maxScale = Math.max(
        window.innerWidth / yesBaseRect.width,
        window.innerHeight / yesBaseRect.height
    ) * 1.05;
    yesScale = Math.min(maxScale, yesScale * 1.6);
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

    const noRect = noBtn.getBoundingClientRect();
    const noBtnMaxX = Math.max(0, window.innerWidth - noRect.width);
    const noBtnMaxY = Math.max(0, window.innerHeight - noRect.height);
    const randomNoX = Math.floor(Math.random() * noBtnMaxX);
    const randomNoY = Math.floor(Math.random() * noBtnMaxY);
    noBtn.style.left = `${randomNoX}px`;
    noBtn.style.top = `${randomNoY}px`;
});
