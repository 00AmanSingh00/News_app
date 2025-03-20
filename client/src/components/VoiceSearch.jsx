import React from 'react';

const VoiceSearch = ({ setQuery }) => {
  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setQuery(result);
    };

    recognition.onerror = (event) => {
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access to use voice search.');
      } else {
        console.error('Speech recognition error', event.error);
      }
    };

    recognition.start();
  };

  return (
    <button className="voice-button" onClick={startVoiceRecognition}>
      <img src="./mike_img.png" alt="voice search" width="50px" height="50px" />
    </button>
  );
};

export default VoiceSearch;
