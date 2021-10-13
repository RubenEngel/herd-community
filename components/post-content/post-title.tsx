export default function PostTitle({ children }) {
  return (
    <h1
      className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-4 mx-auto"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
