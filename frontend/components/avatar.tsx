import { FaUserCircle } from "react-icons/fa";
import { User } from "../lib/types";
import capitalizeFirstLetter from "../lib/capitalizeFirstLetter";
import Button from "../components/button";
import Link from "next/link";

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
        <Link href={"/users/[username]"} as={`/users/${author.username}`}>
          <Button className="flex items-center">
            <div className="mr-1 text-md">
              {author.imageUrl ? (
                <img
                  src={author.imageUrl}
                  className="w-7 h-7 rounded-full"
                  alt={displayName}
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            <div className="ml-1 font-serif text-left">{displayName}</div>
          </Button>
        </Link>
      )}
    </>
  );
}
