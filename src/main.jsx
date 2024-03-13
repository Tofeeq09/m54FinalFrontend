// Path: src/main.scss

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import Temp from "../Temp.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
