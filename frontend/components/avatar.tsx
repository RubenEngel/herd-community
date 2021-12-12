import { FaUserCircle } from "react-icons/fa";
import { User } from "../lib/types";
import capitalizeFirstLetter from "../lib/capitalizeFirstLetter";

export default function Avatar({ author }: { author: User }) {
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

  return (
    <>
      {author && (
        <div className="flex items-center">
          {author.imageUrl ? (
            <img
              src={author.imageUrl}
              className="w-4 h-4 rounded-full"
              alt={displayName}
            />
          ) : (
            <FaUserCircle className="text-md" />
          )}

          <div className="ml-1">{displayName}</div>
        </div>
      )}
    </>
  );
}
