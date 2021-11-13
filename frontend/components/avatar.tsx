import { FaUserCircle } from "react-icons/fa";
import { User } from "../lib/types";

export default function Avatar({ author }: { author: User }) {
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.firstName
    : null;

  return (
    <>
      {author && (
        <div className="flex items-center">
          {author.imageUrl ? (
            <img
              src={author.imageUrl}
              className="w-4 h-4 rounded-full"
              alt={name}
            />
          ) : (
            <FaUserCircle className="text-md" />
          )}

          <div className="ml-1">{name}</div>
        </div>
      )}
    </>
  );
}
