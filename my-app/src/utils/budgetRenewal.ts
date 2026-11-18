import type { Budget, RolloverMode } from "../data/sampleBudget.ts";
import type { Purchase } from "../data/samplePurchases";
import { addDays, getBudgetEndDate } from "./budgetPeriods";

export function getBudgetTotals(budget: Budget, purchases: Purchase[]) {
  const budgetPurchases = purchases.filter(
    (purchase) =>
      purchase.category === budget.category &&
      purchase.date >= budget.startdate &&
      purchase.date <= budget.enddate,
  );

  const totalSpending =
    Math.round(
      budgetPurchases.reduce((sum, purchase) => sum + purchase.amount, 0) * 100,
    ) / 100;

  const availableAmount =
    Math.round((budget.amount + budget.rolloverAmount) * 100) / 100;

  const budgetBalance =
    Math.round((availableAmount - totalSpending) * 100) / 100;

  return { totalSpending, availableAmount, budgetBalance };
}

function getRolloverAmount(budgetBalance: number, rolloverMode: RolloverMode) {
  switch (rolloverMode) {
    case "off":
      return 0;
    case "unspent":
      return Math.max(0, budgetBalance);
    case "unspent-and-overspending":
      return budgetBalance;
  }
}

function getNextBudgetDates(budget: Budget) {
  const opens = addDays(budget.enddate, 1);

  const anchor = budget.monthlyAnchorDay ?? Number(budget.startdate.slice(-2));

  let closes: string;

  if (budget.duration === "custom") {
    const oldStart = Date.parse(`${budget.startdate}T00:00:00Z`);
    const oldEnd = Date.parse(`${budget.enddate}T00:00:00Z`);
    const inclusiveDays = (oldEnd - oldStart) / 86_400_000 + 1;

    closes = addDays(opens, inclusiveDays - 1);
  } else {
    closes = getBudgetEndDate(opens, budget.duration, "", anchor);
  }

  return { startdate: opens, enddate: closes };
}

export function renewBudget(
  budget: Budget,
  purchases: Purchase[],
  today: string,
) {
  let current = budget;

  while (current.repeat && current.enddate < today) {
    const { budgetBalance } = getBudgetTotals(current, purchases);

    const nextDates = getNextBudgetDates(current);

    current = {
      ...current,
      ...nextDates,
      rolloverAmount: getRolloverAmount(budgetBalance, current.rolloverMode),
    };
  }

  return current;
}
