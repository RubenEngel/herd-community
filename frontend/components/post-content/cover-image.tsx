import cn from "classnames";
import Link from "next/link";

export default function CoverImage({
  title,
  coverImage,
  slug,
}: {
  title: string;
  coverImage: string;
  slug?: string;
}) {
  const image = (
    <img
      src={coverImage}
      // width={500}
      // height={500}
      // objectFit="cover"
      className={cn("shadow-small m-auto", {
        "hover:shadow-medium transition-shadow duration-200 rounded-xl": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
