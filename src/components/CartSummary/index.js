import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      // Count Total Price Of Cart Products
      const totalPrice = cartList.reduce(
        (initialValue, currentValue) =>
          initialValue + currentValue.quantity * currentValue.price,
        0,
      )

      const totalItems = cartList.length

      return (
        <>
          <div className="checkout-summary-container">
            <div>
              <h1>
                Order Total: <span className="price">Rs {totalPrice} /-</span>
              </h1>
              <p className="items-in-cart">{totalItems} Items in cart</p>
              <button type="button" className="checkout-btn">
                Checkout
              </button>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
