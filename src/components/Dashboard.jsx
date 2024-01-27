import useFetch from '../hooks/useFetch';
import IndividualOrder from './IndividualOrder';
import { useState, useEffect } from 'react';
import { getMyWeek, getWeek } from '../utils/getTime';
import { FromLeft } from '../utils/animations';
import { AnimatePresence } from 'framer-motion';
import ManageProducts from './ManageProducts';

export default function Dashboard() {
  const today = new Date().toDateString();

  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const {
    isFetching,
    // error,
    fetchedData: orders,
  } = useFetch('orders');

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  function filterByPeriod(selectedPeriod) {
    if (selectedPeriod === 'all') {
      setFilteredOrders(orders.filter((order) => order));
    } else if (selectedPeriod === 'today') {
      setFilteredOrders(orders.filter((order) => order.day === today));
    } else if (selectedPeriod === 'week') {
      setFilteredOrders(
        orders.filter((order) => getMyWeek(order.day) === getWeek())
      );
    }
  }

  function filter(period) {
    setSelectedPeriod(period);
    filterByPeriod(period);
  }

  return (
    <div className="flex flex-col items-center content-center justify-start w-full min-h-screen gap-4 px-2 pt-10 bg-base-300 md:px-10">
      <h3 className="text-3xl font-bold">ORDERS</h3>

      <div className="flex flex-row items-center w-full gap-4">
        <div role="tablist" className="p-2 tabs tabs-boxed rounded-xl">
          <a
            role="tab"
            className={'tab ' + (selectedPeriod === 'all' && ' tab-active')}
            onClick={() => filter('all')}
          >
            All
          </a>
          <a
            role="tab"
            className={'tab ' + (selectedPeriod === 'today' && ' tab-active')}
            onClick={() => filter('today')}
          >
            Today
          </a>
          <a
            role="tab"
            className={'tab ' + (selectedPeriod === 'week' && ' tab-active')}
            onClick={() => filter('week')}
          >
            This week
          </a>
        </div>
        <span className="text-lg font-semibold opacity-50 ">
          {filteredOrders.length} orders
        </span>
      </div>

      {isFetching ? (
        <h3 className="mx-auto text-2xl text-info">LOADING ORDERS</h3>
      ) : (
        <div className="flex flex-col items-stretch w-full gap-4 justify-stretch ">
          <AnimatePresence>
            {filteredOrders.map((order, i) => (
              <FromLeft delay={0.1} duration={0.4} key={order.id}>
                <IndividualOrder order={order} />
              </FromLeft>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ManageProducts />
    </div>
  );
}
