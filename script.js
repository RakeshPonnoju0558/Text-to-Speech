document.addEventListener('DOMContentLoaded', function() {
    const maleButton = document.getElementById('speak-male');
    const femaleButton = document.getElementById('speak-female');
    const textInput = document.getElementById('text');
    let voices = [];

    function populateVoices() {
        voices = speechSynthesis.getVoices();
    }

    populateVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
    }

    function speakText(gender) {
        const text = textInput.value;
        const utterance = new SpeechSynthesisUtterance(text);

        if (gender === 'female') {
            const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Alice') || voice.name.includes('Google UK English Female'));
            utterance.voice = femaleVoice ? femaleVoice : voices[0];
        } else {
            const maleVoice = voices.find(voice => voice.name.includes('Male') || voice.name.includes('Google UK English Male'));
            utterance.voice = maleVoice ? maleVoice : voices[0];
        }

        speechSynthesis.speak(utterance);
    }

    maleButton.addEventListener('click', () => speakText('male'));
    femaleButton.addEventListener('click', () => speakText('female'));
});
