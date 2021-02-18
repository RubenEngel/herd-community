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
    <div className="max-w-4xl mx-auto px-4">
      <div className="">
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="my-6">
        <Categories categories={categories} />
      </div>
      <div className="mb-8">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div className='flex flex-row justify-between mb-6'>
          <Avatar author={author} />
          <Date dateString={date}/>
      </div>
    </div>
  )
}
