import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'
import PreviewImage from './preview-image';
import {motion} from 'framer-motion'

export default function SmallPostPreview({
  title,
  coverImage,
  // date,
  // categories,
  author,
  slug,
}) {
  return (
    <motion.div 
    initial={ { y: '50%', opacity: 0 } }
    animate= { { y: 0, opacity: 1 } }
    className='rounded-2xl my-6'>

      <div className='grid grid-cols-5'>
        {/* Image */}
        <div className="mr-2 col-span-2">
          {/* <CoverImage title={title} coverImage={coverImage} slug={slug} /> */}
          <PreviewImage title={title} coverImage={coverImage} slug={slug} width={500} height={400}/>
        </div>
        <div className='col-span-3'>
          {/* Title */}
          <h3 className="text-sm mb-3 leading-snug">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              ></a>
            </Link>
          </h3>
            {/* Date and Author */}
            <div className="flex flex-row justify-start items-center text-xs col-span-3">
              <Avatar author={author} />
              {/* <Date dateString={date} /> */}
            </div>
        </div>
        
          

      </div>


    </motion.div>
  )
}
