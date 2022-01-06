import { User } from "../lib/types";
import AnimatedButton from "./animated-button";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import capitalizeFirstLetter from "../lib/capitalizeFirstLetter";

const UserCard = ({
  user,
  ownProfile,
  isFollowing,
  handleFollow,
}: {
  user: User;
  ownProfile: boolean;
  isFollowing: boolean;
  handleFollow: () => void;
}) => {
  return (
    <div className="flex justify-center mb-16">
      <Link href={"/users/[username]"} as={`/users/${user.username}`}>
        <a href="">
          <AnimatedButton>
            <div className="mr-3 relative">
              {user.imageUrl ? (
                <img
                  className="w-28 h-28 rounded-full object-cover"
                  src={user.imageUrl}
                ></img>
              ) : (
                <FaUserCircle className="w-28 h-28 rounded-full" />
              )}
            </div>
          </AnimatedButton>
        </a>
      </Link>
      <div className="mt-2">
        <Link href={"/users/[username]"} as={`/users/${user.username}`}>
          <a href="">
            <AnimatedButton className="text-left">
              <h1 className="text-2xl">
                {user.lastName
                  ? `${capitalizeFirstLetter(
                      user.firstName
                    )} ${capitalizeFirstLetter(user.lastName)}`
                  : `${capitalizeFirstLetter(user.firstName)}`}
              </h1>
              <h4 className="text-lg">@{user.username}</h4>
            </AnimatedButton>
          </a>
        </Link>
        <div>
          {!ownProfile &&
            (isFollowing ? (
              <AnimatedButton
                variant={"green"}
                className="mt-3 mr-2"
                onClick={handleFollow}
              >
                Following
              </AnimatedButton>
            ) : (
              <AnimatedButton
                variant={"green-outline"}
                className="mt-3 mr-2"
                onClick={handleFollow}
              >
                Follow
              </AnimatedButton>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
