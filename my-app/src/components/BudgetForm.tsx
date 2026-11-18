import { useState, type SubmitEvent } from "react";
import {
  rolloverOptions,
  type Budget,
  type BudgetDuration,
  type BudgetFormValues,
  type RolloverMode,
} from "../data/sampleBudget";
import { categoryLabels } from "../data/purchaseLabels";
import { getBudgetEndDate, getMonthlyStart } from "../utils/budgetPeriods";

type BudgetFormProps = {
  initialBudget: Budget | undefined;
  onSave: (fields: BudgetFormValues) => void;
  defaultRolloverMode: RolloverMode;
  onCancel: () => void;
};

const durationOptions: { value: BudgetDuration; label: string }[] = [
  { value: "week", label: "One Week" },
  { value: "two-weeks", label: "Two Weeks" },
  { value: "three-weeks", label: "Three Weeks" },
  { value: "month", label: "One Calendar Month" },
  { value: "custom", label: "Custom Date Range" },
];

export function BudgetForm({
  initialBudget,
  onSave,
  defaultRolloverMode,
  onCancel,
}: BudgetFormProps) {
  const [draftCategory, setDraftCategory] = useState(
    initialBudget?.category ?? "",
  );
  const [draftAmount, setDraftAmount] = useState(
    initialBudget ? String(initialBudget.amount) : "",
  );
  const [draftStartDate, setDraftStartDate] = useState(
    initialBudget?.startdate ?? "",
  );
  const [draftDuration, setDraftDuration] = useState<BudgetDuration | "">(
    initialBudget?.duration ?? "",
  );
  const [draftCustomEndDate, setDraftCustomEndDate] = useState(
    initialBudget?.duration === "custom" ? initialBudget.enddate : "",
  );
  const [draftRepeat, setDraftRepeat] = useState(
    initialBudget?.repeat ?? false,
  );
  const [draftRolloverMode, setDraftRolloverMode] = useState<RolloverMode>(
    initialBudget?.rolloverMode ?? defaultRolloverMode,
  );
  const [formError, setFormError] = useState("");
  const sameMonthlyStart =
    initialBudget?.duration === "month" &&
    draftDuration === "month" &&
    initialBudget.startdate === draftStartDate;

  const previewAnchor = sameMonthlyStart
    ? (initialBudget.monthlyAnchorDay ?? undefined)
    : undefined;

  const previewEndDate =
    draftStartDate && draftDuration
      ? getBudgetEndDate(
          draftStartDate,
          draftDuration,
          draftCustomEndDate,
          previewAnchor,
        )
      : "";

  const oneYearEndDate = draftStartDate
    ? getMonthlyStart(draftStartDate, 12, Number(draftStartDate.slice(-2)))
    : "";

  const savedCustomEndDate =
    initialBudget?.duration === "custom" &&
    draftDuration === "custom" &&
    initialBudget.startdate === draftStartDate
      ? initialBudget.enddate
      : "";

  const maxCustomEndDate =
    savedCustomEndDate > oneYearEndDate ? savedCustomEndDate : oneYearEndDate;

  const canShowPreview =
    draftStartDate !== "" &&
    previewEndDate !== "" &&
    previewEndDate >= draftStartDate &&
    (draftDuration !== "custom" || previewEndDate <= maxCustomEndDate);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const price = Number(draftAmount);

    if (
      !categoryLabels.has(draftCategory) ||
      !Number.isFinite(price) ||
      price < 0.01 ||
      !draftStartDate ||
      !draftDuration ||
      !canShowPreview
    ) {
      setFormError("Enter a valid end date.");
      return;
    }

    onSave({
      amount: price,
      category: draftCategory,
      startdate: draftStartDate,
      enddate: previewEndDate,
      duration: draftDuration,
      repeat: draftRepeat,
      rolloverMode: draftRolloverMode,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <select
          value={draftCategory}
          onChange={(event) => setDraftCategory(event.currentTarget.value)}
        >
          <option value="">Select a Category</option>
          {Array.from(categoryLabels, ([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={draftAmount}
          onChange={(event) => setDraftAmount(event.currentTarget.value)}
          min="0.01"
          step="0.01"
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={draftStartDate}
          onChange={(event) => setDraftStartDate(event.currentTarget.value)}
        />
      </label>
      <label>
        Duration:
        <select
          value={draftDuration}
          onChange={(event) => {
            const value = event.currentTarget.value;
            const selectedOption = durationOptions.find(
              (entry) => entry.value === value,
            );
            setDraftDuration(selectedOption?.value ?? "");
          }}
        >
          <option value="">Select a Duration</option>
          {durationOptions.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.label}
            </option>
          ))}
        </select>
      </label>
      {draftDuration === "custom" && (
        <label>
          Closing Date
          <input
            type="date"
            min={draftStartDate || undefined}
            max={maxCustomEndDate || undefined}
            value={draftCustomEndDate}
            onChange={(event) =>
              setDraftCustomEndDate(event.currentTarget.value)
            }
          />
        </label>
      )}
      {canShowPreview && (
        <p>
          {draftStartDate} through {previewEndDate}
        </p>
      )}
      <label>
        <input
          type="checkbox"
          checked={draftRepeat}
          onChange={(event) => setDraftRepeat(event.currentTarget.checked)}
        />
        Repeat Budget
      </label>

      <label>
        Rollover
        <select
          value={draftRolloverMode}
          disabled={!draftRepeat}
          onChange={(event) => {
            const value = event.currentTarget.value;
            const option = rolloverOptions.find(
              (entry) => entry.value === value,
            );

            if (option) setDraftRolloverMode(option.value);
          }}
        >
          {rolloverOptions.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.label}
            </option>
          ))}
        </select>
      </label>
      {formError && <p role="alert">{formError}</p>}
      <button type="submit">SAVE</button>
      <button type="button" onClick={onCancel}>
        CANCEL
      </button>
    </form>
  );
}
