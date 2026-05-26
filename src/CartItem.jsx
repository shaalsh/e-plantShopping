import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.substring(1));
      return total + itemCost * item.quantity;
    }, 0);
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1));
    return itemCost * item.quantity;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>
          <img className="cart-item-image" src={item.image} alt={item.name} />

          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>{item.cost}</p>

            <div className="cart-item-quantity">
              <button
                className="cart-item-button"
                onClick={() => handleDecrement(item)}
              >
                -
              </button>

              <span className="cart-item-quantity-value">{item.quantity}</span>

              <button
                className="cart-item-button"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>

            <p>Total: ${calculateTotalCost(item)}</p>

            <button
              className="cart-item-delete"
              onClick={() => handleRemove(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <button
        className="continue-shopping-button"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </button>

      <button
        className="checkout-button"
        onClick={handleCheckoutShopping}
      >
        Checkout
      </button>
    </div>
  );
}


export default CartItem;