import { motion } from "framer-motion";
import Link from "next/link";

const PreviewImage = ({
  title,
  coverImage,
  slug,
  width,
  className,
}: {
  title: string;
  coverImage: string;
  slug: string;
  width: number;
  className?: string;
}) => {
  const image = (
    <img
      alt={title}
      src={coverImage}
      width={width}
      className={`shadow-small object-cover ${className} ${
        slug
          ? "hover:shadow-medium rounded-lg transition-shadow duration-200"
          : ""
      }`}
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
