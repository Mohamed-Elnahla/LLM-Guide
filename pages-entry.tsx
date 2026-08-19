import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GuideShell } from "./app/guide-shell";
import "./app/globals.css";

createRoot(document.getElementById("root")!).render(<StrictMode><GuideShell /></StrictMode>);
