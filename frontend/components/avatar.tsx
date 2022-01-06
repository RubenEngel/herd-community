import { FaUserCircle } from "react-icons/fa";
import { User } from "../lib/types";
import AnimatedButton from "./animated-button";
import Link from "next/link";
import { getDisplayName } from "../lib/getDisplayName";

const Avatar = ({
  author,
  small = false,
}: {
  author: User;
  small?: boolean;
}) => {
  return (
    <>
      {author && (
        <AnimatedButton className="mr-3">
          <Link href={"/users/[username]"} as={`/users/${author.username}`}>
            <a className="flex items-center">
              <div>
                {author.imageUrl ? (
                  <img
                    src={author.imageUrl}
                    className={`rounded-full ${
                      small ? "w-4 h-4 mr-1" : "w-5 h-5 mr-2"
                    }`}
                    alt={getDisplayName(author)}
                  />
                ) : (
                  <FaUserCircle
                    className={`rounded-full ${
                      small ? "w-4 h-4 mr-1" : "w-5 h-5 mr-2"
                    }`}
                  />
                )}
              </div>
              <div
                className={`font-serif text-left  ${
                  small ? "text-sm" : "text-base"
                }`}
              >
                {getDisplayName(author)}
              </div>
            </a>
          </Link>
        </AnimatedButton>
      )}
    </>
  );
};

export default Avatar;
