(function () {
  // Change this code to whatever you want
  var ACCESS_CODE = "1234"; // ← apna code yahan set karein
  var STORAGE_KEY = "__site_access_v1";
  var TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

  function allow() {
    try {
      var hide = document.getElementById("auth-hide");
      if (hide && hide.parentNode) hide.parentNode.removeChild(hide);
      document.documentElement.style.visibility = "visible";
    } catch (e) {
      document.documentElement.style.visibility = "visible";
    }
  }

  function persistAccess() {
    try {
      var payload = { ok: true, exp: Date.now() + TTL_MS };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}
  }

  function hasValidAccess() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      if (!data || !data.ok) return false;
      if (Date.now() > Number(data.exp || 0)) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  if (hasValidAccess()) {
    allow();
    return;
  }

  var input = window.prompt("Enter access code / Access code daliyey:");
  if (input === null) {
    // User cancelled — keep hidden and navigate away
    try {
      window.location.replace("about:blank");
    } catch (e) {}
    return;
  }

  if (String(input) === String(ACCESS_CODE)) {
    persistAccess();
    allow();
  } else {
    alert("Galat code. Access denied.");
    try {
      window.location.replace("about:blank");
    } catch (e) {}
  }
})();


