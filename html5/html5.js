// Web Storage példa
function saveToLocalStorage() {
  localStorage.setItem("message", document.getElementById("nameInput").value);
  alert("Adatok elmentve!");
}

function loadFromLocalStorage() {
  const message = localStorage.getItem("message") || "Nincsenek mentett adatok";
  document.getElementById("storage-output").innerText = message;
}

// Web Worker példa
let worker;
function startWorker() {
  if (typeof Worker !== "undefined") {
    if (!worker) {
      worker = new Worker("../worker.js");
      worker.onmessage = function (event) {
        document.getElementById("worker-output").innerText = event.data;
      };
    }
  } else {
    alert("A böngésződ nem támogatja a Web Worker-t!");
  }
}

// Server-Sent Events példa
if (typeof EventSource !== "undefined") {
  const eventSource = new EventSource("server.php");
  eventSource.onmessage = (event) => {
    const newElement = document.createElement("li");
    const eventList = document.getElementById("list");
  
    newElement.textContent = `message: ${event.data}`;
    eventList.appendChild(newElement);
  };
} else {
  document.getElementById("sse-output").innerText =
    "A böngésződ nem támogatja az SSE-t!";
}

// Geolocation API példa
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById(
          "geo-output"
        ).innerText = `Szélesség: ${position.coords.latitude}, Hosszúság: ${position.coords.longitude}`;
      },
      () => {
        alert("Helymeghatározás sikertelen!");
      }
    );
  } else {
    alert("A böngésződ nem támogatja a Geolocation API-t!");
  }
}

// Drag and Drop API példa
document
  .getElementById("drag-source")
  .addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", "Húzott elem");
  });

document.getElementById("drop-target").addEventListener("dragover", (event) => {
  event.preventDefault();
});

document.getElementById("drop-target").addEventListener("drop", (event) => {
  event.preventDefault();
  event.target.innerText = event.dataTransfer.getData("text");
});

// Canvas példa
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 50);
