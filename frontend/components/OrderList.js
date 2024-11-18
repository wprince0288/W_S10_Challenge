import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, setFilter } from '../state/orderHistorySlice'

export default function OrderList() {
  const dispatch = useDispatch();
  const { loading, orders = [], filter } = useSelector((state) => state.orderHistory);

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])


  const filteredOrders = orders.filter(
    (order) => filter === 'ALL' || order.size === filter);

  const sizes = ['All', 'S', 'M', 'L']

  const handleSizeFilterChange = (size) => {
    dispatch(setFilter(size));
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {loading ? (
        <div> Loading...</div>
      ) : (
        <ol>
          {filteredOrders.map((order, index) => (
              <li key={order.id || index}>
                <div>
                  <p>
                    {order.customer} ordered a size {order.size} with{' '} {order.toppings && order.toppings.length >
                      0 ? order.toppings.length : 'no'}{' '}
                    toppings
                  </p>
                </div>
              </li>
            ))}
        </ol>
      )}
      <div id="sizeFilters">
        Filter by size:
        {sizes.map((size) => (
          <button
            data-testid={`filterBtn${size}`}
            className={`button-filter${size === filter ? ' active' : ''}`}
            onClick={() => handleSizeFilterChange(size)}
            key={size}
            >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

