import { parseISO, format } from "date-fns";

interface DateProps {
  date: string | Date;
}

export default function Date({ date }) {
  console.log(date);
  const dateISO = typeof date === "string" ? parseISO(date) : date;
  const dateString = typeof date === "string" ? date : date?.toDateString();
  return (
    <>
      <time dateTime={dateString}>{format(dateISO, "LLLL	d, yyyy")}</time>
    </>
  );
}
