import cn from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
interface PreviewImageProps {
  title: string;
  coverImage: string;
  slug: string;
  width: number;
  height: number;
}

const PreviewImage = ({
  title,
  coverImage,
  slug,
  width,
  height,
}: PreviewImageProps) => {
  const image = (
    <Image
      // objectFit="cover"
      alt={title}
      priority
      src={coverImage}
      width={width}
      height={height}
      className={cn("shadow-small object-cover", {
        "hover:shadow-medium rounded-lg transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <motion.button
          whileTap={{ opacity: 0.85 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", bounce: 0 }}
        >
          <Link scroll={false} as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>{image}</a>
          </Link>
        </motion.button>
      ) : (
        image
      )}
    </div>
  );
};

export default PreviewImage;
