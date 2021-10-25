import { ExploreContext } from "../lib/context";
import { useContext } from "react";
import Link from "next/link";

export default function Categories({ categories }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { setCategory } = useContext(ExploreContext);

  return (
    <div className="flex flex-row flex-wrap no-wrap">
      {categories.map((category, index) => (
        <div key={index} className="text-md border mr-2 mb-2 bg-primary px-3 rounded-xl text-secondary">
        <Link href={"/explore"}>
          <a
            onClick={() => setCategory(category.name)}
          >
            {category.name
              .split("_")
              .map((word) => capitalizeFirstLetter(word))
              .join(" ")}
          </a>
        </Link>
        </div>
      ))}
    </div>
  );
}
