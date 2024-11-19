import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postOrder } from '../state/pizzaApie'
import { setLoading, addOrder, fetchOrders } from '../state/orderHistorySlice'


const initialFormState = {
  fullName: "",
  size: "",
  toppings: [],
};

export default function PizzaForm() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.orderHistory.loading)
  const [formData, setForm] = useState(initialFormState)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((prevFormData) => {
        const updatedToppings = checked
          ? [...prevFormData.toppings, name]
          : prevFormData.toppings.filter((topping) => topping !== name);
        return { ...prevFormData, toppings: updatedToppings };
      });
    } else {
      setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, size, toppings } = formData;

    setError("");
    dispatch(setLoading(true));

    try {
      const toppingMap = {
        Pepperoni: 1,
        "Green Peppers": 2,
        Pineapple: 3,
        Mushrooms: 4,
        Ham: 5,
      };

      const toppingIds = toppings.map((topping) => toppingMap[topping]).filter(Boolean);

      console.log(toppings);
      
      const updatedFormData = { fullName, size, toppings: toppingIds };
      const resultAction = await dispatch(postOrder(updatedFormData));
      if (resultAction.error) {
        throw new Error(resultAction.payload.message || "Failed to submit order")
      }
      dispatch(fetchOrders())
      dispatch(addOrder({ ...formData, id: Date.now() }));
      setForm(initialFormState);
        } catch (err) {
          console.log(err)
      setError(err.message || "Failed to submit order");
    } finally {
      dispatch(setLoading(false))
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {error && <div className='failure'>Order failed: {error}</div>}
      {loading && <div className='pending'>Order in progress...</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label>
        <input data-testid="fullNameInput"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Type full name"
        />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label>
        <select data-testid="sizeSelect" id="size" name="size" value={formData.size} onChange={handleChange}>
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        {["Pepperoni", "Green Peppers", "Pineapple", "Mushrooms", "Ham"].map((topping) => (
          <label key={topping}>
            <input data-testid={topping === "Green Peppers" ? "checkGreenpeppers": `check${topping}`}
              type="checkbox"
              name={topping}
              checked={formData.toppings.includes(topping)}
              onChange={handleChange}
            />
            {topping}
            <br />
          </label>
        ))}
      </div>

      <input data-testid="submit" type="submit" value="Submit" />
    </form>
  );
}