export default function Categories({ categories }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="mb-2">
      {categories.map((category, index) => (
        <span
          key={index}
          className="text-sm border mr-1 bg-primary px-2 rounded-xl text-secondary"
        >
          {category.name
            .split("_")
            .map((word) => capitalizeFirstLetter(word))
            .join(" ")}
        </span>
      ))}
    </div>
  );
}
