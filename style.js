// ===============================
// BINANCE-STYLE INTERACTIONS
// Theme System + Wallet Logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const activateBtn = document.getElementById("activateBtn");
  const depositBtn  = document.getElementById("depositBtn");
  const statusText  = document.getElementById("status");
  const themeBtn    = document.getElementById("themeToggle");

  /* ===============================
     THEME SYSTEM
  =============================== */

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if(savedTheme){
    document.body.classList.toggle("light", savedTheme === "light");
  } else {
    document.body.classList.toggle("light", !systemDark);
  }

  updateThemeText();

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const mode = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", mode);
    updateThemeText();
  });

  function updateThemeText(){
    themeBtn.textContent = document.body.classList.contains("light")
      ? "🌙 Dark"
      : "☀️ Light";
  }

  /* ===============================
     WALLET ACTIONS
  =============================== */

  activateBtn.addEventListener("click", () => {
    statusText.textContent = "Make your first deposit to activate your wallet";
    statusText.className = "status error";

    setTimeout(() => {
      window.location.href = "deposit.html";
    }, 1800);
  });

  depositBtn.addEventListener("click", () => {
    statusText.textContent = "Redirecting to withdrawal department...";
    statusText.className = "status success";

    setTimeout(() => {
      window.location.href = "withdrawal.html";
    }, 1500);
  });

});
