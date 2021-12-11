import { ExploreContext } from "../lib/context";
import { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "../lib/types";
import capitalizeFirstLetter from "../lib/capitalizeFirstLetter";

export default function Categories({ categories }: { categories: Category[] }) {
  const { setCategory } = useContext(ExploreContext);

  return (
    <div className="flex flex-row flex-wrap no-wrap">
      {categories?.map((category, index) => (
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.9,
          }}
          key={category.name}
          className="text-md border mr-2 mb-2 bg-primary px-3 rounded-xl text-secondary"
        >
          <Link href={"/explore"}>
            <a onClick={() => setCategory(category.name)}>
              {category.name
                .split("_")
                .map((word) => capitalizeFirstLetter(word))
                .join(" ")}
            </a>
          </Link>
        </motion.button>
      ))}
    </div>
  );
}
