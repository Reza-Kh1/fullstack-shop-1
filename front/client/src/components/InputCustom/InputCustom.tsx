"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
type InputCustomType = {
  value?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  defaultValue?: string | null;
  textarea?: boolean;
  rows?: number;
  onChange?: (value: any) => void;
  className?: string;
  icon?: React.ReactNode;
  type?: "text" | "password" | "email";
  classSpan?: string;
};
export default function InputCustom({
  defaultValue,
  value,
  placeholder,
  name,
  required,
  textarea,
  rows,
  onChange,
  className,
  icon,
  type,
  classSpan,
}: InputCustomType) {
  const classInput =
    `p-3 bg-custom-dark shadow-md rounded-md w-full dark:bg-custom-light placeholder:text-gray-800 dark:placeholder:text-gray-500 text-h1-light dark:text-h1-dark ${
      icon ? "pr-12 " : ""
    }` + className||"";
  return (
    <>
      <span
        className={`block mb-2 text-h1-light dark:text-h1-dark ${classSpan||""}` }
      >
        {value}
      </span>
      {textarea ? (
        <textarea
          onChange={onChange}
          required={required || false}
          defaultValue={defaultValue || ""}
          rows={rows}
          name={name}
          placeholder={placeholder}
          className={classInput}
        />
      ) : (
        <label htmlFor={name} className="relative h-full">
          <input
            onChange={onChange}
            required={required || false}
            type={type || "text"}
            defaultValue={defaultValue || ""}
            name={name}
            placeholder={placeholder}
            className={classInput}
          />
          {icon && (
            <i className="absolute top-1/2 right-1 transform translate-x-0 -translate-y-1/2 py-3 px-3 text-span-light dark:text-span-dark rounded-md bg-gray-800 dark:bg-gray-300">
              {icon}
            </i>
          )}
        </label>
      )}
    </>
  );
}
