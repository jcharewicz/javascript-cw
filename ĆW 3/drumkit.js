const sounds = {
  "q": new Audio("sounds/tom.wav"),
  "w": new Audio("sounds/boom.wav"),
  "e": new Audio("sounds/hihat.wav"),
  "r": new Audio("sounds/snare.wav"),
  "t": new Audio("sounds/openhat.wav"),
  "a": new Audio("sounds/tink.wav"),
  "s": new Audio("sounds/ride.wav"),
  "d": new Audio("sounds/clap.wav"),
  "f": new Audio("sounds/kick.wav")
};

let numChannels = 4;
let tracks = Array.from({ length: numChannels }, () => ({}));

let isRecording = Array.from({ length: numChannels }, () => false);
let isPlaying = Array.from({ length: numChannels }, () => false);
let currentTime = 0;

const handleInterval = () => {
  for (let i = 0; i < numChannels; i++) {
    let track = tracks[i];
    if (isRecording[i]) {
      if (recordingQueue.length > 0)
        track[currentTime] = recordingQueue.pop()
      currentTime++;
    }
    if (isPlaying[i]) {
      if (currentTime in track) {
        let key = track[currentTime];
        let sound = sounds[key]
        sound.currentTime = 0;
        sound.play();
      }
      currentTime++;
    }
  }
}

let recordingQueue = []
document.addEventListener("keypress", e => {
  let key = e.key
  let sound = sounds[key];

  if (!sound)
      return;

  sound.currentTime = 0;
  sound.play();

  let channel = parseInt(document.querySelector("#channel-select").value);
  if (isRecording[channel])
      recordingQueue.push(key)
});

document.querySelector("#toggle-recording").addEventListener("click", e => {
  let channel = parseInt(document.querySelector("#channel-select").value);
  isRecording[channel] = !isRecording[channel];
  isPlaying[channel] = false;
  e.target.value = isRecording[channel] ? "Stop Recording" : "Start Recording";
  currentTime = 0;
});

document.querySelector("#toggle-playback").addEventListener("click", (e) => {
  let channel = parseInt(document.querySelector("#channel-select").value);
  isPlaying[channel] = !isPlaying[channel];
  isRecording[channel] = false;
  e.target.value = isPlaying[channel] ? "Stop Playing" : "Start Playing";
  currentTime = 0;
});

setInterval(handleInterval, 10);