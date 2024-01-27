import { motion, AnimatePresence } from 'framer-motion';
import Product from './ProductCard.jsx';
import ProductCardWide from './ProductCardWide.jsx';
import Loading from './Loading/Loading.jsx';
import { useContext } from 'react';
import UserProgress from '../store/UserProgress.jsx';

export default function Products({ products, activeTab, loading }) {
  const user = useContext(UserProgress);
  const view = user.productsView;

  const filteredProducts = products.filter(
    (product) => product.category === activeTab
  );

  const gridView = [
    'grid grid-cols-1 gap-3 pb-16 mx-auto lg:gap-4 sm:grid-cols-2 w-full pt-10 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 place-content-center',
  ];
  const listView = [
    'flex flex-row justify-start gap-0 items-start place-content-start content-start min-h-screen flex-wrap w-full pb-16 mx-auto pt-10',
  ];

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex flex-col gap-4 max-w-[1450px] mx-auto  px-4">
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={view === 'grid' ? gridView : listView}
      >
        <AnimatePresence mode="wait">
          {filteredProducts.map((product, i) =>
            view === 'grid' ? (
              <Product key={product.id} product={product} index={i} />
            ) : (
              <ProductCardWide key={product.id} product={product} index={i} />
            )
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
