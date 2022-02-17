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
      className={cn("shadow-small m-auto", {
        "hover:shadow-medium rounded-xl transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
