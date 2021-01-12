import Link from 'next/link'
import Navbar from './navbar'

export default function Header() {
  return (
    <section>
      <h1 className="text-8xl font-bold tracking-tight md:tracking-tighter leading-tight text-center mt-6">
        <Link href="/">
          <a>HERD.</a>
        </Link>
      </h1>
      <Navbar/>
   
    </section>
    
    
  )
}
