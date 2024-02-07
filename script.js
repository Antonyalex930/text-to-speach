// Create a new SpeechSynthesisUtterance object to handle text-to-speech conversion
let speech = new SpeechSynthesisUtterance();

// Initialize an empty array to store available voices
let voices = [];

// Get reference to HTML elements
let voiceSelect = document.getElementById("voiceSelect");
let listenButton = document.getElementById("listenButton");
let downloadButton = document.getElementById("downloadButton");
let textToSpeechInput = document.getElementById("textToSpeechInput");

// Event handler for when the available voices change
window.speechSynthesis.onvoiceschanged = () => {
    // Update the voices array with the available voices
    voices = window.speechSynthesis.getVoices();

    // Set the default voice for speech synthesis
    speech.voice = voices[0];

    // Populate the voice selection dropdown with available voices
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

// Event listener for when the user changes the selected voice
voiceSelect.addEventListener("change", () => {
    // Set the voice for speech synthesis based on the selected option
    speech.voice = voices[voiceSelect.value];
});

// Event listener for when the user clicks the listen button
listenButton.addEventListener("click", () => {
    // Set the text to be spoken to the value in the input field
    speech.text = textToSpeechInput.value;

    // Start speech synthesis with the specified text
    window.speechSynthesis.speak(speech);

    // Show the download button after speech synthesis is initiated
    downloadButton.style.display = "inline";
});

// Event listener for when the user clicks the download button
downloadButton.addEventListener("click", () => {
    // Create an audio element to play the speech
    let audio = new Audio(URL.createObjectURL(new Blob([speech.text], { type: 'audio/mp3' })));

    // Set the download link to the generated audio file
    let downloadLink = document.getElementById("downloadButton");
    downloadLink.href = audio.src;

    // Simulate a click on the download link to trigger the download
    downloadLink.click();
});
