import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

import AuthProvider from "./providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  
    <AuthProvider>
      <App />
      <Toaster/>
    </AuthProvider>
 
);


// branching from another account test
// test 2