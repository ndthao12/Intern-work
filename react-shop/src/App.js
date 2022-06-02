import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Cart from './components/Cart';
import Category from './components/Category';
import Header from './components/Header';

function App() {
  const [cartItems, setCartItem] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find(x => x.id === product.id);
    if (exist) {
      setCartItem(cartItems.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x))
    } else {
      setCartItem([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItem(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItem(cartItems.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x))
    }
  }

  const onClear = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItem(cartItems.filter((x) => x.id !== product.id));
    }
  }

  const onClearAll = () => {
    setCartItem([]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header countCartItem={cartItems.length} />}>
          <Route index element={<Category onAdd={onAdd} />} />
          <Route path="cart" element={<Cart onAdd={onAdd} onRemove={onRemove} onClear={onClear} onClearAll={onClearAll} cartItems={cartItems} countCartItem={cartItems.length} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
