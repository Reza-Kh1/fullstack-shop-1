"use client";
import React from "react";
import { Button } from "@material-tailwind/react";
import {
  color,
  variant,
} from "@material-tailwind/react/types/components/button";
type ButtonTailwind = {
  children: React.ReactNode;
  color?: color;
  className?: string | null;
  variant?: variant;
};
const ButtonTailwind = ({
  children,
  color,
  className,
  variant,
}: ButtonTailwind) => {
  return (
    <Button
      variant={variant || "gradient"}
      color={color}
      className={className + " font-medium"}
    >
      {children}
    </Button>
  );
};
export default ButtonTailwind;