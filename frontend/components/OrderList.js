import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, setSizeFilter } from '../state/orderHistorySlice'

export default function OrderList() {
  const dispatch = useDispatch();
  const { loading, orders, filter } = useSelector((state) => state.orderList);

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])


  const filteredOrders = orders.filter(order =>
    sizeFilter === 'All' || order.size === sizeFilter
  );

  const sizes = ['All', 'S', 'M', 'L']
  const handleSizeFilterChange = (size) => {
    dispatch(setSizeFilter(size));
    dispatch(fetchOrders());  // Optionally, re-fetch the orders based on the filter
  };


  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {loading ? (
        <div> Loading...</div>) : (
        <ol>
          {
            filteredOrders.map((order) => (
              <li key={order.id}>
                <div>
                  <p>
                    {order.customer} ordered a size {order.size} with{' '} {order.toppings && order.toppings.length >
                      0 ? order.toppings.length : 'no'} {' '} toppings
                  </p>
                </div>
              </li>
            ))}
        </ol>
      )}
      <div id="sizeFilters">
        Filter by size:
        {
          ['ALL', 'S', 'M', 'L'].map(size => {

            return <button
              data-testid={`filterBtn${size}`}
              className={`button-filter${size === fitler ? ' active' : ''}`}
              onClick={() => dispatch(setSizeFilter(size))}
              key={size}>
              {size}
            </button>
          })
        }
      </div>
    </div>
  )
}

