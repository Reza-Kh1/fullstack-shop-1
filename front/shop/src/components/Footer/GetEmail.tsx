"use client";
import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaMailBulk } from "react-icons/fa";

export default function GetEmail() {
  const [email, setEmail] = useState<string>("");
  return (
    <div className="flex justify-evenly">
      <div className="w-8/12" style={{ direction: "ltr" }}>
        <Input
          type="email"
          label="ایمیل"
          icon={<FaMailBulk className="inline" />}
          color="blue-gray"
          value={email}
          className="text-orange-300"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <Button
        size="sm"
        color={email ? "deep-orange" : "gray"}
        disabled={!email}
        className="rounded w-3/12 font-medium"
      >
        ارسال
      </Button>
    </div>
  );
}
