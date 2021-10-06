import { ExploreContext } from "../lib/context";
import { useContext } from "react";
import Link from "next/link";

export default function Categories({ categories }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { setCategory } = useContext(ExploreContext);

  return (
    <div className="mb-2">
      {categories.map((category, index) => (
        <Link href={"/explore"}>
          <a
            key={index}
            className="text-md border mr-1 bg-primary px-3 rounded-xl text-secondary"
            onClick={() => setCategory(category.name)}
          >
            {category.name
              .split("_")
              .map((word) => capitalizeFirstLetter(word))
              .join(" ")}
          </a>
        </Link>
      ))}
    </div>
  );
}
