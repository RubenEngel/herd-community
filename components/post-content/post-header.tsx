import Avatar from "../avatar";
import Date from "../date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "../categories";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="">
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="my-6">
        <Categories categories={categories} />
      </div>
      <div className="flex flex-row justify-between mb-6 ">
        <div>
          <Avatar author={author} />
        </div>
        <div>
          <Date date={date} />
        </div>
      </div>
      <div className="mb-8">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
    </div>
  );
}
