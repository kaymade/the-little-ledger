export function formatPurchaseDate(value: string, fullDate: boolean) {
  const [year, month, day] = value.split("-");

  if (!fullDate) {
    return `${month}/${day}/${year}`;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
