import Avatar from "../avatar";
import Date from "../date";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import Categories from "../categories";
import Tags from "../../components/post-content/tags";
import { Post } from "../../lib/types";
import Loading from "../loading";

interface PostHeaderProps {
  title: Post["title"];
  coverImage: Post["featuredImage"];
  date?: Post["createdAt"];
  author?: Post["author"];
  categories?: Post["categories"];
  tags?: Post["tags"];
  likeCount?: number;
  likedByDataLoading: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
  author,
  categories,
  tags,
  likeCount,
  likedByDataLoading,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="">
        <PostTitle>{title}</PostTitle>
      </div>
      <div className="my-6 flex justify-between items-center">
        {categories && <Categories categories={categories} />}
        {likedByDataLoading && <Loading fontSize="text-sm" />}
        {likeCount > 0 && (
          <div className="mb-3">{`${likeCount} like${
            likeCount > 1 ? "s" : ""
          }`}</div>
        )}
      </div>

      <div className="flex flex-row justify-between mb-6 ">
        <div>
          <Avatar author={author} />
        </div>
        <div>{date && <Date date={date} />}</div>
      </div>
      <div className="mb-8">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div>{tags?.length > 0 && <Tags tags={tags} />}</div>
    </div>
  );
};

export default PostHeader;
