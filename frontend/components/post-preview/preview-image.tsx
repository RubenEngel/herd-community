import cn from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedButton from "../animated-button";

interface PreviewImageProps {
  title: string;
  coverImage: string;
  slug: string;
  width: number;
  height: number;
}

export default function PreviewImage({
  title,
  coverImage,
  slug,
  width,
  height,
}: PreviewImageProps) {
  const image = (
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
        <AnimatedButton>
          <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>{image}</a>
          </Link>
        </AnimatedButton>
      ) : (
        image
      )}
    </div>
  );
}
