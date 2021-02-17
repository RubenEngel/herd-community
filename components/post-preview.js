import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
import Categories from './categories';

export default function PostPreview({
  title,
  coverImage,
  date,
  // excerpt,
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
      {/* Title */}
      <h3 className="text-center text-xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
      {/* Date and Author */}
      <div className='text-center'> 
      <Avatar author={author} />
        
      </div>
      <div className="flex flex-row justify-between items-center mt-2">
        <Categories categories={categories}/>
        <Date dateString={date} />
      </div>

      {/* Excerpt */}
      {/* <div
        className="text-md leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      /> */}
    </div>
  )
}
