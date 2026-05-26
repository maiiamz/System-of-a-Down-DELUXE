let currentSongPath = "/audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3";
let currentSongName = "Sugar";
let currentWaveStyle = "aggressive";
let song;
let fft;
let time = 0;
let bgImage;

// Map of song paths to song names
const songNames = {
    "/audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3": "Sugar (Official HD Video)",
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

// Map of song paths to wave styles
const waveStyles = {
    "/audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3": "aggressive",
    "/audio/Suite-Pee.mp3": "smooth",
    "/audio/Know.mp3": "sharp",
    "/audio/Suggestions.mp3": "bold",
    "/audio/Spiders.mp3": "wavy",
    "/audio/DDevil.mp3": "geometric",
    "/audio/Soil.mp3": "organic",
    "/audio/War_.mp3": "pulsing",
    "/audio/Peephole.mp3": "minimal",
    "/audio/CUBErt.mp3": "dense",
    "/audio/Darts.mp3": "sharp",
    "/audio/P.L.U.C.K..mp3": "aggressive",
    "/audio/Sugar(Live-at-Irving-Plaza,NYC,NY-January-1999).mp3": "smooth",
    "/audio/War_ (Live-1999).mp3": "pulsing",
    "/audio/Suite-Pee(Live-1999).mp3": "wavy",
    "/audio/Know(Live-1999).mp3": "geometric",
    "/audio/Marmalade.mp3": "bold"
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
    currentWaveStyle = waveStyles[newPath] || "aggressive";

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

    // Add image on top with transparency
    tint(255, 100);
    image(bgImage, 100, 100, 500, 500);
    noTint();

    const spectrum = fft.analyze();
    const quarterSize = spectrum.length / 4;

    const bass = spectrum.slice(0, quarterSize);
    const lows = spectrum.slice(quarterSize, quarterSize * 2);
    const mids = spectrum.slice(quarterSize * 2, quarterSize * 3);
    const highs = spectrum.slice(quarterSize * 3);

    // Draw waves based on current style
    switch(currentWaveStyle) {
        case "smooth":
            drawSmoothWaves(bass, lows, mids, highs);
            break;
        case "sharp":
            drawSharpWaves(bass, lows, mids, highs);
            break;
        case "bold":
            drawBoldWaves(bass, lows, mids, highs);
            break;
        case "wavy":
            drawWavyWaves(bass, lows, mids, highs);
            break;
        case "geometric":
            drawGeometricWaves(bass, lows, mids, highs);
            break;
        case "organic":
            drawOrganicWaves(bass, lows, mids, highs);
            break;
        case "pulsing":
            drawPulsingWaves(bass, lows, mids, highs);
            break;
        case "minimal":
            drawMinimalWaves(bass, lows, mids, highs);
            break;
        case "dense":
            drawDenseWaves(bass, lows, mids, highs);
            break;
        default: // aggressive
            drawAggressiveWaves(bass, lows, mids, highs);
    }

    time += 0.05;
}

// AGGRESSIVE - Original style (4 overlapping red waves)
function drawAggressiveWaves(bass, lows, mids, highs) {
    strokeWeight(2);
    stroke(255, 0, 0, 200);
    drawAggressiveWave(bass, height * 0.4);
    stroke(255, 0, 0, 150);
    drawAggressiveWave(lows, height * 0.4);
    stroke(255, 0, 0, 100);
    drawAggressiveWave(mids, height * 0.4);
    stroke(255, 0, 0, 80);
    drawAggressiveWave(highs, height * 0.4);
}

function drawAggressiveWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 2) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.02) * (freqValue * 1) + (freqValue * 0.5);
        
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

// SMOOTH - Elegant flowing waves (green/cyan gradient)
function drawSmoothWaves(bass, lows, mids, highs) {
    strokeWeight(1.5);
    stroke(0, 255, 200, 200);
    drawSmoothWave(bass, height * 0.4, 0.5);
    stroke(0, 200, 255, 150);
    drawSmoothWave(lows, height * 0.4, 0.4);
    stroke(100, 200, 255, 100);
    drawSmoothWave(mids, height * 0.4, 0.3);
    stroke(150, 150, 255, 80);
    drawSmoothWave(highs, height * 0.4, 0.2);
}

function drawSmoothWave(frequencyBand, yOffset, amplitude) {
    beginShape();
    for (let x = 0; x < width; x += 3) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.01) * (freqValue * amplitude);
        
        const distance = dist(x, y, mouseX, mouseY);
        if (distance < 150) {
            const pushForce = map(distance, 0, 150, 60, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }
        vertex(x, y);
    }
    endShape();
}

// SHARP - Thin, precise waves (purple)
function drawSharpWaves(bass, lows, mids, highs) {
    strokeWeight(0.8);
    stroke(200, 100, 255, 200);
    drawSharpWave(bass, height * 0.4);
    stroke(180, 100, 255, 150);
    drawSharpWave(lows, height * 0.4);
    stroke(160, 100, 255, 100);
    drawSharpWave(mids, height * 0.4);
    stroke(140, 100, 255, 80);
    drawSharpWave(highs, height * 0.4);
}

function drawSharpWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 1) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.03) * (freqValue * 1.2);
        
        const distance = dist(x, y, mouseX, mouseY);
        if (distance < 150) {
            const pushForce = map(distance, 0, 150, 60, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }
        vertex(x, y);
    }
    endShape();
}

// BOLD - Thick, powerful waves (orange/yellow)
function drawBoldWaves(bass, lows, mids, highs) {
    strokeWeight(4);
    stroke(255, 150, 0, 200);
    drawBoldWave(bass, height * 0.4);
    strokeWeight(3.5);
    stroke(255, 180, 0, 150);
    drawBoldWave(lows, height * 0.4);
    strokeWeight(3);
    stroke(255, 200, 0, 100);
    drawBoldWave(mids, height * 0.4);
    strokeWeight(2.5);
    stroke(255, 220, 0, 80);
    drawBoldWave(highs, height * 0.4);
}

function drawBoldWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 4) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.015) * (freqValue * 0.8) + (freqValue * 0.3);
        
        const distance = dist(x, y, mouseX, mouseY);
        if (distance < 150) {
            const pushForce = map(distance, 0, 150, 60, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }
        vertex(x, y);
    }
    endShape();
}

// WAVY - Sinuous, flowing (blue/cyan)
function drawWavyWaves(bass, lows, mids, highs) {
    strokeWeight(2);
    stroke(100, 200, 255, 200);
    drawWavyWave(bass, height * 0.4, 0.03);
    stroke(50, 200, 255, 150);
    drawWavyWave(lows, height * 0.4, 0.025);
    stroke(100, 180, 255, 100);
    drawWavyWave(mids, height * 0.4, 0.02);
    stroke(150, 150, 255, 80);
    drawWavyWave(highs, height * 0.4, 0.015);
}

function drawWavyWave(frequencyBand, yOffset, waveFreq) {
    beginShape();
    for (let x = 0; x < width; x += 2) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * waveFreq) * (freqValue * 1.2) + cos(x * 0.005) * (freqValue * 0.4);
        
        const distance = dist(x, y, mouseX, mouseY);
        if (distance < 150) {
            const pushForce = map(distance, 0, 150, 60, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }
        vertex(x, y);
    }
    endShape();
}

// GEOMETRIC - Angular, structured (lime green)
function drawGeometricWaves(bass, lows, mids, highs) {
    strokeWeight(2);
    stroke(150, 255, 0, 200);
    drawGeometricWave(bass, height * 0.4);
    stroke(120, 255, 0, 150);
    drawGeometricWave(lows, height * 0.4);
    stroke(90, 255, 0, 100);
    drawGeometricWave(mids, height * 0.4);
    stroke(60, 255, 0, 80);
    drawGeometricWave(highs, height * 0.4);
}

function drawGeometricWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 5) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + (freqValue * 0.8) * (x % 20 < 10 ? 1 : -1);
        vertex(x, y);
    }
    endShape();
}

// ORGANIC - Smooth, natural (teal)
function drawOrganicWaves(bass, lows, mids, highs) {
    strokeWeight(2.5);
    stroke(0, 200, 200, 200);
    drawOrganicWave(bass, height * 0.4);
    stroke(50, 200, 180, 150);
    drawOrganicWave(lows, height * 0.4);
    stroke(100, 180, 200, 100);
    drawOrganicWave(mids, height * 0.4);
    stroke(150, 160, 200, 80);
    drawOrganicWave(highs, height * 0.4);
}

function drawOrganicWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 2) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.008) * 30 + (freqValue * 0.6);
        
        const distance = dist(x, y, mouseX, mouseY);
        if (distance < 150) {
            const pushForce = map(distance, 0, 150, 60, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }
        vertex(x, y);
    }
    endShape();
}

// PULSING - Rhythmic, breathing (pink/magenta)
function drawPulsingWaves(bass, lows, mids, highs) {
    const pulse = sin(time * 0.1) * 2 + 2;
    strokeWeight(1.5 + pulse);
    stroke(255, 100, 200, 200);
    drawPulsingWave(bass, height * 0.4);
    strokeWeight(1.3 + pulse * 0.8);
    stroke(255, 80, 200, 150);
    drawPulsingWave(lows, height * 0.4);
    strokeWeight(1.1 + pulse * 0.6);
    stroke(255, 60, 200, 100);
    drawPulsingWave(mids, height * 0.4);
    strokeWeight(0.9 + pulse * 0.4);
    stroke(255, 40, 200, 80);
    drawPulsingWave(highs, height * 0.4);
}

function drawPulsingWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 2) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.02) * (freqValue * 0.9) + sin(time * 0.05) * 10;
        
        const distance = dist(x, y, mouseX, mouseY);
        if (distance < 150) {
            const pushForce = map(distance, 0, 150, 60, 0);
            const angle = atan2(y - mouseY, x - mouseX);
            y += cos(angle) * pushForce;
        }
        vertex(x, y);
    }
    endShape();
}

// MINIMAL - Subtle, delicate (light gray)
function drawMinimalWaves(bass, lows, mids, highs) {
    strokeWeight(0.5);
    stroke(200, 200, 200, 200);
    drawMinimalWave(bass, height * 0.4);
    stroke(180, 180, 180, 150);
    drawMinimalWave(lows, height * 0.4);
    stroke(160, 160, 160, 100);
    drawMinimalWave(mids, height * 0.4);
    stroke(140, 140, 140, 80);
    drawMinimalWave(highs, height * 0.4);
}

function drawMinimalWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 4) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.01) * (freqValue * 0.3);
        vertex(x, y);
    }
    endShape();
}

// DENSE - Many overlapping lines (bright white)
function drawDenseWaves(bass, lows, mids, highs) {
    strokeWeight(0.5);
    for (let i = 0; i < 3; i++) {
        stroke(255, 255, 255, 80);
        drawDenseWave(bass, height * 0.4 - i * 5);
        drawDenseWave(lows, height * 0.4 - i * 5);
        drawDenseWave(mids, height * 0.4 - i * 5);
        drawDenseWave(highs, height * 0.4 - i * 5);
    }
}

function drawDenseWave(frequencyBand, yOffset) {
    beginShape();
    for (let x = 0; x < width; x += 1) {
        const bandIndex = floor(map(x, 0, width, 0, frequencyBand.length - 1));
        const freqValue = frequencyBand[bandIndex];
        let y = yOffset + sin(x * 0.02) * (freqValue * 0.7);
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