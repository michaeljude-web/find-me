const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");
const content = document.getElementById("content");

menuBtn.onclick = () => {
  sidebar.style.left = "0";
  overlay.style.display = "block";
};

overlay.onclick = () => {
  sidebar.style.left = "-250px";
  overlay.style.display = "none";
};

function loadHome() {
  content.innerHTML = `
    <div class="card" id="info">Detecting location...</div>
  `;
  
  fetch("http://ip-api.com/json/")
    .then(response => response.json())
    .then(data => {
      document.getElementById("info").innerHTML = `
        <h3><i class="fas fa-map-marker-alt"></i> Your IP Location</h3>
        <div class="info-item"><i class="fas fa-globe"></i>${data.query}</div>
        <div class="info-item"><i class="fas fa-flag"></i> ${data.country}</div>
        <div class="info-item"><i class="fas fa-city"></i> ${data.city}</div>
        <div class="info-item"><i class="fas fa-wifi"></i> ${data.isp}</div>
      `;
    })
    .catch(err => {
      document.getElementById("info").innerText = "❌ Error detecting location.";
      console.error(err);
    });
}

function loadPage(page) {
  sidebar.style.left = "-250px";
  overlay.style.display = "none";

  if (page === "home") {
    loadHome();
  }

  if (page === "help") {
    content.innerHTML = `
      <div class="card">
        <div class="help-item"><i class="fas fa-info-circle"></i>
          <p><b>What does this app do?</b><br>Detects your approximate location via your IP address.</p>
        </div>
        <div class="help-item"><i class="fas fa-map-marker-alt"></i>
          <p><b>Why is my location sometimes wrong?</b><br>Because IP-based detection depends on your ISP or VPN.</p>
        </div>
      </div>
    `;
  }
}

loadHome();
