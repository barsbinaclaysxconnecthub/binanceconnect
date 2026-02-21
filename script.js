// =====================================
// BINANCE-STYLE SCRIPT.JS (FULL VERSION)
// Theme + Trading Engine + Wallet Logic
// =====================================


/* =====================================
   PERSISTENT THEME (BINANCE STYLE)
===================================== */

// Default theme handling
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  document.body.classList.remove("dark");
} else {
  document.body.classList.add("dark");
  document.body.classList.remove("light");
}

// Theme toggle function (global)
function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );

  updateThemeText();
}

// Update toggle button text/icon
function updateThemeText() {
  const themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return;

  themeBtn.textContent = document.body.classList.contains("light")
    ? "🌙 Dark"
    : "☀️ Light";
}


/* =====================================
   TRADING ENGINE (SIMULATION)
===================================== */

let balance = parseFloat(localStorage.getItem("balance")) || 500;
let trading = localStorage.getItem("trading") === "true";
let hold = false;

// Start / Stop trading
function startStopTrade() {
  trading = !trading;
  localStorage.setItem("trading", trading);
}

// Hold / Continue trading
function holdContinue() {
  hold = !hold;
}

// Simulate market movement
function simulateTrade() {
  if (!trading || hold) return;

  const balanceEl = document.getElementById("balance");
  if (!balanceEl) return;

  let change = (Math.random() - 0.5) * 20;
  balance += change;

  localStorage.setItem("balance", balance);
  balanceEl.innerText = "$" + balance.toFixed(2);

  // Binance-style blink feedback
  if (change > 0) {
    balanceEl.classList.remove("blink-red");
    balanceEl.classList.add("blink-green");
  } else {
    balanceEl.classList.remove("blink-green");
    balanceEl.classList.add("blink-red");
  }

  // Remove blink after animation
  setTimeout(() => {
    balanceEl.classList.remove("blink-green", "blink-red");
  }, 600);
}

// Market updates every 3s
setInterval(simulateTrade, 3000);


/* =====================================
   PAGE-SAFE DOM LOGIC
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const activateBtn = document.getElementById("activateBtn");
  const depositBtn  = document.getElementById("depositBtn");
  const statusText  = document.getElementById("status");
  const themeBtn    = document.getElementById("themeToggle");
  const balanceEl   = document.getElementById("balance");

  // Apply stored balance on load
  if (balanceEl) {
    balanceEl.innerText = "$" + balance.toFixed(2);
  }

  // Theme toggle button
  if (themeBtn) {
    updateThemeText();
    themeBtn.addEventListener("click", toggleTheme);
  }

  /* ===== WALLET FEATURES (DASHBOARD ONLY) ===== */
  if (activateBtn && depositBtn && statusText) {

    activateBtn.addEventListener("click", () => {
      statusText.textContent =
        "Make your first deposit to activate your wallet";
      statusText.className = "status error";

      setTimeout(() => {
        window.location.href = "deposit.html";
      }, 1800);
    });

    depositBtn.addEventListener("click", () => {
      statusText.textContent =
        "Redirecting to withdrawal department...";
      statusText.className = "status success";

      setTimeout(() => {
        window.location.href = "withdrawal.html";
      }, 1500);
    });

  }

});
