import Meta from '../components/meta'
import Header from './header'
// import Container from './container';

export default function Layout({ children }) {
  return (
    <>
      <Meta />
        <Header/>
        <div className='px-2 mt-6'>
          <main>{children}</main>
        </div>
    </>
  )
}
