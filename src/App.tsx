import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/404";
import type { Product as ProductType } from "./types/Product";


const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("cart") || "[]"
) as ProductType[];

function App() {
  const [cart, setCart] = useState<ProductType[]>(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: ProductType) => {
    const newCart = [...cart];
    let itemInCart = newCart.find((item) => product.id === item.id);
    if (itemInCart) {
      // Make sure quantity exists and is a number
      itemInCart.quantity = (itemInCart.quantity || 0) + 1;
    } else {
      itemInCart = { ...product, quantity: 1 };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };

  const removeFromCart = (productToRemove: ProductType) => {
    // console.log("productToRemove", productToRemove)
    setCart(cart.filter((product2) => product2 !== productToRemove));
  };

  const removeOneFromCart = (product: ProductType) => {
    const newCart = [...cart];
    const itemInCart = newCart.find((item) => product.id === item.id);
    // console.log("itemInCart", itemInCart)

    if (itemInCart) {
      if (itemInCart.quantity === 1) {
        return removeFromCart(product);
      }
      // Make sure quantity exists and is a number
      itemInCart.quantity = (itemInCart.quantity || 0) - 1;
    }
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  };

  return (
    <>
      <Navbar getCartTotal={getCartTotal} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={<Product cart={cart} addToCart={addToCart} />}
          />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          <Route
            path="cart"
            element={
              <Cart
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                removeOneFromCart={removeOneFromCart}
                getCartTotal={getCartTotal}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* This is the catch-all route for 404 pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
