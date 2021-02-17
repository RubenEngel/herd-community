import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
import Categories from './categories';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  categories,
  author,
  slug,
}) {
  return (
    <div className='flex max-w-4xl mx-auto flex-col justify-center p-4 rounded-2xl shadow-lg'>
      {/* Image */}
      <div className="mb-5">
        <CoverImage title={title} coverImage={coverImage} slug={slug} />
      </div>
      {/* Categories */}
      <div>
        <Categories categories={categories}/>
      </div>
      {/* Title */}
        <h3 className="text-xl mb-2">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
      {/* Date and Author */}
      <div className="flex flex-row justify-between items-center">
        <Avatar author={author} />
        <Date dateString={date} />
      </div>
      {/* Excerpt */}
      {/* <div
        className="text-md leading-relaxed mt-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      /> */}
    </div>
  )
}
