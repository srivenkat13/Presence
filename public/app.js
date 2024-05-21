const socket = io();

socket.on("connect", () => {
  console.log("Connected to the WebSocket server");
});

socket.on("new-update", (update) => {
  console.log("Received update:", update); // Log the received update
  displayUpdate(update);
  displayTime();
});

if ("Notification" in window && navigator.serviceWorker) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}

function displayUpdate(update) {
  const updatesSection = document.getElementById("updates");
  const updateElement = document.createElement("div");
  updateElement.className = "update";
  const timestamp = new Date(update.timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });
  updateElement.innerHTML = `<span class="timestamp">${timestamp}</span> : ${update.message}`;
  updatesSection.appendChild(updateElement);

  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg) {
        reg.showNotification("New Activity Update", {
          body: update.message,
          icon: "/icons/icon-192x192.png",
        });
      }
    });
  }
}

function displayTime() {
  const lastUpdatedEle = document.getElementById("lastUpdated");
  const now = new Date();
  const timestamp = now.toLocaleTimeString();
  lastUpdatedEle.textContent = `Last Update: ${timestamp}`;
}
