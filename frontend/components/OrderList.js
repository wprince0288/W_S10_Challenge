import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderHistory, setSizeFilter } from '../state/store'

export default function OrderList() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orderHistory)
  const sizeFilter = useSelector((state) => state.sizeFilter)

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch])

  const handleFilterClick = (size) => {
    dispatch(setSizeFilter(size))
  }

  const filteredOrders = sizeFilter === 'ALL' ? orders : orders.filter(order => order.size === sizeFilter)

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
              <p><strong>Toppings:</strong> {order.toppings.join(' ')}</p>
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            data-testid={`filterBtn${size}`}
            className={`button-filter${size === sizeFilter ? ' active' : ''}`}
            key={size}
            onClick={() => handleFilterClick(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
