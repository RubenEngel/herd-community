import { FaUserCircle } from "react-icons/fa";
import { User } from "../lib/types";
import capitalizeFirstLetter from "../lib/capitalizeFirstLetter";
import AnimatedButton from "./animated-button";
import Link from "next/link";

const Avatar = ({ author }: { author: User }) => {
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
        <AnimatedButton className="mr-3">
          <Link href={"/users/[username]"} as={`/users/${author.username}`}>
            <a className="flex items-center">
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
            </a>
          </Link>
        </AnimatedButton>
      )}
    </>
  );
};

export default Avatar;
