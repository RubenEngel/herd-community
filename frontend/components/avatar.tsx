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
            <a className="">
              <div className="flex items-start">
                <div className="pt-1">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      className={`rounded-full ${
                        small ? "mr-1 h-6 w-6" : "mr-2 h-7 w-7"
                      }`}
                      alt={getDisplayName(user)}
                    />
                  ) : (
                    <FaUserCircle
                      className={`rounded-full ${
                        small ? "mr-1 h-5 w-5" : "mr-2 h-6 w-6"
                      }`}
                    />
                  )}
                </div>
                <div className="text-left">
                  <div
                    className={`text-left font-serif  ${
                      small ? "text-sm" : "text-base"
                    }`}
                  >
                    {getDisplayName(user)}
                  </div>
                  <div className="font-serif text-xs">@{user.username}</div>
                </div>
              </div>
            </a>
          </Link>
        </AnimatedButton>
      )}
    </>
  );
};

export default Avatar;
