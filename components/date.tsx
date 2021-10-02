import { parseISO, format } from "date-fns";

export default function Date({ date }: { date: string | Date }) {
  const dateISO = typeof date === "string" ? parseISO(date) : date;
  const dateString = typeof date === "string" ? date : date.toDateString();
  return <time dateTime={dateString}>{format(dateISO, "LLLL	d, yyyy")}</time>;
}
