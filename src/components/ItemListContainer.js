import ItemList from "./ItemList";
import Loading from "./Loading";

import useGetCollection from "../hooks/useGetCollection";

const ItemListContainer = () => {
  const products = useGetCollection();

  return (
    <section className="sectionCenter">
      {!products ? <Loading /> : <ItemList products={products} />}
    </section>
  );
};

export default ItemListContainer;
