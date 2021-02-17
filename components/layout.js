// import Alert from '../components/alert'
// import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header'
import Container from './container';

export default function Layout({ children }) {
  return (
    <>
      <Meta />
        <Header/>
        <Container>
          <div>
            <main>{children}</main>
          </div>
        </Container>
    </>
  )
}
