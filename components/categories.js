export default function Categories({ categories }) {
  return (
    <div className="mb-2">
      {categories.map((category, index) => (
        <span
          key={index}
          className="text-sm border mr-1 bg-primary px-2 rounded-xl text-secondary"
        >
          {category}
        </span>
      ))}
    </div>
  );
}
