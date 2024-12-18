import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getScoreInfo = (score: number) => {
  switch (score) {
    case 0:
      return { text: "Very Weak", color: "text-red-500" };
    case 1:
      return { text: "Weak", color: "text-orange-500" };
    case 2:
      return { text: "Fair", color: "text-yellow-500" };
    case 3:
      return { text: "Strong", color: "text-green-500" };
    case 4:
      return { text: "Very Strong", color: "text-emerald-500" };
    default:
      return { text: "Unknown", color: "text-gray-500" };
  }
};

export function checkComplexity(password: string) {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 symbol" },
  ];
  return requirements.map((req) => ({
    passed: req.regex.test(password),
    text: req.text,
  }));
}
