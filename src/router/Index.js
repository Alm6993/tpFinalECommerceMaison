import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import App from "../App";
import Category from "../views/Category";
import Item from "../views/Item";
import Cart from "../views/Cart";
import NotFound from "../views/NotFound";
import CheckOut from "../views/CheckOut";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,

        element: <App />,
      },
      {
        path: "category/:category",
        element: <Category />,
      },
      {
        path: "item/:id",
        element: <Item />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
    ],
  },
]);
