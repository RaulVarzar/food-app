import { useState } from 'react';

export default function IndividualOrder({ order }) {
  const numberOfItems = order.items.reduce(
    (total, item) => (total = total + item.quantity),
    0
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full rounded-xl collapse bg-base-100">
      <input type="checkbox" onClick={() => setIsOpen(!isOpen)} />
      <div
        className={
          'flex flex-row items-center justify-between px-4 md:px-10 py-6 collapse-title rounded-xl ' +
          (isOpen && ' bg-base-200')
        }
      >
        <div className="flex flex-row items-center gap-2 md:gap-6">
          <p className="font-bold tracking-wider text-md md:text-3xl">
            #{order.id}{' '}
          </p>

          <div className="flex flex-col gap-1">
            <p className="font-bold text-md md:text-2xl">
              {order.customer.street}
            </p>
            <div className="flex flex-row items-center join rounded-xl gap-0.5">
              <span className="px-3 py-1.5 text-xs md:text-sm bg-neutral text-accent join-item ">
                ${order.totalPrice}
              </span>
              <span className="px-3 py-1.5 text-xs md:text-sm bg-neutral text-neutral-content join-item">
                {numberOfItems} products
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase md:text-sm join-item rounded-xl text-base-content bg-neutral">
                {order.customer.payment}
                {order.customer.payment === 'cash' && (
                  <i className="fa-solid fa-money-bill-1-wave"></i>
                )}
                {order.customer.payment === 'card' && (
                  <i className="fa-regular fa-credit-card text-error"></i>
                )}
                {order.customer.payment === 'online-card' && (
                  <i className="fa-regular fa-credit-card text-success"></i>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-sm font-light tracking-wider opacity-60">
            {order.day}
          </span>
          <span className="text-lg font-semibold md:text-xl">{order.time}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 lg:justify-start lg:flex-row collapse-content">
        <ul className="flex flex-col gap-3 px-8 py-6 mt-4 bg-opacity-70 bg-base-300 rounded-xl">
          <li className="flex flex-row items-center gap-6">
            {' '}
            <i className="fa-solid fa-id-card"></i>{' '}
            <span className="text-xl">{order.customer.name} </span>
          </li>
          <li className="flex flex-row items-center gap-6">
            {' '}
            <i className="fa-solid fa-phone"></i>{' '}
            <span className="text-xl">{order.customer.phone} </span>
          </li>
          <li className="flex flex-row items-center gap-6">
            {' '}
            <i className="fa-solid fa-envelope"></i>{' '}
            <span className="text-xl">{order.customer.email} </span>
          </li>
          <li className="flex flex-row items-center gap-6">
            {' '}
            <i className="fa-solid fa-location-dot"></i>{' '}
            <span className="text-xl">
              {order.customer.street}, {order.customer.city}{' '}
            </span>
          </li>
        </ul>

        <div className="flex flex-col gap-3 p-4">
          {order.customer.comment && (
            <div className="flex flex-row items-end gap-3">
              <h3 className="text-xl text-accent text-semibold">Requests</h3>
              <span className="italic tracking-wider">
                "{order.customer.comment}"
              </span>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2 h-fit">
            {order.items.map((product) => (
              <div
                key={product.id}
                className="flex flex-row justify-between gap-6 p-4 bg-opacity-75 bg-base-300 rounded-xl"
              >
                <span>
                  {product.quantity} x {product.name}
                </span>
                <span>{product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
