import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../state/orderHistorySlice'
import { setSizeFilter } from '../state/sizeFilterSlice'

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderHistory.orders);
  const status = useSelector((state) => state.orderHistory.status)
  const sizeFilter = useSelector(state => state.sizeFilter);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders())
    }
  }, [status, dispatch])

  const filteredOrders = orders.filter(order => 
    sizeFilter === 'All' || order.size === sizeFilter
  );

  const sizes = ['All', 'S', 'M', 'L']
  const handleSizeFilterChange = (size) => {
    dispatch(setSizeFilter(size));
    dispatch(fetchOrders());  // Optionally, re-fetch the orders based on the filter
  };


  return (
    <div>
      <h2>Pizza Orders</h2>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading orders</p>}
      <div>
        {sizes.map((size) => (
          <button
          key={size}
          onClick={() => dispatch(setSizeFilter(size))}
          >
            {size}
          </button>
        ))}
        {/* <button onClick={() => handleSizeFilterChange('All')}>All</button>
        <button onClick={() => handleSizeFilterChange('S')}>S</button>
        <button onClick={() => handleSizeFilterChange('M')}>M</button>
        <button onClick={() => handleSizeFilterChange('L')}>L</button> */}
      </div>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
           {order.fullName} ordered a {order.size} pizza with{' '}
           {order.toppings.length > 0 ? order.toppings.join(', ') : 'no toppings'}.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList