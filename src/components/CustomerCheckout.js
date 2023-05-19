import React, { useRef, useState, useEffect } from "react";

import { useCartContext } from "../context/CartContex";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const CustomerCheckout = () => {
  const [orderId, setOrderId] = useState(null);
  const [orderPosted, setOrderPosted] = useState(false);

  const { cart, cartTotal, clearCart } = useCartContext();

  const refName = useRef();
  const refSurname = useRef();
  const refEmail = useRef();
  const refPhone = useRef();
  const refAddress = useRef();

  const handleSubmitCheckout = (e) => {
    e.preventDefault();

    const orderItems = cart.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      };
    });

    const order = {
      buyer: {
        name: refName.current.value,
        surname: refSurname.current.value,
        email: refEmail.current.value,
        phone: refPhone.current.value,
        address: refAddress.current.value,
      },
      items: orderItems,
      date: new Date().toString(),
      total: cartTotal(),
    };

    const db = getFirestore();
    const ordersCollection = collection(db, "orders");

    addDoc(ordersCollection, order)
      .then(({ id }) => {
        setOrderId(id);
        setOrderPosted(true);
      })
      .catch((err) => console.error({ err }));
  };

  useEffect(() => {
    if (orderPosted) {
      const db = getFirestore();

      cart.forEach((item) => {
        const itemRef = doc(db, "items", item.id);
        getDoc(itemRef)
          .then((result) => result.data().stock)
          .then((originalStock) =>
            updateDoc(itemRef, { stock: originalStock - item.quantity })
          )
          .then(() => {
            clearCart();
          })
          .catch((err) => console.error(err));
      });
    }
  }, [orderPosted]);

  if (orderPosted) {
    return (
      <section className="sectionCenter">
        <div className="checkoutOrderContainer">
          <h2 className="checkoutOrderTitle">¡Gracias por su compra!</h2>
          <h2 className="checkoutOrderInfo">
            Conserve su número de orden para seguir su pedido.
          </h2>
          <h3 className="checkoutOrderId">Numero de Orden: {orderId}</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="sectionCenter">
      <form action="" className="checkoutForm" onSubmit={handleSubmitCheckout}>
        <h2 className="checkoutFormAmount">
          El monto total de su compra es de: $
          <span className="checkoutFormAmountStrong">
            {cartTotal().toLocaleString("es-AR")}
          </span>
        </h2>
        <input
          type="text"
          name="name"
          className="checkoutInput"
          placeholder="nombre"
          required
          ref={refName}
        />
        <input
          type="text"
          name="surname"
          className="checkoutInput"
          placeholder="apellido"
          required
          ref={refSurname}
        />
        <input
          type="email"
          name="email"
          className="checkoutInput"
          placeholder="email@example.com"
          required
          ref={refEmail}
        />
        <input
          type="tel"
          name="phone"
          className="checkoutInput"
          placeholder="Telefono de Contacto"
          required
          ref={refPhone}
        />
        <input
          type="text"
          name="address"
          className="checkoutInput"
          placeholder="Dirección"
          required
          ref={refAddress}
        />
        <button type="submit" className="formSubmit">
          Confirmar Compra
        </button>
      </form>
    </section>
  );
};

export default CustomerCheckout;
