//source audio file
//const BARS_AUDIO_PATH = "/audio/Copyright-Free-Creepy-Music-Haunted-by-Ross-Bugden.mp3"

//p5.SoundFile instance controlled by user interaction
//let barsSong;

//FFT analyzer for frequency bins
//let barsFft;

//Amplitude analyzer for global volume
//let barsAmplitude;

//const barBins = 64;

//function preload() {
    //soundFormats("mp3");
    //song = loadSound(BARS_AUDIO_PATH);

//}

//function setup() {
    //createCanvas(windowWidth, windowHeight);
    //barsFft = new p5.FFT(0.88, barBins);
    //barsFft.setInput(song);
    //barsAmplitude = new p5.Amplitude();
    //barsAmplitude.setInput(song);
    //noStroke();
//}

//function draw(){
    //const spectrum = barsFft.analyze();
    //const level = barsAmplitude.getLevel();
    //background(0);

    //const margin = width * 0.08;
    //const availableWidth = width - margin * 2;
    //const barWidth = availableWidth / spectrum.length;

    //for( let i = 0; i < spectrum.length; i++){
        //const x = margin + i * barWidth;
        //const energy = spectrum[i];
        //const barHeight = map(energy, 0, 255, 10, height * 0.42);
        //fill(255, 255, 255);
        //rect(x, height/2 - barHeight, barWidth * 0.8, barHeight);
        //rect(x, height/2, barWidth * 0.8, barHeight);
    //}
//}

//function mousePressed() {
   // userStartAudio();
 //   if (song.isLoaded()) return song.play();
//}