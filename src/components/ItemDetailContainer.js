import React from "react";

import ItemDetail from "./ItemDetail";
import Loading from "./Loading";

import useGetItem from "../hooks/useGetItem";

const ItemDetailContainer = () => {
  const item = useGetItem();

  return (
    <section className="sectionCenter">
      <section className="sectionCenter">
        {!item ? <Loading /> : <ItemDetail item={item} />}
      </section>
    </section>
  );
};

export default ItemDetailContainer;
