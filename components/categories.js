export default function Categories({ categories }) {
  return (
    <div className='inline-block border py-1 pl-2 pr-3 bg-black bg-opacity-75 rounded-xl text-white'>
      
      {categories.edges.length > 0 ? (
        categories.edges.map((category, index) => (
          <span key={index} className="ml-1">
            {category.node.name}
          </span>
        ))
      ) : (
        <span className="ml-1">{categories.edges.node.name}</span>
      )}

    </div>
  )
}
