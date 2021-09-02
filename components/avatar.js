import { FaUserCircle } from 'react-icons/fa';

export default function Avatar({ author }) {
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null;

  return (
    <>
      {author && (
        <div className="flex items-center">
          {author.photoURL ? (
            <img
              src={author.photoURL}
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
