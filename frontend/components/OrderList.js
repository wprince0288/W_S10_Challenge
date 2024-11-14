import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../state/orderHistorySlice'
import { setSizeFilter } from '../state/sizeFilterSlice'

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orderHistory);
  const sizeFilter = useSelector(state => state.sizeFilter);

  const filteredOrders = orders.filter(order => 
    sizeFilter === 'All' || order.size === sizeFilter
  );

  const handleSizeFilterChange = (size) => {
    dispatch(setSizeFilter(size));
    dispatch(fetchOrders());  // Optionally, re-fetch the orders based on the filter
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Pizza Orders</h2>
      <div>
        <button onClick={() => handleSizeFilterChange('All')}>All</button>
        <button onClick={() => handleSizeFilterChange('S')}>Small</button>
        <button onClick={() => handleSizeFilterChange('M')}>Medium</button>
        <button onClick={() => handleSizeFilterChange('L')}>Large</button>
      </div>
      <ul>
        {filteredOrders.map((order, index) => (
          <li key={index}>
            <p>Order by: {order.fullName}</p>
            <p>Size: {order.size}</p>
            <p>Toppings: {order.toppings.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;