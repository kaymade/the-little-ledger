import { PurchaseHistory } from "./components/PurchaseHistory";
import { Settings } from "./components/Settings";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [fullDate, setFullDate] = useState(
    () => localStorage.getItem("little-ledger.full-date") === "true",
  );

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("little-ledger.dark-mode");
    return saved === null
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("little-ledger.full-date", String(fullDate));
  }, [fullDate]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("little-ledger.dark-mode", String(darkMode));
  }, [darkMode]);

  return (
    <>
      <section id="center">
        <div>
          <h1>The Little Ledger</h1>
        </div>
        {!showSettings && (
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="settings-nav-button settings-open-button"
          >
            Settings
          </button>
        )}
      </section>

      <section id="current-budget" hidden={showSettings}>
        <div className="purchase-history">
          <PurchaseHistory fullDate={fullDate} />
        </div>
      </section>

      {showSettings && (
        <Settings
          fullDate={fullDate}
          onFullDateChange={setFullDate}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
          onBack={() => setShowSettings(false)}
        />
      )}
    </>
  );
}

export default App;
