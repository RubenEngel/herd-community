import Avatar from './avatar';
import Date from './date';
// import CoverImage from './cover-image'
import Link from 'next/link';
import Categories from './categories';
import { motion } from 'framer-motion';
import PreviewImage from './preview-image';
// import useWindowDimensions from './hooks/useWindowDimensions';
import { User } from '../lib/types';

export default function PostPreview({
  title,
  coverImage,
  date,
  // excerpt,
  categories,
  author,
  slug,
  animateY = 0,
  animateScale = 1,
  animateOpacity = 1,
}: {
  title: string;
  coverImage: string;
  date: string;
  categories: string[];
  author: User;
  slug: string;
  animateY?: number | string;
  animateScale?: number;
  animateOpacity?: number;
}) {
  // const { height, width } = useWindowDimensions()

  return (
    <>
      <motion.div
        initial={{ scale: animateScale, y: animateY, opacity: animateOpacity }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ bounce: 0, duration: 0.4 }}
        className="flex mx-auto my-2 flex-col justify-center rounded-lg "
      >
        {/* Image */}
        <div className="mb-1">
          {/* <CoverImage title={title} coverImage={coverImage} slug={slug} /> */}
          <PreviewImage
            title={title}
            coverImage={coverImage}
            slug={slug}
            width={1000}
            height={900}
            // priority={true}
          />
        </div>
        {/* Categories */}
        <div>
          <Categories categories={categories} />
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
      </motion.div>
    </>
  );
}
