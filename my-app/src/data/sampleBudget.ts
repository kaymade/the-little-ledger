export type BudgetDuration =
  | "week"
  | "two-weeks"
  | "three-weeks"
  | "month"
  | "custom";

export type RolloverMode = "off" | "unspent" | "unspent-and-overspending";

export const rolloverOptions: { value: RolloverMode; label: string }[] = [
  { value: "off", label: "Off" },
  { value: "unspent", label: "Carry over unspent money." },
  {
    value: "unspent-and-overspending",
    label: "Carry over unspent and overspent money.",
  },
];

export type Budget = {
  id: number;
  category: string;
  amount: number;
  startdate: string;
  enddate: string;
  duration: BudgetDuration;
  repeat: boolean;
  rolloverMode: RolloverMode;
  rolloverAmount: number;
  monthlyAnchorDay: number | null;
};

export type BudgetFormValues = Omit<
  Budget,
  "id" | "rolloverAmount" | "monthlyAnchorDay"
>;

export const sampleBudget: Budget[] = [
  {
    id: 0,
    category: "food-and-drink",
    amount: 300,
    startdate: "2026-11-01",
    enddate: "2026-11-30",
    duration: "month",
    repeat: false,
    rolloverMode: "off",
    rolloverAmount: 0,
    monthlyAnchorDay: 1,
  },
  {
    id: 1,
    category: "transportation",
    amount: 50,
    startdate: "2026-11-01",
    enddate: "2026-11-30",
    duration: "month",
    repeat: false,
    rolloverMode: "off",
    rolloverAmount: 0,
    monthlyAnchorDay: 1,
  },
];
