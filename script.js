document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i <= 180; i += 10) {
      let degdiv = document.createElement("div");
      degdiv.className = "degr";
      degdiv.style.transform = `rotate(${i}deg)`;
      degdiv.id = `d${i}`;
      
      document.getElementById("gauge").appendChild(degdiv);
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
        const target = document.getElementById("d" + bas);
          let percent = bas / 180;
          let hue = 120 - percent * 120;
          target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
          let y = bas;
        for(let x = 10; `d${x}` > `d${x}`; x += 10) {
          document.getElementById(`d${x}`).style.backgroundColor = "black";
        }

      }
      
  
      function updateNoiseLevel() {
        analyser.getByteFrequencyData(dataArray);
        let sum = dataArray.reduce((a, b) => a + b, 0);
        let avg = sum / dataArray.length;
  
        let noiseLevel = Math.round(avg);
        document.getElementById("level").innerText = noiseLevel;
  
        let status = noiseLevel < 20 ? "Quiet" : noiseLevel < 50 ? "Moderate" : "Loud";
        document.getElementById("status").innerText = status;
  
        let degree = (noiseLevel * 18) / 10;
        let col = Math.round(degree / 10) * 10;
  
        changeColor(col);
  
        document.getElementById("needle").style.transform = `rotate(${degree}deg)`;
  
        requestAnimationFrame(updateNoiseLevel);
      }
  
      updateNoiseLevel();
    } catch (error) {
      alert("Microphone access denied!");
      console.error(error);
    }
  }