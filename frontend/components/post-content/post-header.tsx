import Avatar from "../avatar";
import Date from "../date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "../categories";
import Tags from "../../components/post-content/tags";
import { User, Category } from "../../lib/types";

interface PostHeaderProps {
  title: string;
  coverImage: string;
  date?: string | Date;
  author?: User,
  categories?: Category[];
  tags?: string[]
}

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
  tags
}: PostHeaderProps) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="">
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="my-6">
        {categories && <Categories categories={categories} />}
      </div>
      <div className="flex flex-row justify-between mb-6 ">
        <div>
          <Avatar author={author} />
        </div>
        <div>
          {date && <Date date={date} />}
        </div>
      </div>
      <div className="mb-8">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div>
      {tags?.length && <Tags tags={tags} />}
      </div>
    </div>
  );
}
