import { MouseEventHandler, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const LongIconButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="h-11 px-6 py-[10px] bg-white hover:bg-smoke border border-clay flex items-center justify-center rounded-full hover:animate-long-icon-btn"
    >
      {props.icon}
    </button>
  );
};
