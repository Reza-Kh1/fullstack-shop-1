import React from "react";
type ButtonCustomType = {
  color: "blue" | "gray" | "orange";
  children: React.ReactNode;
  className?: string;
  onClick?: (value: any) => void;
  type?: "submit" | "reset" | "button";
};
export default function ButtonCustom({
  color,
  children,
  className,
  onClick,
  type,
}: ButtonCustomType) {
  const colors =
    color === "blue"
      ? "btn-blue "
      : color === "gray"
      ? "btn-gray "
      : color === "orange"
      ? "btn-orange "
      : "";

  return (
    <button
      className={`btn-custom ${colors + className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
