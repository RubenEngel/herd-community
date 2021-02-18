export default function Categories({ categories }) {
  return (
    <div className='mb-3'>
        {categories.edges.map((category, index) => (
          <span key={index} className="border mr-1 bg-black py-1 px-2 bg-opacity-75 rounded-xl text-white">
            {category.node.name}
          </span>
        ))}
    </div>
  )
}
