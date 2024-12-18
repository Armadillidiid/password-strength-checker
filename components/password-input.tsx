"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as Icons from "lucide-react";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <div className="focus-within::outline-none focus-within::ring-2 focus-within::ring-ring relative flex h-10 w-full items-center rounded-md border border-input bg-background px-0.5 py-0.5 ring-ring ring-offset-background file:border-0 focus-within:ring-2 focus-within:ring-offset-2">
        <Input
          ref={ref}
          type={isPasswordVisible ? "text" : "password"}
          className="z-10 h-full border-0 border-transparent ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:outline-transparent focus-visible:ring-transparent"
          {...props}
        />

        <Button
          type="button"
          variant={"none"}
          size={"icon"}
          className="z-10 mx-3 h-fit"
          onClick={() => setIsPasswordVisible((prevState) => !prevState)}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          aria-pressed={isPasswordVisible}
        >
          {isPasswordVisible ? (
            <>
              <Icons.Eye className="h-5 w-5" />
              <span className="sr-only">Hide password</span>
            </>
          ) : (
            <>
              <Icons.EyeOff className="h-5 w-5" />
              <span className="sr-only">Show password</span>
            </>
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
