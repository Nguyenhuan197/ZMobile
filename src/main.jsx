import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocalStorageUserContext } from "./context/useThemeContext";
import { HelmetProvider } from "react-helmet-async";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LocalStorageUserContext>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </LocalStorageUserContext>
  </BrowserRouter>




);



