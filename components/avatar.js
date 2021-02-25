import { FaUserCircle } from 'react-icons/fa'

export default function Avatar({ 
        author, 
        url // = 'https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/46508009_2817782241580917_2873030201275580416_n.jpg?_nc_cat=100&ccb=3&_nc_sid=174925&_nc_ohc=KAiaKNgY6x4AX-zdeKK&_nc_ht=scontent-lhr8-1.xx&oh=8497210e00fbf7e680f312489a5c66e0&oe=605B4AC5' 
      }) {
  const name = author
    ? author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name
    : null

  return (
    <>
      {author && (
        <div className="flex items-center">

          {url ?
          <img
            src={url}
            className="w-4 h-4 rounded-full"
            alt={name}
          />
          :
          <FaUserCircle className='text-md'/>
          }

          <div className="ml-1">{name}</div>
        </div>
      )}
      </>
  )
}
