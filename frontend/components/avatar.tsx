import { FaUserCircle } from "react-icons/fa";
import { User } from "../lib/types";
import AnimatedButton from "./animated-button";
import Link from "next/link";
import { getDisplayName } from "../lib/getDisplayName";

const Avatar = ({ author }: { author: User }) => {
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
                    className="w-6 h-6 rounded-full"
                    alt={getDisplayName(author)}
                  />
                ) : (
                  <FaUserCircle className="w-5 h- rounded-full" />
                )}
              </div>
              <div className="ml-1 font-serif text-left text-base">
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
