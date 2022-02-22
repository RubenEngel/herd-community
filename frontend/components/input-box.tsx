export enum InputBoxVariant {
  dark = "dark",
  light = "light",
  shadow = "shadow",
}

const InputBox = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    variant: InputBoxVariant;
  }
) => (
  <input
    {...props}
    className={`${
      props.variant === InputBoxVariant.dark &&
      "bg-primary placeholder-secondary text-secondary border-secondary"
    }
        ${
          props.variant === InputBoxVariant.light &&
          "bg-sceondary text-primary border-primary placeholder-gray-600"
        }
        ${props.variant === InputBoxVariant.shadow && "border shadow-inner"} ${
      props.className
    } block rounded-md border py-2 px-4 font-serif text-lg`}
  />
);

export default InputBox;
