import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LocalStorageUserContext } from "./context/useThemeContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <LocalStorageUserContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LocalStorageUserContext>

);


