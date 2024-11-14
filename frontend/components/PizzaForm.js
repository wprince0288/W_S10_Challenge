import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField, postOrderRequest, postOrderSuccess, postOrderFailure, resetForm } from '../state/pizzaFormSlice'

const PizzaForm = () => {
  const dispatch = useDispatch();
  const { fullName, size, toppings, loading, error, success } = useSelector(state => state.pizzaOrderForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormField({ field: name, value }));
  };

  const handleToppingChange = (e) => {
    const { name, checked } = e.target;
    dispatch(updateFormField({ field: 'toppings', value: { ...toppings, [name]: checked } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = { fullName, size, toppings: Object.keys(toppings).filter(t => toppings[t]) };

    try {
      dispatch(postOrderRequest());
      const response = await fetch('https://localhost:9009/api/pizza/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Error placing order');
      dispatch(postOrderSuccess());
      dispatch(resetForm());
    } catch (error) {
      dispatch(postOrderFailure(error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {loading && <div>Order in progress...</div>}
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label><br />
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          placeholder="Type full name"
          type="text"
          value={fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="size">Size</label><br />
        <select data-testid="sizeSelect" id="size" name="size" value={size} onChange={handleInputChange}>
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>
      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={toppings['1']} onChange={handleToppingChange} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={toppings['2']} onChange={handleToppingChange} />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={toppings['3']} onChange={handleToppingChange} />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={toppings['4']} onChange={handleToppingChange} />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={toppings['5']} onChange={handleToppingChange} />
          Ham<br /></label>
      </div>
      <div>
        <button>
          <input data-testid="submit" type="submit" disabled={loading} />Submit
        </button>
      </div>
    </form>
  );
}
export default PizzaForm