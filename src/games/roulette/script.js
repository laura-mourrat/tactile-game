// 🎯 MODALE E-MAIL
const modal = document.getElementById("email-modal");
const emailInput = document.getElementById("email-input");
const validateBtn = document.getElementById("validate-email");
const errorBox = document.getElementById("email-error");

const gameElements = document.querySelectorAll(".wheel, .arrow, #spin, .back-btn, #result, #big-emoji");

// 🔒 Cache le jeu au départ
gameElements.forEach(el => el.style.display = "none");

// ✅ Validation email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

validateBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        errorBox.textContent = "Adresse e-mail invalide.";
        return;
    }

    // E-mail valide → Affiche le jeu
    modal.style.display = "none";
    gameElements.forEach(el => el.style.display = "block");
});

// 🎰 ROULETTE
const wheel = document.querySelector(".wheel");
const spinBtn = document.querySelector("#spin");
const resultBox = document.querySelector("#result");
const bigEmoji = document.querySelector("#big-emoji");

const spinSound = new Audio('/assets/sounds/spin.mp3');
const winSound = new Audio('/assets/sounds/win.mp3');
const loseSound = new Audio('/assets/sounds/lose.mp3');

let isSpinning = false;

spinBtn.addEventListener("click", () => {
    if (isSpinning) return;

    isSpinning = true;
    spinBtn.style.display = "none";
    resultBox.textContent = "";
    resultBox.classList.remove("show");

    spinSound.currentTime = 0;
    spinSound.play();

    const segments = wheel.querySelectorAll("span");
    const totalSectors = segments.length;
    const anglePerSector = 360 / totalSectors;
    const randomSector = Math.floor(Math.random() * totalSectors);

    const rotation = 360 * 5 + (360 - randomSector * anglePerSector);
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        isSpinning = false;

        segments.forEach(span => {
            span.classList.remove("active", "winner");
        });

        const selected = segments[randomSector];
        selected.classList.add("active", "winner");

        const emoji = selected.textContent.trim();

        if (randomSector === 2) {
            resultBox.textContent = `Dommage... tu es tombé sur ${emoji} 😢`;
            loseSound.currentTime = 0;
            loseSound.play();
        } else {
            resultBox.textContent = `Bravo ! Tu as gagné ${emoji}`;
            winSound.currentTime = 0;
            winSound.play();
        }

        resultBox.classList.add("show");

        bigEmoji.textContent = emoji;
        bigEmoji.classList.add("show");

        setTimeout(() => {
            selected.classList.remove("winner");
            bigEmoji.classList.remove("show");
        }, 3000);

        // 🔁 Après 5 secondes → cache le jeu et rouvre la modale
        setTimeout(() => {
            gameElements.forEach(el => el.style.display = "none");
            modal.style.display = "flex";
            emailInput.value = "";
            errorBox.textContent = "";
        }, 5000);

    }, 4000);
});
