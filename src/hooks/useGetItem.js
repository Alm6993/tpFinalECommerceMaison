import { useState, useEffect } from "react";

import { doc, getFirestore, getDoc } from "firebase/firestore";

import { useParams } from "react-router-dom";

const useGetItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const db = getFirestore();

  const itemRef = doc(db, "items", id);

  useEffect(() => {
    getDoc(itemRef).then((data) => {
      if (data.exists()) {
        setProduct({ id: data.id, ...data.data() }).catch((err) =>
          console.error({ err })
        );
      }
    });
  }, [id]);
  return product;
};

export default useGetItem;
