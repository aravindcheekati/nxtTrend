import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const existingProduct = cartList.find(item => item.id === product.id)

    if (existingProduct) {
      const updatedProduct = cartList.map(curElem => {
        if (curElem.id === product.id) {
          const newQuantity = curElem.quantity + product.quantity
          return {...curElem, quantity: newQuantity}
        }
        return curElem
      })
      this.setState({cartList: updatedProduct})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartItems = cartList.filter(item => id !== item.id)
    this.setState({cartList: updatedCartItems})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartQuantityItem = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })

    this.setState({cartList: updatedCartQuantityItem})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartQuantityItem = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })
    const updatedProducts = updatedCartQuantityItem.filter(
      item => item.quantity !== 0,
    )

    this.setState({cartList: updatedProducts})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
