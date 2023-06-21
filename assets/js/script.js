document.addEventListener("DOMContentLoaded", function () {
  // ----------------------------------------------------------------------Stopwatch variables

  let stopwatchInterval;
  let stopwatchSeconds = 0;
  let lapTimes = [0];
  let lapCounter = 0;

  // ----------------------------------------------------------------------Lap and kg counter variables

  let kgCounter = 0;

  // -----------------------------------------------------------------------Notes variables

  const noteForm = document.getElementById("noteForm");
  const noteInput = document.getElementById("noteInput");
  const noteList = document.getElementById("noteList");

  // -----------------------------------------------------------------------Stopwatch functions

  function startStopwatch() {
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    document.getElementById("startButton").disabled = true;
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    document.getElementById("startButton").disabled = false;
  }

  function updateStopwatch() {
    stopwatchSeconds++;
    const hours = Math.floor(stopwatchSeconds / 3600);
    const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
    const seconds = stopwatchSeconds % 60;
    document.getElementById("stopwatchDisplay").textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  // -----------------------------------------------------------------------------------Lap counter function

  function incrementCounter() {
    lapCounter++;
    document.getElementById("lapCounterDisplay").textContent =
      lapCounter.toString();
    calculateLapTimes();
  }

  function calculateLapTimes() {
    if (lapCounter > 1) {
      const currentLapTime = stopwatchSeconds;
      const lapTimeDifference = currentLapTime - lastLapTime;
      lapTimes.push(lapTimeDifference);
      lastLapTime = currentLapTime;

      const lapTimesList = document.getElementById("lapTimesList");
      const li = document.createElement("li");
      li.textContent = `Lap ${lapCounter}: ${formatTime(
        currentLapTime
      )} (Difference: ${formatTime(lapTimeDifference)})`;
      lapTimesList.appendChild(li);
    } else {
      lastLapTime = stopwatchSeconds;
    }
  }

  // -------------------------------------------------------------------------Kilogram counter function

  function incrementKilograms() {
    kgCounter++;
    document.getElementById("kgCounterDisplay").textContent = `${kgCounter}kg`;
  }

  // -------------------------------------------------------------------------Note function

  function addNote() {
    const noteText = noteInput.value;
    if (noteText !== "") {
      const li = document.createElement("li");
      li.textContent = noteText;
      noteList.appendChild(li);
      noteInput.value = "";
    }
  }

  // -----------------------------------------------------------------------Reset function

  function resetAll() {
    stopwatchSeconds = 0;
    clearInterval(stopwatchInterval);
    document.getElementById("stopwatchDisplay").textContent = "00:00:00";
    document.getElementById("startButton").disabled = false;

    lapCounter = 0;
    document.getElementById("lapCounterDisplay").textContent = "0";

    lapTimes = [0];
    const lapTimesList = document.getElementById("lapTimesList");
    while (lapTimesList.firstChild) {
      lapTimesList.firstChild.remove();
    }

    kgCounter = 0;
    document.getElementById("kgCounterDisplay").textContent = "0kg";

    noteForm.reset();
    const noteList = document.getElementById("noteList");
    while (noteList.firstChild) {
      noteList.firstChild.remove();
    }
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours
      .toString()
      .padStart(
        2,
        "0"
      )}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // ------------------------------------------------------------------------------Event listeners

  document
    .getElementById("startButton")
    .addEventListener("click", startStopwatch);
  document
    .getElementById("stopButton")
    .addEventListener("click", stopStopwatch);
  document
    .getElementById("lapButton")
    .addEventListener("click", incrementCounter);
  document
    .getElementById("kgButton")
    .addEventListener("click", incrementKilograms);
  document.getElementById("addNoteButton").addEventListener("click", addNote);
  document.getElementById("resetButton").addEventListener("click", resetAll);
});
