export default function PostTitle({ children }) {
  return (
    <h1
      className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-4 text-center"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
