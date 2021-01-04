import Meta from './Meta';
import NavigationBar from './NavigationBar';
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <NavigationBar/>
      <div>
        <main>{children}</main>
      </div>
      <Footer/>
    </>
  )
}