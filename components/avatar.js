import { FaUserCircle } from 'react-icons/fa'

export default function Avatar({ author }) {
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null

  return (
    <>
      {author && (
        <div className="flex items-center justify-center">
          {/* <img
            src={author.avatar.url}
            className="w-12 h-12 rounded-full mr-4"
            alt={name}
          /> */}
          <FaUserCircle className='text-xl'/>
          <div className="text-md ml-2">{name}</div>
        </div>
      )}
      </>
  )
}
