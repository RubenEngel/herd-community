import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

export default function PreviewImage({
  title,
  coverImage,
  slug,
  width,
  height,
}) {
  const image = (
    // <Image
    //   priority={true}
    //   placeholder={"blur"}
    //   src={coverImage}
    //   width={width}
    //   height={height}
    //   objectFit="cover"
    //   className={cn("shadow-small m-auto", {
    //     "hover:shadow-medium transition-shadow duration-200 rounded-xl": slug,
    //   })}
    // />
    <img
      src={coverImage}
      width={width}
      height={height}
      className={cn("shadow-small m-auto", {
        "hover:shadow-medium object-cover transition-shadow duration-200 rounded-xl":
          slug,
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
