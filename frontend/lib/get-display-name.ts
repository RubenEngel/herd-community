import capitalizeFirstLetter from "./capitalize-first-letter";
import { User } from "./types";

export const getDisplayName = (author: User) => {
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
