let synth = window.speechSynthesis;
let voices = [];
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

// Initialize speech synthesis
function initSpeechSynth() {
    voices = synth.getVoices();
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '';
    
    voices.forEach((voice, index) => {
        const option = new Option(voice.name, index);
        voiceSelect.add(option);
    });
}

// Initialize when voices are loaded
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = initSpeechSynth;
}

// Update display values
document.getElementById('rate').addEventListener('input', (e) => {
    document.getElementById('rateValue').textContent = e.target.value;
});

document.getElementById('pitch').addEventListener('input', (e) => {
    document.getElementById('pitchValue').textContent = e.target.value;
});

// Update emotion and topic indicators
document.getElementById('emotionSelect').addEventListener('change', (e) => {
    document.getElementById('currentEmotion').textContent = `Current Style: ${e.target.options[e.target.selectedIndex].text}`;
});

document.getElementById('topicSelect').addEventListener('change', (e) => {
    document.getElementById('topicIndicator').textContent = `Subject: ${e.target.options[e.target.selectedIndex].text}`;
});

// Start recording and speaking
document.getElementById('speakButton').addEventListener('click', async () => {
    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                addRecordingToList(audioUrl);
            };

            mediaRecorder.start();
            isRecording = true;
            speak();
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    }
});

// Speak function
function speak() {
    const text = document.getElementById('textInput').value;
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voiceSelect = document.getElementById('voiceSelect');
    utterance.voice = voices[voiceSelect.value];
    
    utterance.rate = parseFloat(document.getElementById('rate').value);
    utterance.pitch = parseFloat(document.getElementById('pitch').value);

    utterance.onend = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            isRecording = false;
        }
    };

    synth.speak(utterance);
}

// Pause button
document.getElementById('pauseButton').addEventListener('click', () => {
    if (synth.speaking) {
        if (synth.paused) {
            synth.resume();
        } else {
            synth.pause();
        }
    }
});

// Stop button
document.getElementById('stopButton').addEventListener('click', () => {
    synth.cancel();
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
    }
});

// Add recording to list// Add this function to create a download button for each recording
function addRecordingToList(audioUrl) {
    const recordingsList = document.getElementById('recordingsList');
    const recordingItem = document.createElement('div');
    recordingItem.className = 'recording-item mb-2';
    
    const timestamp = new Date().toLocaleTimeString();
    const voiceUsed = document.getElementById('voiceSelect').options[document.getElementById('voiceSelect').selectedIndex].text;
    
    recordingItem.innerHTML = `
        <div class="d-flex align-items-center flex-wrap">
            <audio controls src="${audioUrl}" class="me-2"></audio>
            <span class="text-muted me-2">${timestamp}</span>
            <span class="badge bg-info me-2">Voice: ${voiceUsed}</span>
            <a href="${audioUrl}" download="recording_${timestamp}.wav" class="btn btn-sm btn-success me-2">
                <i class="fas fa-download"></i> Download
            </a>
            <button class="btn btn-sm btn-outline-danger" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    recordingsList.appendChild(recordingItem);
}
