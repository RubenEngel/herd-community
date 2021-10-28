export default function Tags({ tags }) {
  return (
    <div className="text-center">
      <p className="mt-8 text-sm font-bold">
        Tagged:
        {tags.map((tag, index) => (
          <span key={index} className="ml-2">
            {tag}
          </span>
        ))}
      </p>
    </div>
  );
}
