export default function PostTitle(props) {
  return (
    <h1
      className="text-2xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-1 mx-auto"
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  );
}
