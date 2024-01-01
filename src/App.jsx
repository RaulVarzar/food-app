import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"

import CartContext from './store/CartContext.jsx';
import useFetch from './hooks/useFetch.js';
import { fetchData } from './http.js';

import CartButton from './components/CartButton.jsx';
import Header from './components/Header.jsx';
import Products from './components/Products.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  
  const {
    isFetching,  
    error, 
    fetchedData: products
  } = useFetch('products')
  
  function AnimatedRoutes() {
    const location = useLocation();
    return (
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage key={location.pathname}/>} />
            <Route path="dashboard" element={<Dashboard/>} />
          </Routes>
      </AnimatePresence>
    );
  }

  function HomePage() {

    const tabs = ["burgers", "pizza", "pasta", "dessert", "salads"]

    const cart = useContext(CartContext)
    
    const [activeTab, setActiveTab] = useState(tabs[0])

    return(
      <motion.div exit={{opacity:0}} transition={{duration:0.2}} className='min-h-screen bg-base-300'>
        <Header setTab={setActiveTab} activeTab={activeTab} tabs={tabs}/>
        <Products products={products} activeTab={activeTab}/>
        <CartButton />
      </motion.div>
    )
  }

  return (
      <Router>
        <AnimatedRoutes />
      </Router>
    );
}

export default App;
