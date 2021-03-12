import Avatar from '../components/avatar'
import Date from '../components/date'
// import CoverImage from './cover-image'
import Link from 'next/link'
import Categories from './categories';
import {motion} from 'framer-motion'
import PreviewImage from './preview-image';
// import useWindowDimensions from './hooks/useWindowDimensions';

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  categories,
  author,
  slug,
  animated
}) {

  // const { height, width } = useWindowDimensions()

  return (
   <>
    <motion.div 
    initial={ { y: '50%', opacity: 0 } }
    animate= { { y: 0, opacity: 1 } }
    className='flex mx-auto my-2 flex-col justify-center rounded-lg '>
      {/* Image */}
      <div className="mb-1">
        {/* <CoverImage title={title} coverImage={coverImage} slug={slug} /> */}
        <PreviewImage title={title} coverImage={coverImage} slug={slug} width={1000} height={900} priority={true}/>
      </div>
      {/* Categories */}
      <div>
        <Categories categories={categories}/>
      </div>
      {/* Title */}
        <h3 className="text-lg mb-2">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a
            className="hover:underline"
            dangerouslySetInnerHTML={{ __html: title }}
          ></a>
        </Link>
      </h3>
      {/* Date and Author */}
      <div className="text-sm flex flex-row justify-between items-center">
        <Avatar author={author} />
        <Date dateString={date} />
      </div>
      {/* Excerpt */}
      {/* <div
        className="text-md leading-relaxed mt-4"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      /> */}
    </motion.div>
    </>
  )
}
