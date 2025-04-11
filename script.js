document.addEventListener("DOMContentLoaded", () => {
  const maxDegree = 180;

  for (let i = 0; i <= maxDegree; i += 10) {
    const degdiv = document.createElement("div");
    degdiv.className = "degr";
    degdiv.style.transform = `rotate(${i}deg)`;
    degdiv.id = `d${i}`;

    if (i === 0) {
      degdiv.style.width = 30 + "vh";
      degdiv.style.zIndex = "4";
      degdiv.style.backgroundColor = "hsl(120, 100%, 50%)";
    }

    const gauge = document.getElementById("gauge");
    if (gauge) gauge.appendChild(degdiv);
  }
});

async function startNoiseDetection() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    microphone.connect(analyser);

    function changeColor(bas) {
      const maxDegree = 180;

      for (let x = 10; x <= maxDegree; x += 10) {
        const elem = document.getElementById(`d${x}`);
        if (!elem) continue;

        if (x <= bas) {
          let percent = x / maxDegree;
          let hue = 120 - percent * 120;
          elem.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        } else {
          elem.style.backgroundColor = "black";
        }
      }
    }

    function updateNoiseLevel() {
      analyser.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      const avg = sum / dataArray.length;
      const noiseLevel = Math.round(avg);

      const levelElem = document.getElementById("level");
      const statusElem = document.getElementById("status");
      const needleElem = document.getElementById("needle");

      if (levelElem) levelElem.innerText = noiseLevel;
      if (statusElem)
        statusElem.innerText =
          noiseLevel < 20 ? "Quiet" : noiseLevel < 50 ? "Moderate" : "Loud";

      const degree = (noiseLevel * 18) / 10;
      const roundedDeg = Math.round(degree / 10) * 10;

      changeColor(roundedDeg);

      if (needleElem) {
        needleElem.style.transform = `rotate(${degree}deg)`;
      }

      requestAnimationFrame(updateNoiseLevel);
    }

    updateNoiseLevel();
  } catch (error) {
    alert("Microphone access denied!");
    console.error(error);
  }
}
