import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Cart from './components/Cart';
import Category from './components/Category';
import Header from './components/Header';
import Categories from './components/Categories';
import PostList from './components/PostList';

function App() {
  const [cartItems, setCartItem] = useState(() => {
    const data = JSON.parse(localStorage.getItem('CART')) || [];
    return data;
  })

  const onAdd = (product) => {
    const exist = cartItems.find(x => x.id === product.id);
    if (exist) {
      const newCartItems = [...cartItems.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x)]
      setCartItem(newCartItems);
      localStorage.setItem('CART', JSON.stringify(newCartItems));
    } else {
      setCartItem([...cartItems, { ...product, qty: 1 }]);
      localStorage.setItem('CART', JSON.stringify([...cartItems, { ...product, qty: 1 }]));
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      const newCartItems = [...cartItems.filter((x) => x.id !== product.id)];
      setCartItem(newCartItems);
      localStorage.setItem('CART', JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cartItems.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x)];
      setCartItem(newCartItems);
      localStorage.setItem('CART', JSON.stringify(newCartItems));
    }
  }

  const onClear = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      const newCartItems = [...cartItems.filter((x) => x.id !== product.id)];
      setCartItem(newCartItems);
      localStorage.setItem('CART', JSON.stringify(newCartItems));
    }
  }

  const onClearAll = () => {
    const newCartItems = [];
    setCartItem(newCartItems);
    localStorage.setItem('CART', JSON.stringify(newCartItems));
  }

  const [query, setQuery] = useState('');

  const search = (data) => {
    return data.filter((item) => item.name.toLowerCase().includes(query));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header countCartItem={cartItems.length} setQuery={setQuery} />}>
          <Route index element={<Category onAdd={onAdd} data={search(Categories)} />} />
          <Route path="cart" element={<Cart onAdd={onAdd} onRemove={onRemove} onClear={onClear} onClearAll={onClearAll} cartItems={cartItems} countCartItem={cartItems.length} />} />
          <Route path="list" element={<PostList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
