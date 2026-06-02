let currentSongPath = "audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3";
let currentSongName = "Sugar (Official HD Video)";
let currentWaveStyle = "aggressive";
let song;
let fft;
let time = 0;
let bgImage;

// Map of song paths to song names
const songNames = {
    "audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3": "Sugar (Official HD Video)",
    "audio/Suite-Pee.mp3": "Suite Pee",
    "audio/Know.mp3": "Know",
    "audio/Suggestions.mp3": "Suggestions",
    "audio/Spiders.mp3": "Spiders",
    "audio/DDevil.mp3": "DDevil",
    "audio/Soil.mp3": "Soil",
    "audio/War_.mp3": "War?",
    "audio/Peephole.mp3": "Peephole",
    "audio/CUBErt.mp3": "CUBErt",
    "audio/Darts.mp3": "Darts",
    "audio/P.L.U.C.K..mp3": "P.L.U.C.K.",
    "audio/Sugar(Live-at-Irving-Plaza,NYC,NY-January-1999).mp3": "Sugar (Live - 1999)",
    "audio/War_ (Live-1999).mp3": "War? (Live - 1999)",
    "audio/Suite-Pee(Live-1999).mp3": "Suite Pee (Live - 1999)",
    "audio/Know(Live-1999).mp3": "Know (Live - 1999)",
    "audio/Marmalade.mp3": "Marmalade"
};

// Map of song paths to wave styles
const waveStyles = {
    "audio/System-Of-A-Down-Sugar-(Official-HD-Video)-(1).mp3": "aggressive",
    "audio/Suite-Pee.mp3": "bars",
    "audio/Know.mp3": "sharp",
    "audio/Suggestions.mp3": "smooth",
    "audio/Spiders.mp3": "wavy",
    "audio/DDevil.mp3": "geometric",
    "audio/Soil.mp3": "organic",
    "audio/War_.mp3": "sharp",
    "audio/Peephole.mp3": "dots",
    "audio/CUBErt.mp3": "spiral",
    "audio/Darts.mp3": "sharp",
    "audio/P.L.U.C.K..mp3": "particles",
    "audio/Sugar(Live-at-Irving-Plaza,NYC,NY-January-1999).mp3": "bold",
    "audio/War_ (Live-1999).mp3": "fractals",
    "audio/Suite-Pee(Live-1999).mp3": "minimal",
    "audio/Know(Live-1999).mp3": "geometric",
    "audio/Marmalade.mp3": "dense"
};

function preload() {
    soundFormats("mp3");
    song = loadSound(currentSongPath);
    bgImage = loadImage("./img/SOAD-deluxe.jpg");
}

// Variables for responsive background image
let bgImageWidth = 500;
let bgImageHeight = 500;
let bgImageX = 100;
let bgImageY = 100;

// Calculate responsive dimensions for background image
function calculateResponsiveImage() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const maxImgWidth = Math.min(windowWidth * 0.6, 300);
        const maxImgHeight = Math.min(windowHeight * 0.5, 300);
        bgImageWidth = maxImgWidth;
        bgImageHeight = maxImgHeight;
        bgImageX = (windowWidth - bgImageWidth) / 2;
        bgImageY = (windowHeight - bgImageHeight) / 2;
    } else {
        bgImageWidth = 500;
        bgImageHeight = 500;
        bgImageX = 100;
        bgImageY = 100;
    }
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

    // Calculate responsive background image dimensions
    calculateResponsiveImage();

    // Initialize current song display
    document.getElementById('currentSong').textContent = currentSongName;

    // Setup songs dropdown
    setupSongsMenu();

    // Handle window resize for responsive image
    window.addEventListener('resize', () => {
        calculateResponsiveImage();
        resizeCanvas(windowWidth, windowHeight);
    });
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
    image(bgImage, bgImageX, bgImageY, bgImageWidth, bgImageHeight);
    noTint();

    const spectrum = fft.analyze();
    const quarterSize = spectrum.length / 4;

    const bass = spectrum.slice(0, quarterSize);
    const lows = spectrum.slice(quarterSize, quarterSize * 2);
    const mids = spectrum.slice(quarterSize * 2, quarterSize * 3);
    const highs = spectrum.slice(quarterSize * 3);

    // Draw waves based on current style
    switch(currentWaveStyle) {
        case "bars":
            drawBars(bass, lows, mids, highs);
            break;
        case "circles":
            drawCircles(bass, lows, mids, highs);
            break;
        case "dots":
            drawDots(bass, lows, mids, highs);
            break;
        case "spiral":
            drawSpiral(bass, lows, mids, highs);
            break;
        case "particles":
            drawParticles(bass, lows, mids, highs);
            break;
        case "grid":
            drawGrid(bass, lows, mids, highs);
            break;
        case "fractals":
            drawFractals(bass, lows, mids, highs);
            break;
        case "spikes":
            drawSpikes(bass, lows, mids, highs);
            break;
        case "resonance":
            drawResonance(bass, lows, mids, highs);
            break;
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
    drawAggressiveWave(bass, height * 0.5);
    stroke(255, 0, 0, 150);
    drawAggressiveWave(lows, height * 0.5);
    stroke(255, 0, 0, 100);
    drawAggressiveWave(mids, height * 0.5);
    stroke(255, 0, 0, 80);
    drawAggressiveWave(highs, height * 0.5);
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

// SMOOTH - Elegant flowing waves (red)
function drawSmoothWaves(bass, lows, mids, highs) {
    strokeWeight(1.5);
    stroke(255, 0, 0, 200);
    drawSmoothWave(bass, height * 0.5, 0.5);
    stroke(255, 0, 0, 150);
    drawSmoothWave(lows, height * 0.5, 0.4);
    stroke(255, 0, 0, 100);
    drawSmoothWave(mids, height * 0.5, 0.3);
    stroke(255, 0, 0, 80);
    drawSmoothWave(highs, height * 0.5, 0.2);
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

// SHARP - Thin, precise waves (red)
function drawSharpWaves(bass, lows, mids, highs) {
    strokeWeight(0.8);
    stroke(255, 0, 0, 200);
    drawSharpWave(bass, height * 0.5);
    stroke(255, 0, 0, 150);
    drawSharpWave(lows, height * 0.5);
    stroke(255, 0, 0, 100);
    drawSharpWave(mids, height * 0.5);
    stroke(255, 0, 0, 80);
    drawSharpWave(highs, height * 0.5);
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

// BOLD - Thick, powerful waves (red)
function drawBoldWaves(bass, lows, mids, highs) {
    strokeWeight(4);
    stroke(255, 0, 0, 200);
    drawBoldWave(bass, height * 0.5);
    strokeWeight(3.5);
    stroke(255, 0, 0, 150);
    drawBoldWave(lows, height * 0.5);
    strokeWeight(3);
    stroke(255, 0, 0, 100);
    drawBoldWave(mids, height * 0.5);
    strokeWeight(2.5);
    stroke(255, 0, 0, 80);
    drawBoldWave(highs, height * 0.5);
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

// WAVY - Sinuous, flowing (red)
function drawWavyWaves(bass, lows, mids, highs) {
    strokeWeight(2);
    stroke(255, 0, 0, 200);
    drawWavyWave(bass, height * 0.5, 0.03);
    stroke(255, 0, 0, 150);
    drawWavyWave(lows, height * 0.5, 0.025);
    stroke(255, 0, 0, 100);
    drawWavyWave(mids, height * 0.5, 0.02);
    stroke(255, 0, 0, 80);
    drawWavyWave(highs, height * 0.5, 0.015);
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

// GEOMETRIC - Angular, structured (red)
function drawGeometricWaves(bass, lows, mids, highs) {
    strokeWeight(2);
    stroke(255, 0, 0, 200);
    drawGeometricWave(bass, height * 0.5);
    stroke(255, 0, 0, 150);
    drawGeometricWave(lows, height * 0.5);
    stroke(255, 0, 0, 100);
    drawGeometricWave(mids, height * 0.5);
    stroke(255, 0, 0, 80);
    drawGeometricWave(highs, height * 0.5);
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

// ORGANIC - Smooth, natural (red)
function drawOrganicWaves(bass, lows, mids, highs) {
    strokeWeight(2.5);
    stroke(255, 0, 0, 200);
    drawOrganicWave(bass, height * 0.5);
    stroke(255, 0, 0, 150);
    drawOrganicWave(lows, height * 0.5);
    stroke(255, 0, 0, 100);
    drawOrganicWave(mids, height * 0.5);
    stroke(255, 0, 0, 80);
    drawOrganicWave(highs, height * 0.5);
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

// PULSING - Rhythmic, breathing (red)
function drawPulsingWaves(bass, lows, mids, highs) {
    const pulse = sin(time * 0.1) * 2 + 2;
    strokeWeight(1.5 + pulse);
    stroke(255, 0, 0, 200);
    drawPulsingWave(bass, height * 0.5);
    strokeWeight(1.3 + pulse * 0.8);
    stroke(255, 0, 0, 150);
    drawPulsingWave(lows, height * 0.5);
    strokeWeight(1.1 + pulse * 0.6);
    stroke(255, 0, 0, 100);
    drawPulsingWave(mids, height * 0.5);
    strokeWeight(0.9 + pulse * 0.4);
    stroke(255, 0, 0, 80);
    drawPulsingWave(highs, height * 0.5);
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

// MINIMAL - Subtle, delicate (red)
function drawMinimalWaves(bass, lows, mids, highs) {
    strokeWeight(0.5);
    stroke(255, 0, 0, 200);
    drawMinimalWave(bass, height * 0.5);
    stroke(255, 0, 0, 150);
    drawMinimalWave(lows, height * 0.5);
    stroke(255, 0, 0, 100);
    drawMinimalWave(mids, height * 0.5);
    stroke(255, 0, 0, 80);
    drawMinimalWave(highs, height * 0.5);
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

// DENSE - Many overlapping lines (red)
function drawDenseWaves(bass, lows, mids, highs) {
    strokeWeight(0.5);
    for (let i = 0; i < 3; i++) {
        stroke(255, 0, 0, 100);
        drawDenseWave(bass, height * 0.5 - i * 5);
        drawDenseWave(lows, height * 0.5 - i * 5);
        drawDenseWave(mids, height * 0.5 - i * 5);
        drawDenseWave(highs, height * 0.5 - i * 5);
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

// BARS - Vertical equalizer bars (red)
function drawBars(bass, lows, mids, highs) {
    const barWidth = width / 64;
    stroke(255, 0, 0, 220);
    strokeWeight(1);
    
    const allFreqs = [...bass, ...lows, ...mids, ...highs];
    
    for (let i = 0; i < allFreqs.length; i++) {
        const freq = allFreqs[i];
        const x = (i / allFreqs.length) * width;
        const barHeight = map(freq, 0, 255, 10, height * 0.8);
        
        noFill();
        stroke(255, 0, 0, 200);
        rect(x, height * 0.8 - barHeight, barWidth * 0.8, barHeight);
        
        stroke(255, 100, 100, 150);
        rect(x + 2, height * 0.8 - barHeight + 2, barWidth * 0.8 - 4, barHeight - 4);
    }
}

// CIRCLES - Concentric circles (red)
function drawCircles(bass, lows, mids, highs) {
    const centerX = width / 2;
    const centerY = height * 0.5;
    noFill();
    strokeWeight(2);
    
    const avgBass = bass.reduce((a, b) => a + b) / bass.length;
    const avgLows = lows.reduce((a, b) => a + b) / lows.length;
    const avgMids = mids.reduce((a, b) => a + b) / mids.length;
    const avgHighs = highs.reduce((a, b) => a + b) / highs.length;
    
    stroke(255, 0, 0, 200);
    circle(centerX, centerY, map(avgBass, 0, 255, 50, 400));
    
    stroke(255, 0, 0, 150);
    circle(centerX, centerY, map(avgLows, 0, 255, 30, 300));
    
    stroke(255, 0, 0, 100);
    circle(centerX, centerY, map(avgMids, 0, 255, 20, 200));
    
    stroke(255, 0, 0, 80);
    circle(centerX, centerY, map(avgHighs, 0, 255, 10, 100));
}

// DOTS - Particle dots (red)
function drawDots(bass, lows, mids, highs) {
    noStroke();
    const allFreqs = [...bass, ...lows, ...mids, ...highs];
    
    for (let i = 0; i < allFreqs.length; i += 4) {
        const freq = allFreqs[i];
        const x = (i / allFreqs.length) * width;
        const y = height * 0.5 - map(freq, 0, 255, 5, 200);
        const size = map(freq, 0, 255, 2, 15);
        
        fill(255, 0, 0, map(freq, 0, 255, 100, 220));
        circle(x, y, size);
        
        fill(255, 100, 100, 100);
        circle(x, y, size * 2);
    }
}

// SPIRAL - Spiral pattern (red)
function drawSpiral(bass, lows, mids, highs) {
    const centerX = width / 2;
    const centerY = height * 0.5;
    stroke(255, 0, 0, 200);
    strokeWeight(2);
    noFill();
    
    const allFreqs = [...bass, ...lows, ...mids, ...highs];
    
    beginShape();
    for (let i = 0; i < allFreqs.length; i++) {
        const freq = allFreqs[i];
        const angle = (i / allFreqs.length) * TWO_PI * 4 + time * 0.02;
        const radius = map(freq, 0, 255, 50, 300) + map(i, 0, allFreqs.length, 0, 150);
        
        const x = centerX + cos(angle) * radius;
        const y = centerY + sin(angle) * radius;
        
        vertex(x, y);
    }
    endShape();
}

// PARTICLES - Scattered particles (red)
function drawParticles(bass, lows, mids, highs) {
    noStroke();
    const allFreqs = [...bass, ...lows, ...mids, ...highs];
    
    for (let i = 0; i < allFreqs.length; i += 2) {
        const freq = allFreqs[i];
        const x = (i / allFreqs.length) * width;
        const yVariation = sin(i * 0.05 + time * 0.05) * 100;
        const y = height * 0.5 + yVariation - map(freq, 0, 255, 0, 150);
        const size = map(freq, 0, 255, 1, 20);
        
        fill(255, 0, 0, map(freq, 0, 255, 80, 200));
        circle(x, y, size);
    }
}

// GRID - Grid pattern (red)
function drawGrid(bass, lows, mids, highs) {
    stroke(255, 0, 0, 150);
    strokeWeight(1);
    noFill();
    
    const gridSize = 30;
    const allFreqs = [...bass, ...lows, ...mids, ...highs];
    
    for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            const freqIndex = floor((x / width) * allFreqs.length);
            const freq = allFreqs[freqIndex];
            const size = map(freq, 0, 255, 5, gridSize * 0.8);
            
            stroke(255, 0, 0, map(freq, 0, 255, 80, 180));
            rect(x, y, size, size);
        }
    }
}

// FRACTALS - Fractal pattern (red)
function drawFractals(bass, lows, mids, highs) {
    const centerX = width / 2;
    const centerY = height * 0.5;
    stroke(255, 0, 0, 200);
    strokeWeight(1);
    noFill();
    
    const avgFreq = (bass.reduce((a, b) => a + b) + lows.reduce((a, b) => a + b) + 
                    mids.reduce((a, b) => a + b) + highs.reduce((a, b) => a + b)) / 
                   (bass.length + lows.length + mids.length + highs.length);
    
    const levels = map(avgFreq, 0, 255, 3, 6);
    
    for (let i = 0; i < levels; i++) {
        const size = 50 + i * 80 + sin(time * 0.05 + i) * 30;
        stroke(255, 0, 0, 200 - i * 30);
        circle(centerX, centerY, size);
    }
    
    stroke(255, 0, 0, 100);
    strokeWeight(0.5);
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * TWO_PI;
        const x1 = centerX + cos(angle) * 50;
        const y1 = centerY + sin(angle) * 50;
        const x2 = centerX + cos(angle) * 300;
        const y2 = centerY + sin(angle) * 300;
        line(x1, y1, x2, y2);
    }
}

// SPIKES - Radial spikes (red)
function drawSpikes(bass, lows, mids, highs) {
    const centerX = width / 2;
    const centerY = height * 0.5;
    const allFreqs = [...bass, ...lows, ...mids, ...highs];
    
    const numSpikes = 32;
    
    for (let i = 0; i < numSpikes; i++) {
        const angle = (i / numSpikes) * TWO_PI;
        const freqIndex = floor((i / numSpikes) * allFreqs.length);
        const freq = allFreqs[freqIndex];
        
        const length = map(freq, 0, 255, 20, 300);
        const x2 = centerX + cos(angle) * length;
        const y2 = centerY + sin(angle) * length;
        
        stroke(255, 0, 0, map(freq, 0, 255, 100, 220));
        strokeWeight(map(freq, 0, 255, 0.5, 3));
        line(centerX, centerY, x2, y2);
    }
}

// RESONANCE - Expanding rings (red)
function drawResonance(bass, lows, mids, highs) {
    const centerX = width / 2;
    const centerY = height * 0.5;
    noFill();
    
    const avgBass = bass.reduce((a, b) => a + b) / bass.length;
    const avgLows = lows.reduce((a, b) => a + b) / lows.length;
    const avgMids = mids.reduce((a, b) => a + b) / mids.length;
    const avgHighs = highs.reduce((a, b) => a + b) / highs.length;
    
    stroke(255, 0, 0, 220);
    strokeWeight(2);
    const baseRing1 = map(avgBass, 0, 255, 30, 280) + sin(time * 0.08) * 20;
    circle(centerX, centerY, baseRing1);
    
    stroke(255, 0, 0, 180);
    strokeWeight(1.8);
    const baseRing2 = map(avgLows, 0, 255, 40, 240) + sin(time * 0.06 + 1) * 25;
    circle(centerX, centerY, baseRing2);
    
    stroke(255, 0, 0, 140);
    strokeWeight(1.5);
    const baseRing3 = map(avgMids, 0, 255, 50, 200) + sin(time * 0.04 + 2) * 20;
    circle(centerX, centerY, baseRing3);
    
    stroke(255, 0, 0, 100);
    strokeWeight(1.2);
    const baseRing4 = map(avgHighs, 0, 255, 60, 150) + sin(time * 0.02 + 3) * 15;
    circle(centerX, centerY, baseRing4);
    
    stroke(255, 0, 0, 80);
    strokeWeight(0.5);
    const numLines = 16;
    for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * TWO_PI;
        const maxLength = 350;
        
        for (let len = 0; len < maxLength; len += 30) {
            const lineAlpha = map(len, 0, maxLength, 150, 20);
            stroke(255, 0, 0, lineAlpha);
            
            const x1 = centerX + cos(angle) * len;
            const y1 = centerY + sin(angle) * len;
            const x2 = centerX + cos(angle) * (len + 20);
            const y2 = centerY + sin(angle) * (len + 20);
            
            line(x1, y1, x2, y2);
        }
    }
    
    noStroke();
    fill(255, 0, 0, map(avgBass, 0, 255, 150, 255));
    const centerSize = map(avgBass, 0, 255, 8, 30) + sin(time * 0.1) * 5;
    circle(centerX, centerY, centerSize);
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