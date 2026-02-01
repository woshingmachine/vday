const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const card = document.querySelector(".card");
const yesScreen = document.getElementById("yesScreen");

const overlayImageSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='200'%3E%3Crect fill='%23ff80bf' width='250' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3EOverlay Picture%3C/text%3E%3C/svg%3E";


const noMessages = [
    "Are you sure?",
    "Please reconsider…",
    "But we’d be so cute together 🥺",
    "I'll ask again!!!",
];

let noCount = 0;
let yesScale = 1;
let yesBaseRect = null;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

yesBtn.addEventListener("click", () => {
    const overlays = document.querySelectorAll(".overlay-image");
    overlays.forEach(overlay => overlay.remove());
    card.classList.add("is-hidden");
    yesScreen.classList.remove("is-hidden");
});

noBtn.addEventListener("click", () => {
    if (!yesBaseRect) {
        yesBaseRect = yesBtn.getBoundingClientRect();
    }
    
    noCount += 1;
    message.textContent = pickRandom(noMessages);
    noBtn.classList.add("flee");
    yesBtn.classList.add("grow");

    const newOverlay = document.createElement("img");
    newOverlay.src = overlayImageSrc;
    newOverlay.alt = "Overlay image";
    newOverlay.className = "overlay-image";
    
    const overlayMaxX = Math.max(0, window.innerWidth - 250);
    const overlayMaxY = Math.max(0, window.innerHeight - 200);
    const randomX = Math.floor(Math.random() * overlayMaxX);
    const randomY = Math.floor(Math.random() * overlayMaxY);
    
    newOverlay.style.left = `${randomX}px`;
    newOverlay.style.top = `${randomY}px`;
    
    document.body.appendChild(newOverlay);

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
