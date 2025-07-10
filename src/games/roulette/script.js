// Références
const wheel = document.querySelector(".wheel");
const spinBtn = document.querySelector("#spin");
const resultBox = document.querySelector("#result");
const bigEmoji = document.querySelector("#big-emoji");

let isSpinning = false;

spinBtn.addEventListener("click", () => {
    if (isSpinning) return;

    isSpinning = true;
    resultBox.textContent = ""; // Nettoie le message précédent

    const segments = wheel.querySelectorAll("span");
    const totalSectors = segments.length;
    const anglePerSector = 360 / totalSectors;
    const randomSector = Math.floor(Math.random() * totalSectors);

    // Rotation : 5 tours + position gagnante
    const rotation = 360 * 5 + (360 - randomSector * anglePerSector);
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        isSpinning = false;

        // Réinitialise les classes
        segments.forEach(span => {
            span.classList.remove("active");
            span.classList.remove("winner");
        });

        const selected = segments[randomSector];
        selected.classList.add("active");
        selected.classList.add("winner");

        const emoji = selected.textContent.trim(); // ✅ Ajout essentiel

        // Affichage du message
        if (randomSector === 2) {
            resultBox.textContent = `Dommage... tu es tombé sur ${emoji} 😢`;
        } else {
            resultBox.textContent = `Bravo ! Tu as gagné ${emoji}`;
        }

        // Optionnel : animation flash ou fade
        resultBox.classList.remove("hide");

        

        // Supprime l'effet .winner après affichage (si tu veux qu'il disparaisse ensuite)
        // segments.forEach(span => span.classList.remove("winner"));
    }, 4000);
});
