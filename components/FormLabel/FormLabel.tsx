interface Props {
  htmlFor: string;
  label: string;
}

export const FormLabel = ({ htmlFor, label }: Props) => (
  <label htmlFor={htmlFor} className="font-medium text-grey">
    {label}
  </label>
);
