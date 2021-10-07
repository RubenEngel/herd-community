export default function Container({ children }) {
  return (
    <div className="container mx-auto max-w-7xl my-6 px-6 overflow-hidden">
      {children}
    </div>
  );
}
