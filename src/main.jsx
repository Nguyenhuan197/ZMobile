import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocalStorageUserContext } from "./context/useThemeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LocalStorageUserContext>
      <App />
    </LocalStorageUserContext>
  </BrowserRouter>
);


