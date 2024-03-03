import React from "react";
type ButtonCustomType = {
  color: "blue" | "gray" | "orange" | "red" | "green";
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
      : color === "red"
      ? "btn-red "
      : color === "green"
      ? "btn-green "
      : "";
  return (
    <button
      className={`btn-custom px-5 py-2 ${colors + className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
