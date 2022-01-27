import capitalizeFirstLetter from "./capitalize-first-letter";
import { PrismaUser } from "./types";

export const getDisplayName = (
  author: Pick<PrismaUser, "firstName" | "lastName">
) => {
  const firstName = author?.firstName
    ? capitalizeFirstLetter(author.firstName)
    : null;
  const lastName = author?.lastName
    ? capitalizeFirstLetter(author.lastName)
    : undefined;

  const displayName =
    firstName || lastName
      ? `${firstName || ""} ${lastName || ""}`
      : "HERD Author";

  return displayName;
};
