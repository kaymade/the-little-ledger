export type Purchase = {
  id: number;
  category: string;
  amount: number;
  subcategory: string;
  date: string;
  notes: string;
};

export const samplePurchases: Purchase[] = [
  {
    id: 0,
    category: "food-and-drink",
    amount: 50,
    subcategory: "groceries",
    date: "2026-11-10",
    notes: "",
  },
  {
    id: 1,
    category: "food-and-drink",
    amount: 10,
    subcategory: "coffee-tea",
    date: "2026-11-09",
    notes: "",
  },
];
