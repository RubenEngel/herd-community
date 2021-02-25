import Meta from '../components/meta'
import Header from './header'

export default function Layout({ children, category }) {
  return (
    <>
      <Meta />
        <Header category={category}/>
        <div className='container mx-auto max-w-4xl my-6 px-6 overflow-hidden'>
          <main>{children}</main>
        </div>
    </>
  )
}
