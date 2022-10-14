const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

const speechBtnDiv = document.querySelector("#speech-btn");
const micBtn = document.querySelector(".btns .fas");
const instruction = document.querySelector(".instruction");

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// Check for Browser Support
if (speechRecognition) {
  console.log("Speech Recognition is Supported");

  const recognition = new speechRecognition();
  micBtn.addEventListener("click", micBtnClicked);

  function micBtnClicked(e) {
    e.preventDefault();

    if (micBtn.classList.contains("fa-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
    // Start Speech Recognition
    recognition.addEventListener("start", () => {
      micBtn.classList.remove("fa-microphone");
      micBtn.classList.add("fa-microphone-slash");
      instruction.innerHTML = "Recording... Press Ctrl + m to stop";
      searchInput.focus();
      console.log("Speech Recognition Enabled");
    });

    // Stop Speech Recognition
    recognition.addEventListener("end", () => {
      micBtn.classList.remove("fa-microphone-slash");
      micBtn.classList.add("fa-microphone");
      instruction.innerHTML = "Press Ctrl + x or Click the Mic to Start";
      searchInput.focus();
      console.log("Speech Recognition Disabled");
    });

    // Get Result of speech Recognition
    recognition.continuous = true;
    console.log(recognition.continuous);
    // let content = "";
    recognition.addEventListener("result", (e) => {
      console.log(e);
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;

      if (transcript.toLowerCase().trim() === "stop recording") {
        recognition.stop();
      } else if (!searchInput.value) {
        searchInput.value = transcript;
      } else {
        if (transcript.toLowerCase().trim() === "search") {
          searchForm.submit();
        } else if (transcript.toLowerCase().trim() === "reset form") {
          searchInput.value = "";
        } else {
          searchInput.value = transcript;
        }
      }
    });

    // Add Keybord eventListener
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "x") {
        // e.shiftKey
        recognition.start();
      }
      if (e.ctrlKey && e.key === "m") {
        // e.shiftKey
        recognition.stop();
      }
    });
  }
} else {
  console.log("Speech Recognition is Not Supported");
  speechBtnDiv.style.visibility = "hidden";
}
