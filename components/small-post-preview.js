import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function SmallPostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className='border p-4 rounded-2xl shadow-lg'>

            {/* Image */}
      <div className="mb-5">
        <CoverImage title={title} coverImage={coverImage} slug={slug} />
      </div>

      <div>

      </div>



      {/* Title */}
      <h3 className="text-2xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
      {/* Date and Author */}
      <div className="flex flex-row justify-between items-center">
        <Date dateString={date} />
        <Avatar author={author} />
      </div>

    </div>
  )
}
