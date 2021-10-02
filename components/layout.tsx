import Meta from "./meta";
import Header from "./header/header";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      <div className="container mx-auto max-w-6xl my-6 px-4 overflow-hidden">
        <main>{children}</main>
      </div>
    </>
  );
}
