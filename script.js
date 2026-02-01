const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

const yesMessages = [
    "Yay! 💖",
    "You made my day!",
    "Best. Valentine. Ever.",
    "I can't wait!",
];

const noMessages = [
    "Are you sure?",
    "Please reconsider…",
    "But we’d be so cute together 🥺",
    "I'll ask again!",
];

let noCount = 0;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

yesBtn.addEventListener("click", () => {
    message.textContent = pickRandom(yesMessages);
});

noBtn.addEventListener("click", () => {
    noCount += 1;
    message.textContent = pickRandom(noMessages);

    const scale = Math.min(1.6, 1 + noCount * 0.1);
    yesBtn.style.transform = `scale(${scale})`;
});
