let currentSongPath = "/audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3";
let currentSongName = "Sugar";
let song;
let fft;
let time = 0;
let bgImage;

// Map of song paths to song names
const songNames = {
    "/audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3": "Sugar",
    "/audio/Suite-Pee.mp3": "Suite Pee",
    "/audio/Know.mp3": "Know",
    "/audio/Suggestions.mp3": "Suggestions",
    "/audio/Spiders.mp3": "Spiders",
    "/audio/DDevil.mp3": "DDevil",
    "/audio/Soil.mp3": "Soil",
    "/audio/War_.mp3": "War?",
    "/audio/Peephole.mp3": "Peephole",
    "/audio/CUBErt.mp3": "CUBErt",
    "/audio/Darts.mp3": "Darts",
    "/audio/P.L.U.C.K..mp3": "P.L.U.C.K.",
    "/audio/Sugar(Live-at-Irving-Plaza,NYC,NY-January-1999).mp3": "Sugar (Live - 1999)",
    "/audio/War_ (Live-1999).mp3": "War? (Live - 1999)",
    "/audio/Suite-Pee(Live-1999).mp3": "Suite Pee (Live - 1999)",
    "/audio/Know(Live-1999).mp3": "Know (Live - 1999)",
    "/audio/Marmalade.mp3": "Marmalade"
};

function preload() {
    soundFormats("mp3");
    song = loadSound(currentSongPath);
    bgImage = loadImage("./img/SOAD-deluxe.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT(0.8, 256);
    fft.setInput(song);
    noFill();

    // Disable scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Setup songs dropdown
    setupSongsMenu();
}

function setupSongsMenu() {
    const songsBtn = document.getElementById('songsBtn');
    const songsList = document.getElementById('songsList');
    const songOptions = document.querySelectorAll('.song-option');

    // Toggle dropdown on button click
    songsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        songsList.classList.toggle('active');
    });

    // Handle song selection
    songOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            const newPath = this.getAttribute('data-path');
            changeSong(newPath);
            songsList.classList.remove('active');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
        songsList.classList.remove('active');
    });
}

function changeSong(newPath) {
    currentSongPath = newPath;
    currentSongName = songNames[newPath] || "Unknown";

    // Update the now playing display
    document.getElementById('currentSong').textContent = currentSongName;

    // Stop current song
    if (song && song.isPlaying()) {
        song.stop();
    }

    // Load new song
    song = loadSound(currentSongPath, function () {
        fft.setInput(song);
    });
}

function draw() {
    background(0);

    // Add image on top with transparency (optional)
    tint(255, 100); // 100 = transparency level (0-255)
    image(bgImage, 100, 0, 500, 500);
    noTint(); // Reset tint so waves aren't affected

    const spectrum = fft.analyze();

    // Divide spectrum into 4 frequency bands
    const quarterSize = spectrum.length / 4;

    // Bass (lowest frequencies)
    const bass = spectrum.slice(0, quarterSize);

    // Lows
    const lows = spectrum.slice(quarterSize, quarterSize * 2);

    // Mids
    const mids = spectrum.slice(quarterSize * 2, quarterSize * 3);

    // Highs
    const highs = spectrum.slice(quarterSize * 3);

    strokeWeight(2);

    // Draw all 4 waves overlapping at same center - higher up
    stroke(255, 0, 0, 200);
    drawAggressiveWave(bass, height * 0.2);

    stroke(255, 0, 0, 150);
    drawAggressiveWave(lows, height * 0.2);

    stroke(255, 0, 0, 100);
    drawAggressiveWave(mids, height * 0.2);

    stroke(255, 0, 0, 80);
    drawAggressiveWave(highs, height * 0.2);

    time += 0.05;
}

function drawAggressiveWave(frequencyBand, yOffset) {
    beginShape();

    for (let x = 0; x < width; x += 2) {
        // Map x position to frequency band index
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];

        // Use actual frequency data - removed time component for no horizontal movement
        let y = yOffset + sin(x * 0.02) * (freqValue * 1) + (freqValue * 0.5);

        // Water pushing effect - if mouse is near, push the wave away
        const distance = dist(x, y, mouseX, mouseY);
        const pushRadius = 200;

        if (distance < pushRadius) {
            const pushForce = map(distance, 0, pushRadius, 80, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }

        vertex(x, y);
    }

    endShape();
}

function mousePressed() {
    userStartAudio();

    if (song && song.isLoaded()) {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.play();
        }
    }
}