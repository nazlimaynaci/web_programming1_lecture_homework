function saveToStorage() {
    const value = document.getElementById('storageInput').value;
    localStorage.setItem('myData', value);
    alert('Saved to localStorage!');
  }
  
  function loadFromStorage() {
    const saved = localStorage.getItem('myData');
    document.getElementById('storageOutput').innerText = saved || 'No data found.';
  }
  
  
  async function getLocation() {
    if ('geolocation' in navigator) {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            document.getElementById("locationOutput").innerText =
                `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        } catch (error) {
            document.getElementById("locationOutput").innerText = "Permission denied or unavailable.";
        }
    } else {
        document.getElementById("locationOutput").innerText = "Geolocation is not supported.";
    }
}
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const dragged = document.getElementById(data);
    ev.target.appendChild(dragged);
  }
  function startWorker() {
    if (window.Worker) {
      const worker = new Worker('worker.js');
      worker.postMessage('Nazlım');
      worker.onmessage = function(e) {
        document.getElementById('workerOutput').innerText = e.data;
      };
    } else {
      document.getElementById('workerOutput').innerText = 'Web Worker desteklenmiyor.';
    }
  }
  
  
  window.onload = () => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(20, 20, 150, 50);
  };