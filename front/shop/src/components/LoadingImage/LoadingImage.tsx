import React from "react";
import "./style.css";
export default function LoadingImage() {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2">
      <div className="lds-spinner">
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
        <div aria-hidden></div>
      </div>
    </div>
  );
}
