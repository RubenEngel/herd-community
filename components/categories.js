export default function Categories({ categories }) {
  return (
    <div className="mb-2">
      {categories.edges.map((category, index) => (
        <span
          key={index}
          className="text-sm border mr-1 bg-gray-800 px-2 rounded-xl text-white"
        >
          {category.node.name}
        </span>
      ))}
    </div>
  );
}
