import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

document.getElementById("root").className = "font-kode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode cl>
    <App />
  </React.StrictMode>,
);
