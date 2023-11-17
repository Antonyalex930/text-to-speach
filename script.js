let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById("voiceSelect");
let listenButton = document.getElementById("listenButton");
let downloadButton = document.getElementById("downloadButton");
let textToSpeechInput = document.getElementById("textToSpeechInput");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

listenButton.addEventListener("click", () => {
    speech.text = textToSpeechInput.value;
    window.speechSynthesis.speak(speech);

    // Enable the download button after the speech is generated
    downloadButton.style.display = "inline";
});

downloadButton.addEventListener("click", () => {
    // Create an audio element to play the speech
    let audio = new Audio(URL.createObjectURL(new Blob([speech.text], { type: 'audio/mp3' })));

    // Trigger an automatic download by simulating a click on the link
    let downloadLink = document.getElementById("downloadButton");
    downloadLink.href = audio.src;
    downloadLink.click();
});
