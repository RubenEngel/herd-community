import { CategoryContext } from "./context/category-provider";
import { useContext } from "react";
import Link from "next/link";
import { Category } from "../lib/types";
import capitalizeFirstLetter from "../lib/capitalize-first-letter";
import AnimatedButton from "./animated-button";

export default function Categories({ categories }: { categories: Category[] }) {
  const { setCategory } = useContext(CategoryContext);

  return (
    <div className="flex flex-row flex-wrap no-wrap">
      {categories?.map((category, index) => (
        <AnimatedButton
          key={category.name}
          className="font-serif text-sm border mr-2 mb-2 bg-primary px-2 rounded-xl text-secondary leading-6"
        >
          <Link scroll={false} href={"/explore"}>
            <a onClick={() => setCategory(category.name)}>
              {category.name
                .split("_")
                .map((word) => capitalizeFirstLetter(word))
                .join(" ")}
            </a>
          </Link>
        </AnimatedButton>
      ))}
    </div>
  );
}
