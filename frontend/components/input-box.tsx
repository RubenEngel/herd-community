const InputBox = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    dark: boolean;
  }
) => (
  <input
    {...props}
    className={`${
      props.dark
        ? "bg-primary placeholder-secondary text-secondary border-secondary"
        : "bg-sceondary placeholder-gray-600 text-primary border-primary"
    } border py-2 px-4 text-lg font-serif w-56 block focus:outline-none rounded-md`}
  />
);

export default InputBox;
