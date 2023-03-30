import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const saveCart = [];
    // Step 01: get id of the addedProduct
    for (const id in storedCart) {
      // console.log(id)
      // Step 02: get the product from products by using id
      const addedProduct = products.find((product) => product.id === id);
      // console.log(addedProduct);
      if (addedProduct) {
        // Step 03: get the quantity of the product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // Step 04: add the added Product to the saved cart
        saveCart.push(addedProduct);
      }
      console.log("added product", addedProduct);
    }
    // Step 05: save cart
    setCart(saveCart);
  }, [products]);

  const handleAddToCart = (product) => {
    // console.log(product);
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product product={product} handleAddToCart={handleAddToCart} key={product.id}></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
