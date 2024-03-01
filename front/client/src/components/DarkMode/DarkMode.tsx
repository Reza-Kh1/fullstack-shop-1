"use client";
// import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import ButtonCustom from "../ui/ButtonCustom";
export default function DarkMode() {
  const [darkModes, setDarkMode] = useState<boolean>(false);
  const darkModeBtn = () => {
    if (!darkModes) {
      setDarkMode(true);
      localStorage.setItem("darkMode", "enabled");
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "");
    }
  };
  useEffect(() => {
    let darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      document.body.classList.add("dark");
      setDarkMode(true);
    } else {
      document.body.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);
  return (
    <ButtonCustom
      onClick={darkModeBtn}
      color={darkModes ? "gray" : "orange"}
    >
      {darkModes ? <FaMoon /> : <FaSun />}
    </ButtonCustom>
  );
}
