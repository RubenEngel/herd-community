import { FaUserCircle } from "react-icons/fa";
import { PrismaUser } from "../lib/types";
import AnimatedButton from "./animated-button";
import Link from "next/link";
import { getDisplayName } from "../lib/get-display-name";

const Avatar = ({
  user,
  small = false,
}: {
  user: Pick<PrismaUser, "username" | "firstName" | "lastName" | "imageUrl">;
  small?: boolean;
}) => {
  return (
    <>
      {user && (
        <AnimatedButton className="mr-3">
          <Link href={"/users/[username]"} as={`/users/${user.username}`}>
            <a className="flex items-center">
              <div>
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    className={`rounded-full ${
                      small ? "w-4 h-4 mr-1" : "w-5 h-5 mr-2"
                    }`}
                    alt={getDisplayName(user)}
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
                {getDisplayName(user)}
              </div>
            </a>
          </Link>
        </AnimatedButton>
      )}
    </>
  );
};

export default Avatar;
