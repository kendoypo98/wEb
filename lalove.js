const dateSection = document.getElementById('dateSection');
const heartSection = document.getElementById('heartSection');
const apologySection = document.getElementById('apologySection');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heart = document.getElementById('heart');
const messagePopup = document.getElementById('messagePopup');
const overlay = document.getElementById('overlay');
const nextBtn = document.getElementById('nextBtn');
const forgiveYes = document.getElementById('forgiveYes');
const forgiveNo = document.getElementById('forgiveNo');
const gifContainer = document.getElementById('gifContainer');
const apologyButtons = document.getElementById('apologyButtons');
const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');

let noClickCount = 0;
let isMusicPlaying = false;

// Auto-play music when page loads (with user interaction)
window.addEventListener('load', function() {
    // Try to play music automatically
    playMusic();
});

// Function to play music
function playMusic() {
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicIcon.textContent = '🔊';
        musicToggle.classList.remove('muted');
    }).catch((error) => {
        // Autoplay was prevented, wait for user interaction
        console.log('Autoplay prevented. Music will start on first interaction.');
        isMusicPlaying = false;
        musicIcon.textContent = '🔇';
        musicToggle.classList.add('muted');
    });
}

// Start music on first user interaction
document.body.addEventListener('click', function startMusic() {
    if (!isMusicPlaying) {
        playMusic();
    }
    // Remove listener after first click
    document.body.removeEventListener('click', startMusic);
}, { once: true });

// Music toggle button
musicToggle.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent triggering the body click listener

    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicIcon.textContent = '🔇';
        musicToggle.classList.add('muted');
    } else {
        playMusic();
    }
});

// Date question interaction
noBtn.addEventListener('click', function() {
    noClickCount++;

    // Make Yes button bigger and No button smaller
    const yesScale = 1 + (noClickCount * 0.15);
    const noScale = Math.max(0.3, 1 - (noClickCount * 0.15));

    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.transform = `scale(${noScale})`;

    if (noClickCount >= 5) {
        noBtn.style.display = 'none';
    }
});

yesBtn.addEventListener('click', function() {
    dateSection.classList.remove('active');
    heartSection.classList.add('active');
});

// Heart click shows message
heart.addEventListener('click', function() {
    overlay.classList.add('show');
    messagePopup.classList.add('show');
    envelope.classList.remove('open'); // Ensure envelope starts closed
});

// Next button goes to apology section
nextBtn.addEventListener('click', function() {
    overlay.classList.remove('show');
    messagePopup.classList.remove('show');
    heartSection.classList.remove('active');
    apologySection.classList.add('active');
});

// Apology Yes - show happy cat gif and heart
forgiveYes.addEventListener('click', function() {
    gifContainer.innerHTML = `
        <img src="5768b458d6c9c38676bfade7df010944.gif" alt="Yay cat">
        <div style="font-size: 3rem; margin-top: 1rem;">❤️</div>
        <p style="margin-top: 1rem; color: #ff69b4; font-size: 1.2rem; font-weight: bold;">Thank you! I love you! 💕</p>
    `;
    apologyButtons.style.display = 'none';
});

// Apology No - show sad gif and please forgive me button
forgiveNo.addEventListener('click', function() {
    gifContainer.innerHTML = `
        <img src="d7f587da442a54025daf47091fe26ba0.gif" alt="Sad cat">
        <button class="forgive-plea-btn" id="forgivePleaBtn">Sakit mo naman🥺</button>
    `;
    apologyButtons.style.display = 'none';

    // Add click handler for the plea button
    const forgivePleaBtn = document.getElementById('forgivePleaBtn');
    forgivePleaBtn.addEventListener('click', function() {
        // Show happy response when they click the plea button
        gifContainer.innerHTML = `
            <img src="5768b458d6c9c38676bfade7df010944.gif" alt="Yay cat">
            <div style="font-size: 3rem; margin-top: 1rem;">❤️</div>
            <p style="margin-top: 1rem; color: #ff69b4; font-size: 1.2rem; font-weight: bold;">Yieee batiii naaa, I love youuuu! 💕</p>
        `;
    });
});

// Envelope open/close functionality
openBtn.addEventListener('click', function() {
    envelope.classList.add('open');
});

closeBtn.addEventListener('click', function() {
    envelope.classList.remove('open');
});

// Close popup when clicking overlay
overlay.addEventListener('click', function() {
    overlay.classList.remove('show');
    messagePopup.classList.remove('show');
    envelope.classList.remove('open');
});
