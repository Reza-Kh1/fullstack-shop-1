import React from "react";
type ButtonCustomType = {
  color: "blue" | "gray" | "orange";
  children: React.ReactNode;
  className?: string;
  onClick?: (value: any) => void;
};
export default function ButtonCustom({
  color,
  children,
  className,
  onClick,
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
    <button className={`btn-custom ${colors + className}`} onClick={onClick}>
      {children}
    </button>
  );
}
