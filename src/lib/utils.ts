import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function firstLetterUppercase(string: string) {
  var value = string.split(" ").map((word) => word.charAt(0))

  return value[0] ?? ""
}
