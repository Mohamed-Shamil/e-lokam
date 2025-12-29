
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initCapacitor } from "./utils/capacitor";

// Initialize Capacitor (only runs on native platforms, safe for web)
initCapacitor().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
  