import Meta from '../components/meta';
import Header from './header/header';
import { motion } from 'framer-motion';

export default function Layout({ category, children }) {
  return (
    <>
      <Meta />
      <Header category={category} />
      <div className="container mx-auto max-w-6xl my-6 px-4 overflow-hidden">
        <main>{children}</main>
      </div>
    </>
  );
}
