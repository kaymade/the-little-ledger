import type { BudgetDuration } from "../data/sampleBudget";

export function addDays(day: string, offset: number) {
  const date = new Date(`${day}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

export function getMonthlyStart(
  day: string,
  monthsAhead: number,
  intendedDay: number,
) {
  const date = new Date(`${day}T00:00:00Z`);
  const targetMonth = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + monthsAhead, 1),
  );
  const year = targetMonth.getUTCFullYear();
  const month = targetMonth.getUTCMonth();
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  return new Date(Date.UTC(year, month, Math.min(intendedDay, lastDay)))
    .toISOString()
    .slice(0, 10);
}

const budgetDayOffsets = { week: 6, "two-weeks": 13, "three-weeks": 20 };

export function getBudgetEndDate(
  opens: string,
  length: BudgetDuration,
  customClose: string,
  anchorDay = Number(opens.slice(-2)),
) {
  if (length === "custom") return customClose;

  if (length === "month") {
    const nextOpening = getMonthlyStart(opens, 1, anchorDay);
    return addDays(nextOpening, -1);
  }

  return addDays(opens, budgetDayOffsets[length]);
}

export function getLocalDateString(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}
