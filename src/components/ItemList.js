import React from "react";
import Item from "./Item";

import Loading from "./Loading";

const ItemList = ({ products }) => {
  return (
    <section className="itemsContainer">
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <Item product={product} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default ItemList;
