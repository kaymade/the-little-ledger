import { rolloverOptions, type RolloverMode } from "../data/sampleBudget";

type SettingsProps = {
  fullDate: boolean;
  onFullDateChange: (fullDate: boolean) => void;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
  onBack: () => void;
  defaultRolloverMode: RolloverMode;
  setDefaultRolloverMode: (value: RolloverMode) => void;
};

export function Settings({
  fullDate,
  onFullDateChange,
  darkMode,
  onDarkModeChange,
  onBack,
  defaultRolloverMode,
  setDefaultRolloverMode,
}: SettingsProps) {
  return (
    <main className="ledger-settings" aria-labelledby="settings-title">
      <div className="settings-header">
        <h2 id="settings-title">Settings</h2>
        <button type="button" onClick={onBack} className="settings-nav-button">
          Back
        </button>
      </div>

      <div
        className="settings-tabs"
        role="tablist"
        aria-label="Settings section"
      >
        <button
          type="button"
          className="settings-tab"
          role="tab"
          id="settings-appearance-tab"
          aria-selected={true}
          aria-controls="settings-appearance-panel"
        >
          Appearance
        </button>
      </div>

      <section
        className="settings-panel"
        id="settings-appearance-panel"
        role="tabpanel"
        aria-labelledby="settings-appearance-tab"
      >
        <label className="settings-field">
          Theme
          <span className="settings-select">
            <select
              value={darkMode ? "dark" : "light"}
              onChange={(event) =>
                onDarkModeChange(event.currentTarget.value === "dark")
              }
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </span>
        </label>
        <fieldset className="settings-date-format">
          <legend>Date Format</legend>
          <label className="settings-radio-option">
            MM/DD/YYYY
            <input
              type="radio"
              name="date-format"
              value="short"
              checked={!fullDate}
              onChange={() => onFullDateChange(false)}
            />
          </label>
          <label className="settings-radio-option">
            November 16, 2026
            <input
              type="radio"
              name="date-format"
              value="full"
              checked={fullDate}
              onChange={() => onFullDateChange(true)}
            />
          </label>
        </fieldset>
        <label className="rollover-settings">
          Budget Balance Rollover Options
          <select
            value={defaultRolloverMode}
            onChange={(event) => {
              const value = event.currentTarget.value;
              const option = rolloverOptions.find(
                (entry) => entry.value === value,
              );

              if (option) setDefaultRolloverMode(option.value);
            }}
          >
            {rolloverOptions.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>
        </label>
      </section>
    </main>
  );
}
