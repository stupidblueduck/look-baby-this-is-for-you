const stamp = document.getElementById("stamp");
const fade = document.querySelector(".fade");
const openingScreen = document.querySelector(".opening-screen");
const mainPage = document.querySelector(".main-page");
const checkbox = document.getElementById("popups");
const pusheenImg = document.getElementById("pusheen-img");

const backgroundMusic = new Audio("music/one-summers-day.mp3");

const normalPusheenImage = "images/pusheen-sitting.png";
const specialPusheenImage = "images/pusheen-love.png";

let popupTimeout = null;
let clickStreak = 0;
let streakResetTimer = null;
let specialImageTimer = null;

const popupContents = [
    "ur cute :3",
    "stanning Hearts2Hearts ✨✨",
    "aww so cute",
    "keep clicking~",
    "Pusheen says hi",
    "I want to marry you<br>-lui",
    "random random random random random random random random random random random random",
    "Enjoying this website? Please rate us.",
    "This took like 12 hours to make 😔 (can i at least hit)",
    "Uploading your mind to my mind ████████████████░░░░ 80%",
    "Close me",
    "Look baby this is for you",
    '<img src="https://media1.tenor.com/m/A9kmuyNabNQAAAAC/pusheen-pusheen-the-cat.gif">',
    '<img src="https://media1.tenor.com/m/f9jlfkQ7URsAAAAC/hearts-2-hearts-ian-h2h.gif">',
    '<img src="https://media1.tenor.com/m/VgUUwVRHZlMAAAAC/juun-ana.gif">',
    '<img src="https://media1.tenor.com/m/Rg8ClY_qq5UAAAAC/juun-67.gif">',
    '<img src="https://media1.tenor.com/m/Czj7xHpjdQwAAAAC/raven-walk.gif">',
    '<img src="https://media1.tenor.com/m/S3BaSB-RzG0AAAAd/pomni-the-amazing-digital-circus.gif">'


];

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        scheduleNextPopup();
    } else {
        clearTimeout(popupTimeout);
    }
});

function scheduleNextPopup() {
    if (!checkbox.checked) return;

    const randomDelay = Math.floor(Math.random() * (6000 - 1000 + 1)) + 3000;

    popupTimeout = setTimeout(() => {
        spawnPopup();
        scheduleNextPopup();
    }, randomDelay);
}

function spawnPopup() {
    const activePopups = document.querySelectorAll(".cute-popup");
    if (activePopups.length >= 10) return;

    const popup = document.createElement("div");
    popup.classList.add("cute-popup");

    const randomContent = popupContents[Math.floor(Math.random() * popupContents.length)];

    popup.innerHTML = `
        <div class="popup-header">
            <span class="popup-title">Notice</span>
            <button class="popup-close">✕</button>
        </div>
        <div class="popup-body">
            ${randomContent}
        </div>
    `;

    const maxX = window.innerWidth - 510;
    const maxY = window.innerHeight - 320;
    const randomX = Math.max(15, Math.floor(Math.random() * maxX));
    const randomY = Math.max(15, Math.floor(Math.random() * maxY));

    popup.style.left = `${randomX}px`;
    popup.style.top = `${randomY}px`;

    popup.querySelector('.popup-close').addEventListener('click', () => {
        popup.remove();
    });

    document.body.appendChild(popup);
}

stamp.addEventListener("click", () => {
    stamp.classList.add("clicked");

    setTimeout(() => {
        stamp.classList.add("disappear");
    }, 100);

    setTimeout(() => {
        fade.classList.add("active");
    }, 400);

    setTimeout(() => {
        openingScreen.classList.add("hidden");
        mainPage.classList.add("visible");
        fade.classList.remove("active");
        backgroundMusic.play().catch(err => console.log("Audio play failed:", err));
    }, 2800);
});

pusheenImg.addEventListener("click", () => {
    pusheenImg.classList.remove("bounce");
    void pusheenImg.offsetWidth;
    pusheenImg.classList.add("bounce");

    clickStreak++;

    clearTimeout(streakResetTimer);
    streakResetTimer = setTimeout(() => {
        clickStreak = 0;
    }, 1500);

    if (clickStreak >= 15) {
        pusheenImg.src = specialPusheenImage;
        clickStreak = 0;

        clearTimeout(specialImageTimer);
        specialImageTimer = setTimeout(() => {
            pusheenImg.src = normalPusheenImage;
        }, 3000);
    }
});