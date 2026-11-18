import { PurchaseHistory } from "./components/PurchaseHistory";
import { Settings } from "./components/Settings";
import "./App.css";
import { samplePurchases } from "./data/samplePurchases";
import { useEffect, useState } from "react";
import {
  sampleBudget,
  rolloverOptions,
  type RolloverMode,
  type Budget,
  type BudgetFormValues,
} from "./data/sampleBudget";
import { getPurchaseLabel } from "./data/purchaseLabels";
import { BudgetForm } from "./components/BudgetForm";
import { getBudgetTotals, renewBudget } from "./utils/budgetRenewal";
import { getLocalDateString } from "./utils/budgetPeriods";

function App() {
  const [budgets, setBudgets] = useState(sampleBudget);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const [budgetFormMode, setBudgetFormMode] = useState<"add" | "edit" | null>(
    null,
  );
  const [purchaseHistory, setPurchaseHistory] = useState(samplePurchases);
  const [defaultRolloverMode, setDefaultRolloverMode] = useState<RolloverMode>(
    () => {
      const saved = localStorage.getItem("little-ledger.default-rollover-mode");

      return (
        rolloverOptions.find((option) => option.value === saved)?.value ?? "off"
      );
    },
  );

  const [showSettings, setShowSettings] = useState(false);
  const [fullDate, setFullDate] = useState(
    () => localStorage.getItem("little-ledger.full-date") === "true",
  );

  const [today, setToday] = useState(() => getLocalDateString(new Date()));

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

  useEffect(() => {
    localStorage.setItem(
      "little-ledger.default-rollover-mode",
      defaultRolloverMode,
    );
  }, [defaultRolloverMode]);

  useEffect(() => {
    if (budgetFormMode !== null) return;

    function checkBudgetRenewals() {
      const day = getLocalDateString(new Date());
      setToday(day);

      setBudgets((current) => {
        const next = current.map((budgets) =>
          renewBudget(budgets, purchaseHistory, day),
        );

        const changed = next.some((budget, index) => budget !== current[index]);

        return changed ? next : current;
      });
    }

    const firstCheck = window.setTimeout(checkBudgetRenewals, 0);
    const interval = window.setInterval(checkBudgetRenewals, 60_000);

    window.addEventListener("focus", checkBudgetRenewals);

    return () => {
      window.clearTimeout(firstCheck);
      window.clearInterval(interval);
      window.removeEventListener("focus", checkBudgetRenewals);
    };
  }, [purchaseHistory, budgetFormMode]);

  const featuredBudget = budgets.find(
    (budget) => budget.id === selectedBudgetId,
  );

  function describeBudget(budget: Budget) {
    const startDate = new Date(`${budget.startdate}T00:00:00Z`);
    const endDate = new Date(`${budget.enddate}T00:00:00Z`);

    const budgetDates = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).formatRange(startDate, endDate);

    const totals = getBudgetTotals(budget, purchaseHistory);

    return { budgetDates, ...totals };
  }

  const budgetSummary = featuredBudget ? describeBudget(featuredBudget) : null;

  const activeBudgets = budgets.filter(
    (budget) => budget.startdate <= today && budget.enddate >= today,
  );

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
      {!showSettings && !budgetFormMode && !featuredBudget && (
        <section id="active-budget">
          <h2>Active Budgets</h2>
          <button type="button" onClick={() => setBudgetFormMode("add")}>
            Add New Budget
          </button>
          <ul>
            {activeBudgets.map((budget) => (
              <li key={budget.id}>
                <button
                  type="button"
                  onClick={() => setSelectedBudgetId(budget.id)}
                >
                  {getPurchaseLabel(budget.category, "")}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!showSettings && !budgetFormMode && featuredBudget && budgetSummary && (
        <section id="current-budget" hidden={showSettings}>
          <div>
            <button type="button" onClick={() => setSelectedBudgetId(null)}>
              BACK
            </button>
            <p>{budgetSummary.budgetDates}</p>
            <h2>{getPurchaseLabel(featuredBudget.category, "")}</h2>
            <button type="button" onClick={() => setBudgetFormMode("edit")}>
              Edit Budget
            </button>
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(budgetSummary.availableAmount)}
            </p>
            <p>${budgetSummary.totalSpending} spent</p>
            <p>
              {budgetSummary.budgetBalance < 0
                ? `Your current balance is ${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    budgetSummary.budgetBalance,
                  )}. This means you have exceeded your monthly spending allotment.`
                : `You have $${budgetSummary.budgetBalance} remaining in your budget.`}
            </p>
          </div>
          <div className="purchase-history">
            <PurchaseHistory
              purchaseHistory={purchaseHistory}
              fullDate={fullDate}
              setPurchaseHistory={setPurchaseHistory}
            />
          </div>
        </section>
      )}
      {budgetFormMode && (
        <section hidden={showSettings}>
          <BudgetForm
            initialBudget={
              budgetFormMode === "edit" ? featuredBudget : undefined
            }
            onSave={handleBudgetSave}
            onCancel={() => setBudgetFormMode(null)}
            defaultRolloverMode={defaultRolloverMode}
          />
        </section>
      )}
      {showSettings && (
        <Settings
          fullDate={fullDate}
          onFullDateChange={setFullDate}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
          onBack={() => setShowSettings(false)}
          defaultRolloverMode={defaultRolloverMode}
          setDefaultRolloverMode={setDefaultRolloverMode}
        />
      )}
    </>
  );

  function withBudgetSchedule(
    fields: BudgetFormValues,
    previousBudget: Budget | undefined,
  ) {
    const openingDay = Number(fields.startdate.slice(-2));

    const sameMonthlyStart =
      previousBudget?.duration === "month" &&
      previousBudget?.startdate === fields.startdate;

    const monthlyAnchorDay =
      fields.duration === "month"
        ? ((sameMonthlyStart ? previousBudget.monthlyAnchorDay : null) ??
          openingDay)
        : null;

    return {
      ...fields,
      rolloverAmount: previousBudget?.rolloverAmount ?? 0,
      monthlyAnchorDay,
    };
  }

  function handleBudgetSave(fields: Omit<BudgetFormValues, "id">) {
    if (budgetFormMode === "add") {
      const newId = Math.max(0, ...budgets.map((budget) => budget.id)) + 1;
      const newBudget = {
        ...withBudgetSchedule(fields, undefined),
        id: newId,
      };

      setBudgets((current) => [...current, newBudget]);

      setSelectedBudgetId(newId);
    } else if (budgetFormMode === "edit" && selectedBudgetId !== null) {
      setBudgets((current) =>
        current.map((budget) =>
          budget.id === selectedBudgetId
            ? { ...budget, ...withBudgetSchedule(fields, budget) }
            : budget,
        ),
      );
    }

    setBudgetFormMode(null);
  }
}

export default App;
