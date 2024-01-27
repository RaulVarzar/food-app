import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useFetch from './hooks/useFetch.js';

import Error from './components/Error.jsx';
import Header from './components/Header.jsx';
import Products from './components/Products.jsx';
import Dashboard from './components/Dashboard.jsx';
import Loading from './components/Loading/Loading.jsx';

function App() {
  const { isFetching, error, fetchedData: products } = useFetch('products');

  function AnimatedRoutes() {
    const location = useLocation();
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage key={location.pathname} />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </AnimatePresence>
    );
  }

  function HomePage() {
    const tabs = ['burgers', 'pizza', 'pasta', 'dessert', 'salads'];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-start min-h-screen py-8 bg-base-200"
      >
        <Header setTab={setActiveTab} activeTab={activeTab} tabs={tabs} />
        <Products
          products={products}
          activeTab={activeTab}
          loading={isFetching}
        />
        {error && <Error message={error.message} />}
      </motion.div>
    );
  }

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isFetching && <Loading key={isFetching} />}
      </AnimatePresence>
      {!isFetching && <AnimatedRoutes />}
    </Router>
  );
}

export default App;
