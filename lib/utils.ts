import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}

export function downloadFile(url: string) {
  const a = document.createElement("a");
  a.href = url;
  const uuid = v4();
  const dateInstance = new Date().getTime();
  a.download = `image-${uuid}-${dateInstance}` || "file-name";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
