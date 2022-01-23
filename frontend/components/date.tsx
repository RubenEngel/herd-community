import { parseISO, format } from "date-fns";

interface DateProps {
  date: string | Date;
  short?: boolean;
}

export default function Date({ date, short = false }: DateProps) {
  const dateISO = typeof date === "string" ? parseISO(date) : date;
  const dateString = typeof date === "string" ? date : date?.toDateString();
  return (
    <>
      {short ? (
        <time dateTime={dateString}>{format(dateISO, "Pp")}</time>
      ) : (
        <time dateTime={dateString}>{format(dateISO, "LLLL	d, yyyy")}</time>
      )}
    </>
  );
}
