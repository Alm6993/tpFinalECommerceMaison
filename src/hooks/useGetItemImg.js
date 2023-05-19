import { useEffect, useState } from "react";

import { getDownloadURL, getStorage, ref } from "firebase/storage";

const useGetItemImg = (imgRef) => {
  const [img, setImg] = useState();

  const storage = getStorage();

  const productRef = ref(storage, imgRef);

  useEffect(() => {
    getDownloadURL(productRef)
      .then((data) => setImg(data))
      .catch((err) => console.error({ err }));
  }, [productRef]);

  return img;
};

export default useGetItemImg;
