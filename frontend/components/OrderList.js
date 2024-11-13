import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderHistory, setSizeFilter } from '../state/store'

export default function OrderList() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orderHistory)
  const sizeFilter = useSelector((state) => state.sizeFilter);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch])

  const filteredOrders = sizeFilter === 'ALL'
    ? orders : orders.filter((order) => order.size === sizeFilter)

  const handleFilterClick = (size) => {
    dispatch(setSizeFilter(size))
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p>Error: {error}</p>}
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <div>
              <p><strong>Name:</strong> {order.fullName}</p>
              <p><strong>Size:</strong> {order.size}</p>
              <p><strong>Toppings:</strong>{' '} {order.toppings.length > 0 ? order.toppings.join(', ') : 'No toppings'}</p>
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        <h3>Filter by size:</h3>
        {['ALL', 'S', 'M', 'L'].map((size) => (
          <button
            key={size}
            data-testid={`filterBtn${size}`}
            className={`button-filter${size === sizeFilter ? ' active' : ''}`}
            onClick={() => handleFilterClick(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}