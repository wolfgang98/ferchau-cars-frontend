import clsx from "clsx";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
