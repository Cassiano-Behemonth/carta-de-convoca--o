document.addEventListener('DOMContentLoaded', () => {
    const dossier = document.getElementById('dossier');
    const lighter = document.getElementById('lighter');
    const lines = document.querySelectorAll('.typewriter');
    const ashContainer = document.getElementById('ash-container');

    let isOpen = false;
    let isBurned = false;

    dossier.addEventListener('click', () => {
        if (isBurned) return;
        
        if (!isOpen) {
            isOpen = true;
            dossier.classList.remove('closed');
            dossier.classList.add('open');
            revealText();
        }
    });

    function revealText() {
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('visible');
                
                // Once the last line is revealed, start the countdown
                if (index === lines.length - 1) {
                    setTimeout(startSelfDestruct, 5000);
                }
            }, index * 800); // Slightly faster for mobile feel
        });
    }

    function startSelfDestruct() {
        // Show lighter
        lighter.classList.remove('hidden');
        lighter.classList.add('active');

        // Wait for lighter to move into position (faster now)
        setTimeout(() => {
            burnDossier();
        }, 600);
    }

    function burnDossier() {
        dossier.classList.add('burning');
        isBurned = true;
        
        // Create ash particles
        const ashInterval = setInterval(() => {
            createAsh();
        }, 30);

        // Stop particles and close dossier
        setTimeout(() => {
            clearInterval(ashInterval);
            
            // Hide lighter
            lighter.classList.remove('active');
            setTimeout(() => lighter.classList.add('hidden'), 1000);

            // Close the dossier
            dossier.classList.remove('open');
            dossier.classList.add('closed');
            
            // Optional: after closing, we could reset or keep it "burned"
            // For now, it stays closed and cannot be opened again (isBurned = true)
        }, 3000); // 3s matches the faster burn-paper animation
    }

    function createAsh() {
        const ash = document.createElement('div');
        ash.className = 'ash';
        
        const rect = dossier.getBoundingClientRect();
        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;
        
        ash.style.left = startX + 'px';
        ash.style.top = startY + 'px';
        
        const destX = (Math.random() - 0.5) * 300;
        const destY = -Math.random() * 300 - 50;
        
        ash.style.setProperty('--x', destX);
        ash.style.setProperty('--y', destY);
        
        ash.style.animation = `fly-ash ${1.5 + Math.random() * 2}s forwards ease-out`;
        
        ashContainer.appendChild(ash);
        
        setTimeout(() => {
            ash.remove();
        }, 3000);
    }
});
