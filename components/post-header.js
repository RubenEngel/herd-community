import Avatar from './avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Categories from '../components/categories'

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="text-xl mb-8 mx-auto items-center text-center">
        <Avatar author={author} />
      </div>
      <div className="mb-8 mx-8">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div className="mx-auto text-center">
        <div className="mb-6 text-lg">
          <div className='mb-4'>Posted <Date dateString={date} /> </div>
          <Categories categories={categories} />
        </div>
      </div>
    </>
  )
}
