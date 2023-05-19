import { useState, useEffect } from "react";

import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { useParams } from "react-router-dom";

const useGetCollection = () => {
  const { category } = useParams();
  const [products, setProducts] = useState();

  const db = getFirestore();

  useEffect(() => {
    if (category === "todo" || !category) {
      const itemsCollection = collection(db, "items");
      getDocs(itemsCollection).then((data) =>
        setProducts(
          data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        ).catch((err) => console.error({ err }))
      );
    } else {
      const itemsQuery = query(
        collection(db, "items"),
        where("category", "==", category)
      );
      getDocs(itemsQuery).then((data) =>
        setProducts(
          data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        ).catch((err) => {
          console.error({ err });
        })
      );
    }
  }, [category]);
  return products;
};

export default useGetCollection;
