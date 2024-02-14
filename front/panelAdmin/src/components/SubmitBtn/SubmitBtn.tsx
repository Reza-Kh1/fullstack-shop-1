import { Button } from "@material-tailwind/react";
import React from "react";
type SubmitBtnType = {
  type: "button" | "reset" | "submit";
  value: string;
  classBtn?: string;
  classPlus?: string | null;
  icon?: React.ReactNode;
  onClick?: (value: any) => void;
};
export default function SubmitBtn({
  type,
  classBtn,
  value,
  icon,
  classPlus,
  onClick,
}: SubmitBtnType) {
  const classButton =
    "bg-gradient-to-t font-medium text-gray-50 flex items-center shadow-md transition-all px-3 py-2 text-sm text-center rounded-md to-[#064ed1] from-[#565c70] hover:from-[#292e3e] hover:to-[#0743b1]";
  return (
    <Button
      className={classBtn ? classBtn : classButton + " " + classPlus}
      type={type}
      onClick={onClick}
    >
      {value}
      {icon}
    </Button>
  );
}
