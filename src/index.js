import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//React Router Imports
import { router } from "./router/Index";
import { RouterProvider } from "react-router-dom";

//Context Imports
import CartContextProvider from "./context/CartContex";

//Firebase Initialization

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOYlxOC1zUR9iDZkCRtyUWw2cpXibmazY",
  authDomain: "coder-pf-rj001.firebaseapp.com",
  projectId: "coder-pf-rj001",
  storageBucket: "coder-pf-rj001.appspot.com",
  messagingSenderId: "80134995659",
  appId: "1:80134995659:web:a8bbc7bf195710ed16a54e",
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>
);
