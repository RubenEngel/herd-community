import { FaUserCircle } from "react-icons/fa";
import { User } from "../lib/generated/graphql-types";
import AnimatedButton from "./animated-button";
import Link from "next/link";
import { getDisplayName } from "../lib/get-display-name";

const Avatar = ({
  user,
  small = false,
  showUsername = false,
}: {
  user: Pick<User, "username" | "firstName" | "lastName" | "imageUrl">;
  small?: boolean;
  showUsername?: boolean;
}) => {
  return (
    <>
      {user && (
        <AnimatedButton className="mr-3">
          <Link href={"/users/[username]"} as={`/users/${user.username}`}>
            <a className="">
              <div className="flex items-center">
                <div className="">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      className={`mr-1 mt-0.5 rounded-full object-cover ${
                        showUsername ? "mr-2 h-9 w-9" : "h-6 w-6"
                      }`}
                      alt={getDisplayName(user)}
                    />
                  ) : (
                    <FaUserCircle
                      className={`mr-1 mt-0.5 rounded-full ${
                        showUsername ? "mr-2 h-9 w-9" : "h-5 w-5"
                      }`}
                    />
                  )}
                </div>
                <div className="text-left">
                  <div
                    className={`text-left font-serif
                    `}
                  >
                    {getDisplayName(user)}
                  </div>
                  {showUsername && (
                    <div className="-mt-0.5 font-serif text-xs">
                      @{user.username}
                    </div>
                  )}
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
