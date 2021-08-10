import Meta from '../components/meta';
import Header from './header/header';
import { motion } from 'framer-motion';

export default function Layout({ category, children }) {
  return (
    <>
      <Meta />
      {/* <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.4,
        }}
        className="z-10"
      > */}
      <Header category={category} />
      {/* </motion.div> */}
      <div className="container mx-auto max-w-6xl my-6 px-8 overflow-hidden">
        <main>{children}</main>
      </div>
    </>
  );
}
