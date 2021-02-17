import Meta from '../components/meta'
import Header from './header'
import Container from './container';

export default function Layout({ children }) {
  return (
    <>
      <Meta />
        <Header/>
        {/* <Container> */}
          <div className='px-2 mt-10'>
            <main>{children}</main>
          </div>
        {/* </Container> */}
    </>
  )
}
