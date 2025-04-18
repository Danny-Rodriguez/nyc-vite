// import { useSelector } from "react-redux"
// import Product from "../pages/Product"

// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  // Add other properties that might be used
}

// Define the props interface for the Cart component
interface CartProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  removeOneFromCart: (product: Product) => void;
  getCartTotal: () => number;
}

function Cart({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  removeOneFromCart,
  getCartTotal,
}: CartProps) {
  // console.log(cart)

  const checkout = async () => {
    try {
      const response = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.url) {
        window.location.assign(data.url); // forwarding user to stripe
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your checkout. Please try again.");
    }
  };

  const getTotalSum = () => {
    return cart
      .reduce((sum, { price, quantity }) => sum + price * quantity, 0)
      ?.toFixed(2);
    // console.log("cart length", cart.length)
  };

  return (
    <div className="d-flex flex-column">
      <h1 className="mt-3 text-center d-flex justify-content-center">
        Cart <p className="text-muted">&nbsp;({getCartTotal()}) items</p>{" "}
      </h1>
      <div className="d-flex justify-content-center checkoutView">
        <div className="cartList d-flex flex-column">
          {cart.map((product, idx) => (
            <div className="row cartRow" key={idx}>
              <div className="productInCart d-flex justify-content-center align-items-center">
                <img
                  className="cartImg"
                  src={product.image}
                  alt={product.title}
                  height="200px"
                  width="180px"
                />
                <div className="col-md-3">
                  <h3 className="cartTitle">
                    {product.title.substring(0, 20).concat("...")}
                  </h3>
                  <div className="cartPriceQty d-flex flex-column">
                    <div>Price: {product.price}</div>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                  <div className="countBtns d-flex">
                    <button
                      className="btn btn-outline-dark me-4"
                      onClick={() => addToCart(product)}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                    <button
                      className="btn btn-outline-dark me-4"
                      onClick={() => removeOneFromCart(product)}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => removeFromCart(product)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length !== 0 ? (
          <div className="d-flex flex-column checkoutBtns">
            <div className="cartSum d-flex flex-column">
              <div className="items">Items: {getCartTotal()}</div>
              <div className="shipping">Shipping: *Free*</div>
              <div>
                <div className="total">
                  {" "}
                  <br /> Total: ${getTotalSum()}
                </div>
                <br />
                <button className="btn btn-dark" onClick={checkout}>
                  Go to Check Out
                </button>
              </div>
              <button className="clear btn btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-center">
            Check out the shop and find your style!
          </h1>
        )}
      </div>
    </div>
  );
}

export default Cart;
